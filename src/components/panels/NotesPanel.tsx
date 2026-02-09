"use client";

import { useState, useEffect } from "react";
import { useSceneStore } from "@/stores/scene-store";
import { api } from "@/lib/api/client";

export function NotesPanel() {
  const selectedPart = useSceneStore((state) => state.selectedObject);
  const [note, setNote] = useState("");
  const [lastSaved, setLastSaved] = useState<Date | null>(null);

  // Load note when part is selected
  useEffect(() => {
    if (!selectedPart) return;

    const modelId = "default-model"; // TODO: Get from store
    api.notes
      .get(modelId, selectedPart)
      .then((data) => {
        setNote(data?.content || "");
      })
      .catch((err) => {
        console.error("Failed to load note:", err);
      });
  }, [selectedPart]);

  const handleSave = async () => {
    if (!selectedPart) return;

    try {
      const modelId = "default-model"; // TODO: Get from store
      await api.notes.save(modelId, note, selectedPart);
      setLastSaved(new Date());
    } catch (err) {
      console.error("Failed to save note:", err);
    }
  };

  if (!selectedPart) return null;

  return (
    <div className="absolute left-[1330px] top-[423px] w-[360px] h-[300px] bg-[rgba(2,238,225,0.3)] rounded-[24px] p-[32px] flex flex-col z-20">
      <h3 className="text-white text-[18px] font-semibold mb-[16px]">메모</h3>

      <textarea
        value={note}
        onChange={(e) => setNote(e.target.value)}
        onBlur={handleSave}
        className="flex-1 w-full bg-transparent text-white resize-none outline-none placeholder:text-neutral-300 focus-visible:ring-[2px] focus-visible:ring-primary focus-visible:ring-offset-[2px] rounded-[8px]"
        placeholder="메모를 입력하세요..."
        aria-label="Part notes"
      />

      {lastSaved && (
        <p className="text-[12px] text-neutral-300 mt-[8px]">
          저장됨: {lastSaved.toLocaleTimeString()}
        </p>
      )}
    </div>
  );
}
