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
    <div
      className={cn("flex h-full flex-col gap-[16px] p-[16px]", className)}
      {...props}
    >
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
      <div className="flex-1 overflow-y-auto space-y-[24px]">
        {filteredConversations.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center px-[16px]">
            <LucideMessageSquare className="h-[48px] w-[48px] text-neutral-400 mb-[16px]" />
            <p className="text-neutral-500 text-[14px]">
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
    <div className="space-y-[8px]">
      <h3 className="text-[12px] font-semibold text-neutral-500 uppercase tracking-wider px-[8px]">
        {title}
      </h3>
      <div className="space-y-[8px]">
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
        "p-[12px] cursor-pointer group relative",
        isSelected && "ring-2 ring-info bg-info/5"
      )}
      onClick={() => onSelect?.(conversation.id)}
    >
      <div className="flex items-start justify-between gap-[8px]">
        <div className="flex-1 min-w-0">
          <h4
            className={cn(
              "text-[14px] font-medium truncate mb-[4px]",
              isSelected ? "text-info" : "text-neutral-950"
            )}
          >
            {conversation.title}
          </h4>
          <p className="text-[12px] text-neutral-500 line-clamp-2">
            {conversation.preview}
          </p>
          <p className="text-[10px] text-neutral-400 mt-[8px]">
            {formatTimestamp(conversation.timestamp)}
          </p>
        </div>
        <button
          onClick={handleDelete}
          className={cn(
            "shrink-0 p-[6px] rounded-[6px] transition-all opacity-0 group-hover:opacity-100",
            "hover:bg-error/10 text-neutral-500 hover:text-error"
          )}
          aria-label="Delete conversation"
        >
          <LucideTrash2 className="h-[16px] w-[16px]" />
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
