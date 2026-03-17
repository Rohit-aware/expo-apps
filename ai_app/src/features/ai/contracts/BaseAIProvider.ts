/**
 * @file features/ai/contracts/BaseAIProvider.ts
 *
 * Abstract base that handles the boilerplate every provider shares:
 *   • domain-message → API-message conversion
 *   • shared structured logger
 *
 * Concrete providers extend this and implement `complete()` + `stream()`.
 *
 * SOLID: SRP — this class ONLY owns shared provider utility logic.
 */

import type { Message, AISettings, ApiResult } from '@/types';
import type { IAIProvider, AIProviderMeta } from './IAIProvider';
import { Logger } from '@utils/logger';

/** Generic conversation-turn shape consumed by every provider's HTTP request. */
export interface ConversationMessage {
  role: 'user' | 'assistant';
  content: string | object;
}

export abstract class BaseAIProvider implements IAIProvider {
  abstract readonly meta: AIProviderMeta;

  // ── Each provider implements these two ──────────────────────────────────────
  abstract complete(
    messages: Message[],
    settings: AISettings,
  ): Promise<ApiResult<string>>;

  abstract stream(
    messages: Message[],
    settings: AISettings,
  ): AsyncGenerator<string, void, unknown>;

  // ── Shared helpers ───────────────────────────────────────────────────────────

  /** Logging tag derived from the provider id — avoids string duplication. */
  protected get tag(): string {
    return this.meta.id;
  }

  /**
   * Strips system messages and unfinished assistant turns so every provider
   * receives a clean [user, assistant, user, …] sequence.
   */
  protected toConversationMessages(messages: Message[]): ConversationMessage[] {
    return messages
      .filter((m) => m.role === 'user' || m.role === 'assistant')
      .filter((m) => m.status === 'done' || m.role === 'user')
      .map((m) => ({
        role: m.role as 'user' | 'assistant',
        content: m.content,
      }));
  }

  /** Structured logger scoped to this provider's tag. */
  protected readonly log = {
    debug: (msg: string, data?: unknown): void =>
      Logger.debug(this.tag, msg, data),
    warn: (msg: string, data?: unknown): void =>
      Logger.warn(this.tag, msg, data),
    error: (msg: string, data?: unknown): void =>
      Logger.error(this.tag, msg, data),
  };
}
