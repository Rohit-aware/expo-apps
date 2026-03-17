# RNClaudeAI — Enterprise React Native AI App

## Documentation

> **React Native (Bare CLI) · TypeScript (strict) · Redux Toolkit · Anthropic Claude API**

---

## Table of Contents

1. [Overview](#1-overview)
2. [Architecture Decisions](#2-architecture-decisions)
3. [Folder Structure](#3-folder-structure)
4. [Setup Guide](#4-setup-guide)
5. [Environment Variables](#5-environment-variables)
6. [Layer-by-Layer Walkthrough](#6-layer-by-layer-walkthrough)
7. [API Key — How It Works](#7-api-key--how-it-works)
8. [Streaming vs Non-Streaming](#8-streaming-vs-non-streaming)
9. [State Management](#9-state-management)
10. [Adding Features](#10-adding-features)
11. [Troubleshooting](#11-troubleshooting)
12. [Dependencies](#12-dependencies)

---

## 1. Overview

This codebase is a **production-grade React Native AI chat application** integrated with the Anthropic Claude API. It is written entirely in TypeScript (strict mode), follows a clean enterprise folder structure, and is designed to be dropped into any existing bare React Native project.

Key capabilities:
- Real-time **streaming responses** from Claude (SSE / Server-Sent Events)
- **Non-streaming** fallback mode
- Full **conversation history** with persistence via MMKV
- Type-safe **Redux** state management
- **Dark/Light/System** theme engine
- Zod-validated **environment configuration** (crashes early if API key is missing)
- Retry logic, error normalization, and abort support

---

## 2. Architecture Decisions

### Why Bare CLI (not Expo)?
Bare CLI gives full native module access — required for MMKV (fastest storage), gesture handler, and future biometric / push notification features. Expo managed workflow restricts native modules.

### Why Redux Toolkit?
Conversations have complex, nested state (messages within conversations). RTK provides:
- `createSlice` for concise reducer + action authoring
- `immer` (built-in) for safe mutable draft writes
- Predictable state shape for MMKV serialization

### Why MMKV over AsyncStorage?
MMKV is a synchronous, C++ key-value store. It is ~30× faster than AsyncStorage and does not require `await` for reads — critical for preloading conversation history before first render.

### Why Zod for environment validation?
Without validation, a missing API key causes a cryptic 401 error deep in an API call. Zod validates at app startup and throws a descriptive error message immediately.

### Why streaming via `fetch` instead of Axios?
Axios in React Native does not support `ReadableStream` on the response body. The Fetch API (available natively in RN 0.71+) supports `response.body.getReader()` for SSE streaming.

---

## 3. Folder Structure

```
src/
├── api/
│   ├── anthropic/
│   │   └── AnthropicClient.ts       # REST + streaming Anthropic API client
│   └── base/
│       └── BaseApiClient.ts         # Axios base: retry, timeout, error normalization
│
├── components/
│   ├── atoms/                        # Primitive, reusable UI elements
│   │   ├── Button/AppButton.tsx
│   │   └── Text/AppText.tsx
│   ├── molecules/                    # Composed from atoms
│   │   ├── ChatInput/ChatInput.tsx
│   │   └── MessageBubble/MessageBubble.tsx
│   └── organisms/                    # Full feature sections
│       └── ChatContainer/ChatContainer.tsx
│
├── config/
│   └── env.ts                        # Zod-validated environment config (single source of truth)
│
├── constants/
│   └── index.ts                      # App-wide magic-value-free constants
│
├── hooks/
│   ├── useAppStore.ts                # Typed useDispatch / useSelector
│   ├── useChat.ts                    # Core hook: send message, stream, abort
│   └── useTheme.ts                   # Returns active AppTheme (dark/light/system)
│
├── navigation/
│   └── AppNavigator.tsx              # Bottom tabs + native stack navigator
│
├── screens/
│   ├── Chat/ChatScreen.tsx
│   ├── Conversations/ConversationsScreen.tsx
│   ├── Home/HomeScreen.tsx
│   └── Settings/SettingsScreen.tsx
│
├── services/
│   └── ai/
│       └── AIService.ts              # Orchestration: domain messages → API request
│
├── store/
│   ├── index.ts                      # Store config, MMKV persistence
│   └── slices/
│       ├── conversationsSlice.ts     # Conversations + messages state
│       └── settingsSlice.ts          # User preferences
│
├── theme/
│   ├── colors.ts                     # Design tokens: palette + semantic colors
│   ├── spacing.ts                    # 8pt grid spacing + border radius
│   ├── typography.ts                 # Font families, sizes, weights
│   └── index.ts                      # buildTheme() factory
│
├── types/
│   ├── api.types.ts                  # Anthropic API types (request, response, streaming)
│   ├── chat.types.ts                 # Domain types: Message, Conversation, AISettings
│   ├── navigation.types.ts           # React Navigation param lists
│   └── index.ts                      # Barrel export
│
├── utils/
│   ├── formatters.ts                 # Pure helpers: truncate, formatTimestamp, etc.
│   └── logger.ts                     # Structured, production-gated logger
│
└── App.tsx                           # Root: Provider + SafeAreaProvider + AppNavigator
```

---

## 4. Setup Guide

### Step 1 — Create a new bare React Native project

```bash
npx react-native@latest init RNClaudeAI --template react-native-template-typescript
cd RNClaudeAI
```

### Step 2 — Install dependencies

```bash
npm install \
  @react-navigation/native \
  @react-navigation/native-stack \
  @react-navigation/bottom-tabs \
  @reduxjs/toolkit \
  react-redux \
  axios \
  react-native-mmkv \
  react-native-gesture-handler \
  react-native-reanimated \
  react-native-safe-area-context \
  react-native-screens \
  uuid \
  zod

npm install --save-dev \
  babel-plugin-module-resolver \
  @types/uuid
```

### Step 3 — iOS pod install

```bash
cd ios && pod install && cd ..
```

### Step 4 — Copy the src/ folder

Replace your project's `src/` directory (or `App.tsx`) with the files from this archive.

### Step 5 — Replace App.tsx entry point

In your project root, update `App.tsx` (or `index.js`) to import from `src/App.tsx`:

```tsx
// index.js (project root)
import { AppRegistry } from 'react-native';
import App from './src/App';
import { name as appName } from './app.json';

AppRegistry.registerComponent(appName, () => App);
```

### Step 6 — Copy config files

Copy these to the project root:
- `tsconfig.json`
- `babel.config.js`
- `.env.example` → rename to `.env`

### Step 7 — Configure your API key

Open `.env` and add your Anthropic API key:

```bash
ANTHROPIC_API_KEY=sk-ant-xxxxxxxxxxxxxxxx
```

> **Get your key at:** https://console.anthropic.com/settings/api-keys

### Step 8 — Configure metro for .env files

In `metro.config.js`, ensure you have:

```js
const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');
const config = {};
module.exports = mergeConfig(getDefaultConfig(__dirname), config);
```

Then install `react-native-dotenv` and add to your babel config:

```bash
npm install react-native-dotenv
```

Add to `babel.config.js` plugins:
```js
['module:react-native-dotenv', {
  moduleName: '@env',
  path: '.env',
  safe: true,
  allowUndefined: false,
}]
```

Or use the provided `babel.config.js` which already handles path aliases via `module-resolver`.

### Step 9 — Run the app

```bash
# iOS
npx react-native run-ios

# Android
npx react-native run-android
```

---

## 5. Environment Variables

All environment access goes through `src/config/env.ts`. This file uses Zod to validate variables at startup.

| Variable | Required | Default | Description |
|---|---|---|---|
| `ANTHROPIC_API_KEY` | ✅ Yes | — | Your Anthropic API key |
| `ANTHROPIC_MODEL` | No | `claude-sonnet-4-20250514` | Claude model to use |
| `ANTHROPIC_MAX_TOKENS` | No | `1024` | Max tokens per response |
| `APP_ENV` | No | `development` | `development`, `staging`, `production` |
| `ENABLE_LOGGING` | No | `true` | Set to `false` in production builds |

If `ANTHROPIC_API_KEY` is missing or empty, the app throws at startup with a clear message:
```
[ENV] Validation failed:
  • ANTHROPIC_API_KEY: ANTHROPIC_API_KEY is required
```

---

## 6. Layer-by-Layer Walkthrough

### 6.1 API Layer (`src/api/`)

#### BaseApiClient
- Wraps Axios with a configurable `baseURL`, default headers, and timeout (30s)
- Interceptor logs all HTTP errors
- `request<T>()` implements **exponential backoff retry** (up to 2 retries) on status codes: 429, 500, 502, 503, 504
- Returns `ApiResult<T>` — a discriminated union: `{ success: true, data: T }` or `{ success: false, error: AppError }`

#### AnthropicClient
- Extends `BaseApiClient`
- `sendMessage()` — standard POST to `/v1/messages` (non-streaming)
- `streamMessage()` — async generator using `fetch` + `ReadableStream` that yields `StreamEvent` objects parsed from SSE lines

### 6.2 Service Layer (`src/services/ai/`)

#### AIService
- Accepts domain `Message[]` + `AISettings`, converts to Anthropic API format
- `complete()` — wraps `AnthropicClient.sendMessage()`, extracts text from content blocks
- `stream()` — async generator wrapping `AnthropicClient.streamMessage()`, yields text chunks only

### 6.3 Store (`src/store/`)

#### conversationsSlice
The core slice. Actions:

| Action | Description |
|---|---|
| `createConversation` | Creates new conversation with UUID, sets as active |
| `deleteConversation` | Removes from state, updates activeId |
| `addUserMessage` | Adds user message optimistically; auto-titles after first message |
| `addAssistantPlaceholder` | Creates empty streaming message with `status: 'streaming'` |
| `appendStreamChunk` | Appends chunk text to the streaming message |
| `finalizeAssistantMessage` | Sets final status, content, error, usage |

#### Persistence
- `store.subscribe()` throttles serialization to MMKV at 500ms intervals
- Both slices are hydrated from MMKV on store creation via `preloadedState`

### 6.4 Hooks

#### useChat
The main consumer hook. Call it in any screen:

```tsx
const { isLoading, error, sendMessage, abortStream } = useChat();
```

- `sendMessage(content, conversationId?)` — creates conversation if needed, dispatches user message, runs AI, handles streaming/non-streaming
- `abortStream()` — sets abort flag; the stream loop checks this flag each chunk

#### useTheme
Returns a fully typed `AppTheme` object based on user preference + system color scheme.

### 6.5 Theme System

The theme system uses semantic tokens rather than raw colors. All components receive `theme` from `useTheme()`:

```tsx
const theme = useTheme();
// theme.colors.accent, theme.spacing[4], theme.borderRadius.lg, etc.
```

Dark mode is the default. The user can override to `light` or `system` in Settings.

---

## 7. API Key — How It Works

1. You set `ANTHROPIC_API_KEY` in `.env`
2. `babel-plugin-module-resolver` + `react-native-dotenv` inlines it at build time into `process.env.ANTHROPIC_API_KEY`
3. `src/config/env.ts` reads and validates it with Zod
4. `AnthropicClient` reads it from `ENV.ANTHROPIC_API_KEY` (never hardcoded)
5. It is sent as the `x-api-key` header on every request

**Security note:** The API key is bundled into the JS bundle. For a real production app with external users, you should proxy requests through your own backend so the key is never exposed to the client.

---

## 8. Streaming vs Non-Streaming

Toggle via Settings screen or programmatically:

```tsx
dispatch(updateAISettings({ streamingEnabled: false }));
```

**Streaming (default):**
- Uses `fetch` + SSE
- Dispatches `appendStreamChunk` on each text delta
- UI updates in real-time as Claude writes
- `abortStream()` stops processing mid-stream

**Non-streaming:**
- Uses Axios POST
- Waits for full response
- Dispatches `finalizeAssistantMessage` once with complete content

---

## 9. State Management

### Shape

```typescript
{
  conversations: {
    ids: string[];                       // ordered list of conversation IDs
    entities: Record<string, Conversation>;
    activeConversationId: string | null;
  };
  settings: {
    ai: AISettings;                      // model, maxTokens, temperature, etc.
    theme: 'dark' | 'light' | 'system';
    hapticFeedback: boolean;
  };
}
```

### Reading state

```tsx
// In a component
const conversations = useAppSelector(s => s.conversations.entities);
const settings = useAppSelector(s => s.settings.ai);
```

### Dispatching

```tsx
const dispatch = useAppDispatch();
dispatch(createConversation());
dispatch(updateAISettings({ temperature: 0.9 }));
```

---

## 10. Adding Features

### Add a new screen

1. Create `src/screens/YourScreen/YourScreen.tsx`
2. Add route to `src/types/navigation.types.ts`
3. Register in `src/navigation/AppNavigator.tsx`

### Add a new Redux slice

1. Create `src/store/slices/yourSlice.ts`
2. Add to `store/index.ts` reducer map
3. Add persistence key in `src/constants/index.ts`

### Change the AI model

Update `.env`:
```
ANTHROPIC_MODEL=claude-opus-4-5
```

Or let users pick in Settings (already implemented).

### Add system prompts per-conversation

Each `Conversation` already has a `systemPrompt` field. Pass it through `AIService` (already reads `settings.systemPrompt`). Add a UI to edit it in the chat header.

---

## 11. Troubleshooting

### "ANTHROPIC_API_KEY is required" on startup
→ Ensure `.env` exists in the project root with `ANTHROPIC_API_KEY=sk-ant-...`
→ Restart Metro bundler after changing `.env`

### Module not found: `@config/env`
→ Ensure `babel.config.js` has the `module-resolver` plugin with the alias map
→ Run `npx react-native start --reset-cache`

### Streaming not working on Android
→ Check that your RN version is >= 0.71 (native Fetch API with streaming support)
→ Ensure you're not using a debug proxy that strips `Transfer-Encoding: chunked`

### MMKV build error on iOS
→ Run `cd ios && pod install`
→ Ensure your Xcode deployment target is >= iOS 13

### TypeScript errors on `uuid`
→ Run `npm install --save-dev @types/uuid`

---

## 12. Dependencies

| Package | Purpose |
|---|---|
| `@reduxjs/toolkit` | State management |
| `react-redux` | React bindings for Redux |
| `axios` | HTTP client (non-streaming requests) |
| `react-native-mmkv` | Fast synchronous key-value persistence |
| `@react-navigation/native` + stack + tabs | Screen navigation |
| `react-native-gesture-handler` | Required by React Navigation |
| `react-native-reanimated` | Required by React Navigation |
| `react-native-safe-area-context` | Safe area insets |
| `react-native-screens` | Native screen optimization |
| `uuid` | UUID generation for message/conversation IDs |
| `zod` | Runtime schema validation for environment config |
| `babel-plugin-module-resolver` | Path aliases (`@hooks/`, `@store/`, etc.) |
| `react-native-dotenv` | Inline `.env` variables at build time |

---

*Built for production. MIT licensed. Extend freely.*
