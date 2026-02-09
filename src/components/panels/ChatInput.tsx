"use client";

import { useState } from "react";
import { LucidePlus, LucideSend, LucideSettings2 } from "lucide-react";
import { GradientBorder } from "@/components/ui/GradientBorder";

/**
 * ChatInput - Chat input area at bottom
 *
 * Features:
 * - Text input with placeholder
 * - Send button
 * - Attachment button (+)
 * - Settings button
 *
 * Design specs:
 * - Background: rgba(64,64,64,0.3)
 * - Border: 3px primary (cyan)
 * - Border radius: 32px
 * - Padding: 24px
 * - Width: 1164px
 */

interface ChatInputProps {
  onSend?: (message: string) => void;
  placeholder?: string;
  className?: string;
}

export function ChatInput({
  onSend,
  placeholder = "Ask me anything about your learning",
  className,
}: ChatInputProps) {
  const [message, setMessage] = useState("");

  const handleSend = () => {
    if (message.trim() && onSend) {
      onSend(message);
      setMessage("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey && !e.nativeEvent.isComposing) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div
      className={`relative flex flex-col justify-between w-full h-[127px] bg-[rgba(64,64,64,0.3)] rounded-[32px] p-[24px] gap-[10px] ${className || ""}`}
    >
      <GradientBorder className="rounded-[32px]" />

      {/* Input Area */}
      <div className="flex items-center w-full h-[24px] gap-[4px] z-10">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder={placeholder}
          className="flex-1 bg-transparent font-normal text-[16px] leading-[1.5] text-[#E5E5E5] placeholder:text-neutral-400 outline-none h-full"
        />
        <button
          onClick={handleSend}
          className="w-[24px] h-[24px] flex items-center justify-center text-[#D4D4D4] hover:text-white transition-colors shrink-0"
          aria-label="Send message"
        >
          <LucideSend className="w-[24px] h-[24px]" strokeWidth={2} />
        </button>
      </div>

      {/* Action Buttons (Bottom Left) */}
      <div className="flex items-center gap-[16px] mt-auto z-10">
        <button
          className="w-[24px] h-[24px] flex items-center justify-center text-[#02EEE1] hover:text-[#02EEE1]/80 transition-colors"
          aria-label="Attach file"
        >
          <LucidePlus className="w-[24px] h-[24px]" strokeWidth={2} />
        </button>
        <button
          className="w-[24px] h-[24px] flex items-center justify-center text-[#02EEE1] hover:text-[#02EEE1]/80 transition-colors"
          aria-label="Settings"
        >
          <LucideSettings2 className="w-[24px] h-[24px]" strokeWidth={2} />
        </button>
      </div>
    </div>
  );
}
