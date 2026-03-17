/**
 * @file config/env.ts
 *
 * CHANGE from original: Gemini keys are `.optional()` — if you only want
 * Anthropic, you don't need to set them.  Each provider's constructor should
 * guard its own key requirement at runtime (fail when actually called, not
 * at startup if the user never selects that provider).
 *
 * Adding a new provider (e.g. OpenAI):
 *   1. Add OPENAI_API_KEY here as optional
 *   2. Read it in OpenAIProvider constructor
 *   That's all — no other file changes.
 */

import Config from 'react-native-config';
import { z } from 'zod';

const EnvSchema = z.object({
  // ── Anthropic (required — it's the default provider) ──────────────────────
  ANTHROPIC_API_KEY: z.string().min(1, 'ANTHROPIC_API_KEY is required'),
  ANTHROPIC_MODEL: z.string().default('claude-sonnet-4-20250514'),
  ANTHROPIC_MAX_TOKENS: z
    .string()
    .transform(Number)
    .pipe(z.number().positive())
    .default('1024'),
  OPENAI_BASE_URL: z.string().min(1, 'OPENAI_BASE_URL is required'),
  OPENAI_MODEL: z.string().default('gpt-4o-mini'),
  // ── Gemini (optional — only validated when GeminiProvider is actually used) ─
  GEMINI_API_KEY: z.string().optional().default(''),
  OPENAI_API_KEY: z.string().optional().default(''),
  GEMINI_BASE_URL: z
    .string()
    .optional()
    .default('https://generativelanguage.googleapis.com/v1beta/models'),
  GEMINI_MODEL: z.string().optional().default('gemini-1.5-flash'),

  // ── OpenAI (example of future provider — add key, no other changes needed) ─
  // OPENAI_API_KEY: z.string().optional().default(''),

  // ── App ───────────────────────────────────────────────────────────────────
  APP_ENV: z.enum(['development', 'staging', 'production']).default('development'),
  API_BASE_URL: z.string().url().optional(),
  ENABLE_LOGGING: z
    .string()
    .transform((v) => v === 'true')
    .default('true'),
});

type Env = z.infer<typeof EnvSchema>;

function validateEnv(): Env {
  const raw = {
    ANTHROPIC_API_KEY: Config.ANTHROPIC_API_KEY,
    ANTHROPIC_MODEL: Config.ANTHROPIC_MODEL,
    ANTHROPIC_MAX_TOKENS: Config.ANTHROPIC_MAX_TOKENS,
    GEMINI_API_KEY: Config.GEMINI_API_KEY,
    GEMINI_BASE_URL: Config.GEMINI_BASE_URL,
    GEMINI_MODEL: Config.GEMINI_MODEL,
    APP_ENV: Config.APP_ENV,
    API_BASE_URL: Config.API_BASE_URL,
    ENABLE_LOGGING: Config.ENABLE_LOGGING,
    OPENAI_BASE_URL: Config.OPENAI_BASE_URL,
    OPENAI_API_KEY: Config.OPENAI_API_KEY,
    OPENAI_MODEL: Config.OPENAI_MODEL,
    OPENAI_MAX_TOKENS: Config.OPENAI_MAX_TOKENS,
  };

  const result = EnvSchema.safeParse(raw);
  if (!result.success) {
    const formatted = result.error.issues
      .map((i) => `  • ${i.path.join('.')}: ${i.message}`)
      .join('\n');
    throw new Error(`[ENV] Validation failed:\n${formatted}`);
  }
  return result.data;
}

export const ENV: Env = validateEnv();
export const IS_DEV = ENV.APP_ENV === 'development';
export const IS_PROD = ENV.APP_ENV === 'production';
