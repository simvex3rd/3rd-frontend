import { create } from "zustand";
import { devtools, persist, createJSONStorage } from "zustand/middleware";

/**
 * UI state management store
 *
 * Manages the state of the UI including:
 * - Panel visibility (Chat, Part Info, Notes)
 * - Toolbar active states (Viewer tools, Side tools)
 * - View modes (Wireframe, Camera Lock)
 *
 * Panel states and view modes are persisted to localStorage.
 * Toolbar active states are NOT persisted (reset on page load).
 * Uses Zustand devtools for debugging in browser extensions.
 */
interface UIState {
  // Panel toggles
  /** Whether the chat panel is open */
  isChatOpen: boolean;
  /** Whether the part info panel is visible */
  isPartInfoVisible: boolean;
  /** Whether the notes panel is visible */
  isNotesVisible: boolean;

  // Toolbar active states
  /** Currently active viewer toolbar tool */
  activeViewerTool: "focus" | "wireframe" | "camera-lock" | "measure" | null;
  /** Currently active side toolbar tool */
  activeSideTool: "ai" | "search" | "edit" | null;

  // View modes
  /** Whether wireframe mode is enabled */
  isWireframeMode: boolean;
  /** Whether camera lock is enabled */
  isCameraLocked: boolean;

  // Actions
  /** Toggle chat panel open/closed */
  toggleChat: () => void;
  /** Open chat panel */
  openChat: () => void;
  /** Close chat panel */
  closeChat: () => void;
  /** Set active viewer toolbar tool (null to clear) */
  setViewerTool: (tool: UIState["activeViewerTool"]) => void;
  /** Set active side toolbar tool (null to clear) */
  setSideTool: (tool: UIState["activeSideTool"]) => void;
  /** Toggle wireframe mode on/off */
  toggleWireframe: () => void;
  /** Toggle camera lock on/off */
  toggleCameraLock: () => void;
  /** Reset all toolbar states to null */
  resetToolbar: () => void;
}

/**
 * UI store with devtools and partial localStorage persistence
 *
 * Persists panel states and view modes to localStorage under "simvex-ui-storage" key.
 * Toolbar active states are NOT persisted and reset to null on page load.
 * skipHydration: true requires manual hydration in client components.
 *
 * @example
 * ```tsx
 * const { isChatOpen, toggleChat } = useUIStore();
 * toggleChat();
 * ```
 */
export const useUIStore = create<UIState>()(
  devtools(
    persist(
      (set) => ({
        // Panel toggles
        isChatOpen: true,
        isPartInfoVisible: false,
        isNotesVisible: false,

        // Toolbar active states
        activeViewerTool: null,
        activeSideTool: null,

        // View modes
        isWireframeMode: false,
        isCameraLocked: false,

        // Actions
        toggleChat: () => set((state) => ({ isChatOpen: !state.isChatOpen })),
        openChat: () => set({ isChatOpen: true }),
        closeChat: () => set({ isChatOpen: false }),
        setViewerTool: (tool) => set({ activeViewerTool: tool }),
        setSideTool: (tool) => set({ activeSideTool: tool }),
        toggleWireframe: () =>
          set((state) => ({ isWireframeMode: !state.isWireframeMode })),
        toggleCameraLock: () =>
          set((state) => ({ isCameraLocked: !state.isCameraLocked })),
        resetToolbar: () =>
          set({ activeViewerTool: null, activeSideTool: null }),
      }),
      {
        name: "simvex-ui-storage",
        storage: createJSONStorage(() => localStorage),
        skipHydration: true,
        partialize: (state) => ({
          // Only persist panel states and view modes
          isChatOpen: state.isChatOpen,
          isPartInfoVisible: state.isPartInfoVisible,
          isNotesVisible: state.isNotesVisible,
          isWireframeMode: state.isWireframeMode,
          isCameraLocked: state.isCameraLocked,
          // DO NOT persist activeViewerTool or activeSideTool
        }),
      }
    ),
    { name: "UIStore" }
  )
);
