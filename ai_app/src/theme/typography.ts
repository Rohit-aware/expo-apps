/**
 * @file theme/typography.ts
 */
import { Platform } from 'react-native';

export const fontFamily = {
  regular: Platform.select({ ios: 'Georgia', android: 'serif' }) ?? 'serif',
  mono: Platform.select({ ios: 'Menlo', android: 'monospace' }) ?? 'monospace',
  sans: Platform.select({ ios: 'SF Pro Text', android: 'sans-serif' }) ?? 'sans-serif',
  sansMedium: Platform.select({ ios: 'SF Pro Text', android: 'sans-serif-medium' }) ?? 'sans-serif',
  sansBold: Platform.select({ ios: 'SF Pro Display', android: 'sans-serif-condensed' }) ?? 'sans-serif',
};

export const fontSize = {
  xs: 11,
  sm: 13,
  base: 15,
  md: 16,
  lg: 18,
  xl: 20,
  '2xl': 24,
  '3xl': 28,
  '4xl': 34,
} as const;

export const lineHeight = {
  tight: 1.2,
  snug: 1.375,
  normal: 1.5,
  relaxed: 1.625,
  loose: 2,
} as const;

export const fontWeight = {
  normal: '400' as const,
  medium: '500' as const,
  semibold: '600' as const,
  bold: '700' as const,
};
