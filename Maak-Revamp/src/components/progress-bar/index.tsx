import React from 'react';
import { Colors } from '../../constants';
import { StyleSheet } from 'react-native';
import moderateScale, { SCREEN_WIDTH } from '../../constants/responsive';
import Animated, { SharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';

interface ProgressBarProps {
    progress: SharedValue<number>;
    min?: number;
    max?: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ progress, min = 0, max = 1 }) => {
    const progressStyle = useAnimatedStyle(() => {
        const width = withTiming((progress.value - min) / (max - min) * SCREEN_WIDTH, { duration: 100 });
        return { width };
    });
    return <Animated.View style={[styles.progress, progressStyle]} />;
};

const styles = StyleSheet.create({
    progress: {
        bottom: 0,
        position: 'absolute',
        height: moderateScale(2),
        backgroundColor: Colors.primaryColor,
    },
});
export default ProgressBar;