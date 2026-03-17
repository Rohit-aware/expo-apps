/**
 * @file types/api.types.ts
 * @description Anthropic REST API type definitions (mirrors the official SDK shapes).
 */

// ---------------------------------------------------------------------------
// Request
// ---------------------------------------------------------------------------

export type AnthropicRole = 'user' | 'assistant';

export interface AnthropicContentBlock {
  type: 'text';
  text: string;
}

export interface AnthropicMessage {
  role: AnthropicRole;
  content: string | AnthropicContentBlock[];
}

export interface AnthropicMessagesRequest {
  model: string;
  max_tokens: number;
  messages: AnthropicMessage[];
  system?: string;
  temperature?: number;
  stream?: boolean;
  metadata?: {
    user_id?: string;
  };
}

// ---------------------------------------------------------------------------
// Response
// ---------------------------------------------------------------------------

export type AnthropicStopReason =
  | 'end_turn'
  | 'max_tokens'
  | 'stop_sequence'
  | null;

export interface AnthropicUsage {
  input_tokens: number;
  output_tokens: number;
}

export interface AnthropicMessagesResponse {
  id: string;
  type: 'message';
  role: 'assistant';
  content: AnthropicContentBlock[];
  model: string;
  stop_reason: AnthropicStopReason;
  stop_sequence: string | null;
  usage: AnthropicUsage;
}

// ---------------------------------------------------------------------------
// Streaming
// ---------------------------------------------------------------------------

export type StreamEventType =
  | 'message_start'
  | 'content_block_start'
  | 'content_block_delta'
  | 'content_block_stop'
  | 'message_delta'
  | 'message_stop'
  | 'ping'
  | 'error';

export interface StreamDelta {
  type: 'text_delta';
  text: string;
}

export interface StreamEvent {
  type: StreamEventType;
  index?: number;
  delta?: StreamDelta;
  message?: Partial<AnthropicMessagesResponse>;
}

// ---------------------------------------------------------------------------
// Error
// ---------------------------------------------------------------------------

export interface AnthropicErrorBody {
  type: 'error';
  error: {
    type: string;
    message: string;
  };
}

export type ApiResult<T> =
  | { success: true; data: T }
  | { success: false; error: AppError };

export interface AppError {
  code: ErrorCode;
  message: string;
  status?: number;
  retryable: boolean;
}

export enum ErrorCode {
  NETWORK_ERROR = 'NETWORK_ERROR',
  AUTHENTICATION_ERROR = 'AUTHENTICATION_ERROR',
  RATE_LIMIT = 'RATE_LIMIT',
  INVALID_REQUEST = 'INVALID_REQUEST',
  SERVER_ERROR = 'SERVER_ERROR',
  TIMEOUT = 'TIMEOUT',
  UNKNOWN = 'UNKNOWN',
}
