/**
 * @file screens/Conversations/ConversationsScreen.tsx
 */

import React, { useCallback } from 'react';
import {
  View,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Alert,
  type ListRenderItem,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useAppDispatch, useAppSelector } from '@hooks/useAppStore';
import { useTheme } from '@hooks/useTheme';
import {
  createConversation,
  deleteConversation,
} from '@store/slices/conversationsSlice';
import { AppText } from '@components/atoms/Text/AppText';
import { formatTimestamp } from '@utils/formatters';
import { Conversation, RootStackParamList } from '@/types';
import { SafeAreaView } from 'react-native-safe-area-context';

type Nav = NativeStackNavigationProp<RootStackParamList>;

export const ConversationsScreen: React.FC = () => {
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const navigation = useNavigation<Nav>();

  const ids = useAppSelector((s) => s.conversations.ids);
  const entities = useAppSelector((s) => s.conversations.entities);
  const conversations = ids.map((id) => entities[id]).filter(Boolean) as Conversation[];

  const handleOpen = useCallback(
    (conv: Conversation) => {
      navigation.navigate('Chat', { conversationId: conv.id });
    },
    [navigation],
  );

  const handleDelete = useCallback(
    (id: string) => {
      Alert.alert('Delete Conversation', 'This cannot be undone.', [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => dispatch(deleteConversation(id)),
        },
      ]);
    },
    [dispatch],
  );

  const handleNew = useCallback(() => {
    const action = dispatch(createConversation());
    const convId = (action.payload as { id: string }).id;
    navigation.navigate('Chat', { conversationId: convId });
  }, [dispatch, navigation]);

  const renderItem: ListRenderItem<Conversation> = useCallback(
    ({ item }) => {
      const lastMsg = item.messages[item.messages.length - 1];
      const preview = lastMsg?.content?.slice(0, 80) ?? 'No messages yet';

      return (
        <TouchableOpacity
          style={[
            styles.item,
            { borderBottomColor: theme.colors.borderSubtle },
          ]}
          onPress={() => handleOpen(item)}
          onLongPress={() => handleDelete(item.id)}
          activeOpacity={0.7}
        >
          <View style={styles.itemContent}>
            <View style={styles.itemTop}>
              <AppText variant="label" numberOfLines={1} style={{ flex: 1, marginRight: 8 }}>
                {item.title}
              </AppText>
              <AppText variant="caption" color={theme.colors.textTertiary}>
                {formatTimestamp(item.updatedAt)}
              </AppText>
            </View>
            <AppText
              variant="bodySmall"
              color={theme.colors.textTertiary}
              numberOfLines={2}
              style={{ marginTop: 2 }}
            >
              {preview}
            </AppText>
          </View>
        </TouchableOpacity>
      );
    },
    [theme, handleOpen, handleDelete],
  );

  return (
    <SafeAreaView
      edges={['bottom']}
      style={[styles.root, { backgroundColor: theme.colors.background }]}
    >
      <View
        style={[
          styles.header,
          {
            borderBottomColor: theme.colors.borderSubtle,
            backgroundColor: theme.colors.surface,
          },
        ]}
      >
        <AppText variant="h3">Conversations</AppText>
        <TouchableOpacity onPress={handleNew} activeOpacity={0.7}>
          <AppText variant="body" color={theme.colors.accent} bold>
            + New
          </AppText>
        </TouchableOpacity>
      </View>

      {conversations.length === 0 ? (
        <View style={styles.empty}>
          <AppText variant="body" center color={theme.colors.textTertiary}>
            No conversations yet.{'\n'}Tap "New" to start one.
          </AppText>
        </View>
      ) : (
        <FlatList
          data={conversations}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
        />
      )}
    </SafeAreaView>
  );
};

export default ConversationsScreen;

const styles = StyleSheet.create({
  root: { flex: 1, },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  item: {
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  itemContent: {
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  itemTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  empty: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
});
