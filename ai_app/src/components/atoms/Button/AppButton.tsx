/**
 * @file components/atoms/Button/AppButton.tsx
 */

import React from 'react';
import {
  TouchableOpacity,
  ActivityIndicator,
  type ViewStyle,
  View,
} from 'react-native';
import { useTheme } from '@hooks/useTheme';
import { AppText } from '../Text/AppText';

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger';
type ButtonSize = 'sm' | 'md' | 'lg';

interface AppButtonProps {
  label: string;
  onPress: () => void;
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  style?: ViewStyle;
  leftIcon?: React.ReactNode;
}

export const AppButton: React.FC<AppButtonProps> = ({
  label,
  onPress,
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  fullWidth = false,
  style,
  leftIcon,
}) => {
  const theme = useTheme();
  const isDisabled = disabled || loading;

  const containerStyle: ViewStyle = {
    borderRadius: theme.borderRadius.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    opacity: isDisabled ? 0.5 : 1,
    ...(fullWidth ? { width: '100%' } : { alignSelf: 'flex-start' }),
    ...(size === 'sm'
      ? { paddingVertical: theme.spacing[2], paddingHorizontal: theme.spacing[3] }
      : size === 'lg'
        ? { paddingVertical: theme.spacing[4], paddingHorizontal: theme.spacing[6] }
        : { paddingVertical: theme.spacing[3], paddingHorizontal: theme.spacing[5] }),
    ...(variant === 'primary'
      ? { backgroundColor: theme.colors.accent }
      : variant === 'secondary'
        ? {
          backgroundColor: 'transparent',
          borderWidth: 1,
          borderColor: theme.colors.border,
        }
        : variant === 'danger'
          ? { backgroundColor: theme.colors.error }
          : { backgroundColor: 'transparent' }),
  };

  const labelColor: string =
    variant === 'primary' || variant === 'danger'
      ? '#FFFFFF'
      : variant === 'ghost'
        ? theme.colors.accent
        : theme.colors.textPrimary;

  return (
    <TouchableOpacity
      style={[containerStyle, style]}
      onPress={onPress}
      disabled={isDisabled}
      activeOpacity={0.75}
    >
      {loading ? (
        <ActivityIndicator color={labelColor} size="small" />
      ) : (
        <>
          {leftIcon && <View style={{ marginRight: theme.spacing[2] }}>{leftIcon}</View>}
          <AppText
            variant={size === 'sm' ? 'bodySmall' : 'body'}
            bold
            color={labelColor}
          >
            {label}
          </AppText>
        </>
      )}
    </TouchableOpacity>
  );
};

export default AppButton;
