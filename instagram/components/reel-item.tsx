// containers/ReelItemContainer.tsx
import { Reel } from '@/entity/reel';
import React from 'react';
import { StyleSheet, useWindowDimensions, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { CommentsSheet } from './CommentsSheet';
import { ShareSheet } from './common/ShareSheet';
import { ReelPlayer } from './ReelPlayer';
import { useReelViewModel } from './useReelViewModel';

interface ReelItemContainerProps {
    reel: Reel;
    isActive: boolean;
};

export const ReelItemContainer: React.FC<ReelItemContainerProps> =
    React.memo(({
        reel,
        isActive,
    }) => {
        const insets = useSafeAreaInsets();
        const { height } = useWindowDimensions();
        const reelHeight = height - insets.top - insets.bottom;
        const [shareVisible, setShareVisible] = React.useState(false);
        const [commentsVisible, setCommentsVisible] = React.useState(false);

        const {
            player,
            isMuted,
            isLiked,
            heartScale,
            actions: { toggleMute, handleLike },
        } = useReelViewModel({ reel, isActive });

        return (
            <View style={[styles.container, { height: reelHeight }]}>
                <ReelPlayer
                    reel={reel}
                    isActive={isActive}
                    player={player}
                    isMuted={isMuted}
                    isLiked={isLiked}
                    heartScale={heartScale}
                    onSingleTap={toggleMute}
                    onDoubleTap={handleLike}
                    handleLike={handleLike}
                    onComment={() => setCommentsVisible(true)}
                    onShare={() => setShareVisible(true)}
                />

                <CommentsSheet
                    visible={commentsVisible}
                    onClose={() => setCommentsVisible(false)}
                />

                <ShareSheet
                    visible={shareVisible}
                    onClose={() => setShareVisible(false)}
                />
            </View>
        );
    });

ReelItemContainer.displayName = 'ReelItemContainer';

const styles = StyleSheet.create({
    container: { backgroundColor: 'black', pointerEvents: 'box-none' },
});