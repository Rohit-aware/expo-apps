/**
 * @file theme/colors.ts
 * @description Design token colors for light and dark mode.
 */

export const palette = {
  // Brand
  claudeOrange: '#D97757',
  claudeOrangeDark: '#B85E40',
  claudeOrangeLight: '#F0A080',

  // Neutrals
  black: '#0A0A0A',
  gray950: '#111111',
  gray900: '#1A1A1A',
  gray800: '#242424',
  gray700: '#333333',
  gray600: '#555555',
  gray500: '#777777',
  gray400: '#999999',
  gray300: '#BBBBBB',
  gray200: '#DDDDDD',
  gray100: '#F0F0F0',
  gray50: '#F8F8F8',
  white: '#FFFFFF',

  // Semantic
  success: '#22C55E',
  warning: '#F59E0B',
  error: '#EF4444',
  info: '#3B82F6',

  // Chat bubbles
  userBubble: '#D97757',
  assistantBubble: '#242424',
  userBubbleText: '#FFFFFF',
  assistantBubbleText: '#F0F0F0',
} as const;

export type PaletteKey = keyof typeof palette;

// ---------------------------------------------------------------------------
// Semantic tokens
// ---------------------------------------------------------------------------

export const darkColors = {
  background: palette.gray950,
  surface: palette.gray900,
  surfaceElevated: palette.gray800,
  border: palette.gray700,
  borderSubtle: palette.gray800,

  textPrimary: palette.white,
  textSecondary: palette.gray400,
  textTertiary: palette.gray600,
  textDisabled: palette.gray700,

  accent: palette.claudeOrange,
  accentDark: palette.claudeOrangeDark,
  accentLight: palette.claudeOrangeLight,

  error: palette.error,
  success: palette.success,
  warning: palette.warning,

  userBubble: palette.claudeOrange,
  assistantBubble: palette.gray800,
  userBubbleText: palette.white,
  assistantBubbleText: palette.gray100,

  inputBackground: palette.gray800,
  inputBorder: palette.gray700,
  inputBorderFocused: palette.claudeOrange,
} as const;

export const lightColors = {
  background: palette.white,
  surface: palette.gray50,
  surfaceElevated: palette.white,
  border: palette.gray200,
  borderSubtle: palette.gray100,

  textPrimary: palette.gray950,
  textSecondary: palette.gray600,
  textTertiary: palette.gray400,
  textDisabled: palette.gray300,

  accent: palette.claudeOrange,
  accentDark: palette.claudeOrangeDark,
  accentLight: palette.claudeOrangeLight,

  error: palette.error,
  success: palette.success,
  warning: palette.warning,

  userBubble: palette.claudeOrange,
  assistantBubble: palette.gray100,
  userBubbleText: palette.white,
  assistantBubbleText: palette.gray900,

  inputBackground: palette.white,
  inputBorder: palette.gray200,
  inputBorderFocused: palette.claudeOrange,
} as const;

export type ThemeColors = Record<keyof typeof darkColors, string>;
