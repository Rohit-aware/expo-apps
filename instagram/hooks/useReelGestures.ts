// hooks/useReelGestures.ts
import React from 'react';

interface UseReelGesturesProps {
    onSingleTap: () => void;
    onDoubleTap: () => void;
    doubleTapDelay?: number;
}

export const useReelGestures = ({
    onSingleTap,
    onDoubleTap,
}: UseReelGesturesProps) => {
    const lastTapRef = React.useRef(0);
    const tapTimerRef = React.useRef<number | null>(null);

    const handlePress = React.useCallback(() => {
        const now = Date.now();
        const timeSinceLastTap = now - lastTapRef.current;

        if (timeSinceLastTap < 300) { // Double tap threshold
            if (tapTimerRef.current) {
                clearTimeout(tapTimerRef.current);
                tapTimerRef.current = null;
            }
            lastTapRef.current = 0;
            onDoubleTap(); // Call double tap action (like)
        } else {
            // Possible single tap
            lastTapRef.current = now;

            if (tapTimerRef.current) {
                clearTimeout(tapTimerRef.current);
            }

            tapTimerRef.current = setTimeout(() => {
                if (lastTapRef.current !== 0) {
                    onSingleTap(); // Call single tap action (mute/unmute)
                    lastTapRef.current = 0;
                }
                tapTimerRef.current = null;
            }, 300); // Same threshold
        }
    }, [onSingleTap, onDoubleTap]);

    // Cleanup timer on unmount
    React.useEffect(() => {
        return () => {
            if (tapTimerRef.current) {
                clearTimeout(tapTimerRef.current);
            }
        };
    }, []);


    return { handlePress };
};