"use client";

import { useState, useEffect } from "react";
import { api } from "@/lib/api/client";
import { cn } from "@/lib/utils";

interface ChatSession {
  id: string;
  title?: string;
  created_at: string;
}

interface ChatHistoryTabProps {
  onSelectSession: (sessionId: string) => void;
  currentSessionId?: string;
}

export function ChatHistoryTab({
  onSelectSession,
  currentSessionId,
}: ChatHistoryTabProps) {
  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    loadSessions();
  }, []);

  const loadSessions = async () => {
    try {
      const data = await api.chat.listSessions();
      setSessions(data);
    } catch (err) {
      console.error("Failed to load sessions:", err);
    } finally {
      setLoading(false);
    }
  };

  const filteredSessions = sessions.filter((session) =>
    (session.title || "제목 없음")
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-[16px] h-full overflow-y-auto">
      <h3 className="text-[20px] font-semibold text-white mb-[16px]">
        History
      </h3>

      {/* Search */}
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="검색..."
        className="w-full mb-[16px] px-[12px] py-[8px] bg-neutral-700 text-white rounded-[8px] outline-none"
      />

      {/* Sessions list */}
      {loading ? (
        <p className="text-neutral-400">로딩 중...</p>
      ) : filteredSessions.length === 0 ? (
        <p className="text-neutral-400">대화 내역이 없습니다.</p>
      ) : (
        <div className="space-y-2">
          {filteredSessions.map((session) => (
            <button
              key={session.id}
              onClick={() => onSelectSession(session.id)}
              className={cn(
                "w-full p-[12px] text-left rounded-[8px] transition-colors",
                session.id === currentSessionId
                  ? "bg-primary/30 border-2 border-primary"
                  : "bg-neutral-700 hover:bg-neutral-600"
              )}
            >
              <p className="text-white font-medium truncate">
                {session.title || "제목 없음"}
              </p>
              <p className="text-[12px] text-neutral-400 mt-[4px]">
                {new Date(session.created_at).toLocaleString("ko-KR")}
              </p>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
