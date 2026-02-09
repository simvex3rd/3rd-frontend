"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";
import { MarkdownRenderer } from "@/components/ui/markdown-renderer";

/**
 * ChatMessage - Chat message bubble component
 *
 * Types:
 * - user: User message (cyan background, aligned right)
 * - ai: AI message (darker teal background, aligned left)
 *
 * Design specs:
 * - User: rgba(2,238,225,0.3), rounded-bl-[16px] rounded-tl-[16px] rounded-tr-[16px]
 * - AI: rgba(1,169,160,0.3), rounded-br-[16px] rounded-tl-[16px] rounded-tr-[16px]
 * - Font: 16px, line-height 1.5
 * - Padding: 16px horizontal, 8px vertical
 */

interface ChatMessageProps {
  type: "user" | "ai";
  content: string;
  showAvatar?: boolean;
  avatar?: string;
  className?: string;
}

export function ChatMessage({
  type,
  content,
  showAvatar = false,
  avatar,
  className,
}: ChatMessageProps & { avatar?: string }) {
  const isUser = type === "user";

  return (
    <div
      className={cn(
        "flex gap-[16px] items-start",
        isUser ? "justify-end" : "justify-start",
        className
      )}
    >
      {/* AI Avatar - left side */}
      {!isUser && showAvatar && (
        <div className="relative w-[79px] h-[69px] shrink-0 bg-transparent rounded-[12px] flex items-center justify-center overflow-hidden">
          {avatar ? (
            <Image src={avatar} alt="AI Avatar" fill className="object-cover" />
          ) : (
            /* Placeholder for penguin avatar */
            <div className="w-[50px] h-[50px] rounded-full bg-primary/20" />
          )}
        </div>
      )}

      {/* Message Bubble */}
      <div
        className={cn(
          "flex items-center justify-between px-[16px] py-[8px] max-w-[611px]",
          isUser
            ? "bg-[rgba(2,238,225,0.3)] rounded-bl-[16px] rounded-tl-[16px] rounded-tr-[16px]"
            : "bg-[rgba(1,169,160,0.3)] rounded-br-[16px] rounded-tl-[16px] rounded-tr-[16px]"
        )}
      >
        {isUser ? (
          <p className="font-normal text-[16px] leading-[1.5] text-white whitespace-pre-wrap">
            {content}
          </p>
        ) : (
          <MarkdownRenderer compact maxWidth="full">
            {content}
          </MarkdownRenderer>
        )}
      </div>

      {/* User Avatar - right side */}
      {isUser && showAvatar && (
        <div className="w-[79px] h-[69px] shrink-0 bg-gray-30 rounded-[12px] flex items-center justify-center">
          {/* Placeholder for user avatar */}
          <div className="w-[50px] h-[50px] rounded-full bg-primary/20" />
        </div>
      )}
    </div>
  );
}
