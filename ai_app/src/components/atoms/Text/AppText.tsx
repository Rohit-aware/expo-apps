/**
 * @file components/atoms/Text/AppText.tsx
 */

import React from 'react';
import {
  Text,
  type TextProps,
  type TextStyle,
} from 'react-native';
import { useTheme } from '@hooks/useTheme';

type Variant =
  | 'h1'
  | 'h2'
  | 'h3'
  | 'body'
  | 'bodySmall'
  | 'caption'
  | 'label'
  | 'mono';

interface AppTextProps extends TextProps {
  variant?: Variant;
  color?: string;
  bold?: boolean;
  center?: boolean;
}

export const AppText: React.FC<AppTextProps> = ({
  variant = 'body',
  color,
  bold,
  center,
  style,
  children,
  ...rest
}) => {
  const theme = useTheme();

  const variantStyle: TextStyle = (() => {
    switch (variant) {
      case 'h1':
        return {
          fontSize: theme.fontSize['3xl'],
          fontFamily: theme.fontFamily.sansBold,
          fontWeight: theme.fontWeight.bold,
          color: theme.colors.textPrimary,
          lineHeight: theme.fontSize['3xl'] * theme.lineHeight.tight,
        };
      case 'h2':
        return {
          fontSize: theme.fontSize['2xl'],
          fontFamily: theme.fontFamily.sansBold,
          fontWeight: theme.fontWeight.bold,
          color: theme.colors.textPrimary,
          lineHeight: theme.fontSize['2xl'] * theme.lineHeight.snug,
        };
      case 'h3':
        return {
          fontSize: theme.fontSize.xl,
          fontFamily: theme.fontFamily.sansMedium,
          fontWeight: theme.fontWeight.semibold,
          color: theme.colors.textPrimary,
        };
      case 'bodySmall':
        return {
          fontSize: theme.fontSize.sm,
          fontFamily: theme.fontFamily.sans,
          color: theme.colors.textSecondary,
          lineHeight: theme.fontSize.sm * theme.lineHeight.relaxed,
        };
      case 'caption':
        return {
          fontSize: theme.fontSize.xs,
          fontFamily: theme.fontFamily.sans,
          color: theme.colors.textTertiary,
        };
      case 'label':
        return {
          fontSize: theme.fontSize.sm,
          fontFamily: theme.fontFamily.sansMedium,
          fontWeight: theme.fontWeight.medium,
          color: theme.colors.textPrimary,
        };
      case 'mono':
        return {
          fontSize: theme.fontSize.sm,
          fontFamily: theme.fontFamily.mono,
          color: theme.colors.textSecondary,
        };
      default: // body
        return {
          fontSize: theme.fontSize.base,
          fontFamily: theme.fontFamily.sans,
          color: theme.colors.textPrimary,
          lineHeight: theme.fontSize.base * theme.lineHeight.relaxed,
        };
    }
  })();

  return (
    <Text
      style={[
        variantStyle,
        bold ? { fontWeight: theme.fontWeight.bold } : undefined,
        center ? { textAlign: 'center' } : undefined,
        color ? { color } : undefined,
        style,
      ]}
      {...rest}
    >
      {children}
    </Text>
  );
};

export default AppText;
