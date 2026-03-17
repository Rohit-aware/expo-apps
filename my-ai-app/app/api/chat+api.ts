import { google } from '@ai-sdk/google';
import {
    convertToModelMessages,
    streamText,
    UIMessage,
} from 'ai';

export async function POST(req: Request) {
    const { messages }: { messages: UIMessage[] } = await req.json();

    const result = streamText({
        model: google("gemini-1.5-flash"),
        // model: google("gemini-2.0-flash"),
        messages: await convertToModelMessages(messages),
        system: "You are a senior React Native engineer helping developers.",
        maxRetries: 0,
    });

    return result.toUIMessageStreamResponse({
        headers: {
            "Content-Type": "application/octet-stream",
            "Content-Encoding": "none",
        },
    });
}