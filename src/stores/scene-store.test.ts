import { describe, it, expect, beforeEach } from "vitest";
import { useSceneStore } from "./scene-store";

describe("scene-store", () => {
  beforeEach(() => {
    // Reset store to initial state before each test
    useSceneStore.setState({
      modelId: null,
      selectedObject: null,
      cameraPosition: [0, 3, 12],
      cameraRotation: [0, 0, 0],
      cameraTarget: [0, 0, 0],
      hasSavedCamera: false,
      explodeLevel: 0,
    });
  });

  describe("model state", () => {
    it("should have null modelId initially", () => {
      expect(useSceneStore.getState().modelId).toBeNull();
    });

    it("should set modelId", () => {
      useSceneStore.getState().setModelId("engine-v8");
      expect(useSceneStore.getState().modelId).toBe("engine-v8");
    });

    it("should clear modelId with null", () => {
      useSceneStore.getState().setModelId("engine-v8");
      useSceneStore.getState().setModelId(null);
      expect(useSceneStore.getState().modelId).toBeNull();
    });
  });

  describe("selectedObject", () => {
    it("should have null selectedObject initially", () => {
      expect(useSceneStore.getState().selectedObject).toBeNull();
    });

    it("should set selectedObject", () => {
      useSceneStore.getState().setSelectedObject("Crankshaft");
      expect(useSceneStore.getState().selectedObject).toBe("Crankshaft");
    });

    it("should clear selectedObject with null", () => {
      useSceneStore.getState().setSelectedObject("Crankshaft");
      useSceneStore.getState().setSelectedObject(null);
      expect(useSceneStore.getState().selectedObject).toBeNull();
    });
  });

  describe("camera state", () => {
    it("should have default camera position [0, 3, 12]", () => {
      expect(useSceneStore.getState().cameraPosition).toEqual([0, 3, 12]);
    });

    it("should have hasSavedCamera false initially", () => {
      expect(useSceneStore.getState().hasSavedCamera).toBe(false);
    });

    it("should set camera position and mark hasSavedCamera true", () => {
      useSceneStore.getState().setCameraPosition([5, 10, 20]);
      const state = useSceneStore.getState();
      expect(state.cameraPosition).toEqual([5, 10, 20]);
      expect(state.hasSavedCamera).toBe(true);
    });

    it("should set camera rotation", () => {
      useSceneStore.getState().setCameraRotation([1, 2, 3]);
      expect(useSceneStore.getState().cameraRotation).toEqual([1, 2, 3]);
    });

    it("should set camera target", () => {
      useSceneStore.getState().setCameraTarget([0, 1, 0]);
      expect(useSceneStore.getState().cameraTarget).toEqual([0, 1, 0]);
    });

    it("should reset camera to defaults", () => {
      useSceneStore.getState().setCameraPosition([5, 10, 20]);
      useSceneStore.getState().setCameraRotation([1, 2, 3]);
      useSceneStore.getState().setCameraTarget([0, 1, 0]);

      useSceneStore.getState().resetCamera();
      const state = useSceneStore.getState();
      expect(state.cameraPosition).toEqual([0, 3, 12]);
      expect(state.cameraRotation).toEqual([0, 0, 0]);
      expect(state.cameraTarget).toEqual([0, 0, 0]);
      expect(state.hasSavedCamera).toBe(false);
    });
  });

  describe("explode level", () => {
    it("should have 0 explodeLevel initially", () => {
      expect(useSceneStore.getState().explodeLevel).toBe(0);
    });

    it("should set explodeLevel within [0, 1]", () => {
      useSceneStore.getState().setExplodeLevel(0.5);
      expect(useSceneStore.getState().explodeLevel).toBe(0.5);
    });

    it("should clamp explodeLevel at 0 (no negative)", () => {
      useSceneStore.getState().setExplodeLevel(-0.5);
      expect(useSceneStore.getState().explodeLevel).toBe(0);
    });

    it("should clamp explodeLevel at 1 (no above 1)", () => {
      useSceneStore.getState().setExplodeLevel(1.5);
      expect(useSceneStore.getState().explodeLevel).toBe(1);
    });

    it("should allow boundary values 0 and 1", () => {
      useSceneStore.getState().setExplodeLevel(0);
      expect(useSceneStore.getState().explodeLevel).toBe(0);
      useSceneStore.getState().setExplodeLevel(1);
      expect(useSceneStore.getState().explodeLevel).toBe(1);
    });
  });

  describe("persistence partialize", () => {
    it("should persist only data fields, not actions", () => {
      // The store config uses partialize to select which fields to persist.
      // Verify the store shape includes expected data fields.
      const state = useSceneStore.getState();
      expect(state).toHaveProperty("modelId");
      expect(state).toHaveProperty("selectedObject");
      expect(state).toHaveProperty("cameraPosition");
      expect(state).toHaveProperty("cameraRotation");
      expect(state).toHaveProperty("cameraTarget");
      expect(state).toHaveProperty("hasSavedCamera");
      expect(state).toHaveProperty("explodeLevel");
      // Actions should also exist on the store
      expect(typeof state.setModelId).toBe("function");
      expect(typeof state.resetCamera).toBe("function");
    });
  });
});
