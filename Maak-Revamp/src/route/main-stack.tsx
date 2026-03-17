import React from 'react';
import { screens } from '../screens';
import BottomTab from './bottom-tab';
import { navigationRef } from '../ref';
import { MainStackParamList } from './interface';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator<MainStackParamList>();

const MainStack = () => {
    return (
        <NavigationContainer ref={navigationRef}>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name='BottomTab' component={BottomTab} />
                <Stack.Screen name='Login' getComponent={screens['Login']} />
                <Stack.Screen name='Register' getComponent={screens['Register']} />
                <Stack.Screen name='MyBooking' getComponent={screens['MyBooking']} />
                <Stack.Screen name='Editprofile' getComponent={screens['Editprofile']} />
                <Stack.Screen name='ForgotPassword' getComponent={screens['ForgotPassword']} />
                <Stack.Screen name='MerchantBooking' getComponent={screens['MerchantBooking']} />
                <Stack.Screen name='MerchantPayment' getComponent={screens['MerchantPayment']} />
                <Stack.Screen name='MerchBookingDetails' getComponent={screens['MerchBookingDetails']} />
                <Stack.Screen name='GlobaSearch' getComponent={screens['GlobaSearch']} options={{ animation: 'slide_from_bottom' }} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default MainStack;