"use client";

import { SceneCanvas } from "@/components/viewer/SceneCanvas";
import { Model } from "@/components/viewer/Model";
import { ViewerToolbar } from "@/components/viewer/ViewerToolbar";
import { ViewerSideToolbar } from "@/components/viewer/ViewerSideToolbar";
import { ViewerZoomSlider } from "@/components/viewer/ViewerZoomSlider";
import { PartInfoPanel } from "@/components/panels/PartInfoPanel";
import { useStoreHydration } from "@/hooks/use-store-hydration";
import { useSceneStore } from "@/stores/scene-store";
import { ViewerHeader } from "@/components/viewer/ViewerHeader";

/**
 * Viewer Page - Full Screen Layout
 *
 * Matches Figma design node 160-774:
 * - Full screen dark background (neutral-900)
 * - Header with Logo and Nav
 * - 3D Canvas in background
 * - Floating UI overlays (Toolbar, Side Toolbar, Slider)
 *
 * @see {@link https://www.figma.com/design/Vz80RydxWcYHVnn2iuyV0m?node-id=160-774} Figma Design
 */
export default function ViewerPage() {
  const isHydrated = useStoreHydration();
  const selectedObject = useSceneStore((state) => state.selectedObject);
  const hasPartSelected = !!selectedObject;

  return (
    <div className="relative w-full max-[1919px]:h-[133.33vh] h-screen bg-neutral-900 overflow-hidden">
      {/* Header - Always visible on top */}
      <ViewerHeader />

      {/* Loading state */}
      {!isHydrated && (
        <div className="absolute inset-0 flex items-center justify-center z-50 pointer-events-none">
          <p className="text-neutral-400">Loading...</p>
        </div>
      )}

      {/* 3D Canvas Background (z-0) - Large fixed size, centered */}
      {isHydrated && (
        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-0"
          style={{ width: "4000px", height: "2100px" }}
        >
          <SceneCanvas>
            <Model url="/models/V4_Engine/Crankshaft-draco.glb" />
          </SceneCanvas>
        </div>
      )}

      {/* Top Toolbar - 가로 중앙, 헤더 아래 40px */}
      <div className="absolute top-[142px] left-1/2 -translate-x-1/2 pointer-events-auto z-10">
        <ViewerToolbar />
      </div>

      {/* Side Toolbar - 오른쪽 40px, 수직 중앙 */}
      <div className="absolute right-[40px] top-1/2 -translate-y-1/2 pointer-events-auto z-10">
        <div className="rotate-90">
          <ViewerSideToolbar />
        </div>
      </div>

      {/* Zoom Slider - 하단 중앙, 바닥에서 40px */}
      <div className="absolute bottom-[40px] left-1/2 -translate-x-1/2 pointer-events-auto z-10">
        <ViewerZoomSlider compact={hasPartSelected} />
      </div>

      {/* Part Info Panel - Side Overlay */}
      {hasPartSelected && (
        <div className="absolute right-0 top-0 h-full pointer-events-auto z-20">
          <PartInfoPanel />
        </div>
      )}
    </div>
  );
}
