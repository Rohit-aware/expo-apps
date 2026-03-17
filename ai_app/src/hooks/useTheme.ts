/**
 * @file hooks/useTheme.ts
 * @description Returns the active AppTheme based on user + system preference.
 */

import { useColorScheme } from 'react-native';
import { useAppSelector } from './useAppStore';
import { buildTheme, type AppTheme } from '@theme/index';

export function useTheme(): AppTheme {
  const userPref = useAppSelector((s) => s.settings.theme);
  const systemScheme = useColorScheme();

  const isDark =
    userPref === 'dark'
      ? true
      : userPref === 'light'
      ? false
      : systemScheme === 'dark';

  return buildTheme(isDark);
}
