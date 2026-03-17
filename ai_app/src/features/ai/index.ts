/**
 * @file features/ai/index.ts
 *
 * Public barrel for the entire `features/ai` feature module.
 *
 * Consumers import ONLY from here — internal paths are private:
 *   import { aiService } from '@features/ai';
 *   import type { IAIProvider, AIProviderType } from '@features/ai';
 */

// Service singleton
export { aiService, AIService } from './service/AIService';

// Registry singleton (exposed for Settings / picker use-cases)
export { aiProviderRegistry } from './registry/AIProviderRegistry';

// Contracts (types only — re-exported so consumers never import internal paths)
export type {
  IAIProvider,
  AIProviderType,
  AIProviderMeta,
} from './contracts/IAIProvider';

export type { ConversationMessage } from './contracts/BaseAIProvider';
