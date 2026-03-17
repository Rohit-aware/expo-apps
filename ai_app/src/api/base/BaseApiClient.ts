/**
 * @file api/base/BaseApiClient.ts
 * @description Axios-based HTTP client with retry logic, timeout, and
 * centralized error normalization.
 */

import axios, {
  type AxiosInstance,
  type AxiosRequestConfig,
  type AxiosResponse,
  isAxiosError,
} from 'axios';
import { Logger } from '@utils/logger';
import { ApiResult, AppError, ErrorCode } from '@/types';

const TAG = 'BaseApiClient';
const DEFAULT_TIMEOUT_MS = 30_000;
const MAX_RETRIES = 2;

// Retry on these HTTP status codes

// ---------------------------------------------------------------------------
// Error normalization
// ---------------------------------------------------------------------------

function normalizeError(err: unknown): AppError {
  if (isAxiosError(err)) {
    const status = err.response?.status;

    if (!err.response) {
      return {
        code: ErrorCode.NETWORK_ERROR,
        message: 'Network unreachable. Check your connection.',
        retryable: true,
      };
    }

    if (status === 401 || status === 403) {
      return {
        code: ErrorCode.AUTHENTICATION_ERROR,
        message: 'Invalid or expired API key.',
        status,
        retryable: false,
      };
    }

    if (status === 429) {
      return {
        code: ErrorCode.RATE_LIMIT,
        message: 'Rate limit exceeded. Please try again shortly.',
        status,
        retryable: true,
      };
    }

    if (status === 400) {
      const msg = err.response.data?.error?.message ?? 'Invalid request.';
      return {
        code: ErrorCode.INVALID_REQUEST,
        message: msg,
        status,
        retryable: false,
      };
    }

    if (status != null && status >= 500) {
      return {
        code: ErrorCode.SERVER_ERROR,
        message: 'API server error. Please retry.',
        status,
        retryable: true,
      };
    }
  }

  if (err instanceof Error && err.name === 'AbortError') {
    return {
      code: ErrorCode.TIMEOUT,
      message: 'Request timed out.',
      retryable: true,
    };
  }

  return {
    code: ErrorCode.UNKNOWN,
    message: 'An unexpected error occurred.',
    retryable: false,
  };
}

// ---------------------------------------------------------------------------
// Client
// ---------------------------------------------------------------------------

export class BaseApiClient {
  protected readonly http: AxiosInstance;

  constructor(baseURL: string, defaultHeaders: Record<string, string>) {
    this.http = axios.create({
      baseURL,
      timeout: DEFAULT_TIMEOUT_MS,
      headers: {
        'Content-Type': 'application/json',
        ...defaultHeaders,
      },
    });

    this.http.interceptors.response.use(
      (res) => res,
      (err) => {
        Logger.warn(TAG, 'HTTP error intercepted', {
          status: err?.response?.status,
          url: err?.config?.url,
        });
        return Promise.reject(err);
      },
    );
  }

  /**
   * Execute a request with automatic retry on retryable errors.
   */
  protected async request<T>(
    config: AxiosRequestConfig,
    attempt = 0,
  ): Promise<ApiResult<T>> {
    try {
      const response: AxiosResponse<T> = await this.http.request<T>(config);
      return { success: true, data: response.data };
    } catch (err: unknown) {
      const appError = normalizeError(err);

      if (appError.retryable && attempt < MAX_RETRIES) {
        const delay = 500 * Math.pow(2, attempt); // 500ms, 1s, 2s
        Logger.warn(TAG, `Retrying (${attempt + 1}/${MAX_RETRIES}) after ${delay}ms`);
        await new Promise<void>((resolve) => setTimeout(resolve, delay));
        return this.request<T>(config, attempt + 1);
      }

      Logger.error(TAG, 'Request failed', appError);
      return { success: false, error: appError };
    }
  }

  /** Shorthand for POST requests. */
  protected post<TReq, TRes>(
    url: string,
    data: TReq,
    config?: AxiosRequestConfig,
  ): Promise<ApiResult<TRes>> {
    return this.request<TRes>({ method: 'POST', url, data, ...config });
  }
}
