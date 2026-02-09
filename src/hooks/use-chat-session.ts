"use client";

import { useState, useEffect, useCallback } from "react";
import { useChatStream } from "@/hooks/use-chat-stream";
import { api } from "@/lib/api";
import type { ChatMessageResponse } from "@/types/api";
import type { Message } from "@/types/chat";

interface UseChatSessionOptions {
  initialSessionId?: string | null;
  initialMessage?: string | null;
  onSessionCreated?: (sessionId: string) => void;
}

export function useChatSession(options: UseChatSessionOptions = {}) {
  const { initialSessionId, initialMessage, onSessionCreated } = options;

  const [sessionId, setSessionId] = useState<string | null>(
    initialSessionId || null
  );
  const [sessionCreating, setSessionCreating] = useState(false);
  const [initialMessageSent, setInitialMessageSent] = useState(false);

  const {
    messages,
    isStreaming,
    sendMessage: streamSendMessage,
    clearMessages,
    setMessages,
  } = useChatStream(sessionId);

  useEffect(() => {
    if (initialSessionId) {
      setSessionId(initialSessionId);
    }
  }, [initialSessionId]);

  useEffect(() => {
    if (initialMessageSent || !initialMessage) return;

    const sendInitial = async () => {
      setInitialMessageSent(true);

      let currentSessionId = sessionId;

      if (!currentSessionId) {
        setSessionCreating(true);
        try {
          const session = await api.chat.createSession("1");
          currentSessionId = String(session.id);
          setSessionId(currentSessionId);
          onSessionCreated?.(currentSessionId);
        } catch (err) {
          console.error("Failed to create session:", err);
          setSessionCreating(false);
          return;
        } finally {
          setSessionCreating(false);
        }
      }

      await streamSendMessage(initialMessage, currentSessionId);
    };

    const timer = setTimeout(sendInitial, 100);
    return () => clearTimeout(timer);
  }, [
    initialMessage,
    sessionId,
    initialMessageSent,
    streamSendMessage,
    onSessionCreated,
  ]);

  const sendMessage = useCallback(
    async (message: string) => {
      if (!message.trim() || isStreaming || sessionCreating) return;

      let currentSessionId = sessionId;

      if (!currentSessionId) {
        setSessionCreating(true);
        try {
          const session = await api.chat.createSession("1");
          currentSessionId = String(session.id);
          setSessionId(currentSessionId);
          onSessionCreated?.(currentSessionId);
        } catch (err) {
          console.error("Failed to create session:", err);
          setSessionCreating(false);
          return;
        } finally {
          setSessionCreating(false);
        }
      }

      await streamSendMessage(message, currentSessionId);
    },
    [
      sessionId,
      isStreaming,
      sessionCreating,
      streamSendMessage,
      onSessionCreated,
    ]
  );

  const createNewChat = useCallback(async () => {
    if (sessionCreating) return;

    setSessionCreating(true);
    try {
      const session = await api.chat.createSession("1");
      const newSessionId = String(session.id);
      setSessionId(newSessionId);
      clearMessages();
      onSessionCreated?.(newSessionId);
    } catch (err) {
      console.error("Failed to create new chat:", err);
    } finally {
      setSessionCreating(false);
    }
  }, [sessionCreating, clearMessages, onSessionCreated]);

  const selectSession = useCallback(
    async (id: string) => {
      if (id === sessionId) return;

      setSessionId(id);
      clearMessages();

      try {
        const apiMessages: ChatMessageResponse[] =
          await api.chat.getMessages(id);
        const formattedMessages: Message[] = apiMessages
          .reverse()
          .map((msg) => ({
            id: String(msg.id),
            role: msg.role as "user" | "assistant" | "system",
            content: msg.content,
            timestamp: new Date(msg.created_at),
          }));
        setMessages(formattedMessages);
      } catch (err) {
        console.error("Failed to load messages:", err);
      }
    },
    [sessionId, clearMessages, setMessages]
  );

  return {
    sessionId,
    sessionCreating,
    messages,
    isStreaming,
    sendMessage,
    createNewChat,
    selectSession,
  };
}
