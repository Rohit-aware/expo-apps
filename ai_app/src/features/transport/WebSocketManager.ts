import { WebSocketClient } from './WebSocketClient';

class WebSocketManager {
    private client: WebSocketClient | null = null;

    startStream({
        url,
        payload,
        onChunk,
        onDone,
        onError,
    }: {
        url: string;
        payload: any;
        onChunk: (text: string) => void;
        onDone: () => void;
        onError: (err: string) => void;
    }) {
        this.client = new WebSocketClient();

        this.client.connect(url);

        this.client.onOpen(() => {
            this.client?.send(payload);
        });

        this.client.onMessage((data) => {
            if (data.type === 'chunk') {
                onChunk(data.text);
            }

            if (data.type === 'done') {
                onDone();
                this.client?.close();
            }

            if (data.type === 'error') {
                onError(data.message);
                this.client?.close();
            }
        });

        this.client.onError(() => {
            onError('WebSocket error');
        });

        return () => {
            this.client?.close(); // 🔥 cancel support
        };
    }
}

export const wsManager = new WebSocketManager();