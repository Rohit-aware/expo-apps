/**
 * @file types/navigation.types.ts
 * @description Type-safe navigation param lists for React Navigation.
 */

export type RootStackParamList = {
  BottomTabs: undefined;
  Chat: { conversationId: string };
  NewChat: undefined;
};

export type BottomTabParamList = {
  ConversationsTab: undefined;
  HomeTab: undefined;
  SettingsTab: undefined;
};

export type ConversationsStackParamList = {
  ConversationsList: undefined;
  Chat: { conversationId: string };
};
