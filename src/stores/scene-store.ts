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
      }),
      {
        name: "simvex-scene-storage",
        storage: createJSONStorage(() => localStorage),
        skipHydration: true,
      }
    ),
    { name: "SceneStore" }
  )
);
