"use client";

import { LucideMenu, LucideMessageSquarePlus } from "lucide-react";

/**
 * ChatSidebar - Left sidebar for chat page
 *
 * Features:
 * - Hamburger menu icon
 * - New Chat button
 * - History section with list of previous chats
 *
 * Design specs:
 * - Width: 311px
 * - Background: gray-40 (#404040)
 * - Padding: 24px
 * - Gap: 48px between sections
 */

interface ChatSidebarProps {
  className?: string;
}

export function ChatSidebar({ className }: ChatSidebarProps) {
  // Mock history data - replace with real data later
  const historyItems = [
    "history chat",
    "history chat",
    "history chat",
    "history chat",
    "history chat",
    "history chat",
    "history chat",
  ];

  return (
    <aside
      className={`flex flex-col gap-[48px] w-[311px] h-full bg-gray-40 p-[24px] ${className || ""}`}
    >
      {/* Hamburger Menu */}
      <button
        className="w-[40px] h-[40px] flex items-center justify-center text-white hover:text-primary transition-colors"
        aria-label="Menu"
      >
        <LucideMenu className="w-[40px] h-[40px]" strokeWidth={2} />
      </button>

      {/* Main Content */}
      <div className="flex flex-col gap-[48px] flex-1">
        {/* New Chat Button */}
        <button className="flex items-center gap-[8px] p-[7px] rounded-[8px] hover:bg-gray-30 transition-colors">
          <LucideMessageSquarePlus
            className="w-[24px] h-[24px] text-white"
            strokeWidth={2}
          />
          <span className="font-semibold text-[16px] leading-[1.5] text-white">
            New Chat
          </span>
        </button>

        {/* History Section */}
        <div className="flex flex-col gap-[7px]">
          <h3 className="font-semibold text-[16px] leading-[1.5] text-white mb-[7px]">
            History
          </h3>
          {historyItems.map((item, index) => (
            <button
              key={index}
              className="font-medium text-[14px] leading-[1.5] text-white/80 hover:text-white text-left transition-colors"
            >
              {item}
            </button>
          ))}
        </div>
      </div>
    </aside>
  );
}
