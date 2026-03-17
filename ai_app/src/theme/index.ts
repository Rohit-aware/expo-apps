/**
 * @file theme/index.ts
 */
export * from './colors';
export * from './typography';
export * from './spacing';

import { darkColors, lightColors, type ThemeColors } from './colors';
import { fontFamily, fontSize, lineHeight, fontWeight } from './typography';
import { spacing, borderRadius } from './spacing';

export interface AppTheme {
  colors: ThemeColors;
  fontFamily: typeof fontFamily;
  fontSize: typeof fontSize;
  lineHeight: typeof lineHeight;
  fontWeight: typeof fontWeight;
  spacing: typeof spacing;
  borderRadius: typeof borderRadius;
  isDark: boolean;
}

export function buildTheme(isDark: boolean): AppTheme {
  return {
    colors: isDark ? darkColors : lightColors,
    fontFamily,
    fontSize,
    lineHeight,
    fontWeight,
    spacing,
    borderRadius,
    isDark,
  };
}

export const darkTheme = buildTheme(true);
export const lightTheme = buildTheme(false);
