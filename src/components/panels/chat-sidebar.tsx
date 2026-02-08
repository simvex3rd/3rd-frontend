import { cn } from "@/lib/utils";
import Image from "next/image";
import type { HTMLAttributes } from "react";

/**
 * Chat sidebar component with chat history list and conversation switching.
 * Displays a list of previous conversations with timestamps and a new chat button.
 * Styled according to Figma spec: 311x879px with #404040 background and 160px gap.
 *
 * @component
 * @example
 * ```tsx
 * <ChatSidebar
 *   conversations={[
 *     { id: "1", title: "Previous conversation", timestamp: "2024-01-15 14:30", isActive: false },
 *     { id: "2", title: "Current chat", timestamp: "2024-01-15 15:45", isActive: true }
 *   ]}
 *   onConversationSelect={(id) => console.log('Selected:', id)}
 *   onNewChat={() => console.log('New chat')}
 * />
 * ```
 *
 * @param {ChatSidebarProps} props - Component props
 * @param {Conversation[]} props.conversations - Array of conversation objects
 * @param {function} props.onConversationSelect - Callback when a conversation is selected
 * @param {function} props.onNewChat - Callback when new chat button is clicked
 *
 * @see {@link https://figma.com/file/Vz80RydxWcYHVnn2iuyV0m/SIMVEX} Figma Design - chat side (311x879, node-236:1535)
 */

export interface Conversation {
  id: string;
  title: string;
  timestamp?: string;
  isActive?: boolean;
}

export interface ChatSidebarProps extends HTMLAttributes<HTMLDivElement> {
  conversations?: Conversation[];
  onConversationSelect?: (id: string) => void;
  onNewChat?: () => void;
}

export function ChatSidebar({
  className,
  conversations = [],
  onConversationSelect,
  onNewChat,
  ...props
}: ChatSidebarProps) {
  return (
    <div
      className={cn(
        "flex flex-col w-[311px] h-[879px] bg-neutral-700 p-6 gap-40",
        className
      )}
      {...props}
    >
      {/* Hamburger Icon - 40x40 (상단) */}
      <div className="w-[40px] h-[40px] shrink-0 flex items-center justify-center">
        <Image
          src="/icons/hamburger.svg"
          alt="Menu"
          width={40}
          height={40}
          className="shrink-0"
        />
      </div>

      {/* New Chat + History (하단) */}
      <div className="flex flex-col gap-12 flex-1">
        {/* New Chat Button */}
        <button
          onClick={onNewChat}
          className="flex items-center gap-2 transition-colors hover:opacity-80 active:opacity-60"
          aria-label="New chat"
        >
          <Image
            src="/icons/chat.svg"
            alt="New Chat"
            width={24}
            height={24}
            className="shrink-0"
          />
          <p className="font-semibold text-[16px] leading-[1.5] text-neutral-200">
            New Chat
          </p>
        </button>

        {/* History Section */}
        <div className="flex flex-col gap-1">
          <p className="font-semibold text-[16px] leading-[1.5] text-neutral-200 mb-1">
            History
          </p>

          {conversations.length === 0 ? (
            <p className="font-medium text-[14px] leading-[1.5] text-neutral-300 opacity-60">
              No conversations yet
            </p>
          ) : (
            conversations.slice(0, 7).map((conversation) => (
              <button
                key={conversation.id}
                onClick={() => onConversationSelect?.(conversation.id)}
                className={cn(
                  "font-medium text-[14px] leading-[1.5] text-left transition-colors truncate",
                  conversation.isActive
                    ? "text-primary"
                    : "text-neutral-300 hover:text-neutral-200"
                )}
                title={conversation.title}
              >
                {conversation.title}
              </button>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
