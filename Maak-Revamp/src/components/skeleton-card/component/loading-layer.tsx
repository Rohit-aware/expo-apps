import React from 'react';
import Animated from 'react-native-reanimated';
import LinearGradient from 'react-native-linear-gradient';
import { I18nManager, StyleSheet, ViewStyle } from 'react-native';

const LOADERWIDTH = 80

interface LoadingLayerProps { style?: ViewStyle; }

const AnimatedLinearGradient = Animated.createAnimatedComponent(LinearGradient);

const LoadingLayer: React.FC<LoadingLayerProps> = ({ style }) => {

    const colors = React.useMemo(() => {
        return I18nManager.isRTL
            ? [
                'rgba(255, 255, 255, 0.1)',
                'rgba(255, 255, 255, 0.4)',
                'rgba(255, 255, 255, 0.6)',
                'rgba(255, 255, 255, 0.8)',
                'rgba(255, 255, 255, 1)',
            ]
            : [
                'rgba(255, 255, 255, 1)',
                'rgba(255, 255, 255, 0.8)',
                'rgba(255, 255, 255, 0.6)',
                'rgba(255, 255, 255, 0.4)',
                'rgba(255, 255, 255, 0.1)',
            ];
    }, []);

    return (
        <AnimatedLinearGradient
            colors={colors}
            start={{ x: 1, y: 0 }}
            end={{ x: 0, y: 0 }}
            style={[
                {
                    position: 'absolute',
                    height: '100%',
                    width: LOADERWIDTH,
                    transform: [{ scaleX: -1 }],
                },
                style,
            ]}
        />
    );
};

const styles = StyleSheet.create({});

export default LoadingLayer;