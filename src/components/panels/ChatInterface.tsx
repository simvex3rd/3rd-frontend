"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { cn } from "@/lib/utils";
import { ChatInput } from "@/components/ui/chat-input";
import { MarkdownRenderer } from "@/components/ui/markdown-renderer";
import type { HTMLAttributes } from "react";
import { useSceneStore } from "@/stores/scene-store";
import { usePartData } from "@/hooks/use-part-data";
import { api } from "@/lib/api";
import { useChatStream } from "@/hooks/use-chat-stream";

/**
 * ChatInterface component - Fixed right panel with collapsible chat interface.
 * Styled according to Figma design specs with glassmorphic background.
 *
 * @component
 * @example
 * ```tsx
 * <ChatInterface />
 * <ChatInterface defaultOpen={false} />
 * <ChatInterface onSend={(message) => console.log(message)} />
 * ```
 *
 * @param {ChatInterfaceProps} props - Component props
 * @param {boolean} [props.defaultOpen=true] - Initial open/collapsed state
 * @param {function} [props.onSend] - Callback when message is sent
 * @param {Message[]} [props.initialMessages] - Initial messages to display
 *
 * @see {@link https://figma.com/file/Vz80RydxWcYHVnn2iuyV0m/SIMVEX} Figma Design - Chat Panel (442px width)
 */

export interface Message {
  id: string;
  role: "user" | "assistant" | "system";
  content: string;
  timestamp?: Date;
}

export interface ChatInterfaceProps extends HTMLAttributes<HTMLDivElement> {
  defaultOpen?: boolean;
  onSend?: (message: string) => void;
  initialMessages?: Message[];
}

