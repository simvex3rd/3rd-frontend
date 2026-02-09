"use client";

import { useState } from "react";
import { LucideMenu, LucideMessageSquarePlus } from "lucide-react";

/**
 * ChatSidebar - Left sidebar for chat page with collapsible functionality
 *
 * Features:
 * - Hamburger menu icon (toggles sidebar)
 * - New Chat button
 * - History section with list of previous chats
 * - Collapsible: 311px (open) ↔ 80px (collapsed)
 *
 * Design specs:
 * - Width: 311px (open), 80px (collapsed)
 * - Background: gray-40 (#404040)
 * - Padding: 24px
 * - Gap: 48px between sections
 *
 * @see {@link https://www.figma.com/design/Vz80RydxWcYHVnn2iuyV0m?node-id=376-1360} Figma - Open
 * @see {@link https://www.figma.com/design/Vz80RydxWcYHVnn2iuyV0m?node-id=236-1536} Figma - Collapsed
 */

interface ChatSidebarProps {
  className?: string;
  defaultOpen?: boolean;
}

export function ChatSidebar({
  className,
  defaultOpen = true,
}: ChatSidebarProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

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
      className={`flex flex-col gap-[48px] h-full bg-gray-40 p-[24px] transition-all duration-300 ${
        isOpen ? "w-[311px]" : "w-[80px]"
      } ${className || ""}`}
    >
      {/* Hamburger Menu - Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-[40px] h-[40px] flex items-center justify-center text-white hover:text-primary transition-colors shrink-0"
        aria-label={isOpen ? "Collapse sidebar" : "Expand sidebar"}
      >
        <LucideMenu className="w-[40px] h-[40px]" strokeWidth={2} />
      </button>

      {/* Main Content - Only visible when open */}
      {isOpen && (
        <div className="flex flex-col gap-[48px] flex-1 overflow-hidden">
          {/* New Chat Button */}
          <button className="flex items-center gap-[8px] p-[7px] rounded-[8px] hover:bg-gray-30 transition-colors">
            <LucideMessageSquarePlus
              className="w-[24px] h-[24px] text-white shrink-0"
              strokeWidth={2}
            />
            <span className="font-semibold text-[16px] leading-[1.5] text-white whitespace-nowrap">
              New Chat
            </span>
          </button>

          {/* History Section */}
          <div className="flex flex-col gap-[7px] overflow-y-auto">
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
      )}

      {/* Collapsed State - Only show icon */}
      {!isOpen && (
        <button
          className="flex items-center justify-center p-[7px] rounded-[8px] hover:bg-gray-30 transition-colors shrink-0"
          aria-label="New Chat"
        >
          <LucideMessageSquarePlus
            className="w-[24px] h-[24px] text-white"
            strokeWidth={2}
          />
        </button>
      )}
    </aside>
  );
}
