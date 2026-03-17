/**
 * @file components/molecules/MessageBubble/MessageBubble.tsx
 */

import React, { memo } from 'react';
import {
  View,
  StyleSheet,
  ActivityIndicator,
  type ViewStyle,
} from 'react-native';
import { useTheme } from '@hooks/useTheme';
import { AppText } from '@components/atoms/Text/AppText';
import { formatTimestamp } from '@utils/formatters';
import type { Message } from '@/types';

interface MessageBubbleProps {
  message: Message;
}

export const MessageBubble: React.FC<MessageBubbleProps> = memo(
  ({ message }) => {
    const theme = useTheme();
    const isUser = message.role === 'user';
    const isStreaming = message.status === 'streaming';
    const isError = message.status === 'error';

    const bubbleStyle: ViewStyle = {
      maxWidth: '82%',
      borderRadius: theme.borderRadius.lg,
      paddingVertical: theme.spacing[3],
      paddingHorizontal: theme.spacing[4],
      backgroundColor: isUser
        ? theme.colors.userBubble
        : isError
        ? `${theme.colors.error}22`
        : theme.colors.assistantBubble,
      ...(isUser
        ? { borderBottomRightRadius: theme.borderRadius.sm }
        : { borderBottomLeftRadius: theme.borderRadius.sm }),
    };

    const textColor = isUser
      ? theme.colors.userBubbleText
      : isError
      ? theme.colors.error
      : theme.colors.assistantBubbleText;

    return (
      <View
        style={[
          styles.row,
          isUser ? styles.rowUser : styles.rowAssistant,
        ]}
      >
        {/* Avatar for assistant */}
        {!isUser && (
          <View
            style={[
              styles.avatar,
              { backgroundColor: theme.colors.accent, marginRight: theme.spacing[2] },
            ]}
          >
            <AppText variant="caption" bold color="#fff">
              C
            </AppText>
          </View>
        )}

        <View style={{ flex: 1, alignItems: isUser ? 'flex-end' : 'flex-start' }}>
          <View style={bubbleStyle}>
            {isStreaming && message.content === '' ? (
              <ActivityIndicator
                size="small"
                color={theme.colors.accent}
              />
            ) : (
              <AppText
                variant="body"
                color={textColor}
                selectable
              >
                {isError ? (message.error ?? 'An error occurred.') : message.content}
                {isStreaming ? (
                  <AppText color={theme.colors.accent}> ▊</AppText>
                ) : null}
              </AppText>
            )}
          </View>
          <AppText
            variant="caption"
            style={{ marginTop: theme.spacing[1], marginHorizontal: theme.spacing[1] }}
          >
            {formatTimestamp(message.createdAt)}
          </AppText>
        </View>
      </View>
    );
  },
);

MessageBubble.displayName = 'MessageBubble';

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    marginVertical: 6,
    paddingHorizontal: 12,
  },
  rowUser: {
    justifyContent: 'flex-end',
  },
  rowAssistant: {
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
  },
  avatar: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default MessageBubble;
