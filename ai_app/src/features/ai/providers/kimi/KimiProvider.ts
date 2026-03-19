/**
 * @file features/ai/providers/kimi/KimiProvider.ts
 */

import { BaseAIProvider } from '../../contracts/BaseAIProvider';
import { ErrorCode } from '@/types';
import type { AIProviderMeta } from '../../contracts/IAIProvider';
import type { AISettings, Message, ApiResult } from '@/types';
import { ENV } from '@/config/env';
import { SSEClient } from '@/features/transport/ssec-client';


export interface KimiStreamChunk {
    choices: {
        delta?: { content?: string };
        message?: { content?: string };
    }[];
}

const KIMI_META: AIProviderMeta = {
    id: 'kimi',
    displayName: 'Kimi (Moonshot)',
    availableModels: ['moonshotai/kimi-k2-instruct'],
    defaultModel: 'moonshotai/kimi-k2-instruct',
} as const;

export class KimiProvider extends BaseAIProvider {
    readonly meta = KIMI_META;

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

    async complete(
        messages: Message[],
        settings: AISettings,
    ): Promise<ApiResult<string>> {
        const url = this.buildUrl();
        const model = ENV.KIMI_MODEL;

        this.log.debug('complete', { model, url });

        const response = await fetch(url, {
            method: 'POST',
            headers: this.headers,
            body: JSON.stringify({
                model,
                messages: this.buildMessages(messages, settings),
                max_tokens: settings.maxTokens,
                temperature: settings.temperature ?? 0.6,
                top_p: 0.9,
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
                    message: `Kimi error ${response.status}`,
                    status: response.status,
                    retryable: response.status >= 500,
                },
            };
        }

        const json = await response.json();
        const text = json.choices?.[0]?.message?.content ?? '';

        return { success: true, data: text };
    }

    async *stream(messages: Message[], settings: AISettings) {
        const client = new SSEClient({
            url: this.buildUrl(),
            method: 'POST',
            headers: {
                ...this.headers,
                Accept: 'text/event-stream',
            },
            body: {
                model: ENV.KIMI_MODEL,
                messages: this.buildMessages(messages, settings),
                max_tokens: settings.maxTokens,
                temperature: settings.temperature ?? 0.6,
                top_p: 0.9,
                stream: true,
            },
        });

        try {
            for await (const raw of client.stream()) {
                try {
                    const parsed = JSON.parse(raw);
                    const delta = parsed?.choices?.[0]?.delta;

                    // ✅ ONLY USER-FACING TEXT
                    if (delta?.content) {
                        yield delta.content;
                    }

                } catch (e) {
                    this.log.warn('parse error', raw);
                }
            }
        } finally {
            client.close();
        }
    }
}