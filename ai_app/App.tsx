/**
 * @file App.tsx
 * @description Root component. Provides Redux store and renders AppNavigator.
 */

import React, { useEffect } from 'react';
import { StatusBar, LogBox } from 'react-native';
import { Provider } from 'react-redux';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { store } from '@store/index';
import { AppNavigator } from '@navigation/AppNavigator';
import { Logger } from '@utils/logger';
import 'react-native-get-random-values';
// Suppress non-critical warnings in production
LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
]);

export default function App(): React.JSX.Element {
  useEffect(() => {
    Logger.info('App', 'Application started');
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <Provider store={store}>
          <StatusBar barStyle="light-content" />
          <AppNavigator />
        </Provider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
