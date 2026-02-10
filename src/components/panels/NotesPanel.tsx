"use client";

import { useState, useEffect, useRef } from "react";
import { useSceneStore } from "@/stores/scene-store";
import { api } from "@/lib/api";

export function NotesPanel() {
  const selectedPart = useSceneStore((state) => state.selectedObject);
  const modelId = useSceneStore((state) => state.modelId);
  const [note, setNote] = useState("");
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  // Track which part the current note belongs to (prevents saving to wrong part on blur)
  const notePartRef = useRef<string | null>(null);

  // Load note when part is selected
  useEffect(() => {
    if (!selectedPart || !modelId) return;

    // Reset immediately to prevent stale content from previous part
    setNote("");
    setLastSaved(null);

    notePartRef.current = selectedPart;
    let cancelled = false;
    api.notes
      .get(modelId, selectedPart)
      .then((data) => {
        if (!cancelled) setNote(data?.content || "");
      })
      .catch((err) => {
        console.error("Failed to load note:", err);
      });

    return () => {
      cancelled = true;
    };
  }, [selectedPart, modelId]);

  const handleSave = async () => {
    const savePart = notePartRef.current;
    if (!savePart || !modelId) return;

    try {
      await api.notes.save(modelId, note, savePart);
      setLastSaved(new Date());
    } catch (err) {
      console.error("Failed to save note:", err);
    }
  };

  return (
    <div className="flex flex-col h-full p-[20px] gap-[12px]">
      {!selectedPart || !modelId ? (
        <div className="flex items-center justify-center h-full">
          <p className="font-medium text-[13px] text-neutral-500">
            부품을 선택하면 메모를 작성할 수 있어요
          </p>
        </div>
      ) : (
        <>
          <p className="font-medium text-[13px] text-neutral-400">
            {selectedPart}
          </p>
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            onBlur={handleSave}
            className="flex-1 w-full bg-transparent text-neutral-50 text-[14px] leading-[1.6] resize-none outline-none placeholder:text-neutral-500"
            placeholder="메모를 입력하세요..."
            aria-label="Part notes"
          />
          {lastSaved && (
            <p className="text-[11px] text-neutral-500 text-right">
              저장됨: {lastSaved.toLocaleTimeString()}
            </p>
          )}
        </>
      )}
    </div>
  );
}
