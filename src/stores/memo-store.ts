import { create } from "zustand";
import { devtools, persist, createJSONStorage } from "zustand/middleware";

export interface MemoItem {
  id: string;
  content: string;
  updatedAt: number;
}

interface MemoState {
  /** modelId → MemoItem[] (dynamic, no limit) */
  memos: Record<string, MemoItem[]>;
  getMemos: (modelId: string) => MemoItem[];
  addMemo: (modelId: string, content: string) => void;
  updateMemo: (modelId: string, memoId: string, content: string) => void;
  deleteMemo: (modelId: string, memoId: string) => void;
}

let counter = Date.now();

export const useMemoStore = create<MemoState>()(
  devtools(
    persist(
      (set, get) => ({
        memos: {},

        getMemos: (modelId: string) => get().memos[modelId] ?? [],

        addMemo: (modelId: string, content: string) =>
          set((state) => {
            const list = [...(state.memos[modelId] ?? [])];
            list.push({
              id: `memo-${++counter}`,
              content,
              updatedAt: Date.now(),
            });
            return { memos: { ...state.memos, [modelId]: list } };
          }),

        updateMemo: (modelId: string, memoId: string, content: string) =>
          set((state) => {
            const list = (state.memos[modelId] ?? []).map((m) =>
              m.id === memoId ? { ...m, content, updatedAt: Date.now() } : m
            );
            return { memos: { ...state.memos, [modelId]: list } };
          }),

        deleteMemo: (modelId: string, memoId: string) =>
          set((state) => {
            const list = (state.memos[modelId] ?? []).filter(
              (m) => m.id !== memoId
            );
            return { memos: { ...state.memos, [modelId]: list } };
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
