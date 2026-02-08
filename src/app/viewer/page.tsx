"use client";

import { SceneCanvas } from "@/components/viewer/SceneCanvas";
import { Model } from "@/components/viewer/Model";
import { ViewerToolbar } from "@/components/viewer/ViewerToolbar";
import { ViewerSideToolbar } from "@/components/viewer/ViewerSideToolbar";
import { ViewerZoomSlider } from "@/components/viewer/ViewerZoomSlider";
import { PartInfoPanel } from "@/components/panels/PartInfoPanel";
import { useStoreHydration } from "@/hooks/use-store-hydration";
import { useSceneStore } from "@/stores/scene-store";

/**
 * Viewer Page - 1920px Layout
 *
 * Matches Figma design node 232-1004 exactly:
 * - Container: 1920x879px with 80px horizontal, 40px vertical padding
 * - Top toolbar: 500x50px centered
 * - Bottom zoom slider: 1200x57px (default) / 960x57px (part clicked)
 * - Right side toolbar: 50x300px rotated 90°
 * - Side panel: 400x750px (when part clicked)
 *
 * @see {@link https://www.figma.com/design/Vz80RydxWcYHVnn2iuyV0m?node-id=232-1004} Figma Design
 */
export default function ViewerPage() {
  const isHydrated = useStoreHydration();
  const selectedObject = useSceneStore((state) => state.selectedObject);
  const hasPartSelected = !!selectedObject;

  return (
    <div className="relative w-[1920px] h-[879px] flex items-center justify-between px-20 py-10">
      {/* Loading state */}
      {!isHydrated && (
        <div className="absolute inset-0 flex items-center justify-center">
          <p className="text-neutral-400">Loading...</p>
        </div>
      )}

      {/* 3D Canvas Background */}
      {isHydrated && (
        <div className="absolute inset-0 z-0">
          <SceneCanvas>
            <Model url="/models/V4_Engine/Crankshaft-draco.glb" />
          </SceneCanvas>
        </div>
      )}

      {/* Main content area - left side */}
      <div
        className={`flex flex-col items-center justify-between z-10 transition-all duration-300 ${
          hasPartSelected ? "w-[960px]" : "w-[1200px]"
        } h-[733px]`}
      >
        {/* Top Toolbar */}
        <ViewerToolbar className="shrink-0" />

        {/* Bottom Zoom Slider */}
        <ViewerZoomSlider className="shrink-0" compact={hasPartSelected} />
      </div>

      {/* Right side - Toolbar or Part Info Panel */}
      {!hasPartSelected && (
        <div className="flex items-center justify-center h-[300px] w-[50px] z-10">
          <div className="rotate-90">
            <ViewerSideToolbar />
          </div>
        </div>
      )}

      {hasPartSelected && <PartInfoPanel />}
    </div>
  );
}
