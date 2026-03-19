/**
 * @file screens/Home/HomeScreen.tsx
 */

import React, { useCallback } from 'react';
import {
  View,
  StyleSheet,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useAppDispatch } from '@hooks/useAppStore';
import { useTheme } from '@hooks/useTheme';
import { createConversation } from '@store/slices/conversationsSlice';
import { AppText } from '@components/atoms/Text/AppText';
import { AppButton } from '@components/atoms/Button/AppButton';
import { SafeAreaView } from 'react-native-safe-area-context';
import { RootStackParamList } from '@/types';

type Nav = NativeStackNavigationProp<RootStackParamList>;

export const HomeScreen: React.FC = () => {
  const theme = useTheme();
  const navigation = useNavigation<Nav>();
  const dispatch = useAppDispatch();

  const handleNewChat = useCallback(() => {
    const action = dispatch(createConversation());
    const convId = (action.payload as { id: string }).id;
    navigation.navigate('Chat', { conversationId: convId });
  }, [dispatch, navigation]);

  return (
    <SafeAreaView
      style={[styles.root, { backgroundColor: theme.colors.background }]}
    >
      <View style={styles.content}>
        {/* Logo / Brand */}
        <View
          style={[
            styles.logoCircle,
            { backgroundColor: theme.colors.accent },
          ]}
        >
          <AppText
            style={{ fontSize: 40 }}
            color="#fff"
          >
            ✦
          </AppText>
        </View>

        <AppText variant="h1" center style={{ marginTop: theme.spacing[6] }}>
          Ai Chat / Stream
        </AppText>
        <AppText
          variant="body"
          center
          color={theme.colors.textSecondary}
          style={{ marginTop: theme.spacing[2], marginBottom: theme.spacing[8] }}
        >
          AI by Rohit
        </AppText>

        <AppButton
          label="New Conversation"
          onPress={handleNewChat}
          variant="primary"
          size="lg"
          fullWidth
          style={{ borderRadius: theme.borderRadius['2xl'] }}
        />
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: 'space-between',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  logoCircle: {
    width: 88,
    height: 88,
    borderRadius: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
