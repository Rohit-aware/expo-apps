import React from 'react';
import MainStack from './route/main-stack';
import { StatusBar, StyleSheet } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useLoadAssets } from './hooks/load-assets/useLoadAssets';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { NotificationProvider } from '../context/NotificationContext';

const AppEntry = () => {

    useLoadAssets();

    return (
        <NotificationProvider>
            <SafeAreaProvider style={styles.rootStyle}>
                <GestureHandlerRootView style={styles.rootStyle}>
                    <StatusBar translucent backgroundColor={'transparent'} barStyle={'light-content'} />
                    <MainStack />
                </GestureHandlerRootView>
            </SafeAreaProvider>
        </NotificationProvider>
    )
}

export default AppEntry
const styles = StyleSheet.create({ rootStyle: { flex: 1 } });