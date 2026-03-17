// domain/entities/Reel.ts
export interface Reel {
    id: string;
    uri: string;
    userName: string;
    description: string;
    likes: number;
    isLiked: boolean;
    comments: number;
}

// domain/repositories/IReelRepository.ts
export interface IReelRepository {
    getReels(): Promise<Reel[]>;
    toggleLike(reelId: string): Promise<void>;
}

// domain/usecases/TapHandler.ts
export type TapAction = 'SINGLE' | 'DOUBLE';

export interface TapHandlerConfig {
    doubleTapDelay: number;
    onSingleTap: () => void;
    onDoubleTap: () => void;
}

export class TapHandler {
    private tapCount = 0;
    private timeoutId: number | null = null;

    constructor(private readonly config: TapHandlerConfig) { }

    handleTap(): void {
        this.tapCount++;

        if (this.timeoutId) {
            clearTimeout(this.timeoutId);
        }

        this.timeoutId = setTimeout(() => {
            const count = this.tapCount;
            this.tapCount = 0;

            if (count === 1) {
                this.config.onSingleTap();
            } else if (count >= 2) {
                this.config.onDoubleTap();
            }
        }, this.config.doubleTapDelay);
    }

    cleanup(): void {
        if (this.timeoutId) {
            clearTimeout(this.timeoutId);
        }
    }
}