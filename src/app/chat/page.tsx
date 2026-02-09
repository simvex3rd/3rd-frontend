"use client";

import { useState, useEffect } from "react";

import { ViewerHeader } from "@/components/viewer/ViewerHeader";
import { ChatSidebar } from "@/components/panels/ChatSidebar";
import { ChatMessage } from "@/components/panels/ChatMessage";
import { ChatInput } from "@/components/panels/ChatInput";
import { LucideSparkles } from "lucide-react";

/**
 * Chat Page - Full-screen AI chat interface
 *
 * Layout (1920px baseline with 75% zoom at ≤1919px):
 * - Header: ViewerHeader component (102px height: 67px + 35px margin)
 * - Sidebar: 311px width, fixed left
 * - Main: Flex-1, chat area with messages and input
 *
 * Design specs:
 * - Background: neutral-900
 * - Sidebar: gray-40
 * - Messages: User (cyan), AI (teal)
 * - Input: Bottom fixed, 1164px width
 *
 * @see {@link https://www.figma.com/design/Vz80RydxWcYHVnn2iuyV0m?node-id=376-1358} Figma Design
 */
export default function ChatPage() {
  const [aiAvatar, setAiAvatar] = useState<string>("");

  useEffect(() => {
    const AVATARS = ["/chat/character1.png", "/chat/character2.png"];
    const randomAvatar = AVATARS[Math.floor(Math.random() * AVATARS.length)];
    setAiAvatar(randomAvatar);
  }, []);

  // Mock chat data - replace with real data later
  const messages = [
    { type: "ai" as const, content: "ai chat", showAvatar: true },
    { type: "user" as const, content: "user chat", showAvatar: false },
    { type: "user" as const, content: "user chat", showAvatar: false },
    { type: "ai" as const, content: "ai chat", showAvatar: true },
  ];

  const handleSendMessage = (message: string) => {
    console.log("Send message:", message);
    // TODO: Implement actual message sending logic
  };

  return (
    <div className="relative w-full max-[1919px]:h-[133.33vh] h-screen bg-neutral-900 overflow-hidden">
      {/* Skip to main content link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-[16px] focus:left-[16px] focus:z-[9999] focus:px-[16px] focus:py-[8px] focus:bg-primary focus:text-background focus:rounded-[8px] focus:font-semibold"
      >
        Skip to main content
      </a>

      {/* Header - Always visible on top */}
      <ViewerHeader />

      {/* Main content area - fills remaining viewport */}
      <main
        id="main-content"
        className="flex absolute inset-x-0 top-[102px] bottom-0"
      >
        {/* Left Sidebar */}
        <ChatSidebar />

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
            {messages.map((message, index) => (
              <ChatMessage
                key={index}
                type={message.type}
                content={message.content}
                showAvatar={message.showAvatar}
                avatar={message.type === "ai" ? aiAvatar : undefined}
              />
            ))}
          </div>

          {/* Chat Input - Fixed at bottom */}
          <div className="flex justify-center pb-[40px] px-[80px]">
            <ChatInput onSend={handleSendMessage} />
          </div>
        </div>
      </main>
    </div>
  );
}
