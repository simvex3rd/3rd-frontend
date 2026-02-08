"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { cn } from "@/lib/utils";
import { ChatInput } from "@/components/ui/chat-input";
import { MarkdownRenderer } from "@/components/ui/markdown-renderer";
import { LucideChevronDown, LucideChevronUp } from "lucide-react";
import type { HTMLAttributes } from "react";
import { useSceneStore } from "@/stores/scene-store";
import { usePartData } from "@/hooks/use-part-data";

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
  defaultOpen = true,
  onSend,
  initialMessages = [],
  ...props
}: ChatInterfaceProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [inputValue, setInputValue] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  // Part context for tutoring
  const selectedPart = useSceneStore((state) => state.selectedObject);
  const { partData } = usePartData(selectedPart);
  const prevSelectedRef = useRef<string | null>(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (messagesEndRef.current && messagesContainerRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  // Add system message when part is selected (using callback to avoid setState in effect warning)
  const addSystemMessage = useCallback((partName: string) => {
    const systemMessage: Message = {
      id: `system-${Date.now()}`,
      role: "system",
      content: `"${partName}" 부품을 선택했습니다. 궁금한 점을 물어보세요!`,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, systemMessage]);
  }, []);

  // Sync selected part changes to chat (legitimate use of setState in effect for external state sync)
  useEffect(() => {
    if (
      selectedPart &&
      selectedPart !== prevSelectedRef.current &&
      partData?.name
    ) {
      addSystemMessage(partData.name);
    }
    prevSelectedRef.current = selectedPart;
  }, [selectedPart, partData?.name, addSystemMessage]);

  const handleSend = () => {
    if (!inputValue.trim()) return;

    // Inject part context if available
    let contextualMessage = inputValue.trim();

    if (partData) {
      contextualMessage = `[현재 선택된 부품: ${partData.name}]
재질: ${partData.material}
${partData.description ? `설명: ${partData.description}` : ""}

질문: ${inputValue.trim()}`;
    }

    const userMessage: Message = {
      id: `${Date.now()}-user`,
      role: "user",
      content: inputValue.trim(), // Display original message
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");

    // Call external onSend handler with contextual message
    onSend?.(contextualMessage);

    // TODO: Wire up streaming API in next task
    // For now, simulate AI response after delay
    setTimeout(() => {
      const aiMessage: Message = {
        id: `${Date.now()}-ai`,
        role: "assistant",
        content:
          "시뮬레이션 모델에 대해 궁금하신 점이 있으시면 언제든지 물어보세요!",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiMessage]);
    }, 1000);
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
    <div
      className={cn(
        "fixed right-0 top-0 h-screen transition-all duration-300 z-30 flex flex-col",
        isOpen ? "w-[442px]" : "w-[80px]",
        className
      )}
      {...props}
    >
      {/* Glassmorphic Background Container */}
      <div
        className={cn(
          "h-full flex flex-col backdrop-blur-md transition-all duration-300",
          isOpen ? "rounded-l-[24px]" : "rounded-l-[12px]"
        )}
        style={{
          backgroundColor: "rgba(64, 64, 64, 0.7)",
        }}
      >
        {/* Header - 67px height */}
        <div
          className={cn(
            "h-[67px] shrink-0 flex items-center px-[24px] transition-all duration-300",
            isOpen ? "rounded-tl-[24px]" : "rounded-tl-[12px]"
          )}
          style={{ backgroundColor: "#404040" }}
        >
          <div className="flex items-center justify-between w-full">
            {/* Toggle Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-neutral-50 hover:text-primary transition-colors p-[8px] -ml-[8px]"
              aria-label={isOpen ? "Collapse chat" : "Expand chat"}
            >
              {isOpen ? (
                <LucideChevronUp className="w-[24px] h-[24px]" />
              ) : (
                <LucideChevronDown className="w-[24px] h-[24px]" />
              )}
            </button>

            {/* Title */}
            {isOpen && (
              <div className="flex items-center gap-[8px]">
                <h2 className="font-semibold text-[18px] leading-[1.5] text-primary">
                  SIMVEX Assistant
                </h2>
              </div>
            )}
          </div>
        </div>

        {/* Chat Content - Only visible when open */}
        {isOpen && (
          <>
            {/* Messages Area */}
            <div
              ref={messagesContainerRef}
              className="flex-1 overflow-y-auto px-[24px] py-[24px] space-y-[16px]"
            >
              {messages.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center px-[24px]">
                  <div className="mb-[16px]">
                    <svg
                      width="64"
                      height="64"
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
                  <p className="font-medium text-[16px] leading-[1.5] text-neutral-300">
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
                            className="max-w-[80%] px-[16px] py-[12px] rounded-[16px] break-words"
                            style={{
                              backgroundColor: "rgba(2, 238, 225, 0.3)",
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
                            className="max-w-[80%] px-[16px] py-[12px] rounded-[16px] break-words"
                            style={{
                              backgroundColor: "rgba(1, 169, 160, 0.3)",
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
            <div className="shrink-0 px-[24px] py-[24px] border-t border-neutral-600">
              <div
                className="relative rounded-[32px] border border-primary p-[16px]"
                style={{
                  backgroundColor: "rgba(64, 64, 64, 0.3)",
                }}
              >
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
          </>
        )}
      </div>
    </div>
  );
}
