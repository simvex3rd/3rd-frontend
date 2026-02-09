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
  onNewChat,
}: ChatSidebarProps & { onNewChat?: () => void }) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  // Mock history data - replace with real data later
  const historyItems = [
    "Previous Chat 1",
    "Design Discussion",
    "React Components",
    "Tailwind Config",
    "Three.js Setup",
  ];

  return (
    <aside
      className={`relative flex flex-col h-full transition-all duration-300 ease-in-out ${
        isOpen ? "w-[311px]" : "w-[80px]"
      } ${className || ""}`}
    >
      {/* Glass Background Layer - Identical to ViewerHeader */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 bg-white/5 backdrop-blur-[2px]" />
      </div>

      {/* Toggle Button Area */}
      <div className="p-[24px] pb-0 flex justify-end z-10 relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-[32px] h-[32px] flex items-center justify-center rounded-lg text-neutral-400 hover:text-primary hover:bg-white/5 transition-all"
          aria-label={isOpen ? "Collapse sidebar" : "Expand sidebar"}
        >
          <LucideMenu className="w-[20px] h-[20px]" strokeWidth={2} />
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col gap-[32px] p-[24px] overflow-hidden z-10 relative">
        {/* New Chat Button - Simplified */}
        <button
          onClick={onNewChat}
          className={`group flex items-center gap-[12px] p-[12px] rounded-xl transition-all duration-200 ${
            isOpen ? "hover:bg-white/5" : "justify-center hover:bg-white/5"
          }`}
        >
          <LucideMessageSquarePlus
            className={`w-[20px] h-[20px] transition-colors ${
              isOpen
                ? "text-neutral-400 group-hover:text-primary"
                : "text-neutral-400 group-hover:text-primary"
            }`}
            strokeWidth={2}
          />
          {isOpen && (
            <span className="font-semibold text-[15px] text-neutral-400 group-hover:text-primary whitespace-nowrap transition-colors">
              New Chat
            </span>
          )}
        </button>

        {/* History Section */}
        {isOpen && (
          <div className="flex flex-col gap-[8px] overflow-y-auto min-h-0 animate-in fade-in slide-in-from-left-4 duration-300">
            <h3 className="px-[8px] text-[12px] font-bold text-neutral-500 uppercase tracking-wider mb-[4px]">
              History
            </h3>
            <div className="flex flex-col gap-[2px]">
              {historyItems.map((item, index) => (
                <button
                  key={index}
                  className="group flex w-full items-center px-[12px] py-[10px] rounded-lg hover:bg-white/5 text-left transition-colors"
                >
                  <span className="text-[14px] text-neutral-400 group-hover:text-neutral-50 truncate transition-colors">
                    {item}
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Footer / User Profile could go here */}
    </aside>
  );
}
