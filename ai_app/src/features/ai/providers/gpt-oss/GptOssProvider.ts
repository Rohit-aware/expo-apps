/**
 * @file features/ai/providers/nvidia/GptOssProvider.ts
 */

import { BaseAIProvider } from '../../contracts/BaseAIProvider';
import { ErrorCode } from '@/types';
import type { AIProviderMeta } from '../../contracts/IAIProvider';
import type { AISettings, Message, ApiResult } from '@/types';
import { ENV } from '@/config/env';
import { SSEClient } from '@/features/transport/ssec-client';

export interface GptOSSStreamChunk {
    choices: {
        delta?: {
            content?: string;
            reasoning_content?: string; // 🔥 important for this model
        };
        message?: {
            content?: string;
        };
    }[];
}

const GPT_OSS_META: AIProviderMeta = {
    id: 'gpt-oss',
    displayName: 'NVIDIA GPT OSS',
    availableModels: ['openai/gpt-oss-120b'],
    defaultModel: 'openai/gpt-oss-120b',
} as const;

export class GptOssProvider extends BaseAIProvider {
    readonly meta = GPT_OSS_META;

    private get headers(): Record<string, string> {
        return {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${ENV.NVIDIA_API_KEY}`,
        };
    }

    private buildUrl() {
        return `${ENV.NVIDIA_BASE_URL}/chat/completions`;
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

    // ✅ NON-STREAM
    async complete(
        messages: Message[],
        settings: AISettings,
    ): Promise<ApiResult<string>> {
        const url = this.buildUrl();
        const model = this.meta.defaultModel;

        this.log.debug('complete', { model, url });

        const response = await fetch(url, {
            method: 'POST',
            headers: this.headers,
            body: JSON.stringify({
                model,
                messages: this.buildMessages(messages, settings),
                max_tokens: settings.maxTokens,
                temperature: settings.temperature ?? 0.7,
                top_p: 1,
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

    // ✅ STREAM (PRODUCTION READY)
    async *stream(
        messages: Message[],
        settings: AISettings,
    ): AsyncGenerator<string, void, unknown> {
        const client = new SSEClient({
            url: this.buildUrl(),
            method: 'POST',
            headers: {
                ...this.headers,
                Accept: 'text/event-stream',
            },
            body: {
                model: this.meta.defaultModel,
                messages: this.buildMessages(messages, settings),
                max_tokens: settings.maxTokens,
                temperature: settings.temperature ?? 0.7,
                top_p: 1,
                stream: true,
            },
        });

        try {
            for await (const raw of client.stream()) {
                try {
                    this.log.debug('RAW', raw);
                    const chunk: GptOSSStreamChunk = JSON.parse(raw);

                    const delta = chunk.choices?.[0]?.delta;

                    // 🔥 Handle reasoning tokens (optional)
                    if (delta?.reasoning_content) {
                        yield delta.reasoning_content;
                    }

                    // 🔥 Actual response tokens
                    if (delta?.content) {
                        yield delta.content;
                    }
                } catch (err) {
                    this.log.warn('Malformed NVIDIA chunk', raw);
                }
            }
        } finally {
            client.close();
            this.log.debug('stream end');
        }
    }
}