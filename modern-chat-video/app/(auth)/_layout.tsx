import { useAuth } from '@clerk/clerk-expo';
import { Redirect, Stack } from 'expo-router';
import React from 'react';

export default function RootLayout() {
  const { isSignedIn } = useAuth();

  if (isSignedIn) {
    return <Redirect href="/(chat)" />;
  }
  return (
    <Stack>
      <Stack.Screen name='index' options={{
        headerShown: false
      }} />
    </Stack>
  )
}