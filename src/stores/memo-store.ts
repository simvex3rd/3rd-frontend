import { create } from "zustand";
import { devtools, persist, createJSONStorage } from "zustand/middleware";

export interface MemoItem {
  id: string;
  content: string;
  updatedAt: number;
}

interface MemoState {
  /** modelId → MemoItem[] (max 3 per model) */
  memos: Record<string, MemoItem[]>;
  getMemos: (modelId: string) => MemoItem[];
  saveMemo: (modelId: string, slot: number, content: string) => void;
  deleteMemo: (modelId: string, slot: number) => void;
}

const MAX_SLOTS = 3;

function ensureSlots(items: MemoItem[] | undefined): MemoItem[] {
  const arr = items ?? [];
  return Array.from(
    { length: MAX_SLOTS },
    (_, i) => arr[i] ?? { id: `memo-${i}`, content: "", updatedAt: 0 }
  );
}

export const useMemoStore = create<MemoState>()(
  devtools(
    persist(
      (set, get) => ({
        memos: {},

        getMemos: (modelId: string) => ensureSlots(get().memos[modelId]),

        saveMemo: (modelId: string, slot: number, content: string) =>
          set((state) => {
            const slots = ensureSlots(state.memos[modelId]);
            slots[slot] = {
              id: `memo-${slot}`,
              content,
              updatedAt: Date.now(),
            };
            return { memos: { ...state.memos, [modelId]: slots } };
          }),

        deleteMemo: (modelId: string, slot: number) =>
          set((state) => {
            const slots = ensureSlots(state.memos[modelId]);
            slots[slot] = { id: `memo-${slot}`, content: "", updatedAt: 0 };
            return { memos: { ...state.memos, [modelId]: slots } };
          }),
      }),
      {
        name: "simvex-memo-storage",
        storage: createJSONStorage(() => localStorage),
      }
    ),
    { name: "MemoStore" }
  )
);
