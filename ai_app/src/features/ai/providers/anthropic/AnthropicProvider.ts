/**
 * @file features/ai/providers/anthropic/AnthropicProvider.ts
 *
 * Concrete IAIProvider for the Anthropic Claude API.
 *
 * SOLID
 * ─────
 * ✅ OCP : Adding any other provider never touches this file.
 * ✅ SRP : Knows only how to talk to Anthropic.
 * ✅ LSP : Fully substitutable — AIService cannot distinguish this from any
 *           other IAIProvider at runtime.
 */

import { BaseAIProvider } from '../../contracts/BaseAIProvider';
import { BaseApiClient } from '@api/base/BaseApiClient';
import { ANTHROPIC_API_BASE, ANTHROPIC_API_VERSION } from '@constants/index';
import type { AIProviderMeta } from '../../contracts/IAIProvider';
import type {
  AISettings,
  Message,
  ApiResult,
  AnthropicMessage,
  AnthropicMessagesRequest,
  AnthropicMessagesResponse,
  StreamEvent,
} from '@/types';
import { ENV } from '@/config/env';

// ─────────────────────────────────────────────────────────────────────────────
// Meta (shown in provider dropdown / Settings picker)
// ─────────────────────────────────────────────────────────────────────────────

const ANTHROPIC_META: AIProviderMeta = {
  id: 'anthropic',
  displayName: 'Claude (Anthropic)',
  availableModels: [
    'claude-opus-4-5',
    'claude-sonnet-4-20250514',
    'claude-haiku-4-5',
  ],
  defaultModel: ENV.ANTHROPIC_MODEL,
} as const;

// ─────────────────────────────────────────────────────────────────────────────
// Internal HTTP client (private — not exported from this folder)
// ─────────────────────────────────────────────────────────────────────────────

class AnthropicHttpClient extends BaseApiClient {
  constructor() {
    super(ANTHROPIC_API_BASE, {
      'x-api-key': ENV.ANTHROPIC_API_KEY,
      'anthropic-version': ANTHROPIC_API_VERSION,
    });
  }

  /** One-shot (non-streaming) message call. */
  sendMessage(
    req: AnthropicMessagesRequest,
  ): Promise<ApiResult<AnthropicMessagesResponse>> {
    return this.post<AnthropicMessagesRequest, AnthropicMessagesResponse>(
      '/v1/messages',
      { ...req, stream: false },
    );
  }
}

const httpClient = new AnthropicHttpClient();

// ─────────────────────────────────────────────────────────────────────────────
// Provider
// ─────────────────────────────────────────────────────────────────────────────

export class AnthropicProvider extends BaseAIProvider {
  readonly meta = ANTHROPIC_META;

  /**
   * Converts domain messages to Anthropic-typed messages.
   * Uses the base filter logic but returns the Anthropic-specific shape.
   */
  private toAnthropicMessages(messages: Message[]): AnthropicMessage[] {
    return messages
      .filter((m) => m.role === 'user' || m.role === 'assistant')
      .filter((m) => m.status === 'done' || m.role === 'user')
      .map((m) => ({
        role: m.role as 'user' | 'assistant',
        content: m.content,
      }));
  }

  // ── Non-streaming ────────────────────────────────────────────────────────────

  async complete(
    messages: Message[],
    settings: AISettings,
  ): Promise<ApiResult<string>> {
    const apiMessages = this.toAnthropicMessages(messages);

    const request: AnthropicMessagesRequest = {
      model: settings.model || ENV.ANTHROPIC_MODEL,
      max_tokens: settings.maxTokens || ENV.ANTHROPIC_MAX_TOKENS,
      system: settings.systemPrompt,
      messages: apiMessages,
      temperature: settings.temperature,
    };

    this.log.debug('complete', { messages: apiMessages.length });

    const result = await httpClient.sendMessage(request);
    if (!result.success) {
      return result;
    }

    const text =
      result.data.content
        ?.filter((b) => b.type === 'text')
        ?.map((b) => b.text)
        ?.join('') ?? '';

    return { success: true, data: text };
  }

  // ── Streaming ────────────────────────────────────────────────────────────────

  async *stream(
    messages: Message[],
    settings: AISettings,
  ): AsyncGenerator<string, void, unknown> {
    const apiMessages = this.toAnthropicMessages(messages);

    const request: AnthropicMessagesRequest = {
      model: settings.model || ENV.ANTHROPIC_MODEL,
      max_tokens: settings.maxTokens || ENV.ANTHROPIC_MAX_TOKENS,
      system: settings.systemPrompt,
      messages: apiMessages as any,
      temperature: settings.temperature ?? 0.7,
    };

    this.log.debug('stream start');

    const response = await fetch(`${ANTHROPIC_API_BASE}/v1/messages`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': ENV.ANTHROPIC_API_KEY,
        'anthropic-version': ANTHROPIC_API_VERSION,
        'anthropic-dangerous-direct-browser-access': 'true',
      },
      body: JSON.stringify({ ...request, stream: true }),
    });

    if (!response.ok) {
      const body = await response.text();
      this.log.error('stream failed', { status: response.status, body });
      throw new Error(`HTTP ${response.status}`);
    }

    const text = await response.text();

    for (const line of text.split('\n')) {
      if (!line.startsWith('data:')) {
        continue;
      }
      const payload = line.replace('data:', '').trim();
      if (payload === '[DONE]') {
        return;
      }

      try {
        const event: StreamEvent = JSON.parse(payload);
        if (
          event.type === 'content_block_delta' &&
          event.delta?.type === 'text_delta'
        ) {
          yield event.delta.text;
        }
      } catch {
        this.log.warn('malformed SSE chunk', payload);
      }
    }

    this.log.debug('stream end');
  }
}
