// presentation/components/ReelPlayer/useReelPlayerAnimation.ts
import React from 'react';
import { useAnimatedStyle, useSharedValue, withSpring, withTiming } from 'react-native-reanimated';

interface UseReelPlayerAnimationProps {
    heartScale: number;
}

export const useReelPlayerAnimation = ({ heartScale }: UseReelPlayerAnimationProps) => {
    const scale = useSharedValue(0);
    const opacity = useSharedValue(0);

    React.useEffect(() => {
        if (heartScale > 0) {
            scale.value = withSpring(heartScale, {}, () => {
                scale.value = withTiming(0, { duration: 400 });
            });
            opacity.value = 1;
        } else {
            opacity.value = 0;
        }
    }, [heartScale, scale, opacity]);

    const animatedHeartStyle = useAnimatedStyle(() => ({
        transform: [{ scale: scale.value }],
        opacity: opacity.value,
    }));

    return { animatedHeartStyle };
};