export function ChatInterface({
  className,
  defaultOpen: _defaultOpen = true,
  onSend,
  initialMessages = [],
  ...props
}: ChatInterfaceProps) {
  const [inputValue, setInputValue] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  // Session management
  const [sessionId, setSessionId] = useState<string | null>(null);
  const sessionCreatingRef = useRef(false);

  // Streaming chat hook
  const {
    messages,
    isStreaming,
    sendMessage: streamSendMessage,
    addSystemMessage: streamAddSystemMessage,
    setMessages,
  } = useChatStream(sessionId);

  // Initialize messages from props
  useEffect(() => {
    if (initialMessages.length > 0) {
      setMessages(
        initialMessages.map((m) => ({
          ...m,
          timestamp: m.timestamp ?? new Date(),
        }))
      );
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Part context for tutoring
  const selectedPart = useSceneStore((state) => state.selectedObject);
  const modelId = useSceneStore((state) => state.modelId);
  const { partData } = usePartData(selectedPart);
  const prevSelectedRef = useRef<string | null>(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (messagesEndRef.current && messagesContainerRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  // Add system message when part is selected
  const addPartSystemMessage = useCallback(
    (partName: string) => {
      streamAddSystemMessage(
        `"${partName}" 부품을 선택했습니다. 궁금한 점을 물어보세요!`
      );
    },
    [streamAddSystemMessage]
  );

  // Sync selected part changes to chat
  useEffect(() => {
    if (
      selectedPart &&
      selectedPart !== prevSelectedRef.current &&
      partData?.name
    ) {
      addPartSystemMessage(partData.name);
    }
    prevSelectedRef.current = selectedPart;
  }, [selectedPart, partData?.name, addPartSystemMessage]);

  // Create session on demand (before first message)
  const ensureSession = useCallback(async (): Promise<string | null> => {
    if (sessionId) return sessionId;
    if (sessionCreatingRef.current) return null;

    sessionCreatingRef.current = true;
    try {
      const session = await api.chat.createSession(modelId || "1");
      const newId = String(session.id);
      setSessionId(newId);
      return newId;
    } catch (err) {
      console.error("Failed to create session:", err);
      return null;
    } finally {
      sessionCreatingRef.current = false;
    }
  }, [sessionId, modelId]);

  const handleSend = async () => {
    if (!inputValue.trim() || isStreaming) return;

    // Ensure we have a session before sending
    const currentSessionId = await ensureSession();
    if (!currentSessionId) return;

    // Build context-enriched message for the API
    let contextualMessage = inputValue.trim();
    const sceneState = useSceneStore.getState();
    const currentModelId = sceneState.modelId;
    const currentSelectedObject = sceneState.selectedObject;

    if (currentSelectedObject && partData) {
      contextualMessage = `[Context: Model=${currentModelId || "unknown"}, Part=${partData.name}] ${inputValue.trim()}`;
    } else if (currentModelId) {
      contextualMessage = `[Context: Model=${currentModelId}] ${inputValue.trim()}`;
    }

    setInputValue("");

    // Call external onSend handler
    onSend?.(contextualMessage);

    // Stream the message via the hook (pass sessionId override for first message)
    await streamSendMessage(contextualMessage, currentSessionId);
  };

  const formatTime = (date?: Date) => {
    if (!date) return "";
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";
    const formattedHours = hours % 12 || 12;
    const formattedMinutes = minutes.toString().padStart(2, "0");
    return `${formattedHours}:${formattedMinutes} ${ampm}`;
  };

  return (
    <div className={cn("flex flex-col h-full", className)} {...props}>
      {/* Messages Area */}
      <div
        ref={messagesContainerRef}
        className="flex-1 overflow-y-auto px-[20px] py-[20px] space-y-[16px]"
      >
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center px-[20px]">
            <div className="mb-[16px]">
              <svg
                width="48"
                height="48"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="text-primary opacity-50"
              >
                <path
                  d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20Z"
                  fill="currentColor"
                  fillOpacity="0.2"
                />
                <path
                  d="M12 6L12 18M6 12L18 12"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </div>
            <p className="font-medium text-[14px] leading-[1.5] text-neutral-300">
              시뮬레이션에 대해 궁금한 점을
              <br />
              질문해보세요!
            </p>
          </div>
        ) : (
          <>
            {messages.map((msg) => (
              <div key={msg.id} className="w-full">
                {msg.role === "user" ? (
                  <div className="flex flex-col items-end gap-[8px]">
                    <div
                      className="max-w-[80%] px-[16px] py-[12px] rounded-[16px] break-words bg-primary-30"
                      style={{
                        borderBottomRightRadius: "0px",
                      }}
                    >
                      <p className="font-medium text-[14px] leading-[1.5] text-neutral-50">
                        {msg.content}
                      </p>
                    </div>
                    {msg.timestamp && (
                      <span className="text-[12px] text-neutral-400 px-[8px]">
                        {formatTime(msg.timestamp)}
                      </span>
                    )}
                  </div>
                ) : msg.role === "system" ? (
                  <div className="flex justify-center py-[8px]">
                    <div className="px-[12px] py-[6px] rounded-[8px] bg-neutral-600/50">
                      <p className="font-medium text-[12px] leading-[1.5] text-neutral-300">
                        {msg.content}
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-start gap-[8px]">
                    <div
                      className="max-w-[80%] px-[16px] py-[12px] rounded-[16px] break-words bg-hover-30"
                      style={{
                        borderBottomLeftRadius: "0px",
                      }}
                    >
                      <MarkdownRenderer compact maxWidth="full">
                        {msg.content}
                      </MarkdownRenderer>
                    </div>
                    {msg.timestamp && (
                      <span className="text-[12px] text-neutral-400 px-[8px]">
                        {formatTime(msg.timestamp)}
                      </span>
                    )}
                  </div>
                )}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </>
        )}
      </div>

      {/* Input Area - Fixed at bottom */}
      <div className="shrink-0 px-[20px] py-[16px] border-t border-neutral-600">
        <div className="relative rounded-[32px] border border-primary p-[12px] bg-[rgba(64,64,64,0.3)]">
          <ChatInput
            placeholder="Ask me anything about your simulation..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onSend={handleSend}
            variant="default"
            maxLength={2000}
            className="border-0 bg-transparent text-neutral-50 placeholder:text-neutral-400"
          />
        </div>
      </div>
    </div>
  );
}
