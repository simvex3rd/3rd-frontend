import { create } from "zustand";
import { devtools, persist, createJSONStorage } from "zustand/middleware";

interface SceneState {
  // Model state
  modelId: string | null;
  setModelId: (id: string | null) => void;

  // Part selection
  selectedObject: string | null;
  setSelectedObject: (id: string | null) => void;

  // Camera state
  cameraPosition: [number, number, number];
  cameraRotation: [number, number, number];
  setCameraPosition: (position: [number, number, number]) => void;
  setCameraRotation: (rotation: [number, number, number]) => void;

  // Explode state
  explodeLevel: number;
  setExplodeLevel: (level: number) => void;

  // Hydration state
  _hasHydrated: boolean;
  _setHasHydrated: (hydrated: boolean) => void;
}

export const useSceneStore = create<SceneState>()(
  devtools(
    persist(
      (set) => ({
        // Model state
        modelId: null,
        setModelId: (id) => set({ modelId: id }),

        // Part selection
        selectedObject: null,
        setSelectedObject: (id) => set({ selectedObject: id }),

        // Camera state
        cameraPosition: [0, 0, 5],
        cameraRotation: [0, 0, 0],
        setCameraPosition: (position) => set({ cameraPosition: position }),
        setCameraRotation: (rotation) => set({ cameraRotation: rotation }),

        // Explode state
        explodeLevel: 0,
        setExplodeLevel: (level) => set({ explodeLevel: level }),

        // Hydration state (internal)
        _hasHydrated: false,
        _setHasHydrated: (hydrated) => set({ _hasHydrated: hydrated }),
      }),
      {
        name: "simvex-scene-storage",
        storage: createJSONStorage(() => localStorage),
        skipHydration: true,
        partialize: (state) => ({
          // Only persist these fields (exclude hydration state)
          modelId: state.modelId,
          selectedObject: state.selectedObject,
          cameraPosition: state.cameraPosition,
          cameraRotation: state.cameraRotation,
          explodeLevel: state.explodeLevel,
        }),
        onRehydrateStorage: () => (state) => {
          if (!state) return;

          state._setHasHydrated(true);
        },
      }
    ),
    { name: "SceneStore" }
  )
);
