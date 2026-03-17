// hooks/useScrollLock.ts
import { useRef } from 'react';
import { PanResponder } from 'react-native';

export const useScrollLock = () => {
    const scrollEnabled = useRef(true);

    const panResponder = useRef(
        PanResponder.create({
            onStartShouldSetPanResponder: (evt) => {
                // Block multi-touch gestures
                if (evt.nativeEvent.touches.length > 1) {
                    scrollEnabled.current = false;
                    return true;
                }
                return false;
            },
            onPanResponderGrant: () => {
                // Reset scroll lock after gesture ends
                setTimeout(() => {
                    scrollEnabled.current = true;
                }, 100);
            },
            onPanResponderTerminate: () => {
                scrollEnabled.current = true;
            },
        })
    ).current;

    return { panResponder, scrollEnabled: scrollEnabled.current };
};