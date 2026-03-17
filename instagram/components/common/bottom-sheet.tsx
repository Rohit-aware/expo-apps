import React, { useEffect } from 'react';
import { Dimensions, StyleSheet } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
    Extrapolation,
    interpolate,
    runOnJS,
    useAnimatedStyle,
    useSharedValue,
    withSpring,
} from 'react-native-reanimated';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

interface Props {
    visible: boolean;
    onClose: () => void;
    children: React.ReactNode;
    snapPoints?: number[]; // percentages [0.4, 0.8]
}

export const BottomSheet: React.FC<Props> = ({
    visible,
    onClose,
    children,
    snapPoints = [0.4, 0.8],
}) => {
    const translateY = useSharedValue(SCREEN_HEIGHT);

    const SNAP_PIXELS = snapPoints.map(p => SCREEN_HEIGHT * (1 - p));
    const MAX_OPEN = Math.min(...SNAP_PIXELS);

    useEffect(() => {
        translateY.value = withSpring(
            visible ? SNAP_PIXELS[0] : SCREEN_HEIGHT,
            { damping: 18 }
        );
    }, [SNAP_PIXELS, translateY, visible]);

    const gesture = Gesture.Pan()
        .onUpdate((e: any) => {
            const next = translateY.value + e.changeY;
            translateY.value = Math.max(MAX_OPEN, next);
        })
        .onEnd(() => {
            if (translateY.value > SCREEN_HEIGHT * 0.7) {
                translateY.value = withSpring(SCREEN_HEIGHT);
                runOnJS(onClose)();
            } else {
                // snap to nearest
                let nearest = SNAP_PIXELS[0];
                let minDist = Math.abs(translateY.value - nearest);

                for (const p of SNAP_PIXELS) {
                    const d = Math.abs(translateY.value - p);
                    if (d < minDist) {
                        minDist = d;
                        nearest = p;
                    }
                }

                translateY.value = withSpring(nearest);
            }
        });

    const style = useAnimatedStyle(() => ({
        transform: [{ translateY: translateY.value }],
    }));

    const backdrop = useAnimatedStyle(() => ({
        opacity: interpolate(
            translateY.value,
            [SCREEN_HEIGHT, MAX_OPEN],
            [0, 0.5],
            Extrapolation.CLAMP
        ),
        display: translateY.value >= SCREEN_HEIGHT ? 'none' : 'flex',
    }));

    return (
        <>
            <Animated.View style={[styles.backdrop, backdrop]} />

            <GestureDetector gesture={gesture}>
                <Animated.View style={[styles.sheet, style]}>
                    {children}
                </Animated.View>
            </GestureDetector>
        </>
    );
};

const styles = StyleSheet.create({
    backdrop: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'black',
    },
    sheet: {
        position: 'absolute',
        top: 0,
        height: SCREEN_HEIGHT,
        width: '100%',
        backgroundColor: 'white',
        borderTopLeftRadius: 22,
        borderTopRightRadius: 22,
        paddingTop: 10,
    },
});