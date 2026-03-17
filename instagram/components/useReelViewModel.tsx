// containers/useReelViewModel.ts
import { Reel } from '@/entity/reel';
import { useGlobalMute } from '@/hooks/useGlobalMute';
import { useVideoPlayer } from 'expo-video';
import { useCallback, useEffect, useState } from 'react';

interface UseReelViewModelProps {
    reel: Reel;
    isActive: boolean;
}

export const useReelViewModel = ({ reel, isActive }: UseReelViewModelProps) => {
    const [isLiked, setIsLiked] = useState(false);
    const [heartScale, setHeartScale] = useState(0);
    const { isGloballyMuted, toggleGlobalMute } = useGlobalMute();

    const player = useVideoPlayer(reel.uri, (p) => {
        p.loop = true;
        p.muted = isGloballyMuted;
        p.bufferOptions = {
            preferredForwardBufferDuration: 10,
            prioritizeTimeOverSizeThreshold: true,
        };
    });

    // 🎥 Playback control
    useEffect(() => {
        if (isActive) {
            player.play();
        } else {
            player.pause();
        }
    }, [isActive, player]);

    // 🔊 Global mute sync
    useEffect(() => {
        player.muted = isGloballyMuted;
    }, [isGloballyMuted, player]);

    const triggerHeartAnimation = useCallback(() => {
        setHeartScale(1.2);
        setTimeout(() => setHeartScale(0), 200);
    }, []);

    const toggleMute = useCallback(() => {
        toggleGlobalMute();
    }, [toggleGlobalMute]);

    const handleLike = useCallback(() => {
        setIsLiked((prev) => !prev);
        triggerHeartAnimation();
    }, [triggerHeartAnimation]);

    return {
        player,
        isMuted: isGloballyMuted,
        isLiked,
        heartScale,
        actions: {
            toggleMute,
            handleLike,
        },
    };
};