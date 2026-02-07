import { cn } from "@/lib/utils";
import type { HTMLAttributes } from "react";

/**
 * Chat sidebar component with chat history list and conversation switching.
 * Displays a list of previous conversations with timestamps and a new chat button.
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
 * @see {@link https://figma.com/file/Vz80RydxWcYHVnn2iuyV0m/SIMVEX} Figma Design - chat side (311x879)
 */

export interface Conversation {
  id: string;
  title: string;
  timestamp: string;
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
        "flex flex-col w-[311px] h-[879px] bg-[var(--gray-100)]/80 backdrop-blur-sm border-r border-[var(--border)]",
        className
      )}
      {...props}
    >
      {/* Header with New Chat Button */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-[var(--border)]">
        <h2 className="font-semibold text-[20px] leading-[1.4] text-white">
          Chat History
        </h2>
        <button
          onClick={onNewChat}
          className={cn(
            "flex items-center justify-center h-[32px] w-[32px] rounded-lg",
            "bg-[var(--primary-cyan)] hover:bg-[var(--primary-cyan-hover)]",
            "active:bg-[var(--primary-cyan-press)] active:scale-95",
            "transition-all duration-200",
            "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--primary-cyan)]"
          )}
          aria-label="New chat"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="text-white"
          >
            <path
              d="M12 5V19M5 12H19"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </div>

      {/* Conversation List */}
      <div className="flex-1 overflow-y-auto">
        {conversations.length === 0 ? (
          <div className="flex items-center justify-center h-full px-6">
            <p className="text-[14px] text-[var(--gray-300)] text-center">
              No conversations yet.
              <br />
              Start a new chat to begin.
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-2 p-4">
            {conversations.map((conversation) => (
              <button
                key={conversation.id}
                onClick={() => onConversationSelect?.(conversation.id)}
                className={cn(
                  "flex flex-col gap-1 px-4 py-3 rounded-lg text-left transition-all duration-200",
                  "hover:bg-white/10 active:bg-white/20",
                  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--primary-cyan)]",
                  conversation.isActive &&
                    "bg-[var(--primary-cyan)]/20 border border-[var(--primary-cyan)]"
                )}
              >
                <span
                  className={cn(
                    "font-medium text-[14px] leading-[1.5] truncate",
                    conversation.isActive
                      ? "text-[var(--primary-cyan)]"
                      : "text-white"
                  )}
                >
                  {conversation.title}
                </span>
                <span className="text-[12px] text-[var(--gray-300)]">
                  {conversation.timestamp}
                </span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Footer (Optional - for settings or user info) */}
      <div className="flex items-center justify-between px-6 py-4 border-t border-[var(--border)]">
        <p className="text-[12px] text-[var(--gray-300)]">
          {conversations.length} conversation{conversations.length !== 1 && "s"}
        </p>
      </div>
    </div>
  );
}
