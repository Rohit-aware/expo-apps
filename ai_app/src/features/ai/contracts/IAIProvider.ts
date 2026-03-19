/**
 * @file features/ai/contracts/IAIProvider.ts
 *
 * THE CONTRACT — every AI provider (Anthropic, Gemini, OpenAI, …) must
 * implement this interface. AIService depends ONLY on this abstraction,
 * never on a concrete class.
 *
 * SOLID alignment
 * ─────────────────────────────────────────────────────────────────────────────
 * • SRP : defines one thing — what an AI provider can do.
 * • OCP : add a new provider by implementing this; zero changes to AIService.
 * • LSP : any IAIProvider can replace any other without breaking callers.
 * • ISP : only the methods every provider must support; extras stay in the
 *          concrete class.
 * • DIP : high-level modules (AIService, useChat) depend on THIS abstraction,
 *          not on concrete implementations.
 */

import type { Message, AISettings, ApiResult } from '@/types';

// ─────────────────────────────────────────────────────────────────────────────
// Provider identity — used by the registry and settings slice
// ─────────────────────────────────────────────────────────────────────────────

/** Stable string literal union — extend here when adding a new provider. */
export type AIProviderType = 'gpt-oss' | 'anthropic' | 'gemini' | 'openai' | 'nvidia' | 'kimi';

/** Metadata exposed to the Settings / Dropdown UI. */
export interface AIProviderMeta {
  /** Stable identifier, matches AIProviderType. */
  readonly id: AIProviderType;
  /** Human-readable name shown in picker UI. */
  readonly displayName: string;
  /** Ordered list of models the provider exposes. */
  readonly availableModels: readonly string[];
  /** Model selected when user has not overridden it. */
  readonly defaultModel: string;
}

// ─────────────────────────────────────────────────────────────────────────────
// Core contract
// ─────────────────────────────────────────────────────────────────────────────

export interface IAIProvider {
  /** Provider metadata (id, name, models). */
  readonly meta: AIProviderMeta;

  /**
   * One-shot completion.
   * Returns the full assistant reply or a typed AppError.
   */
  complete(
    messages: Message[],
    settings: AISettings,
  ): Promise<ApiResult<string>>;

  /**
   * Streaming completion.
   * Yields text chunks as they arrive from the provider.
   */
  stream(
    messages: Message[],
    settings: AISettings,
  ): AsyncGenerator<string, void, unknown>;
}
