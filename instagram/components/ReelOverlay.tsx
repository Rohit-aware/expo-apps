// presentation/components/ReelPlayer/ReelOverlay.tsx
import { Reel } from '@/entity/reel';
import React from 'react';
import { Pressable, StyleSheet, Text, TextStyle, View } from 'react-native';
import Animated, { AnimatedStyle } from 'react-native-reanimated';

interface ReelOverlayProps {
    reel: Reel;
    isMuted: boolean;
    isLiked: boolean;
    animatedHeartStyle: AnimatedStyle<TextStyle>;

    onLike?: () => void;
    onComment?: () => void;
    onShare?: () => void;
    onSave?: () => void;
}

export const ReelOverlay: React.FC<ReelOverlayProps> = ({
    reel,
    isMuted,
    isLiked,
    animatedHeartStyle,
    onLike,
    onComment,
    onShare,
    onSave,
}) => (
    <>
        {/* BIG HEART ANIMATION */}
        <Animated.Text style={[styles.heart, animatedHeartStyle]}>
            ❤️
        </Animated.Text>

        {/* MUTE ICON */}
        <View style={styles.muteBox}>
            <Text style={styles.muteText}>{isMuted ? '🔇' : '🔊'}</Text>
        </View>

        {/* RIGHT ACTION COLUMN */}
        <View style={styles.actions}>

            <Pressable style={styles.actionBtn} onPress={onLike}>
                <Text style={styles.icon}>{isLiked ? '❤️' : '🤍'}</Text>
                <Text style={styles.count}>{reel.likes}</Text>
            </Pressable>

            <Pressable style={styles.actionBtn} onPress={onComment}>
                <Text style={styles.icon}>💬</Text>
                <Text style={styles.count}>{reel.comments}</Text>
            </Pressable>

            <Pressable style={styles.actionBtn} onPress={onShare}>
                <Text style={styles.icon}>📤</Text>
                <Text style={styles.count}>Share</Text>
            </Pressable>

            <Pressable style={styles.actionBtn} onPress={onSave}>
                <Text style={styles.icon}>🔖</Text>
            </Pressable>

        </View>

        {/* BOTTOM INFO */}
        <View style={styles.bottom}>
            <Text style={styles.username}>@{reel.userName}</Text>
            <Text style={styles.caption}>{reel.description}</Text>
        </View>
    </>
);

const styles = StyleSheet.create({
    heart: {
        position: 'absolute',
        alignSelf: 'center',
        top: '40%',
        fontSize: 90,
    },

    muteBox: {
        position: 'absolute',
        top: 30,
        right: 10,
    },

    muteText: {
        color: 'white',
        fontSize: 24,
    },

    /* RIGHT COLUMN */
    actions: {
        position: 'absolute',
        right: 12,
        bottom: 120,
        alignItems: 'center',
        gap: 18,
    },

    actionBtn: {
        alignItems: 'center',
    },

    icon: {
        fontSize: 30,
        color: 'white',
    },

    count: {
        color: 'white',
        fontSize: 12,
        marginTop: 2,
    },

    /* BOTTOM TEXT */
    bottom: {
        position: 'absolute',
        bottom: 40,
        left: 16,
        right: 80, // leave space for actions
    },

    username: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
        marginBottom: 6,
    },

    caption: {
        color: 'white',
        fontSize: 14,
    },
});