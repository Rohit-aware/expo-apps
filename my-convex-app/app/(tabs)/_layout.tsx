import { ConvexProvider, ConvexReactClient } from 'convex/react';
import { Tabs } from "expo-router";

const convex = new ConvexReactClient(
  process.env.EXPO_PUBLIC_CONVEX_URL!,
  { unsavedChangesWarning: false }
);

export default function RootLayout() {
  return (
    <ConvexProvider client={convex}>
      <Tabs />
    </ConvexProvider>
  );
}