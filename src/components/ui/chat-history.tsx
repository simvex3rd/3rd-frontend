"use client";

import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { LucideSearch, LucideTrash2, LucideMessageSquare } from "lucide-react";
import { useState, useMemo } from "react";
import type { HTMLAttributes } from "react";

/**
 * Chat history component with search functionality and date grouping.
 *
 * @component
 * @example
 * ```tsx
 * <ChatHistory
 *   conversations={[
 *     { id: "1", title: "Project Discussion", timestamp: new Date(), preview: "Let's discuss..." },
 *     { id: "2", title: "Bug Report", timestamp: new Date(), preview: "Found an issue..." }
 *   ]}
 *   onSelect={(id) => console.log("Selected:", id)}
 *   onDelete={(id) => console.log("Deleted:", id)}
 * />
 * ```
 *
 * @param {ChatHistoryProps} props - Component props
 * @param {Conversation[]} props.conversations - Array of conversation objects
 * @param {string} [props.selectedId] - Currently selected conversation ID
 * @param {function} [props.onSelect] - Callback when conversation is selected
 * @param {function} [props.onDelete] - Callback when conversation is deleted
 *
 * @see {@link https://figma.com/file/Vz80RydxWcYHVnn2iuyV0m/SIMVEX} Figma Design
 */

export interface Conversation {
  id: string;
  title: string;
  preview: string;
  timestamp: Date;
}

export interface ChatHistoryProps extends Omit<
  HTMLAttributes<HTMLDivElement>,
  "onSelect"
> {
  conversations: Conversation[];
  selectedId?: string;
  onSelect?: (id: string) => void;
  onDelete?: (id: string) => void;
}

interface GroupedConversations {
  today: Conversation[];
  yesterday: Conversation[];
  thisWeek: Conversation[];
  older: Conversation[];
}

function groupByDate(conversations: Conversation[]): GroupedConversations {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  const weekAgo = new Date(today);
  weekAgo.setDate(weekAgo.getDate() - 7);

  const groups: GroupedConversations = {
    today: [],
    yesterday: [],
    thisWeek: [],
    older: [],
  };

  conversations.forEach((conv) => {
    const convDate = new Date(conv.timestamp);
    const convDay = new Date(
      convDate.getFullYear(),
      convDate.getMonth(),
      convDate.getDate()
    );

    if (convDay.getTime() === today.getTime()) {
      groups.today.push(conv);
    } else if (convDay.getTime() === yesterday.getTime()) {
      groups.yesterday.push(conv);
    } else if (convDay >= weekAgo) {
      groups.thisWeek.push(conv);
    } else {
      groups.older.push(conv);
    }
  });

  return groups;
}

export function ChatHistory({
  className,
  conversations,
  selectedId,
  onSelect,
  onDelete,
  ...props
}: ChatHistoryProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredConversations = useMemo(() => {
    if (!searchQuery.trim()) return conversations;

    const query = searchQuery.toLowerCase();
    return conversations.filter(
      (conv) =>
        conv.title.toLowerCase().includes(query) ||
        conv.preview.toLowerCase().includes(query)
    );
  }, [conversations, searchQuery]);

  const groupedConversations = useMemo(
    () => groupByDate(filteredConversations),
    [filteredConversations]
  );

  return (
    <div className={cn("flex h-full flex-col gap-4 p-4", className)} {...props}>
      {/* Search Input */}
      <div className="shrink-0">
        <Input
          placeholder="Search conversations..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          rightIcon={LucideSearch}
          className="w-full"
        />
      </div>

      {/* Conversation List */}
      <div className="flex-1 overflow-y-auto space-y-6">
        {filteredConversations.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center px-4">
            <LucideMessageSquare className="h-12 w-12 text-[var(--gray-400)] mb-4" />
            <p className="text-[var(--gray-500)] text-sm">
              {searchQuery ? "No conversations found" : "No conversations yet"}
            </p>
          </div>
        ) : (
          <>
            {groupedConversations.today.length > 0 && (
              <ConversationGroup
                title="Today"
                conversations={groupedConversations.today}
                selectedId={selectedId}
                onSelect={onSelect}
                onDelete={onDelete}
              />
            )}
            {groupedConversations.yesterday.length > 0 && (
              <ConversationGroup
                title="Yesterday"
                conversations={groupedConversations.yesterday}
                selectedId={selectedId}
                onSelect={onSelect}
                onDelete={onDelete}
              />
            )}
            {groupedConversations.thisWeek.length > 0 && (
              <ConversationGroup
                title="This Week"
                conversations={groupedConversations.thisWeek}
                selectedId={selectedId}
                onSelect={onSelect}
                onDelete={onDelete}
              />
            )}
            {groupedConversations.older.length > 0 && (
              <ConversationGroup
                title="Older"
                conversations={groupedConversations.older}
                selectedId={selectedId}
                onSelect={onSelect}
                onDelete={onDelete}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
}

interface ConversationGroupProps {
  title: string;
  conversations: Conversation[];
  selectedId?: string;
  onSelect?: (id: string) => void;
  onDelete?: (id: string) => void;
}

function ConversationGroup({
  title,
  conversations,
  selectedId,
  onSelect,
  onDelete,
}: ConversationGroupProps) {
  return (
    <div className="space-y-2">
      <h3 className="text-xs font-semibold text-[var(--gray-500)] uppercase tracking-wider px-2">
        {title}
      </h3>
      <div className="space-y-2">
        {conversations.map((conv) => (
          <ConversationCard
            key={conv.id}
            conversation={conv}
            isSelected={conv.id === selectedId}
            onSelect={onSelect}
            onDelete={onDelete}
          />
        ))}
      </div>
    </div>
  );
}

interface ConversationCardProps {
  conversation: Conversation;
  isSelected: boolean;
  onSelect?: (id: string) => void;
  onDelete?: (id: string) => void;
}

function ConversationCard({
  conversation,
  isSelected,
  onSelect,
  onDelete,
}: ConversationCardProps) {
  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    onDelete?.(conversation.id);
  };

  return (
    <Card
      className={cn(
        "p-3 cursor-pointer group relative",
        isSelected &&
          "ring-2 ring-[var(--blue-primary)] bg-[var(--blue-primary)]/5"
      )}
      onClick={() => onSelect?.(conversation.id)}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex-1 min-w-0">
          <h4
            className={cn(
              "text-sm font-medium truncate mb-1",
              isSelected
                ? "text-[var(--blue-primary)]"
                : "text-[var(--bg-dark)]"
            )}
          >
            {conversation.title}
          </h4>
          <p className="text-xs text-[var(--gray-500)] line-clamp-2">
            {conversation.preview}
          </p>
          <p className="text-[10px] text-[var(--gray-400)] mt-2">
            {formatTimestamp(conversation.timestamp)}
          </p>
        </div>
        <button
          onClick={handleDelete}
          className={cn(
            "shrink-0 p-1.5 rounded-md transition-all opacity-0 group-hover:opacity-100",
            "hover:bg-[var(--red-error)]/10 text-[var(--gray-500)] hover:text-[var(--red-error)]"
          )}
          aria-label="Delete conversation"
        >
          <LucideTrash2 className="h-4 w-4" />
        </button>
      </div>
    </Card>
  );
}

function formatTimestamp(date: Date): string {
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? "PM" : "AM";
  const formattedHours = hours % 12 || 12;
  const formattedMinutes = minutes.toString().padStart(2, "0");

  return `${formattedHours}:${formattedMinutes} ${ampm}`;
}
