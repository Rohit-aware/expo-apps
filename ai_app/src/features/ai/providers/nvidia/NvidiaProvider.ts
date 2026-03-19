/**
 * @file features/ai/providers/nvidia/NvidiaProvider.ts
 */

import { BaseAIProvider } from '../../contracts/BaseAIProvider';
import { ErrorCode } from '@/types';
import type { AIProviderMeta } from '../../contracts/IAIProvider';
import type { AISettings, Message, ApiResult } from '@/types';
import { ENV } from '@/config/env';
import { SSEClient } from '@/features/transport/ssec-client';
export interface NvidiaStreamChunk {
    choices: {
        delta?: { content?: string };
        message?: { content?: string };
    }[];
}

const NVIDIA_META: AIProviderMeta = {
    id: 'nvidia',
    displayName: 'Gemma (NVIDIA)',
    availableModels: [
        'google/gemma-3n-e4b-it',
        'moonshotai/kimi-k2-instruct',
    ],
    defaultModel: ENV.NVIDIA_MODEL,
} as const;

export class NvidiaProvider extends BaseAIProvider {
    readonly meta = NVIDIA_META;

    private get headers(): Record<string, string> {
        return {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${ENV.NVIDIA_API_KEY}`,
        };
    }

    private buildMessages(messages: Message[], settings: AISettings) {
        const msgs = this.toConversationMessages(messages).map((m) => ({
            role: m.role as 'user' | 'assistant',
            content: m.content as string,
        }));

        if (settings.systemPrompt) {
            return [
                { role: 'system', content: settings.systemPrompt },
                ...msgs,
            ];
        }

        return msgs;
    }

    private buildUrl() {
        return `${ENV.NVIDIA_BASE_URL}/chat/completions`;
    }

    // ── Non-streaming ────────────────────────────────────────────────────────────

    async complete(
        messages: Message[],
        settings: AISettings,
    ): Promise<ApiResult<string>> {
        const model = ENV.NVIDIA_MODEL || settings.model;
        const url = this.buildUrl();

        this.log.debug('complete', { model, url });

        const response = await fetch(url, {
            method: 'POST',
            headers: this.headers,
            body: JSON.stringify({
                model,
                messages: this.buildMessages(messages, settings),
                max_tokens: settings.maxTokens,
                temperature: settings.temperature ?? 0.2,
                top_p: 0.7,
                stream: false,
            }),
        });

        if (!response.ok) {
            const body = await response.text();
            this.log.error('complete failed', { status: response.status, body });

            return {
                success: false,
                error: {
                    code: ErrorCode.SERVER_ERROR,
                    message: `NVIDIA error ${response.status}`,
                    status: response.status,
                    retryable: response.status >= 500,
                },
            };
        }

        const json = await response.json();
        const text = json.choices?.[0]?.message?.content ?? '';

        return { success: true, data: text };
    }

    // ── Streaming ────────────────────────────────────────────────────────────────

    async *stream(
        messages: Message[],
        settings: AISettings,
    ): AsyncGenerator<string, void, unknown> {
        const model = ENV.NVIDIA_MODEL || settings.model;

        const client = new SSEClient({
            url: this.buildUrl(),
            method: 'POST',
            headers: {
                ...this.headers,
                Accept: 'text/event-stream',
            },
            body: {
                model,
                messages: this.buildMessages(messages, settings),
                max_tokens: settings.maxTokens,
                temperature: settings.temperature ?? 0.2,
                top_p: 0.7,
                stream: true,
            },
        });

        this.log.debug('stream start', { model });

        try {
            for await (const raw of client.stream()) {
                if (!raw) continue;

                // 🔥 STEP 1: Clean SSE prefix if present
                const cleaned = raw.startsWith('data:')
                    ? raw.replace(/^data:\s*/, '')
                    : raw;

                if (cleaned === '[DONE]') {
                    return;
                }

                try {
                    const parsed = JSON.parse(cleaned);

                    const delta = parsed?.choices?.[0]?.delta;

                    // ✅ ONLY show actual content
                    if (delta?.content) {
                        yield delta.content;
                    }

                    // 🚫 IGNORE:
                    // delta.reasoning
                    // delta.reasoning_content

                } catch (e) {
                    this.log.warn('parse error', cleaned);
                }
            }
        } finally {
            client.close();
            this.log.debug('stream end');
        }
    }
}