import { tokenCache } from '@/utils/cache';
import { ClerkLoaded, ClerkProvider } from '@clerk/clerk-expo';
import { passkeys } from '@clerk/expo-passkeys';
import { DarkTheme, ThemeProvider } from '@react-navigation/native';
import { Slot } from 'expo-router';
import React from 'react';


export default function RootLayout() {
    const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;
    if (!publishableKey) {
        throw new Error('Missing Publishing key')
    }
    return (
        <ClerkProvider
            publishableKey={publishableKey}
            tokenCache={tokenCache}
            __experimental_passkeys={passkeys}
            signUpFallbackRedirectUrl="/"
            signInFallbackRedirectUrl="/"
        >
            <ClerkLoaded>
                <ThemeProvider value={DarkTheme}>
                    <Slot />
                </ThemeProvider>
            </ClerkLoaded>
        </ClerkProvider>
    )
}