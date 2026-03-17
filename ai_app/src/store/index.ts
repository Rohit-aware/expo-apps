/**
 * @file store/index.ts
 * @description Redux store with MMKV persistence middleware.
 */

import { configureStore } from '@reduxjs/toolkit';
import { MMKV } from 'react-native-mmkv';
import { Logger } from '@utils/logger';
import { STORAGE_KEYS } from '@constants/index';
import conversationsReducer from './slices/conversationsSlice';
import settingsReducer from './slices/settingsSlice';

const TAG = 'Store';

// ---------------------------------------------------------------------------
// MMKV storage
// ---------------------------------------------------------------------------

export const storage = new MMKV({ id: 'app-store' });

function loadState<T>(key: string): T | undefined {
  try {
    const json = storage.getString(key);
    return json ? (JSON.parse(json) as T) : undefined;
  } catch (e) {
    Logger.error(TAG, `Failed to load state for key: ${key}`, e);
    return undefined;
  }
}

function saveState<T>(key: string, state: T): void {
  try {
    storage.set(key, JSON.stringify(state));
  } catch (e) {
    Logger.error(TAG, `Failed to save state for key: ${key}`, e);
  }
}

// ---------------------------------------------------------------------------
// Preloaded state
// ---------------------------------------------------------------------------

const preloadedConversations = loadState(STORAGE_KEYS.CONVERSATIONS);
const preloadedSettings = loadState(STORAGE_KEYS.SETTINGS);

// ---------------------------------------------------------------------------
// Store
// ---------------------------------------------------------------------------

export const store = configureStore({
  reducer: {
    conversations: conversationsReducer,
    settings: settingsReducer,
  },
  preloadedState: {
    conversations: preloadedConversations as any,
    settings: preloadedSettings as any,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

// Persist on every state change (throttled)
let persistTimer: ReturnType<typeof setTimeout> | null = null;
store.subscribe(() => {
  if (persistTimer) clearTimeout(persistTimer);
  persistTimer = setTimeout(() => {
    const state = store.getState();
    saveState(STORAGE_KEYS.CONVERSATIONS, state.conversations);
    saveState(STORAGE_KEYS.SETTINGS, state.settings);
  }, 500);
});

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
