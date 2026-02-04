import { create } from "zustand";
import { devtools, persist, createJSONStorage } from "zustand/middleware";

interface SceneState {
  // 모델 상태
  modelId: string | null;
  setModelId: (id: string | null) => void;

  // 부품 선택
  selectedObject: string | null;
  setSelectedObject: (id: string | null) => void;

  // 카메라 상태
  cameraPosition: [number, number, number];
  cameraRotation: [number, number, number];
  cameraTarget: [number, number, number];
  hasSavedCamera: boolean;
  setCameraPosition: (position: [number, number, number]) => void;
  setCameraRotation: (rotation: [number, number, number]) => void;
  setCameraTarget: (target: [number, number, number]) => void;
  resetCamera: () => void;

  // 분해 상태
  explodeLevel: number;
  setExplodeLevel: (level: number) => void;
}

export const useSceneStore = create<SceneState>()(
  devtools(
    persist(
      (set) => ({
        // 모델 상태
        modelId: null,
        setModelId: (id) => set({ modelId: id }),

        // 부품 선택
        selectedObject: null,
        setSelectedObject: (id) => set({ selectedObject: id }),

        // 카메라 상태
        cameraPosition: [0, 0, 5],
        cameraRotation: [0, 0, 0],
        cameraTarget: [0, 0, 0],
        hasSavedCamera: false,
        setCameraPosition: (position) =>
          set({ cameraPosition: position, hasSavedCamera: true }),
        setCameraRotation: (rotation) => set({ cameraRotation: rotation }),
        setCameraTarget: (target) => set({ cameraTarget: target }),
        resetCamera: () =>
          set({
            cameraPosition: [0, 0, 5],
            cameraRotation: [0, 0, 0],
            cameraTarget: [0, 0, 0],
            hasSavedCamera: false,
          }),

        // 분해 상태
        explodeLevel: 0,
        setExplodeLevel: (level) => set({ explodeLevel: level }),
      }),
      {
        name: "simvex-scene-storage",
        storage: createJSONStorage(() => localStorage),
        skipHydration: true,
        partialize: (state) => ({
          // 이 필드들만 영속화
          modelId: state.modelId,
          selectedObject: state.selectedObject,
          cameraPosition: state.cameraPosition,
          cameraRotation: state.cameraRotation,
          cameraTarget: state.cameraTarget,
          hasSavedCamera: state.hasSavedCamera,
          explodeLevel: state.explodeLevel,
        }),
      }
    ),
    { name: "SceneStore" }
  )
);
