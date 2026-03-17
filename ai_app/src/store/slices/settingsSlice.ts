/**
 * @file store/slices/settingsSlice.ts
 */

import { AISettings, DEFAULT_AI_SETTINGS } from '@/types';
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export interface SettingsState {
  ai: AISettings;
  theme: 'dark' | 'light' | 'system';
  hapticFeedback: boolean;
}

const initialState: SettingsState = {
  ai: DEFAULT_AI_SETTINGS,
  theme: 'light',
  hapticFeedback: true,
};

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    updateAISettings(state, action: PayloadAction<Partial<AISettings>>) {
      state.ai = { ...state.ai, ...action.payload };
    },
    setTheme(state, action: PayloadAction<SettingsState['theme']>) {
      state.theme = action.payload;
    },
    setHapticFeedback(state, action: PayloadAction<boolean>) {
      state.hapticFeedback = action.payload;
    },
    resetSettings() {
      return initialState;
    },
  },
});

export const { updateAISettings, setTheme, setHapticFeedback, resetSettings } =
  settingsSlice.actions;
export default settingsSlice.reducer;
