/**
 * @file screens/Settings/SettingsScreen.tsx
 */

import React, { useCallback } from 'react';
import {
  View,
  ScrollView,
  Switch,
  StyleSheet,
  Alert,
} from 'react-native';
import { useAppDispatch, useAppSelector } from '@hooks/useAppStore';
import { useTheme } from '@hooks/useTheme';
import { updateAISettings } from '@store/slices/settingsSlice';
import { clearAllConversations } from '@store/slices/conversationsSlice';
import { AppText } from '@components/atoms/Text/AppText';
import { AppButton } from '@components/atoms/Button/AppButton';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ENV } from '@/config/env';

const MODELS = [
  'claude-opus-4-5',
  'claude-sonnet-4-20250514',
  'claude-haiku-4-5',
] as const;

export const SettingsScreen: React.FC = () => {
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const aiSettings = useAppSelector((s) => s.settings.ai);
  const themeMode = useAppSelector((s) => s.settings.theme);

  const handleClearAll = useCallback(() => {
    Alert.alert('Clear All Conversations', 'This will delete everything.', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Clear',
        style: 'destructive',
        onPress: () => dispatch(clearAllConversations()),
      },
    ]);
  }, [dispatch]);

  const Section: React.FC<{ title: string; children: React.ReactNode }> = ({
    title,
    children,
  }) => (
    <View style={{ marginBottom: theme.spacing[6] }}>
      <AppText
        variant="caption"
        color={theme.colors.textTertiary}
        style={{
          textTransform: 'uppercase',
          letterSpacing: 0.8,
          marginBottom: theme.spacing[2],
          marginLeft: theme.spacing[1],
        }}
      >
        {title}
      </AppText>
      <View
        style={[
          styles.card,
          {
            backgroundColor: theme.colors.surface,
            borderColor: theme.colors.borderSubtle,
          },
        ]}
      >
        {children}
      </View>
    </View>
  );

  const Row: React.FC<{
    label: string;
    value?: string;
    right?: React.ReactNode;
  }> = ({ label, value, right }) => (
    <View
      style={[
        styles.row,
        { borderBottomColor: theme.colors.borderSubtle },
      ]}
    >
      <AppText variant="body" style={{ flex: 1 }}>
        {label}
      </AppText>
      {value ? (
        <AppText variant="bodySmall" color={theme.colors.textTertiary}>
          {value}
        </AppText>
      ) : null}
      {right}
    </View>
  );

  return (
    <SafeAreaView
      style={[styles.root, { backgroundColor: theme.colors.background }]}
    >
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <AppText
          variant="h2"
          style={{ marginBottom: theme.spacing[6] }}
        >
          Settings
        </AppText>

        {/* Model */}
        <Section title="AI Model">
          {MODELS.map((m) => (
            <Row
              key={m}
              label={m}
              right={
                <View
                  style={[
                    styles.radio,
                    {
                      borderColor: theme.colors.accent,
                      backgroundColor:
                        aiSettings.model === m
                          ? theme.colors.accent
                          : 'transparent',
                    },
                  ]}
                />
              }
            />
          ))}
        </Section>

        {/* Streaming */}
        <Section title="Performance">
          <Row
            label="Streaming responses"
            right={
              <Switch
                value={aiSettings.streamingEnabled}
                onValueChange={(v) => {
                  dispatch(updateAISettings({ streamingEnabled: v }));
                }}
                trackColor={{
                  true: theme.colors.accent,
                  false: theme.colors.border,
                }}
              />
            }
          />
        </Section>

        {/* Theme */}
        <Section title="Appearance">
          {(['dark', 'light', 'system'] as const).map((t) => (
            <Row
              key={t}
              label={t.charAt(0).toUpperCase() + t.slice(1)}
              right={
                <View
                  style={[
                    styles.radio,
                    {
                      borderColor: theme.colors.accent,
                      backgroundColor:
                        themeMode === t
                          ? theme.colors.accent
                          : 'transparent',
                    },
                  ]}
                />
              }
            />
          ))}
        </Section>

        {/* API Info */}
        <Section title="API">
          <Row label="Environment" value={ENV.APP_ENV} />
        </Section>

        {/* Danger zone */}
        <Section title="Data">
          <View style={{ padding: 16 }}>
            <AppButton
              label="Clear All Conversations"
              onPress={handleClearAll}
              variant="danger"
              fullWidth
            />
          </View>
        </Section>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({
  root: { flex: 1 },
  content: { padding: 20 },
  card: {
    borderRadius: 12,
    borderWidth: StyleSheet.hairlineWidth,
    overflow: 'hidden',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  radio: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 2,
  },
});
