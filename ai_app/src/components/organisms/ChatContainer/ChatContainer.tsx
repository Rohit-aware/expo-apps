/**
 * @file components/organisms/ChatContainer/ChatContainer.tsx
 * @description Full chat UI: virtualized message list + input bar.
 */

import React, { useCallback, useEffect, useRef, memo } from 'react';
import { FlatList, View, StyleSheet, type ListRenderItem, } from 'react-native';
import { useTheme } from '@hooks/useTheme';
import { MessageBubble } from '@components/molecules/MessageBubble/MessageBubble';
import { ChatInput } from '@components/molecules/ChatInput/ChatInput';
import { AppText } from '@components/atoms/Text/AppText';
import { Message } from '@/types';
import { SafeAreaView } from 'react-native-safe-area-context';

interface ChatContainerProps {
  messages: Message[];
  isLoading: boolean;
  error: string | null;
  onSend: (content: string) => void;
  onAbort?: () => void;
  conversationId: string;
}

export const ChatContainer: React.FC<ChatContainerProps> = memo(
  ({ messages, isLoading, error, onSend, onAbort }) => {
    const theme = useTheme();
    const listRef = useRef<FlatList<Message>>(null);

    // Auto-scroll to bottom when messages change
    useEffect(() => {
      if (messages.length > 0) {
        setTimeout(() => {
          listRef.current?.scrollToEnd({ animated: true });
        }, 80);
      }
    }, [messages.length, messages[messages.length - 1]?.content]);

    const renderItem: ListRenderItem<Message> = useCallback(
      ({ item }) => <MessageBubble message={item} />,
      [],
    );

    const keyExtractor = useCallback((item: Message) => item.id, []);

    const EmptyComponent = (
      <View style={styles.emptyContainer}>
        <AppText
          variant="h3"
          center
          color={theme.colors.textSecondary}
          style={{ marginBottom: theme.spacing[2] }}
        >
          Good to see you.
        </AppText>
        <AppText variant="body" center color={theme.colors.textTertiary}>
          Start a conversation with Claude.
        </AppText>
      </View>
    );

    return (
      <SafeAreaView
        style={[styles.container, { backgroundColor: theme.colors.background }]}
      >
        <FlatList
          ref={listRef}
          data={messages}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          ListEmptyComponent={EmptyComponent}
          contentContainerStyle={[
            styles.listContent,
            messages.length === 0 && styles.emptyListContent,
          ]}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          removeClippedSubviews
          maxToRenderPerBatch={10}
          windowSize={10}
          initialNumToRender={20}
        />

        {/* Error banner */}
        {error && (
          <View
            style={[
              styles.errorBanner,
              { backgroundColor: `${theme.colors.error}22` },
            ]}
          >
            <AppText variant="bodySmall" color={theme.colors.error}>
              {error}
            </AppText>
          </View>
        )}

        <ChatInput
          onSend={onSend}
          onAbort={onAbort}
          isLoading={isLoading}
        />
      </SafeAreaView>
    );
  },
);

ChatContainer.displayName = 'ChatContainer';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContent: {
    paddingTop: 16,
    paddingBottom: 8,
  },
  emptyListContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyContainer: {
    paddingHorizontal: 32,
    alignItems: 'center',
  },
  errorBanner: {
    marginHorizontal: 16,
    marginBottom: 8,
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
});
