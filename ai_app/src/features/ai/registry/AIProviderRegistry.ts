/**
 * @file features/ai/registry/AIProviderRegistry.ts
 *
 * Central registry that maps AIProviderType → IAIProvider instance.
 *
 * HOW TO ADD A NEW PROVIDER
 * ─────────────────────────
 * 1. Create `features/ai/providers/{name}/{Name}Provider.ts`
 * 2. Add the literal to AIProviderType in IAIProvider.ts
 * 3. Register it here: `this.register(new {Name}Provider())`
 * 4. Done — AIService, useChat, ProviderDropdown all pick it up automatically.
 *
 * SOLID alignment
 * ─────────────────────────────────────────────────────────────────────────────
 * • SRP : sole responsibility — "know which providers exist".
 * • OCP : register new providers without modifying the class body.
 * • DIP : returns IAIProvider, never a concrete type.
 */

import type { IAIProvider, AIProviderType } from '../contracts/IAIProvider';
import { AnthropicProvider } from '../providers/anthropic';
import { GeminiProvider } from '../providers/gemini';
import { GptOssProvider } from '../providers/gpt-oss';
import { KimiProvider } from '../providers/kimi';
import { NvidiaProvider } from '../providers/nvidia';
import { OpenAIProvider } from '../providers/openai';

class AIProviderRegistry {
  private readonly providers = new Map<AIProviderType, IAIProvider>();

  constructor() {
    // ── Register all providers here ─────────────────────────────────────────
    // To add a provider: new XProvider() — that is it.
    this.register(new KimiProvider());
    this.register(new GeminiProvider());
    this.register(new OpenAIProvider());
    this.register(new GptOssProvider());
    this.register(new NvidiaProvider());
    this.register(new AnthropicProvider());
  }

  /**
   * Register a provider. Replaces any existing entry for the same id.
   * @returns `this` for chaining.
   */
  register(provider: IAIProvider): this {
    this.providers.set(provider.meta.id, provider);
    return this;
  }

  /**
   * Retrieve a provider by id.
   * Throws if the id is not registered — fail-fast beats silent null.
   */
  get(id: AIProviderType): IAIProvider {
    const provider = this.providers.get(id);
    if (!provider) {
      throw new Error(
        `[AIProviderRegistry] Provider "${id}" is not registered. ` +
        `Available: ${[...this.providers.keys()].join(', ')}`,
      );
    }
    return provider;
  }

  /** All registered providers — used by ProviderDropdown to build picker. */
  getAll(): IAIProvider[] {
    return [...this.providers.values()];
  }

  /** Type-safe existence check. */
  has(id: AIProviderType): boolean {
    return this.providers.has(id);
  }
}

/** Singleton — one registry for the whole app. */
export const aiProviderRegistry = new AIProviderRegistry();
