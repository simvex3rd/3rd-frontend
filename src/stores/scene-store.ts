import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface SceneState {
  selectedObject: string | null;
  setSelectedObject: (id: string | null) => void;
  cameraPosition: [number, number, number];
  setCameraPosition: (position: [number, number, number]) => void;
}

export const useSceneStore = create<SceneState>()(
  devtools(
    (set) => ({
      selectedObject: null,
      setSelectedObject: (id) => set({ selectedObject: id }),
      cameraPosition: [0, 0, 5],
      setCameraPosition: (position) => set({ cameraPosition: position }),
    }),
    { name: "SceneStore" }
  )
);
