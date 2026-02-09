"use client";

/**
 * ViewerToolbar Component
 *
 * Top horizontal toolbar with 4 tool icons.
 * Matches Figma design: 500x50px, rgba(212,212,212,0.3) background,
 * 3px cyan border, 16px border radius, 48px gap between icons.
 *
 * Icons (40x40px each):
 * - PhCubeFocusLight: Focus/frame selected object
 * - TablerCube3DSphere: Toggle wireframe/solid view
 * - MdiCameraLockOutline: Lock/unlock camera
 * - ClarityRulerPencilLine: Measurement tool
 *
 * @see {@link https://www.figma.com/design/Vz80RydxWcYHVnn2iuyV0m?node-id=156-922} Figma Design
 */

import { cn } from "@/lib/utils";
import { useUIStore } from "@/stores/ui-store";

interface ViewerToolbarProps {
  className?: string;
}

export function ViewerToolbar({ className }: ViewerToolbarProps) {
  const {
    activeViewerTool,
    setViewerTool,
    isWireframeMode,
    toggleWireframe,
    isCameraLocked,
    toggleCameraLock,
  } = useUIStore();
  return (
    <div
      className={cn(
        "w-[375px] h-[37.5px]",
        "flex items-center justify-center gap-[36px]",
        "bg-gray-30 border-[3px] border-primary rounded-[12px]",
        "px-[120px] py-[12px]",
        "shadow-card-glow",
        "backdrop-blur-sm",
        className
      )}
      role="toolbar"
      aria-label="3D viewer tools"
    >
      {/* Focus Tool */}
      <button
        onClick={() =>
          setViewerTool(activeViewerTool === "focus" ? null : "focus")
        }
        className={cn(
          "w-[44px] h-[44px] flex items-center justify-center text-primary transition-colors",
          "hover:bg-primary/20 hover:text-primary",
          "active:scale-95 active:bg-primary/40",
          "focus-visible:ring-[2px] focus-visible:ring-primary focus-visible:ring-offset-[2px]",
          "disabled:opacity-50 disabled:cursor-not-allowed",
          activeViewerTool === "focus" &&
            "bg-primary/30 ring-[2px] ring-primary"
        )}
        aria-label="Focus selected object"
        title="Focus selected object"
      >
        <svg width="30" height="30" viewBox="0 0 40 40" fill="none">
          <path
            d="M8.75 13.75V8.75H13.75M26.25 8.75H31.25V13.75M31.25 26.25V31.25H26.25M13.75 31.25H8.75V26.25"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {/* Wireframe Toggle */}
      <button
        onClick={toggleWireframe}
        className={cn(
          "w-[44px] h-[44px] flex items-center justify-center text-primary transition-colors",
          "hover:bg-primary/20 hover:text-primary",
          "active:scale-95 active:bg-primary/40",
          "focus-visible:ring-[2px] focus-visible:ring-primary focus-visible:ring-offset-[2px]",
          "disabled:opacity-50 disabled:cursor-not-allowed",
          isWireframeMode && "bg-primary/30 ring-[2px] ring-primary"
        )}
        aria-label="Toggle wireframe view"
        title="Toggle wireframe view"
      >
        <svg width="30" height="30" viewBox="0 0 40 40" fill="none">
          <path
            d="M20 6L32 13V27L20 34L8 27V13L20 6Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {/* Camera Lock */}
      <button
        onClick={toggleCameraLock}
        className={cn(
          "w-[44px] h-[44px] flex items-center justify-center text-primary transition-colors",
          "hover:bg-primary/20 hover:text-primary",
          "active:scale-95 active:bg-primary/40",
          "focus-visible:ring-[2px] focus-visible:ring-primary focus-visible:ring-offset-[2px]",
          "disabled:opacity-50 disabled:cursor-not-allowed",
          isCameraLocked && "bg-primary/30 ring-[2px] ring-primary"
        )}
        aria-label="Lock camera position"
        title="Lock camera position"
      >
        <svg width="30" height="30" viewBox="0 0 40 40" fill="none">
          <path
            d="M20 28C22.7614 28 25 25.7614 25 23C25 20.2386 22.7614 18 20 18C17.2386 18 15 20.2386 15 23C15 25.7614 17.2386 28 20 28Z"
            stroke="currentColor"
            strokeWidth="2"
          />
          <path
            d="M32 15H28L26 12H14L12 15H8C6.89543 15 6 15.8954 6 17V30C6 31.1046 6.89543 32 8 32H32C33.1046 32 34 31.1046 34 30V17C34 15.8954 33.1046 15 32 15Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {/* Measurement Tool */}
      <button
        onClick={() =>
          setViewerTool(activeViewerTool === "measure" ? null : "measure")
        }
        className={cn(
          "w-[44px] h-[44px] flex items-center justify-center text-primary transition-colors",
          "hover:bg-primary/20 hover:text-primary",
          "active:scale-95 active:bg-primary/40",
          "focus-visible:ring-[2px] focus-visible:ring-primary focus-visible:ring-offset-[2px]",
          "disabled:opacity-50 disabled:cursor-not-allowed",
          activeViewerTool === "measure" &&
            "bg-primary/30 ring-[2px] ring-primary"
        )}
        aria-label="Measure distances"
        title="Measure distances"
      >
        <svg width="30" height="30" viewBox="0 0 40 40" fill="none">
          <path
            d="M10 8L32 30M10 8V16M10 8H18M32 30H24M32 30V22"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </div>
  );
}
