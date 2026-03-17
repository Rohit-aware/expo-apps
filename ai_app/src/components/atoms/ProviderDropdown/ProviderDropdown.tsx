/**
 * @file components/atoms/ProviderDropdown/ProviderDropdown.tsx
 *
 * A compact, theme-aware pill button displayed in the ChatScreen header.
 * Allows the user to switch the AI provider for the current conversation.
 */

import React, { useMemo, useState } from 'react';
import { Modal, StyleSheet, TouchableOpacity, View, Pressable } from 'react-native';
import { useTheme } from '@hooks/useTheme';
import { AppText } from '@components/atoms/Text/AppText';
import { aiService, type AIProviderType } from '@features/ai';
import { useAppDispatch } from '@hooks/useAppStore';
import { updateConversationProvider } from '@store/slices/conversationsSlice';

interface ProviderDropdownProps {
  conversationId: string;
  currentProvider: AIProviderType;
}

export const ProviderDropdown: React.FC<ProviderDropdownProps> = ({
  conversationId,
  currentProvider,
}) => {
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const [modalVisible, setModalVisible] = useState(false);

  // Fetch all registered providers to build the menu
  const providers = useMemo(() => aiService.getAllProviders(), []);
  
  const currentProviderMeta = useMemo(
    () => providers.find((p) => p.meta.id === currentProvider)?.meta,
    [providers, currentProvider],
  );

  const handleSelect = (providerId: AIProviderType) => {
    dispatch(
      updateConversationProvider({
        id: conversationId,
        provider: providerId,
      }),
    );
    setModalVisible(false);
  };

  return (
    <>
      <TouchableOpacity
        style={[styles.pill, { backgroundColor: theme.colors.surfaceElevated }]}
        onPress={() => setModalVisible(true)}
        activeOpacity={0.7}
      >
        <AppText
          variant="label"
          style={{ color: theme.colors.textPrimary, fontWeight: '500' }}
        >
          {currentProviderMeta?.displayName ?? 'Select AI'}
        </AppText>
        <AppText variant="label" style={{ color: theme.colors.textTertiary, marginLeft: 4 }}>
          ▼
        </AppText>
      </TouchableOpacity>

      <Modal
        visible={modalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <Pressable
          style={styles.modalOverlay}
          onPress={() => setModalVisible(false)}
        >
          <View
            style={[styles.modalContent, { backgroundColor: theme.colors.surface }]}
          >
            <AppText
              variant="h3"
              style={{ marginBottom: 12, color: theme.colors.textPrimary }}
            >
              Choose AI Provider
            </AppText>
            
            {providers.map((provider) => {
              const isSelected = provider.meta.id === currentProvider;
              return (
                <TouchableOpacity
                  key={provider.meta.id}
                  style={[
                    styles.optionRow,
                    isSelected && { backgroundColor: theme.colors.surfaceElevated },
                  ]}
                  onPress={() => handleSelect(provider.meta.id)}
                >
                  <AppText
                    variant="body"
                    style={{
                      color: isSelected ? theme.colors.textPrimary : theme.colors.textSecondary,
                      fontWeight: isSelected ? '600' : '400',
                    }}
                  >
                    {provider.meta.displayName}
                  </AppText>
                  {isSelected && (
                    <AppText style={{ color: theme.colors.accent }}>✓</AppText>
                  )}
                </TouchableOpacity>
              );
            })}
          </View>
        </Pressable>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  pill: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(150, 150, 150, 0.2)',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  modalContent: {
    width: '100%',
    maxWidth: 320,
    borderRadius: 16,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 8,
  },
  optionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginVertical: 4,
  },
});
