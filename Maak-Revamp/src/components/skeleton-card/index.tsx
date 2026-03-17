import React from 'react';
import { Colors } from '../../constants';
import LoadingLayer from './component/loading-layer';
import { StyleSheet, View, I18nManager, ViewStyle } from 'react-native';
import moderateScale, { SCREEN_WIDTH } from '../../constants/responsive';
import Animated, { interpolate, useAnimatedStyle, SharedValue } from 'react-native-reanimated';

const LOADERWIDTH = 80

interface SkeltonCardProps {
    width: number;
    height: number;
    containerStyle?: ViewStyle;
    animatedValue: SharedValue<number>;
}

const SkeltonCard: React.FC<SkeltonCardProps> = ({
    width,
    height,
    containerStyle,
    animatedValue,
}) => {

    const getOutputRange = (): [number, number] => {
        if (I18nManager.isRTL) {
            return [LOADERWIDTH, -SCREEN_WIDTH];
        } else {
            return [-LOADERWIDTH, SCREEN_WIDTH];
        }
    };

    const style = useAnimatedStyle(() => {
        const outputRange = getOutputRange();
        const translateX = interpolate(animatedValue.value, [0, 1], outputRange);
        return {
            transform: [{ translateX }],
        };
    }, [animatedValue]);

    return (
        <View style={{ ...containerStyle }}>
            <Animated.View
                style={[
                    {
                        width,
                        height,
                        overflow: 'hidden',
                        borderRadius: moderateScale(10),
                        backgroundColor: Colors.skeletonColor,
                    },
                ]}
            >
                <LoadingLayer style={style} />
            </Animated.View>
        </View>
    );
};

const styles = StyleSheet.create({});

export default SkeltonCard;