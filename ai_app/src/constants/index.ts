/**
 * @file constants/index.ts
 * @description App-wide constants. Only pure values — no side-effects.
 */

export const APP_NAME = 'Claude AI';

// Storage keys
export const STORAGE_KEYS = {
  CONVERSATIONS: 'conversations',
  SETTINGS: 'settings',
  THEME: 'theme',
} as const;

// Anthropic API
export const ANTHROPIC_API_BASE = 'https://api.anthropic.com';
export const ANTHROPIC_API_VERSION = '2023-06-01';
export const ANTHROPIC_DEFAULT_SYSTEM = `You are Claude, an AI assistant made by Anthropic. 
You are helpful, harmless, and honest. You provide clear, accurate, and thoughtful responses.`;

// UI
export const MAX_MESSAGE_LENGTH = 4000;
export const MESSAGES_PER_PAGE = 50;
export const TYPING_DEBOUNCE_MS = 300;
export const AUTO_SCROLL_THRESHOLD = 100;

// Conversation
export const MAX_CONVERSATIONS = 100;
export const NEW_CONVERSATION_TITLE = 'New Conversation';
export const TITLE_MAX_CHARS = 60;
