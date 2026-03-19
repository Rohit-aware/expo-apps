/**
 * @file screens/Chat/ChatScreen.tsx
 */

import React, { useCallback, useLayoutEffect } from 'react';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useAppSelector } from '@hooks/useAppStore';
import { useChat } from '@hooks/useChat';
import { useTheme } from '@hooks/useTheme';
import { ChatContainer } from '@components/organisms/ChatContainer/ChatContainer';
import { ProviderDropdown } from '@components/atoms/ProviderDropdown/ProviderDropdown';
import { RootStackParamList } from '@/types';
import { KeyboardProvider } from 'react-native-keyboard-controller';
import { SafeAreaView } from 'react-native-safe-area-context';

type Props = NativeStackScreenProps<RootStackParamList, 'Chat'>;

export const ChatScreen: React.FC<Props> = ({ route, navigation }) => {
  const { conversationId } = route.params;
  const theme = useTheme();
  const { isLoading, error, sendMessage, abortStream, clearError } = useChat();

  const conversation = useAppSelector(
    (s) => s.conversations.entities[conversationId],
  );

  // Set header title from conversation
  useLayoutEffect(() => {
    navigation.setOptions({
      title: conversation?.title ?? 'Chat',
      headerStyle: { backgroundColor: theme.colors.surface },
      headerTintColor: theme.colors.textPrimary,
      headerTitleStyle: {
        fontFamily: theme.fontFamily.sansMedium,
        fontSize: theme.fontSize.md,
        color: theme.colors.textPrimary,
      },
      headerRight: () => (
        <ProviderDropdown
          conversationId={conversationId}
          currentProvider={conversation?.provider ?? 'openai'}
        />
      ),
    });
  }, [navigation, conversation?.title, conversation?.provider, conversationId, theme]);

  const handleSend = useCallback(
    (content: string) => {
      clearError();
      sendMessage(content, conversationId);
    },
    [sendMessage, conversationId, clearError],
  );

  if (!conversation) {
    return null;
  }

  return (
    <SafeAreaView
      edges={['bottom', 'top']}
      style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <KeyboardProvider enabled navigationBarTranslucent statusBarTranslucent preload preserveEdgeToEdge>
        <ChatContainer
          messages={conversation.messages}
          isLoading={isLoading}
          error={error}
          onSend={handleSend}
          onAbort={abortStream}
          conversationId={conversationId}
        />
      </KeyboardProvider>
    </SafeAreaView>
  );
};

export default ChatScreen;
