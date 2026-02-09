import { create } from "zustand";
import { devtools, persist, createJSONStorage } from "zustand/middleware";

/**
 * 3D scene state management store
 *
 * Manages the state of the 3D viewer including:
 * - Current model and selected parts
 * - Camera position, rotation, and target (persisted to localStorage)
 * - Explode animation level
 *
 * State is persisted to localStorage and restored on page reload.
 * Uses Zustand devtools for debugging in browser extensions.
 */
interface SceneState {
  // 모델 상태
  /** Currently loaded model ID */
  modelId: string | null;
  /** Set the active model ID */
  setModelId: (id: string | null) => void;

  // 부품 선택
  /** Currently selected 3D object (mesh name) */
  selectedObject: string | null;
  /** Set the selected object by mesh name */
  setSelectedObject: (id: string | null) => void;

  // 카메라 상태
  /** Camera position in 3D space [x, y, z] */
  cameraPosition: [number, number, number];
  /** Camera rotation in Euler angles [x, y, z] */
  cameraRotation: [number, number, number];
  /** OrbitControls target point [x, y, z] */
  cameraTarget: [number, number, number];
  /** Whether camera state has been saved (used to detect first load) */
  hasSavedCamera: boolean;
  /** Update camera position and mark as saved */
  setCameraPosition: (position: [number, number, number]) => void;
  /** Update camera rotation */
  setCameraRotation: (rotation: [number, number, number]) => void;
  /** Update OrbitControls target */
  setCameraTarget: (target: [number, number, number]) => void;
  /** Reset camera to default position and clear saved state */
  resetCamera: () => void;

  // 분해 상태
  /** Explode animation level (0-1, where 0=assembled, 1=fully exploded) */
  explodeLevel: number;
  /** Set explode animation level */
  setExplodeLevel: (level: number) => void;
}

/**
 * Scene store with devtools and localStorage persistence
 *
 * Persists state to localStorage under "simvex-scene-storage" key.
 * skipHydration: true requires manual hydration in client components.
 *
 * @example
 * ```tsx
 * const { selectedObject, setSelectedObject } = useSceneStore();
 * setSelectedObject("Crankshaft");
 * ```
 */
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
        cameraPosition: [0, 3, 12],
        cameraRotation: [0, 0, 0],
        cameraTarget: [0, 0, 0],
        hasSavedCamera: false,
        setCameraPosition: (position) =>
          set({ cameraPosition: position, hasSavedCamera: true }),
        setCameraRotation: (rotation) => set({ cameraRotation: rotation }),
        setCameraTarget: (target) => set({ cameraTarget: target }),
        resetCamera: () =>
          set({
            cameraPosition: [0, 3, 12],
            cameraRotation: [0, 0, 0],
            cameraTarget: [0, 0, 0],
            hasSavedCamera: false,
          }),

        // 분해 상태
        explodeLevel: 0,
        setExplodeLevel: (level) =>
          set({ explodeLevel: Math.max(0, Math.min(1, level)) }),
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
