/**
 * @file types/chat.types.ts
 *
 * CHANGE from original: AISettings now has a `provider` field.
 * This is the only type change required to support multiple providers.
 */

import type { AnthropicUsage } from './api.types';
import type { AIProviderType } from '@features/ai';


export type MessageRole = 'user' | 'assistant' | 'system';
export type MessageStatus = 'sending' | 'streaming' | 'done' | 'error';

export interface Message {
  id: string;
  conversationId: string;
  role: MessageRole;
  content: string;
  status: MessageStatus;
  usage?: AnthropicUsage;
  createdAt: number;
  updatedAt: number;
  error?: string;
}


export interface Conversation {
  id: string;
  title: string;
  messages: Message[];
  systemPrompt: string;
  model: string;
  /** Which AI provider this conversation uses */
  provider: AIProviderType;
  createdAt: number;
  updatedAt: number;
  totalTokens: number;
  pinned: boolean;
}

export interface AISettings {
  /** Which provider to use: 'anthropic' | 'gemini' | 'openai' | … */
  provider: AIProviderType;
  model: string;
  maxTokens: number;
  temperature: number;
  systemPrompt: string;
  streamingEnabled: boolean;
}

export const DEFAULT_AI_SETTINGS: AISettings = {
  provider: 'gpt-oss',
  model: 'gpt-oss-120b',
  maxTokens: 1024,
  temperature: 0.7,
  systemPrompt: 'You are a helpful AI assistant.',
  streamingEnabled: true,
};
