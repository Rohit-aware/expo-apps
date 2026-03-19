/**
 * @file features/ai/service/AIService.ts
 *
 * High-level orchestration layer. The ONLY public surface for running an AI
 * turn — it knows nothing about Anthropic, Gemini, or OpenAI specifically.
 *
 * SOLID alignment
 * ─────────────────────────────────────────────────────────────────────────────
 * • SRP : sole responsibility — "run an AI turn and yield results".
 * • OCP : supports any number of providers without modification.
 * • DIP : depends on IAIProvider (abstraction), never on concrete classes.
 */

import { aiProviderRegistry } from '../registry/AIProviderRegistry';
import { DEFAULT_AI_SETTINGS } from '@/types';
import type { IAIProvider, AIProviderType } from '../contracts/IAIProvider';
import type { AISettings, Message, ApiResult } from '@/types';
import { Logger } from '@utils/logger';

const TAG = 'AIService';

export class AIService {
  /**
   * Resolve the correct provider from the registry.
   * Falls back to the app-wide default provider if none is set on settings.
   */
  private resolveProvider(settings: AISettings): IAIProvider {
    const id = (settings.provider ?? DEFAULT_AI_SETTINGS.provider) as AIProviderType;
    return aiProviderRegistry.get(id);
  }

  // ── Public API ──────────────────────────────────────────────────────────────

  /**
   * One-shot (non-streaming) completion.
   * Delegates to the provider resolved from `settings.provider`.
   */
  async complete(messages: Message[], settings: AISettings,): Promise<ApiResult<string>> {
    const provider = this.resolveProvider(settings);
    Logger.debug(TAG, 'complete', { provider: provider.meta.id });
    return provider.complete(messages, settings);
  }

  /**
   * Streaming completion.
   * Yields text chunks as they arrive.
   * Delegates to the provider resolved from `settings.provider`.
   */
  async *stream(messages: Message[], settings: AISettings,): AsyncGenerator<string, void, unknown> {
    const provider = this.resolveProvider(settings);
    Logger.debug(TAG, 'stream', { provider: provider.meta.id });
    yield* provider.stream(messages, settings);
  }

  /**
   * Expose the registry for UI pickers (ProviderDropdown, Settings screen).
   * Returns all registered providers in registration order.
   */
  getAllProviders(): IAIProvider[] {
    return aiProviderRegistry.getAll();
  }
}

/** Singleton — consume this throughout the app rather than constructing new instances. */
export const aiService = new AIService();
