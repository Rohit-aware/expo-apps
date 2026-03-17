/**
 * @file store/slices/conversationsSlice.ts
 * @description Redux slice managing all conversations and messages.
 */

import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
//@ts-ignore
import { v4 as uuidv4 } from 'uuid';
import {
  NEW_CONVERSATION_TITLE,
  MAX_CONVERSATIONS,
} from '@constants/index';
import { deriveConversationTitle } from '@utils/formatters';
import { Conversation, DEFAULT_AI_SETTINGS, Message, MessageStatus } from '@/types';
import type { AIProviderType } from '@features/ai';

// ---------------------------------------------------------------------------
// State
// ---------------------------------------------------------------------------

export interface ConversationsState {
  ids: string[];
  entities: Record<string, Conversation>;
  activeConversationId: string | null;
}

const initialState: ConversationsState = {
  ids: [],
  entities: {},
  activeConversationId: null,
};

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function now(): number {
  return Date.now();
}

function createMessage(
  partial: Pick<Message, 'conversationId' | 'role' | 'content' | 'status'>,
): Message {
  return {
    id: uuidv4(),
    ...partial,
    createdAt: now(),
    updatedAt: now(),
  };
}

// ---------------------------------------------------------------------------
// Slice
// ---------------------------------------------------------------------------

const conversationsSlice = createSlice({
  name: 'conversations',
  initialState,
  reducers: {
    // Create a new conversation
    createConversation: {
      reducer(state, action: PayloadAction<Conversation>) {
        const conv = action.payload;
        // Enforce max cap (drop oldest non-pinned)
        if (state.ids.length >= MAX_CONVERSATIONS) {
          const oldest = state.ids
            .map((id) => state.entities[id])
            .filter((c) => !c.pinned)
            .sort((a, b) => a.updatedAt - b.updatedAt)[0];
          if (oldest) {
            state.ids = state.ids.filter((id) => id !== oldest.id);
            delete state.entities[oldest.id];
          }
        }
        state.ids.unshift(conv.id);
        state.entities[conv.id] = conv;
        state.activeConversationId = conv.id;
      },
      prepare() {
        const id = uuidv4();
        const conversation: Conversation = {
          id,
          title: NEW_CONVERSATION_TITLE,
          messages: [],
          systemPrompt: DEFAULT_AI_SETTINGS.systemPrompt,
          model: DEFAULT_AI_SETTINGS.model,
          provider: DEFAULT_AI_SETTINGS.provider,
          createdAt: now(),
          updatedAt: now(),
          totalTokens: 0,
          pinned: false,
        };
        return { payload: conversation };
      },
    },

    deleteConversation(state, action: PayloadAction<string>) {
      const id = action.payload;
      state.ids = state.ids.filter((i) => i !== id);
      delete state.entities[id];
      if (state.activeConversationId === id) {
        state.activeConversationId = state.ids[0] ?? null;
      }
    },

    setActiveConversation(state, action: PayloadAction<string>) {
      state.activeConversationId = action.payload;
    },

    pinConversation(
      state,
      action: PayloadAction<{ id: string; pinned: boolean }>,
    ) {
      const conv = state.entities[action.payload.id];
      if (conv) conv.pinned = action.payload.pinned;
    },

    updateConversationTitle(
      state,
      action: PayloadAction<{ id: string; title: string }>,
    ) {
      const conv = state.entities[action.payload.id];
      if (conv) {
        conv.title = action.payload.title;
        conv.updatedAt = now();
      }
    },

    updateConversationProvider(
      state,
      action: PayloadAction<{ id: string; provider: AIProviderType }>,
    ) {
      const conv = state.entities[action.payload.id];
      if (conv) {
        conv.provider = action.payload.provider;
        conv.updatedAt = now();
      }
    },
    // Add a user message (optimistic)
    addUserMessage(
      state,
      action: PayloadAction<{ conversationId: string; content: string }>,
    ) {
      const conv = state.entities[action.payload.conversationId];
      if (!conv) return;

      const msg = createMessage({
        conversationId: action.payload.conversationId,
        role: 'user',
        content: action.payload.content,
        status: 'done',
      });

      conv.messages.push(msg);
      conv.updatedAt = now();

      // Auto-title after first user message
      if (conv.messages.filter((m) => m.role === 'user').length === 1) {
        conv.title = deriveConversationTitle(action.payload.content);
      }
    },

    // Add a placeholder assistant message (streaming starts)
    addAssistantPlaceholder(
      state,
      action: PayloadAction<{ conversationId: string; messageId: string }>,
    ) {
      const conv = state.entities[action.payload.conversationId];
      if (!conv) return;

      const msg = createMessage({
        conversationId: action.payload.conversationId,
        role: 'assistant',
        content: '',
        status: 'streaming',
      });
      // Override with provided id so caller can reference it
      msg.id = action.payload.messageId;

      conv.messages.push(msg);
      conv.updatedAt = now();
    },

    // Append streamed text chunk
    appendStreamChunk(
      state,
      action: PayloadAction<{
        conversationId: string;
        messageId: string;
        chunk: string;
      }>,
    ) {
      const conv = state.entities[action.payload.conversationId];
      if (!conv) return;
      const msg = conv.messages.find((m) => m.id === action.payload.messageId);
      if (!msg) return;
      msg.content += action.payload.chunk;
      msg.updatedAt = now();
    },

    // Finalize a streaming / non-streaming assistant message
    finalizeAssistantMessage(
      state,
      action: PayloadAction<{
        conversationId: string;
        messageId: string;
        content?: string; // used for non-streaming
        status: MessageStatus;
        error?: string;
        inputTokens?: number;
        outputTokens?: number;
      }>,
    ) {
      const conv = state.entities[action.payload.conversationId];
      if (!conv) return;
      const msg = conv.messages.find((m) => m.id === action.payload.messageId);
      if (!msg) return;

      if (action.payload.content !== undefined) {
        msg.content = action.payload.content;
      }
      msg.status = action.payload.status;
      msg.error = action.payload.error;
      msg.updatedAt = now();

      if (action.payload.inputTokens !== undefined) {
        msg.usage = {
          input_tokens: action.payload.inputTokens,
          output_tokens: action.payload.outputTokens ?? 0,
        };
        conv.totalTokens +=
          action.payload.inputTokens + (action.payload.outputTokens ?? 0);
      }

      conv.updatedAt = now();
    },

    clearAllConversations(state) {
      state.ids = [];
      state.entities = {};
      state.activeConversationId = null;
    },
  },
});

export const {
  createConversation,
  deleteConversation,
  setActiveConversation,
  pinConversation,
  updateConversationTitle,
  updateConversationProvider,
  addUserMessage,
  addAssistantPlaceholder,
  appendStreamChunk,
  finalizeAssistantMessage,
  clearAllConversations,
} = conversationsSlice.actions;

export default conversationsSlice.reducer;
