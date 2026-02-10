"use client";

import { useState, useCallback, useRef } from "react";
import { api } from "@/lib/api";
import { toast } from "@/hooks/use-toast";
import type { Message } from "@/types/chat";

function nextId(prefix: string) {
  return `${prefix}-${crypto.randomUUID()}`;
}

export function useChatStream(sessionId: string | null) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isStreaming, setIsStreaming] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const decoderRef = useRef(new TextDecoder());
  const abortControllerRef = useRef<AbortController | null>(null);

  const sendMessage = useCallback(
    async (content: string, sessionIdOverride?: string) => {
      const effectiveSessionId = sessionIdOverride || sessionId;
      if (!content.trim() || !effectiveSessionId) return;

      // Add user message
      const userMessage: Message = {
        id: nextId("user"),
        role: "user",
        content,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, userMessage]);

      // Start streaming AI response
      setIsStreaming(true);
      setError(null);

      // Abort previous stream if exists
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }

      // Create new AbortController with 30s timeout
      const abortController = new AbortController();
      abortControllerRef.current = abortController;

      const timeoutId = setTimeout(() => {
        abortController.abort();
      }, 30000);

      try {
        // Fresh decoder per stream to avoid partial byte carryover
        decoderRef.current = new TextDecoder();

        const reader = await api.chat.streamMessage(
          effectiveSessionId,
          content,
          { signal: abortController.signal }
        );

        let aiContent = "";
        const aiMessageId = nextId("ai");

        // Add empty AI message placeholder
        setMessages((prev) => [
          ...prev,
          {
            id: aiMessageId,
            role: "assistant",
            content: "",
            timestamp: new Date(),
          },
        ]);

        let buffer = "";

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          // Reset timeout on each data chunk
          clearTimeout(timeoutId);

          // Decode stream chunk and append to buffer for partial line handling
          buffer += decoderRef.current.decode(value, { stream: true });
          const parts = buffer.split("\n\n");
          // Keep the last incomplete part in the buffer
          buffer = parts.pop() || "";

          for (const part of parts) {
            if (!part.trim()) continue;

            // Handle multi-line SSE data events (each line prefixed with data:)
            const lines = part.split("\n").filter((l) => l.startsWith("data:"));
            if (lines.length === 0) continue;

            const rawData = lines
              .map((l) => (l.startsWith("data: ") ? l.slice(6) : l.slice(5)))
              .join("\n");
            if (!rawData || rawData === "[DONE]") continue;

            try {
              const parsed = JSON.parse(rawData);
              if (parsed.type === "done") continue;
              // Extract text content from the JSON payload
              const chunk =
                typeof parsed === "string"
                  ? parsed
                  : parsed.data || parsed.text || parsed.content || "";
              if (chunk) {
                aiContent += chunk;
                setMessages((prev) =>
                  prev.map((msg) =>
                    msg.id === aiMessageId
                      ? { ...msg, content: aiContent }
                      : msg
                  )
                );
              }
            } catch {
              // If not JSON, treat as plain text
              aiContent += rawData;
              setMessages((prev) =>
                prev.map((msg) =>
                  msg.id === aiMessageId ? { ...msg, content: aiContent } : msg
                )
              );
            }
          }
        }

        clearTimeout(timeoutId);
      } catch (err) {
        clearTimeout(timeoutId);
        console.error("Streaming error:", err);

        if (err instanceof Error && err.name === "AbortError") {
          setError("Request timed out after 30 seconds");
          toast.error("응답 시간 초과", "30초 내에 응답을 받지 못했습니다");
        } else {
          setError("Failed to get AI response");
          toast.error("AI 응답 실패", "네트워크 상태를 확인해주세요");
        }
      } finally {
        setIsStreaming(false);
        abortControllerRef.current = null;
      }
    },
    [sessionId]
  );

  const clearMessages = useCallback(() => {
    setMessages([]);
  }, []);

  const addSystemMessage = useCallback((content: string) => {
    const systemMessage: Message = {
      id: nextId("system"),
      role: "system",
      content,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, systemMessage]);
  }, []);

  return {
    messages,
    isStreaming,
    error,
    sendMessage,
    clearMessages,
    addSystemMessage,
    setMessages,
  };
}
