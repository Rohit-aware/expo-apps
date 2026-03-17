/**
 * @file utils/formatters.ts
 * @description Pure utility functions — no side-effects.
 */

import { TITLE_MAX_CHARS } from '@constants/index';

/** Trim and truncate a string for display. */
export function truncate(str: string, max = TITLE_MAX_CHARS): string {
  const trimmed = str.trim();
  return trimmed.length > max ? `${trimmed.slice(0, max - 1)}…` : trimmed;
}

/** Format a Unix-ms timestamp to a relative or absolute date string. */
export function formatTimestamp(unixMs: number): string {
  const now = Date.now();
  const diffMs = now - unixMs;
  const diffSec = Math.floor(diffMs / 1000);
  const diffMin = Math.floor(diffSec / 60);
  const diffHr = Math.floor(diffMin / 60);
  const diffDay = Math.floor(diffHr / 24);

  if (diffSec < 60) return 'Just now';
  if (diffMin < 60) return `${diffMin}m ago`;
  if (diffHr < 24) return `${diffHr}h ago`;
  if (diffDay === 1) return 'Yesterday';
  if (diffDay < 7) return `${diffDay}d ago`;

  return new Date(unixMs).toLocaleDateString();
}

/** Derive a short conversation title from the first user message. */
export function deriveConversationTitle(firstMessage: string): string {
  const cleaned = firstMessage.replace(/\n+/g, ' ').trim();
  return truncate(cleaned, TITLE_MAX_CHARS);
}

/** Count approximate token usage (rough estimate: ~4 chars/token). */
export function estimateTokens(text: string): number {
  return Math.ceil(text.length / 4);
}
