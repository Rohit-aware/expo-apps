/**
 * @file components/molecules/ChatInput/ChatInput.tsx
 */

import React, { useState, useRef, useCallback, memo } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Platform,
  Keyboard,
} from 'react-native';
import { useTheme } from '@hooks/useTheme';
import { MAX_MESSAGE_LENGTH } from '@constants/index';
import { AppText } from '@components/atoms/Text/AppText';

interface ChatInputProps {
  onSend: (content: string) => void;
  onAbort?: () => void;
  isLoading: boolean;
  placeholder?: string;
  disabled?: boolean;
}

export const ChatInput: React.FC<ChatInputProps> = memo(
  ({ onSend, onAbort, isLoading, placeholder = 'Message Assistant…', disabled }) => {
    const theme = useTheme();
    const [text, setText] = useState('');
    const inputRef = useRef<TextInput>(null);
    const canSend = text.trim().length > 0 && !disabled;

    const handleSend = useCallback(() => {
      const trimmed = text.trim();
      if (!trimmed || isLoading) return;
      onSend(trimmed);
      setText('');
      Keyboard.dismiss();
    }, [text, isLoading, onSend]);

    const handleAbort = useCallback(() => {
      onAbort?.();
    }, [onAbort]);

    const charCount = text.length;
    const isNearLimit = charCount > MAX_MESSAGE_LENGTH * 0.85;
    const overLimit = charCount > MAX_MESSAGE_LENGTH;

    return (
      <View
        style={[
          styles.wrapper,
          {
            backgroundColor: theme.colors.surface,
            borderTopColor: theme.colors.borderSubtle,
          },
        ]}
      >
        <View
          style={[
            styles.inputRow,
            {
              backgroundColor: theme.colors.inputBackground,
              borderColor: theme.colors.inputBorder,
              borderRadius: theme.borderRadius.xl,
            },
          ]}
        >
          <TextInput
            ref={inputRef}
            value={text}
            onChangeText={setText}
            placeholder={placeholder}
            placeholderTextColor={theme.colors.textTertiary}
            multiline
            maxLength={MAX_MESSAGE_LENGTH + 50}
            style={[
              styles.input,
              {
                color: theme.colors.textPrimary,
                fontFamily: theme.fontFamily.sans,
                fontSize: theme.fontSize.base,
              },
            ]}
            returnKeyType="default"
            blurOnSubmit={false}
            editable={!isLoading && !disabled}
          />

          {/* Char counter */}
          {isNearLimit && (
            <AppText
              variant="caption"
              color={overLimit ? theme.colors.error : theme.colors.textTertiary}
              style={styles.counter}
            >
              {MAX_MESSAGE_LENGTH - charCount}
            </AppText>
          )}

          {/* Send / Abort button */}
          <TouchableOpacity
            style={[
              styles.sendBtn,
              {
                backgroundColor:
                  isLoading
                    ? theme.colors.error
                    : canSend
                      ? theme.colors.accent
                      : theme.colors.surfaceElevated,
              },
            ]}
            onPress={isLoading ? handleAbort : handleSend}
            disabled={!isLoading && (!canSend || overLimit)}
            activeOpacity={0.75}
          >
            {isLoading ? (
              <AppText variant="caption" bold color="#fff">■</AppText>
            ) : (
              <AppText
                variant="caption"
                bold
                color={canSend ? '#fff' : theme.colors.textDisabled}
              >
                send
              </AppText>
            )}
          </TouchableOpacity>
        </View>
      </View>
    );
  },
);

ChatInput.displayName = 'ChatInput';

const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: 12,
    paddingTop: 10,
    paddingBottom: Platform.OS === 'ios' ? 28 : 12,
    borderTopWidth: StyleSheet.hairlineWidth,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    borderWidth: 1,
    paddingLeft: 14,
    paddingRight: 6,
    paddingVertical: 8,
    minHeight: 48,
  },
  input: {
    flex: 1,
    maxHeight: 140,
    paddingTop: Platform.OS === 'ios' ? 6 : 4,
    paddingBottom: Platform.OS === 'ios' ? 6 : 4,
    lineHeight: 22,
  },
  counter: {
    alignSelf: 'flex-end',
    marginHorizontal: 6,
    marginBottom: 8,
  },
  sendBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 2,
    marginLeft: 4,
  },
});
