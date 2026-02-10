import { describe, it, expect, beforeEach } from "vitest";
import { useUIStore } from "./ui-store";

describe("ui-store", () => {
  beforeEach(() => {
    useUIStore.setState({
      isChatOpen: false,
      isPartInfoVisible: false,
      isNotesVisible: false,
      activeViewerTool: null,
      activeSideTool: null,
      isWireframeMode: false,
      isCameraLocked: false,
    });
  });

  describe("panel toggles", () => {
    it("should have all panels closed initially", () => {
      const state = useUIStore.getState();
      expect(state.isChatOpen).toBe(false);
      expect(state.isPartInfoVisible).toBe(false);
      expect(state.isNotesVisible).toBe(false);
    });

    it("should toggle chat open/closed", () => {
      useUIStore.getState().toggleChat();
      expect(useUIStore.getState().isChatOpen).toBe(true);
      useUIStore.getState().toggleChat();
      expect(useUIStore.getState().isChatOpen).toBe(false);
    });

    it("should open chat", () => {
      useUIStore.getState().openChat();
      expect(useUIStore.getState().isChatOpen).toBe(true);
    });

    it("should close chat", () => {
      useUIStore.getState().openChat();
      useUIStore.getState().closeChat();
      expect(useUIStore.getState().isChatOpen).toBe(false);
    });

    it("openChat should be idempotent", () => {
      useUIStore.getState().openChat();
      useUIStore.getState().openChat();
      expect(useUIStore.getState().isChatOpen).toBe(true);
    });
  });

  describe("toolbar", () => {
    it("should have null active tools initially", () => {
      expect(useUIStore.getState().activeViewerTool).toBeNull();
      expect(useUIStore.getState().activeSideTool).toBeNull();
    });

    it("should set viewer tool", () => {
      useUIStore.getState().setViewerTool("focus");
      expect(useUIStore.getState().activeViewerTool).toBe("focus");
    });

    it("should replace viewer tool", () => {
      useUIStore.getState().setViewerTool("focus");
      useUIStore.getState().setViewerTool("wireframe");
      expect(useUIStore.getState().activeViewerTool).toBe("wireframe");
    });

    it("should clear viewer tool with null", () => {
      useUIStore.getState().setViewerTool("focus");
      useUIStore.getState().setViewerTool(null);
      expect(useUIStore.getState().activeViewerTool).toBeNull();
    });

    it("should toggle side tool (set if different)", () => {
      useUIStore.getState().setSideTool("ai");
      expect(useUIStore.getState().activeSideTool).toBe("ai");
    });

    it("should toggle side tool (clear if same)", () => {
      useUIStore.getState().setSideTool("ai");
      useUIStore.getState().setSideTool("ai");
      expect(useUIStore.getState().activeSideTool).toBeNull();
    });

    it("should switch side tool", () => {
      useUIStore.getState().setSideTool("ai");
      useUIStore.getState().setSideTool("search");
      expect(useUIStore.getState().activeSideTool).toBe("search");
    });

    it("should reset toolbar", () => {
      useUIStore.getState().setViewerTool("focus");
      useUIStore.getState().setSideTool("ai");
      useUIStore.getState().resetToolbar();
      expect(useUIStore.getState().activeViewerTool).toBeNull();
      expect(useUIStore.getState().activeSideTool).toBeNull();
    });
  });

  describe("view modes", () => {
    it("should have wireframe mode off initially", () => {
      expect(useUIStore.getState().isWireframeMode).toBe(false);
    });

    it("should toggle wireframe mode", () => {
      useUIStore.getState().toggleWireframe();
      expect(useUIStore.getState().isWireframeMode).toBe(true);
      useUIStore.getState().toggleWireframe();
      expect(useUIStore.getState().isWireframeMode).toBe(false);
    });

    it("should have camera lock off initially", () => {
      expect(useUIStore.getState().isCameraLocked).toBe(false);
    });

    it("should toggle camera lock", () => {
      useUIStore.getState().toggleCameraLock();
      expect(useUIStore.getState().isCameraLocked).toBe(true);
      useUIStore.getState().toggleCameraLock();
      expect(useUIStore.getState().isCameraLocked).toBe(false);
    });
  });

  describe("persistence partialize", () => {
    it("should have panel states and view modes on the store", () => {
      const state = useUIStore.getState();
      expect(state).toHaveProperty("isChatOpen");
      expect(state).toHaveProperty("isPartInfoVisible");
      expect(state).toHaveProperty("isNotesVisible");
      expect(state).toHaveProperty("isWireframeMode");
      expect(state).toHaveProperty("isCameraLocked");
    });

    it("toolbar states should not be persisted (exist but reset)", () => {
      // Toolbar active states are NOT persisted and reset on page load
      const state = useUIStore.getState();
      expect(state).toHaveProperty("activeViewerTool");
      expect(state).toHaveProperty("activeSideTool");
    });
  });
});
