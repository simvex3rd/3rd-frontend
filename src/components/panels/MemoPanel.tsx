"use client";

import { useState, useCallback } from "react";
import { LucideX, LucideCheck, LucidePlus } from "lucide-react";
import { useMemoStore } from "@/stores/memo-store";
import { useSceneStore } from "@/stores/scene-store";

/**
 * Memo panel for DraggablePanel in the CAD viewer.
 * Shares the same memo-store as MemoModal on the Study page.
 */
export function MemoPanel() {
  const modelId = useSceneStore((s) => s.modelId) ?? "1";
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
    <div className="flex flex-col h-full p-[16px] gap-[10px]">
      {/* Add button */}
      <button
        onClick={startNew}
        className="flex items-center justify-center gap-[4px] w-full py-[8px] rounded-[8px] bg-primary/20 text-primary text-[13px] hover:bg-primary/30 transition-colors"
      >
        <LucidePlus className="w-[14px] h-[14px]" />
        메모 추가
      </button>

      {/* Edit / New form */}
      {editingId !== null && (
        <div className="flex flex-col gap-[8px] p-[12px] rounded-[12px] bg-neutral-800 border border-neutral-700">
          <textarea
            autoFocus
            value={editContent}
            onChange={(e) => setEditContent(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Escape") handleCancel();
              if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) handleSave();
            }}
            placeholder="메모를 입력하세요..."
            className="w-full min-h-[80px] rounded-[8px] bg-neutral-900 border border-neutral-600 text-white text-[13px] leading-[1.6] p-[10px] resize-none focus:outline-none focus:border-primary"
          />
          <div className="flex justify-end gap-[6px]">
            <button
              onClick={handleCancel}
              className="flex items-center gap-[4px] px-[10px] py-[5px] rounded-[6px] bg-neutral-700 text-neutral-300 text-[12px] hover:bg-neutral-600 transition-colors"
            >
              <LucideX className="w-[12px] h-[12px]" />
              취소
            </button>
            <button
              onClick={handleSave}
              className="flex items-center gap-[4px] px-[10px] py-[5px] rounded-[6px] bg-primary text-white text-[12px] hover:bg-primary/80 transition-colors"
            >
              <LucideCheck className="w-[12px] h-[12px]" />
              저장
            </button>
          </div>
        </div>
      )}

      {/* Memo list */}
      <div className="flex-1 overflow-y-auto flex flex-col gap-[6px]">
        {memos.length === 0 && editingId === null ? (
          <div className="flex items-center justify-center h-full">
            <p className="text-neutral-500 text-[13px]">아직 메모가 없어요</p>
          </div>
        ) : (
          memos.map((memo) => (
            <div
              key={memo.id}
              className="group relative flex items-start gap-[8px] rounded-[10px] bg-neutral-800 border-l-[3px] border-primary/50 px-[12px] py-[10px] cursor-pointer hover:bg-neutral-750 hover:border-primary transition-colors"
              onClick={() => startEdit(memo.id, memo.content)}
            >
              <p className="flex-1 text-[13px] text-neutral-200 leading-[1.5] whitespace-pre-wrap break-words">
                {memo.content}
              </p>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  memoStore.deleteMemo(modelId, memo.id);
                }}
                className="shrink-0 w-[18px] h-[18px] rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-neutral-500 hover:text-error"
                aria-label="Delete memo"
              >
                <LucideX className="w-[11px] h-[11px]" />
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
