"use client";

import { useState } from "react";
import { LucidePlus, LucideSend, LucideSettings2 } from "lucide-react";

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
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div
      className={`flex flex-col gap-[10px] w-[1164px] h-[96px] bg-[rgba(64,64,64,0.3)] border-[3px] border-primary rounded-[32px] p-[24px] ${className || ""}`}
    >
      {/* Input Area */}
      <div className="flex items-center gap-[4px] w-full">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder={placeholder}
          className="flex-1 bg-transparent font-normal text-[16px] leading-[1.5] text-white placeholder:text-white/60 outline-none"
        />
        <button
          onClick={handleSend}
          className="w-[160px] h-[160px] flex items-center justify-center text-primary hover:text-primary/80 transition-colors"
          aria-label="Send message"
        >
          <LucideSend className="w-[40px] h-[40px]" strokeWidth={2} />
        </button>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-[24px] p-[10px]">
        <button
          className="w-[25px] h-[25px] flex items-center justify-center text-primary hover:text-primary/80 transition-colors"
          aria-label="Attach file"
        >
          <LucidePlus className="w-[25px] h-[25px]" strokeWidth={2} />
        </button>
        <button
          className="w-[25px] h-[25px] flex items-center justify-center text-primary hover:text-primary/80 transition-colors"
          aria-label="Settings"
        >
          <LucideSettings2 className="w-[25px] h-[25px]" strokeWidth={2} />
        </button>
      </div>
    </div>
  );
}
