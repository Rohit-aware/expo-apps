/**
 * @file features/ai/providers/gemini/GeminiProvider.ts
 *
 * Concrete IAIProvider for Google Gemini.
 *
 * SOLID
 * ─────
 * ✅ OCP : This file was ADDED; no other provider file was modified.
 * ✅ SRP : Knows only how to talk to the Gemini REST API.
 * ✅ LSP : AIService cannot distinguish it from any other IAIProvider.
 *
 * Gemini REST reference:
 * https://ai.google.dev/api/generate-content
 */

import { BaseAIProvider } from '../../contracts/BaseAIProvider';
import { ErrorCode } from '@/types';
import type { AIProviderMeta } from '../../contracts/IAIProvider';
import type { AISettings, Message, ApiResult } from '@/types';
import { ENV } from '@/config/env';

// ─────────────────────────────────────────────────────────────────────────────
// Gemini-specific shapes (kept local — not leaked to shared types)
// ─────────────────────────────────────────────────────────────────────────────

interface GeminiPart {
  text: string;
}

interface GeminiContent {
  role: 'user' | 'model';
  parts: GeminiPart[];
}

interface GeminiRequest {
  contents: GeminiContent[];
  systemInstruction?: { parts: GeminiPart[] };
  generationConfig?: {
    maxOutputTokens?: number;
    temperature?: number;
  };
}

interface GeminiCandidate {
  content: { parts: GeminiPart[]; role: string };
  finishReason: string;
}

interface GeminiResponse {
  candidates: GeminiCandidate[];
}

interface GeminiStreamChunk {
  candidates?: GeminiCandidate[];
}

// ─────────────────────────────────────────────────────────────────────────────
// Meta
// ─────────────────────────────────────────────────────────────────────────────

const GEMINI_META: AIProviderMeta = {
  id: 'gemini',
  displayName: 'Gemini (Google)',
  availableModels: [
    'gemini-1.5-flash-latest',
    'gemini-1.5-pro-latest',
    'gemini-2.0-flash',
  ],
  defaultModel: ENV.GEMINI_MODEL,
} as const;

// ─────────────────────────────────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────────────────────────────────

function buildGeminiUrl(model: string, stream: boolean): string {
  const base = ENV.GEMINI_BASE_URL.replace(/\/$/, '');

  if (stream) {
    return `${base}/v1beta/models/${model}:streamGenerateContent?alt=sse`;
  }

  return `${base}/v1beta/models/${model}:generateContent`;
}

// ─────────────────────────────────────────────────────────────────────────────
// Provider
// ─────────────────────────────────────────────────────────────────────────────

export class GeminiProvider extends BaseAIProvider {
  readonly meta = GEMINI_META;

  private get headers(): Record<string, string> {
    return {
      'Content-Type': 'application/json',
      'x-goog-api-key': ENV.GEMINI_API_KEY,
    };
  }

  /** Map domain messages → Gemini contents array. */
  private toGeminiContents(messages: Message[]): GeminiContent[] {
    return this.toConversationMessages(messages).map((m) => ({
      role: m.role === 'user' ? 'user' : 'model',
      parts: [{ text: m.content as string }],
    }));
  }

  private buildRequest(messages: Message[], settings: AISettings): GeminiRequest {
    return {
      contents: this.toGeminiContents(messages),
      ...(settings.systemPrompt
        ? { systemInstruction: { parts: [{ text: settings.systemPrompt }] } }
        : {}),
      generationConfig: {
        maxOutputTokens: settings.maxTokens,
        temperature: settings.temperature ?? 0.7,
      },
    };
  }

  // ── Non-streaming ────────────────────────────────────────────────────────────

  async complete(
    messages: Message[],
    settings: AISettings,
  ): Promise<ApiResult<string>> {
    const model = ENV.GEMINI_MODEL || settings.model;
    const url = buildGeminiUrl(model, false);
    this.log.debug('url', url)
    this.log.debug('complete', { model });

    const response = await fetch(url, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify(this.buildRequest(messages, settings)),
    });

    if (!response.ok) {
      const body = await response.text();
      this.log.error('complete failed', { status: response.status, body });
      return {
        success: false,
        error: {
          code: ErrorCode.SERVER_ERROR,
          message: `Gemini error ${response.status}`,
          status: response.status,
          retryable: response.status >= 500,
        },
      };
    }

    const json: GeminiResponse = await response.json();
    const text =
      json.candidates?.[0]?.content?.parts?.map((p) => p.text)?.join('') ?? '';

    return { success: true, data: text };
  }

  // ── Streaming ────────────────────────────────────────────────────────────────

  async *stream(
    messages: Message[],
    settings: AISettings,
  ): AsyncGenerator<string, void, unknown> {
    const model = ENV.GEMINI_MODEL || settings.model;
    const url = buildGeminiUrl(model, true);

    this.log.debug('stream start', { model });

    const response = await fetch(url, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify(this.buildRequest(messages, settings)),
    });

    if (!response.ok) {
      const body = await response.text();
      this.log.error('stream failed', { status: response.status, body });
      throw new Error(`Gemini HTTP ${response.status}`);
    }

    const raw = await response.text();

    for (const line of raw.split('\n')) {
      if (!line.startsWith('data:')) {
        continue;
      }
      const payload = line.replace('data:', '').trim();
      if (!payload) {
        continue;
      }

      try {
        const chunk: GeminiStreamChunk = JSON.parse(payload);
        const chunkText = chunk.candidates?.[0]?.content?.parts
          ?.map((p) => p.text)
          ?.join('');
        if (chunkText) {
          yield chunkText;
        }
      } catch {
        this.log.warn('malformed Gemini SSE chunk', payload);
      }
    }

    this.log.debug('stream end');
  }
}
