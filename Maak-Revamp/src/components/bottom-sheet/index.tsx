import React from 'react';
import { Image } from 'expo-image';
import { CloseModalSvg } from '../../assets/icons';
import { Colors, Images, moderateScale } from '../../constants';
import { View, StyleSheet, Dimensions, Animated, PanResponder, Platform, Pressable, TouchableWithoutFeedback, StatusBar } from 'react-native';

interface BottomSheetProps extends React.PropsWithChildren<{
    /** Function to call when the bottom sheet is dismissed. */
    hide?: () => void;
    /** Whether to show the bottom sheet. */
    show: boolean;
    /** Height of the bottom tab (optional) to avoid the hiding below part of sheet behind bottom tab instead of give the height as of height of bottom tab it will lift the sheet that much height. */
    BOTTOM_TAB_HEIGHT?: number;
    /** minimum height of the bottom sheet. */
    MIN_HEIGHT?: number;
    /**Expandable : if it true then only sheet can expand to MaxHeight  */
    expandable?: boolean;
    /** initial height of sheet  */
    initialHeight?: number;
    /**Maximum height of sheet when expanded  */
    MAX_HEIGHT?: number;
}> { };

const { height: SCREEN_HEIGHT, width: SCREEN_WIDTH } = Dimensions.get('window');

const BottomSheet: React.FC<BottomSheetProps> = (props) => {
    const {
        show,
        hide,
        children,
        expandable = true,
        BOTTOM_TAB_HEIGHT = 0,
        initialHeight = SCREEN_HEIGHT,
        MIN_HEIGHT = SCREEN_HEIGHT * 0.3,
        MAX_HEIGHT = SCREEN_HEIGHT * 0.9
    } = props;

    const translateY = React.useRef(new Animated.Value(initialHeight)).current;
    const INITIAL_HEIGHT = SCREEN_HEIGHT - MIN_HEIGHT - BOTTOM_TAB_HEIGHT;

    React.useEffect(() => {
        Animated.timing(translateY, {
            toValue: show ? INITIAL_HEIGHT : SCREEN_HEIGHT,
            duration: 300,
            useNativeDriver: true,
        }).start();
    }, [show, INITIAL_HEIGHT]);

    const panResponder = React.useRef(
        PanResponder.create({
            onMoveShouldSetPanResponder: () => true,
            onPanResponderMove: (event, gestureState) => {
                const newY = gestureState.dy + (SCREEN_HEIGHT - MIN_HEIGHT);
                const limitY = SCREEN_HEIGHT - (expandable ? MAX_HEIGHT : MIN_HEIGHT);
                translateY.setValue(Math.max(limitY, Math.min(SCREEN_HEIGHT, newY)));
            },
            onPanResponderRelease: (event, gestureState) => {
                const targetY = (expandable && gestureState.dy < -50)
                    ? SCREEN_HEIGHT - MAX_HEIGHT
                    : (expandable && gestureState.dy > 50)
                        ? SCREEN_HEIGHT - MIN_HEIGHT
                        : (gestureState.dy > 50)
                            ? SCREEN_HEIGHT
                            : SCREEN_HEIGHT - MIN_HEIGHT;

                Animated.spring(translateY, {
                    toValue: targetY,
                    useNativeDriver: true,
                }).start(() => {
                    if (targetY === SCREEN_HEIGHT) hide?.();
                });
            },
        })
    ).current;

    const handleOutsidePress = () => {
        Animated.timing(translateY, {
            toValue: SCREEN_HEIGHT,
            duration: 300,
            useNativeDriver: true,
        }).start(() => hide?.());
    };

    if (!show) return null;

    return (
        <>
            <StatusBar hidden />
            <View style={[StyleSheet.absoluteFillObject, { backgroundColor: 'transparent' }]}>
                <TouchableWithoutFeedback onPress={handleOutsidePress}>
                    <View style={[StyleSheet.absoluteFill, styles.overlay]} />
                </TouchableWithoutFeedback>
                <Animated.View {...panResponder.panHandlers} style={[styles.bottomSheet, { transform: [{ translateY }] }]}>
                    <View style={styles.container}>
                        <Pressable onPress={() => hide?.()} style={styles.btn}>
                            <Image
                                source={Images.elips_cut}
                                style={styles.img}
                            />
                            <CloseModalSvg style={{ position: 'absolute', alignSelf: 'center', bottom: 140 }} />
                        </Pressable>
                        {children}
                    </View>
                </Animated.View>
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    bottomSheet: {
        width: SCREEN_WIDTH,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        paddingVertical: 16,
        zIndex: 9999,
        flex: 1,
        backgroundColor: Colors.white,
        ...Platform.select({
            android: { elevation: 0.5 },
            ios: {
                shadowColor: '#000',
                shadowOffset: { width: 0, height: -2 },
                shadowOpacity: 0.1,
                shadowRadius: 5,
            },
        }),
    },
    container: {
        flex: 1,
        zIndex: 999,
    },
    btn: {
        zIndex: -1,
        width: SCREEN_WIDTH,
        position: 'absolute',
    },
    overlay: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    img: { width: '114%', height: moderateScale(130), bottom: 44, right: 20, zIndex: -1 }
});

export default BottomSheet;