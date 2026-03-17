// hooks/useGlobalMute.ts
import { useCallback, useEffect, useState } from 'react';

// Simple module-level state (acts like a singleton)
let globalMuteState = false;
let listeners: ((isMuted: boolean) => void)[] = [];

export const useGlobalMute = () => {
    const [isMuted, setIsMuted] = useState(globalMuteState);

    const toggleMute = useCallback(() => {
        globalMuteState = !globalMuteState;
        // Notify all listeners
        listeners.forEach(listener => listener(globalMuteState));
    }, []);

    // Subscribe to changes
    useEffect(() => {
        const listener = (newState: boolean) => {
            setIsMuted(newState);
        };
        listeners.push(listener);

        // Cleanup
        return () => {
            listeners = listeners.filter(l => l !== listener);
        };
    }, []);

    return {
        isGloballyMuted: isMuted,
        toggleGlobalMute: toggleMute
    };
};