import React, { memo } from 'react';
import {
  View,
  StyleSheet,
  type ViewStyle,
} from 'react-native';
import { useTheme } from '@hooks/useTheme';
import { AppText } from '@components/atoms/Text/AppText';
import { formatTimestamp } from '@utils/formatters';
import type { Message } from '@/types';
import Markdown from 'react-native-markdown-display';
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
      maxWidth: '85%',
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

    // 🔥 Append cursor directly (NO nested Text)
    const displayText = isError
      ? (message.error ?? 'An error occurred.')
      : isStreaming
        ? message.content
        : message.content;

    return (
      <View
        style={[
          styles.row,
          isUser ? styles.rowUser : styles.rowAssistant,
        ]}
      >
        {!isUser && (
          <View
            style={[
              styles.avatar,
              {
                backgroundColor: theme.colors.accent,
                marginRight: theme.spacing[2],
              },
            ]}
          >
            <AppText variant="caption" bold color="#fff">
              Ai
            </AppText>
          </View>
        )}

        <View
          style={{
            flex: 1,
            alignItems: isUser ? 'flex-end' : 'flex-start',
          }}
        >
          <View style={bubbleStyle}>
            {/* {isStreaming && message.content === '' && showLoader ? (
              <ActivityIndicator size="small" color={theme.colors.accent} />
            ) : ( */}
            <Markdown
              style={{
                body: {
                  fontSize: theme.fontSize.base,
                  fontFamily: theme.fontFamily.sans,
                  color: textColor,
                  lineHeight: theme.fontSize.base * theme.lineHeight.relaxed,
                }
              }}
            >
              {displayText}
            </Markdown>
            {/* )} */}
          </View>

          <AppText
            variant="caption"
            style={{
              marginTop: theme.spacing[1],
              marginHorizontal: theme.spacing[1],
            }}
          >
            {formatTimestamp(message.createdAt)}
          </AppText>
        </View>
      </View>
    );
  },
  (prev, next) => {
    return (
      prev.message.content === next.message.content &&
      prev.message.status === next.message.status &&
      prev.message.error === next.message.error
    );
  }
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