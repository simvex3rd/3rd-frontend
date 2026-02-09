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
 * - Background: Glass effect (bg-white/5 + backdrop-blur)
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
      className={`flex flex-col gap-[48px] h-full p-[24px] transition-all duration-300 relative ${
        isOpen ? "w-[311px]" : "w-[80px]"
      } ${className || ""}`}
    >
      {/* Glass Effect Background - Same as ViewerHeader */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden -z-10">
        <div className="absolute inset-0 bg-white/5 backdrop-blur-[2px]" />
      </div>

      {/* Hamburger Menu - Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-[40px] h-[40px] flex items-center justify-center text-[#e5e5e5] hover:text-primary transition-colors shrink-0 relative z-10"
        aria-label={isOpen ? "Collapse sidebar" : "Expand sidebar"}
      >
        <LucideMenu className="w-[40px] h-[40px]" strokeWidth={2} />
      </button>

      {/* Main Content - Only visible when open */}
      {isOpen && (
        <div className="flex flex-col gap-[48px] flex-1 overflow-hidden relative z-10">
          {/* New Chat Button */}
          <button className="flex items-center gap-[8px] p-[7px] rounded-[8px] hover:bg-white/10 transition-colors">
            <LucideMessageSquarePlus
              className="w-[24px] h-[24px] text-[#e5e5e5] shrink-0"
              strokeWidth={2}
            />
            <span className="font-semibold text-[16px] leading-[1.5] text-[#e5e5e5] whitespace-nowrap">
              New Chat
            </span>
          </button>

          {/* History Section */}
          <div className="flex flex-col gap-[7px] overflow-y-auto">
            <h3 className="font-semibold text-[16px] leading-[1.5] text-[#e5e5e5] mb-[7px]">
              History
            </h3>
            {historyItems.map((item, index) => (
              <button
                key={index}
                className="font-medium text-[14px] leading-[1.5] text-[#d4d4d4] hover:text-[#e5e5e5] text-left transition-colors"
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
          className="flex items-center justify-center p-[7px] rounded-[8px] hover:bg-white/10 transition-colors shrink-0 relative z-10"
          aria-label="New Chat"
        >
          <LucideMessageSquarePlus
            className="w-[24px] h-[24px] text-[#e5e5e5]"
            strokeWidth={2}
          />
        </button>
      )}
    </aside>
  );
}
