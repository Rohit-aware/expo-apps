/**
 * @file features/ai/providers/openai/OpenAIProvider.ts
 *
 * Concrete IAIProvider for OpenAI GPT models.
 *
 * SOLID
 * ─────
 * ✅ OCP : This file was ADDED; no other provider file was modified.
 * ✅ SRP : Knows only how to talk to the OpenAI Chat Completions API.
 * ✅ LSP : Fully substitutable for any IAIProvider.
 *
 * OpenAI API reference:
 * https://platform.openai.com/docs/api-reference/chat
 */

import { BaseAIProvider } from '../../contracts/BaseAIProvider';
import { ErrorCode } from '@/types';
import type { AIProviderMeta } from '../../contracts/IAIProvider';
import type { AISettings, Message, ApiResult } from '@/types';
import { ENV } from '@/config/env';

// ─────────────────────────────────────────────────────────────────────────────
// OpenAI-specific shapes (kept local — not leaked to shared types)
// ─────────────────────────────────────────────────────────────────────────────

interface OpenAIMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

interface OpenAIStreamDelta {
  content?: string;
}

interface OpenAIStreamChoice {
  delta: OpenAIStreamDelta;
  finish_reason: string | null;
}

interface OpenAIStreamChunk {
  choices: OpenAIStreamChoice[];
}

// ─────────────────────────────────────────────────────────────────────────────
// Meta
// ─────────────────────────────────────────────────────────────────────────────

const OPENAI_META: AIProviderMeta = {
  id: 'openai',
  displayName: 'GPT (OpenAI)',
  availableModels: ['gpt-4o', 'gpt-4o-mini', 'gpt-4-turbo'],
  defaultModel: 'gpt-4o-mini',
} as const;

// ─────────────────────────────────────────────────────────────────────────────
// Helper
// ─────────────────────────────────────────────────────────────────────────────

function buildHeaders(apiKey: string): Record<string, string> {
  return {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${apiKey}`,
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// Provider
// ─────────────────────────────────────────────────────────────────────────────

export class OpenAIProvider extends BaseAIProvider {
  readonly meta = OPENAI_META;

  private buildMessages(messages: Message[], settings: AISettings): OpenAIMessage[] {
    const conversationMessages = this.toConversationMessages(messages).map(
      (m) => ({ role: m.role as 'user' | 'assistant', content: m.content as string }),
    );

    if (settings.systemPrompt) {
      return [
        { role: 'system', content: settings.systemPrompt },
        ...conversationMessages,
      ];
    }
    return conversationMessages;
  }

  // ── Non-streaming ────────────────────────────────────────────────────────────

  async complete(
    messages: Message[],
    settings: AISettings,
  ): Promise<ApiResult<string>> {
    const model = settings.model || OPENAI_META.defaultModel;

    this.log.debug('complete', { model });

    const response = await fetch(ENV.OPENAI_BASE_URL, {
      method: 'POST',
      headers: buildHeaders(ENV.OPENAI_API_KEY),
      body: JSON.stringify({
        model,
        messages: this.buildMessages(messages, settings),
        max_tokens: settings.maxTokens,
        temperature: settings.temperature ?? 0.7,
        stream: false,
      }),
    });

    if (!response.ok) {
      const body = await response.text();
      this.log.error('complete failed', { status: response.status, body });
      return {
        success: false,
        error: {
          code: ErrorCode.SERVER_ERROR,
          message: `OpenAI error ${response.status}`,
          status: response.status,
          retryable: response.status >= 500,
        },
      };
    }

    const json = await response.json();
    const text: string = json.choices?.[0]?.message?.content ?? '';
    return { success: true, data: text };
  }

  // ── Streaming (SSE — same protocol as Anthropic) ─────────────────────────────

  async *stream(
    messages: Message[],
    settings: AISettings,
  ): AsyncGenerator<string, void, unknown> {
    const model = ENV.OPENAI_MODEL || settings.model;

    this.log.debug('stream start', { model });

    const response = await fetch(ENV.OPENAI_BASE_URL, {
      method: 'POST',
      headers: buildHeaders(ENV.OPENAI_API_KEY),
      body: JSON.stringify({
        model,
        messages: this.buildMessages(messages, settings),
        max_tokens: settings.maxTokens,
        temperature: settings.temperature ?? 0.7,
        stream: true,
      }),
    });

    if (!response.ok) {
      const body = await response.text();
      this.log.error('stream failed', { status: response.status, body });
      throw new Error(`OpenAI HTTP ${response.status}`);
    }

    const raw = await response.text();

    for (const line of raw.split('\n')) {
      if (!line.startsWith('data:')) {
        continue;
      }
      const payload = line.replace('data:', '').trim();
      if (payload === '[DONE]') {
        return;
      }

      try {
        const chunk: OpenAIStreamChunk = JSON.parse(payload);
        const content = chunk.choices?.[0]?.delta?.content;
        if (content) {
          yield content;
        }
      } catch {
        this.log.warn('malformed SSE chunk', payload);
      }
    }

    this.log.debug('stream end');
  }
}
