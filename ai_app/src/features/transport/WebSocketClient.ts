type WSMessage =
    | { type: 'chunk'; text: string }
    | { type: 'done' }
    | { type: 'error'; message: string };

export class WebSocketClient {
    private socket: WebSocket | null = null;

    connect(url: string) {
        this.socket = new WebSocket(url);
        return this.socket;
    }

    send(data: any) {
        this.socket?.send(JSON.stringify(data));
    }

    onMessage(cb: (data: WSMessage) => void) {
        if (!this.socket) return;

        this.socket.onmessage = (event) => {
            try {
                const parsed = JSON.parse(event.data);
                cb(parsed);
            } catch { }
        };
    }

    onOpen(cb: () => void) {
        this.socket && (this.socket.onopen = cb);
    }

    onError(cb: () => void) {
        this.socket && (this.socket.onerror = cb);
    }

    close() {
        this.socket?.close();
        this.socket = null;
    }
}