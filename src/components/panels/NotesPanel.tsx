"use client";

import { useState, useEffect, useRef } from "react";
import { useSceneStore } from "@/stores/scene-store";
import { api } from "@/lib/api";
import type { PartWithGeometry } from "@/types/api";

/** Resolve mesh name to human-readable part name from model parts list */
function resolvePartName(meshName: string, parts: PartWithGeometry[]): string {
  // 1. Exact name match
  const exact = parts.find(
    (p) => p.name?.toLowerCase() === meshName.toLowerCase()
  );
  if (exact?.name) return exact.name;

  // 2. Numeric index match (mesh "1" → parts[0])
  const num = parseInt(meshName, 10);
  if (!isNaN(num) && num >= 1 && num <= parts.length) {
    const byIndex = parts[num - 1];
    if (byIndex?.name) return byIndex.name;
  }

  // 3. Partial match (mesh name contains part name or vice versa)
  const partial = parts.find(
    (p) =>
      p.name &&
      (meshName.toLowerCase().includes(p.name.toLowerCase()) ||
        p.name.toLowerCase().includes(meshName.toLowerCase()))
  );
  if (partial?.name) return partial.name;

  // 4. Fallback
  return meshName;
}

export function NotesPanel() {
  const selectedPart = useSceneStore((state) => state.selectedObject);
  const modelId = useSceneStore((state) => state.modelId);
  const [note, setNote] = useState("");
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [displayName, setDisplayName] = useState<string>("");
  const [parts, setParts] = useState<PartWithGeometry[]>([]);
  // Track which part the current note belongs to (prevents saving to wrong part on blur)
  const notePartRef = useRef<string | null>(null);

  // Load model parts for name resolution
  useEffect(() => {
    if (!modelId) return;
    let cancelled = false;
    api.models
      .getDetail(modelId)
      .then((detail) => {
        if (!cancelled) setParts(detail.parts);
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, [modelId]);

  // Load note when part is selected
  useEffect(() => {
    if (!selectedPart || !modelId) return;

    // Reset immediately to prevent stale content from previous part
    setNote("");
    setLastSaved(null);
    setDisplayName(resolvePartName(selectedPart, parts));

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
  }, [selectedPart, modelId, parts]);

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
            {displayName}
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
