/**
 * @file hooks/useChat.ts
 * @description Core hook for sending messages in a conversation.
 * Handles both streaming and non-streaming modes, feeding results back
 * into the Redux store.
 */

import { useCallback, useRef, useState } from 'react';
// @ts-expect-error uuid v4 import error in some environments
import { v4 as uuidv4 } from 'uuid';
import { useAppDispatch, useAppSelector } from './useAppStore';
import { aiService } from '@features/ai';
import { Logger } from '@utils/logger';
import {
  addUserMessage,
  addAssistantPlaceholder,
  appendStreamChunk,
  finalizeAssistantMessage,
  createConversation,
} from '@store/slices/conversationsSlice';
import { store } from '@/store';

const TAG = 'useChat';

export interface UseChatReturn {
  isLoading: boolean;
  error: string | null;
  sendMessage: (content: string, conversationId?: string) => Promise<string>;
  abortStream: () => void;
  clearError: () => void;
}

export function useChat(): UseChatReturn {
  const dispatch = useAppDispatch();
  const settings = useAppSelector((s) => s.settings.ai);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const abortRef = useRef<boolean>(false);

  const abortStream = useCallback(() => {
    abortRef.current = true;
  }, []);

  const clearError = useCallback(() => setError(null), []);

  const sendMessage = useCallback(
    async (content: string, conversationId?: string): Promise<string> => {
      // Ensure a conversation exists
      let convId = conversationId;
      if (!convId) {
        const action = dispatch(createConversation());
        convId = (action.payload as { id: string }).id;
      }

      setIsLoading(true);
      setError(null);
      abortRef.current = false;

      // 1. Add user message optimistically
      dispatch(addUserMessage({ conversationId: convId, content }));

      // 2. Create assistant placeholder
      const assistantMsgId = uuidv4();
      dispatch(addAssistantPlaceholder({ conversationId: convId, messageId: assistantMsgId }));

      // 3. Get current messages for context
      const storeState = store.getState();
      const conversation = storeState.conversations.entities[convId];
      if (!conversation) {
        Logger.error(TAG, 'Conversation not found after creation');
        setIsLoading(false);
        return convId;
      }

      try {
        // Construct settings using the conversation's provider to allow per-thread AI switching
        const effectiveSettings = {
          ...settings,
          provider: conversation.provider ?? settings.provider,
        };

        if (settings.streamingEnabled) {
          // ---- Streaming path ----
          const generator = aiService.stream(conversation.messages, effectiveSettings);

          for await (const chunk of generator) {
            if (abortRef.current) {
              dispatch(
                finalizeAssistantMessage({
                  conversationId: convId,
                  messageId: assistantMsgId,
                  status: 'done',
                }),
              );
              break;
            }
            dispatch(
              appendStreamChunk({
                conversationId: convId,
                messageId: assistantMsgId,
                chunk,
              }),
            );
          }

          if (!abortRef.current) {
            dispatch(
              finalizeAssistantMessage({
                conversationId: convId,
                messageId: assistantMsgId,
                status: 'done',
              }),
            );
          }
        } else {
          // ---- Non-streaming path ----
          const result = await aiService.complete(conversation.messages, effectiveSettings);

          if (result.success) {
            dispatch(
              finalizeAssistantMessage({
                conversationId: convId,
                messageId: assistantMsgId,
                content: result.data,
                status: 'done',
              }),
            );
          } else {
            throw new Error(result.error.message);
          }
        }
      } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : 'Unknown error';
        Logger.error(TAG, 'sendMessage failed', err);
        setError(msg);
        dispatch(
          finalizeAssistantMessage({
            conversationId: convId,
            messageId: assistantMsgId,
            status: 'error',
            error: msg,
          }),
        );
      } finally {
        setIsLoading(false);
      }

      return convId;
    },
    [dispatch, settings],
  );

  return { isLoading, error, sendMessage, abortStream, clearError };
}
