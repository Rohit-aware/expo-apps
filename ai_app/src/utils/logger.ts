/**
 * @file utils/logger.ts
 * @description Production-safe structured logger.
 * Logs are gated by ENV.ENABLE_LOGGING in dev, silenced in production.
 */

import { IS_DEV } from "@/config/env";


export enum LogLevel {
  DEBUG = 'DEBUG',
  INFO = 'INFO',
  WARN = 'WARN',
  ERROR = 'ERROR',
}

interface LogEntry {
  level: LogLevel;
  tag: string;
  message: string;
  data?: unknown;
  timestamp: string;
}

function formatEntry(entry: LogEntry): string {
  const ts = entry.timestamp;
  const data = entry.data ? `\n${JSON.stringify(entry.data, null, 2)}` : '';
  return `[${ts}] [${entry.level}] [${entry.tag}] ${entry.message}${data}`;
}

function log(
  level: LogLevel,
  tag: string,
  message: string,
  data?: unknown,
): void {
  if (!IS_DEV) return;

  const entry: LogEntry = {
    level,
    tag,
    message,
    data,
    timestamp: new Date().toISOString(),
  };

  const formatted = formatEntry(entry);

  switch (level) {
    case LogLevel.ERROR:
      console.error(formatted);
      break;
    case LogLevel.WARN:
      console.warn(formatted);
      break;
    default:
      console.log(formatted);
  }
}

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

export const Logger = {
  debug: (tag: string, message: string, data?: unknown) =>
    log(LogLevel.DEBUG, tag, message, data),
  info: (tag: string, message: string, data?: unknown) =>
    log(LogLevel.INFO, tag, message, data),
  warn: (tag: string, message: string, data?: unknown) =>
    log(LogLevel.WARN, tag, message, data),
  error: (tag: string, message: string, data?: unknown) =>
    log(LogLevel.ERROR, tag, message, data),
} as const;
