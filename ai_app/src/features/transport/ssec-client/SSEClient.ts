import EventSource from 'react-native-sse';

type SSEOptions = {
    url: string;
    method?: string;
    headers?: Record<string, string>;
    body?: any;
};

export class SSEClient {
    private es: EventSource | null = null;
    private queue: string[] = [];
    private resolvers: ((value: IteratorResult<string>) => void)[] = [];
    private isDone = false;

    constructor(private options: SSEOptions) { }

    start() {
        this.es = new EventSource(this.options.url, {
            method: this.options.method || 'GET',
            headers: this.options.headers,
            body: this.options.body ? JSON.stringify(this.options.body) : undefined,
        });

        this.es.addEventListener('message', (event) => {
            try {
                if (!event.data) return;

                if (event.data === '[DONE]') {
                    this.finish();
                    return;
                }

                // 🔥 IMPORTANT: DO NOT PARSE HERE
                // Pass raw chunk to provider
                this.push(event.data);
            } catch {
                // ignore malformed chunks
            }
        });

        this.es.addEventListener('error', () => {
            this.finish();
        });
    }

    private push(chunk: string) {
        if (this.resolvers.length > 0) {
            const resolve = this.resolvers.shift();
            resolve?.({ value: chunk, done: false });
        } else {
            this.queue.push(chunk);
        }
    }

    private finish() {
        this.isDone = true;
        this.es?.close();

        while (this.resolvers.length > 0) {
            const resolve = this.resolvers.shift();
            resolve?.({ value: undefined, done: true });
        }
    }

    async *stream(): AsyncGenerator<string> {
        this.start();

        while (true) {
            if (this.queue.length > 0) {
                yield this.queue.shift()!;
                continue;
            }

            if (this.isDone) return;

            const result = await new Promise<IteratorResult<string>>((resolve) => {
                this.resolvers.push(resolve);
            });

            if (result.done) return;

            yield result.value!;
        }
    }

    close() {
        this.finish();
    }
}