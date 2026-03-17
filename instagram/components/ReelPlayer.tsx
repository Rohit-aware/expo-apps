// components/ReelPlayer/ReelPlayer.tsx
import { Reel } from '@/entity/reel';
import { useReelGestures } from '@/hooks/useReelGestures';
import { useReelPlayerAnimation } from '@/hooks/useReelPlayerAnimation';
import { VideoPlayer, VideoView } from 'expo-video';
import React from 'react';
import { StyleSheet, TouchableWithoutFeedback, View } from 'react-native';
import { ReelOverlay } from './ReelOverlay';

interface ReelPlayerProps {
    reel: Reel;
    isActive: boolean;
    isMuted: boolean;
    isLiked: boolean;
    heartScale: number;
    player: VideoPlayer; // Now guaranteed to exist
    onSingleTap: () => void;
    onDoubleTap: () => void;
    onComment: () => void;
    onShare: () => void;
    handleLike: () => void;
}

export const ReelPlayer: React.FC<ReelPlayerProps> = React.memo(({
    reel,
    isActive,
    isMuted,
    isLiked,
    heartScale,
    player,
    onComment,
    onShare,
    onSingleTap,
    onDoubleTap,
    handleLike
}) => {
    const { animatedHeartStyle } = useReelPlayerAnimation({ heartScale });
    const { handlePress } = useReelGestures({ onSingleTap, onDoubleTap });

    return (
        <View style={styles.container}>
            <TouchableWithoutFeedback
                style={StyleSheet.absoluteFill}
                onPress={handlePress}
            >
                <VideoView
                    player={player}
                    style={StyleSheet.absoluteFill}
                    contentFit="cover"
                    nativeControls={false}
                    allowsPictureInPicture={false}
                    fullscreenOptions={{ enable: true, orientation: 'default' }}
                    renderToHardwareTextureAndroid={false}
                    pointerEvents="none"
                />
            </TouchableWithoutFeedback>

            <ReelOverlay
                reel={reel}
                isMuted={isMuted}
                isLiked={isLiked}
                onComment={onComment}
                onShare={onShare}
                onLike={handleLike}
                animatedHeartStyle={animatedHeartStyle}
            />
        </View>
    );
});
ReelPlayer.displayName = 'ReelPlayer';
const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: 'black', pointerEvents: 'box-none' },
});