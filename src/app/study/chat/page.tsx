"use client";

import { useState, useEffect, useCallback, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { ViewerHeader } from "@/components/viewer/ViewerHeader";
import { ChatSidebar } from "@/components/panels/ChatSidebar";
import { ChatMessage } from "@/components/panels/ChatMessage";
import { ChatInput } from "@/components/panels/ChatInput";
import { LucideSparkles } from "lucide-react";
import { useChatStream } from "@/hooks/use-chat-stream";
import { api } from "@/lib/api";
import type { ChatMessageResponse } from "@/types/api";

/**
 * Study Chat Page - Full-screen AI chat interface under /study
 *
 * Supports query params:
 * - ?sessionId=X - Resume existing session
 * - ?q=message - Send initial message
 *
 * @see {@link https://www.figma.com/design/Vz80RydxWcYHVnn2iuyV0m?node-id=376-1358} Figma Design
 */
function StudyChatContent() {
  const searchParams = useSearchParams();
  const [aiAvatar, setAiAvatar] = useState("");
  const [sessionId, setSessionId] = useState<string | null>(null);
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
    const AVATARS = ["/chat/character1.png", "/chat/character2.png"];
    setAiAvatar(AVATARS[Math.floor(Math.random() * AVATARS.length)]);
  }, []);

  // Handle initial session from URL params
  useEffect(() => {
    const paramSessionId = searchParams.get("sessionId");
    if (paramSessionId) {
      setSessionId(paramSessionId);
    }
  }, [searchParams]);

  // Send initial message from query param (from dashboard quick actions)
  useEffect(() => {
    if (initialMessageSent) return;

    const initialMessage = searchParams.get("q");
    if (!initialMessage) return;

    const sendInitial = async () => {
      setInitialMessageSent(true);

      let currentSessionId = sessionId;

      if (!currentSessionId) {
        setSessionCreating(true);
        try {
          const session = await api.chat.createSession("1");
          currentSessionId = String(session.id);
          setSessionId(currentSessionId);
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
  }, [searchParams, sessionId, initialMessageSent, streamSendMessage]);

  const handleSendMessage = useCallback(
    async (message: string) => {
      if (!message.trim() || isStreaming || sessionCreating) return;

      let currentSessionId = sessionId;

      if (!currentSessionId) {
        setSessionCreating(true);
        try {
          const session = await api.chat.createSession("1");
          currentSessionId = String(session.id);
          setSessionId(currentSessionId);
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
    [sessionId, isStreaming, sessionCreating, streamSendMessage]
  );

  const handleNewChat = useCallback(async () => {
    if (sessionCreating) return;

    setSessionCreating(true);
    try {
      const session = await api.chat.createSession("1");
      setSessionId(String(session.id));
      clearMessages();
    } catch (err) {
      console.error("Failed to create new chat:", err);
    } finally {
      setSessionCreating(false);
    }
  }, [sessionCreating, clearMessages]);

  const handleSelectSession = useCallback(
    async (id: string) => {
      if (id === sessionId) return;

      setSessionId(id);
      clearMessages();

      try {
        const apiMessages: ChatMessageResponse[] =
          await api.chat.getMessages(id);
        const formattedMessages = apiMessages.reverse().map((msg) => ({
          id: String(msg.id),
          role: msg.role as "user" | "assistant",
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

  return (
    <div className="relative w-full max-[1919px]:h-[133.33vh] h-screen bg-neutral-900 overflow-hidden">
      <ViewerHeader />

      <main className="flex absolute inset-x-0 top-[102px] bottom-0">
        {/* Left Sidebar */}
        <ChatSidebar
          onNewChat={handleNewChat}
          onSelectSession={handleSelectSession}
          currentSessionId={sessionId || undefined}
        />

        {/* Main Chat Area */}
        <div className="flex-1 flex flex-col relative">
          {/* Chat Title */}
          <div className="flex gap-[16px] items-center px-[80px] py-[40px]">
            <LucideSparkles
              className="w-[50px] h-[50px] text-primary shrink-0"
              strokeWidth={2}
            />
            <h1 className="font-bold text-[40px] leading-[1.25] text-primary">
              AI Chat
            </h1>
          </div>

          {/* Messages Area */}
          <div className="flex-1 px-[80px] py-[40px] overflow-y-auto space-y-[32px]">
            {messages.length === 0 ? (
              <div className="flex items-center justify-center h-full">
                <p className="text-neutral-500 text-[18px]">
                  {sessionCreating
                    ? "Creating new chat..."
                    : "Start a conversation"}
                </p>
              </div>
            ) : (
              messages.map((message) => {
                if (message.role === "system") {
                  return (
                    <div
                      key={message.id}
                      className="flex items-center justify-center"
                    >
                      <p className="text-neutral-500 text-[14px] italic">
                        {message.content}
                      </p>
                    </div>
                  );
                }

                return (
                  <ChatMessage
                    key={message.id}
                    type={message.role === "user" ? "user" : "ai"}
                    content={message.content}
                    showAvatar={message.role === "assistant"}
                    avatar={message.role === "assistant" ? aiAvatar : undefined}
                  />
                );
              })
            )}
            {isStreaming && (
              <div className="flex items-center gap-[8px] text-neutral-500 text-[14px]">
                <span className="animate-pulse">●</span>
                <span>AI is typing...</span>
              </div>
            )}
          </div>

          {/* Chat Input */}
          <div className="flex justify-center pb-[40px] px-[80px]">
            <ChatInput onSend={handleSendMessage} />
          </div>
        </div>
      </main>
    </div>
  );
}

export default function StudyChatPage() {
  return (
    <Suspense
      fallback={
        <div className="w-full h-screen bg-neutral-900 flex items-center justify-center">
          <p className="text-neutral-400">Loading...</p>
        </div>
      }
    >
      <StudyChatContent />
    </Suspense>
  );
}
