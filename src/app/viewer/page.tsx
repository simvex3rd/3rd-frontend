"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { AnimatePresence } from "motion/react";
import { SceneCanvas } from "@/components/viewer/SceneCanvas";
import { ModelOBJ } from "@/components/viewer/ModelOBJ";
import { ViewerToolbar } from "@/components/viewer/ViewerToolbar";
import { ViewerSideToolbar } from "@/components/viewer/ViewerSideToolbar";
import { ViewerZoomSlider } from "@/components/viewer/ViewerZoomSlider";
import { DraggablePanel } from "@/components/viewer/DraggablePanel";
import { NotesPanel } from "@/components/panels/NotesPanel";
import { ChatInterface } from "@/components/panels/ChatInterface";
import { PartInfoPanel } from "@/components/panels/PartInfoPanel";
import { useStoreHydration } from "@/hooks/use-store-hydration";
import { useSceneStore } from "@/stores/scene-store";
import { useUIStore } from "@/stores/ui-store";
import { ViewerHeader } from "@/components/viewer/ViewerHeader";
import { api } from "@/lib/api";

function ViewerContent() {
  const isHydrated = useStoreHydration();
  const activeSideTool = useUIStore((state) => state.activeSideTool);
  const setSideTool = useUIStore((state) => state.setSideTool);
  const searchParams = useSearchParams();
  const modelId = useSceneStore((state) => state.modelId);
  const [modelUrl, setModelUrl] = useState<string | null>(null);
  const [modelError, setModelError] = useState<string | null>(null);

  // Set modelId from URL params (e.g., /viewer?modelId=2)
  useEffect(() => {
    const paramModelId = searchParams.get("modelId");
    useSceneStore.getState().setModelId(paramModelId || "1");
  }, [searchParams]);

  // Fetch model file_url from API when modelId changes
  useEffect(() => {
    if (!modelId) return;
    let cancelled = false;
    setModelUrl(null);
    setModelError(null);

    api.models
      .getDetail(modelId)
      .then((detail) => {
        if (cancelled) return;
        if (detail.file_url) {
          setModelUrl(detail.file_url);
        } else {
          setModelError("3D model file not available");
        }
      })
      .catch((err) => {
        if (!cancelled) setModelError("Failed to load model");
        console.error("Failed to load model detail:", err);
      });

    return () => {
      cancelled = true;
    };
  }, [modelId]);

  const closePanel = () => setSideTool(null);

  return (
    <div className="relative w-full max-[1919px]:h-[133.33vh] h-screen bg-neutral-900 overflow-hidden">
      {/* Skip to main content link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-[16px] focus:left-[16px] focus:z-[9999] focus:px-[16px] focus:py-[8px] focus:bg-primary focus:text-background focus:rounded-[8px] focus:font-semibold"
      >
        Skip to main content
      </a>

      {/* Header - Always visible on top */}
      <ViewerHeader />

      {/* Loading state */}
      {!isHydrated && (
        <div className="absolute inset-0 flex items-center justify-center z-50 pointer-events-none">
          <p className="text-neutral-400">Loading...</p>
        </div>
      )}

      {/* Main content area */}
      <main id="main-content">
        {/* 3D Canvas Background (z-0) - Full viewport with scale compensation */}
        {isHydrated && (
          <div
            className="absolute left-1/2 top-1/2 z-0"
            style={{
              width: "100vw",
              height: "100vh",
              transform: "translate(-50%, -50%) scale(1.3333)",
            }}
          >
            <SceneCanvas>{modelUrl && <ModelOBJ url={modelUrl} />}</SceneCanvas>
            {modelError && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <p className="text-neutral-400 text-[16px]">{modelError}</p>
              </div>
            )}
          </div>
        )}

        {/* Top Toolbar */}
        <div className="absolute top-[142px] left-1/2 -translate-x-1/2 pointer-events-auto z-10">
          <ViewerToolbar />
        </div>

        {/* Side Toolbar */}
        <div className="absolute right-[40px] top-1/2 -translate-y-1/2 pointer-events-auto z-10">
          <div className="rotate-90">
            <ViewerSideToolbar />
          </div>
        </div>

        {/* Zoom Slider */}
        <div className="absolute bottom-[40px] left-1/2 -translate-x-1/2 pointer-events-auto z-10">
          <ViewerZoomSlider />
        </div>

        {/* Draggable Popup Panels — right-aligned, vertically centered */}
        <AnimatePresence>
          {activeSideTool === "ai" && (
            <DraggablePanel
              key="ai-panel"
              title="AI Assistant"
              onClose={closePanel}
              width={400}
              height={600}
              className="right-[120px] top-[240px]"
            >
              <ChatInterface />
            </DraggablePanel>
          )}

          {activeSideTool === "search" && (
            <DraggablePanel
              key="partinfo-panel"
              title="Part Info"
              onClose={closePanel}
              width={380}
              height={500}
              className="right-[120px] top-[290px]"
            >
              <PartInfoPanel />
            </DraggablePanel>
          )}

          {activeSideTool === "edit" && (
            <DraggablePanel
              key="memo-panel"
              title="Memo"
              onClose={closePanel}
              width={360}
              height={300}
              className="right-[120px] top-[390px]"
            >
              <NotesPanel />
            </DraggablePanel>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}

/**
 * Viewer Page - Full Screen Layout
 *
 * Matches Figma design node 160-774:
 * - Full screen dark background (neutral-900)
 * - Header with Logo and Nav
 * - 3D Canvas in background
 * - Floating UI overlays (Toolbar, Side Toolbar, Slider)
 * - Draggable popup panels (AI Assistant, Part Info, Memo)
 *
 * @see {@link https://www.figma.com/design/Vz80RydxWcYHVnn2iuyV0m?node-id=160-774} Figma Design
 */
export default function ViewerPage() {
  return (
    <Suspense
      fallback={
        <div className="w-full h-screen bg-neutral-900 flex items-center justify-center">
          <p className="text-neutral-400">Loading...</p>
        </div>
      }
    >
      <ViewerContent />
    </Suspense>
  );
}
