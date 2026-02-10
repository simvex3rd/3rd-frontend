"use client";

import { useState, useCallback } from "react";
import {
  LucideX,
  LucideCheck,
  LucidePlus,
  LucideSquarePen,
} from "lucide-react";
import { useMemoStore } from "@/stores/memo-store";

interface MemoModalProps {
  modelId: string;
  onClose: () => void;
}

export function MemoModal({ modelId, onClose }: MemoModalProps) {
  const memoStore = useMemoStore();
  const memos = memoStore.getMemos(modelId);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editContent, setEditContent] = useState("");

  const startNew = useCallback(() => {
    setEditingId("__new__");
    setEditContent("");
  }, []);

  const startEdit = useCallback((id: string, content: string) => {
    setEditingId(id);
    setEditContent(content);
  }, []);

  const handleSave = useCallback(() => {
    if (!editContent.trim()) {
      setEditingId(null);
      return;
    }
    if (editingId === "__new__") {
      memoStore.addMemo(modelId, editContent.trim());
    } else if (editingId) {
      memoStore.updateMemo(modelId, editingId, editContent.trim());
    }
    setEditingId(null);
  }, [editingId, editContent, modelId, memoStore]);

  const handleCancel = useCallback(() => {
    setEditingId(null);
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="relative w-[560px] max-h-[80vh] rounded-[24px] bg-neutral-900 border border-neutral-700 shadow-2xl flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-[24px] py-[16px] border-b border-neutral-700">
          <div className="flex items-center gap-[10px]">
            <LucideSquarePen className="w-[20px] h-[20px] text-primary" />
            <h2 className="font-semibold text-[20px] text-primary">Memo</h2>
            <span className="text-[13px] text-neutral-500">
              {memos.length}개
            </span>
          </div>
          <div className="flex items-center gap-[8px]">
            <button
              onClick={startNew}
              className="flex items-center gap-[4px] px-[12px] py-[6px] rounded-[8px] bg-primary/20 text-primary text-[13px] hover:bg-primary/30 transition-colors"
            >
              <LucidePlus className="w-[14px] h-[14px]" />
              추가
            </button>
            <button
              onClick={onClose}
              className="p-[6px] rounded-[8px] text-neutral-400 hover:text-white hover:bg-neutral-700 transition-colors"
              aria-label="Close memo"
            >
              <LucideX className="w-[20px] h-[20px]" />
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-[20px]">
          {/* Edit / New form */}
          {editingId !== null && (
            <div className="flex flex-col gap-[10px] mb-[16px] p-[16px] rounded-[16px] bg-neutral-800 border border-neutral-700">
              <textarea
                autoFocus
                value={editContent}
                onChange={(e) => setEditContent(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Escape") handleCancel();
                  if (e.key === "Enter" && (e.ctrlKey || e.metaKey))
                    handleSave();
                }}
                placeholder="메모를 입력하세요..."
                className="w-full min-h-[100px] rounded-[10px] bg-neutral-900 border border-neutral-600 text-white text-[14px] leading-[1.6] p-[12px] resize-none focus:outline-none focus:border-primary"
              />
              <div className="flex justify-between items-center">
                <span className="text-[11px] text-neutral-500">
                  Ctrl+Enter로 저장 / Esc로 취소
                </span>
                <div className="flex gap-[8px]">
                  <button
                    onClick={handleCancel}
                    className="flex items-center gap-[4px] px-[12px] py-[6px] rounded-[8px] bg-neutral-700 text-neutral-300 text-[13px] hover:bg-neutral-600 transition-colors"
                  >
                    <LucideX className="w-[14px] h-[14px]" />
                    취소
                  </button>
                  <button
                    onClick={handleSave}
                    className="flex items-center gap-[4px] px-[12px] py-[6px] rounded-[8px] bg-primary text-white text-[13px] hover:bg-primary/80 transition-colors"
                  >
                    <LucideCheck className="w-[14px] h-[14px]" />
                    저장
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Memo list */}
          {memos.length === 0 && editingId === null ? (
            <div className="flex flex-col items-center justify-center py-[60px] gap-[12px]">
              <LucideSquarePen className="w-[32px] h-[32px] text-neutral-600" />
              <p className="text-neutral-500 text-[14px]">아직 메모가 없어요</p>
              <button
                onClick={startNew}
                className="flex items-center gap-[4px] px-[14px] py-[8px] rounded-[8px] bg-primary/20 text-primary text-[13px] hover:bg-primary/30 transition-colors"
              >
                <LucidePlus className="w-[14px] h-[14px]" />첫 메모 작성하기
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-[8px]">
              {memos.map((memo) => (
                <div
                  key={memo.id}
                  className="group relative flex items-start gap-[12px] rounded-[12px] bg-neutral-800 border-l-[3px] border-primary/50 px-[16px] py-[12px] cursor-pointer hover:bg-neutral-750 hover:border-primary transition-colors"
                  onClick={() => startEdit(memo.id, memo.content)}
                >
                  <p className="flex-1 text-[14px] text-neutral-200 leading-[1.6] whitespace-pre-wrap break-words">
                    {memo.content}
                  </p>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      memoStore.deleteMemo(modelId, memo.id);
                    }}
                    className="shrink-0 w-[20px] h-[20px] rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-neutral-500 hover:text-error"
                    aria-label="Delete memo"
                  >
                    <LucideX className="w-[12px] h-[12px]" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
