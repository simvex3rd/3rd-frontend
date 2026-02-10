"use client";

/**
 * ViewerToolbar Component
 *
 * Top horizontal toolbar with 4 tool icons + tooltips.
 * Active state: fillable icons get SVG fill, line icons get circular glow bg.
 * All icons get rounded glow bg on hover/active.
 *
 * @see {@link https://www.figma.com/design/Vz80RydxWcYHVnn2iuyV0m?node-id=156-922} Figma Design
 */

import { cn } from "@/lib/utils";
import { useUIStore } from "@/stores/ui-store";
import { useSceneStore } from "@/stores/scene-store";
import { useToast } from "@/hooks/use-toast";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";

interface ViewerToolbarProps {
  className?: string;
}

export function ViewerToolbar({ className }: ViewerToolbarProps) {
  const activeViewerTool = useUIStore((s) => s.activeViewerTool);
  const setViewerTool = useUIStore((s) => s.setViewerTool);
  const isWireframeMode = useUIStore((s) => s.isWireframeMode);
  const toggleWireframe = useUIStore((s) => s.toggleWireframe);
  const isCameraLocked = useUIStore((s) => s.isCameraLocked);
  const toggleCameraLock = useUIStore((s) => s.toggleCameraLock);
  const isColorMode = useUIStore((s) => s.isColorMode);
  const toggleColorMode = useUIStore((s) => s.toggleColorMode);
  const hasColorData = useSceneStore((s) => s.hasColorData);
  const { toast } = useToast();

  const isFocusActive = activeViewerTool === "focus";

  return (
    <div
      className={cn(
        "w-[400px] h-[64px]",
        "flex items-center justify-center gap-[32px]",
        "bg-gray-30 border-[3px] border-primary rounded-[12px]",
        "px-[40px] py-[10px]",
        "shadow-card-glow",
        "backdrop-blur-sm",
        className
      )}
      role="toolbar"
      aria-label="3D viewer tools"
    >
      {/* Focus Tool — line icon */}
      <Tooltip>
        <TooltipTrigger asChild>
          <button
            onClick={() => setViewerTool(isFocusActive ? null : "focus")}
            className={cn(
              "group w-[44px] h-[44px] flex items-center justify-center text-primary transition-all rounded-full",
              "focus-visible:ring-[2px] focus-visible:ring-primary focus-visible:ring-offset-[2px]",
              "disabled:opacity-50 disabled:cursor-not-allowed",
              "hover:bg-primary/10",
              isFocusActive && "bg-primary/15"
            )}
            aria-label="Focus selected object"
            aria-pressed={isFocusActive}
          >
            <svg width="36" height="36" viewBox="0 0 40 40" fill="none">
              <path
                d="M8.75 13.75V8.75H13.75M26.25 8.75H31.25V13.75M31.25 26.25V31.25H26.25M13.75 31.25H8.75V26.25"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </TooltipTrigger>
        <TooltipContent side="bottom">Focus</TooltipContent>
      </Tooltip>

      {/* Wireframe Toggle — fillable hexagon */}
      <Tooltip>
        <TooltipTrigger asChild>
          <button
            onClick={toggleWireframe}
            className={cn(
              "group w-[44px] h-[44px] flex items-center justify-center text-primary transition-all rounded-full",
              "focus-visible:ring-[2px] focus-visible:ring-primary focus-visible:ring-offset-[2px]",
              "disabled:opacity-50 disabled:cursor-not-allowed",
              "hover:bg-primary/10",
              isWireframeMode && "bg-primary/15"
            )}
            aria-label="Toggle wireframe view"
            aria-pressed={isWireframeMode}
          >
            <svg width="36" height="36" viewBox="0 0 40 40" fill="none">
              <path
                d="M20 6L32 13V27L20 34L8 27V13L20 6Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={cn(
                  "transition-colors",
                  isWireframeMode
                    ? "fill-primary/35 group-hover:fill-primary/45"
                    : "group-hover:fill-primary/15"
                )}
              />
            </svg>
          </button>
        </TooltipTrigger>
        <TooltipContent side="bottom">Wireframe</TooltipContent>
      </Tooltip>

      {/* Camera Lock — fillable */}
      <Tooltip>
        <TooltipTrigger asChild>
          <button
            onClick={toggleCameraLock}
            className={cn(
              "group w-[44px] h-[44px] flex items-center justify-center text-primary transition-all rounded-full",
              "focus-visible:ring-[2px] focus-visible:ring-primary focus-visible:ring-offset-[2px]",
              "disabled:opacity-50 disabled:cursor-not-allowed",
              "hover:bg-primary/10",
              isCameraLocked && "bg-primary/15"
            )}
            aria-label="Lock camera position"
            aria-pressed={isCameraLocked}
          >
            <svg width="36" height="36" viewBox="0 0 40 40" fill="none">
              <path
                d="M20 28C22.7614 28 25 25.7614 25 23C25 20.2386 22.7614 18 20 18C17.2386 18 15 20.2386 15 23C15 25.7614 17.2386 28 20 28Z"
                stroke="currentColor"
                strokeWidth="2"
                className={cn(
                  "transition-colors",
                  isCameraLocked
                    ? "fill-primary/35 group-hover:fill-primary/45"
                    : "group-hover:fill-primary/15"
                )}
              />
              <path
                d="M32 15H28L26 12H14L12 15H8C6.89543 15 6 15.8954 6 17V30C6 31.1046 6.89543 32 8 32H32C33.1046 32 34 31.1046 34 30V17C34 15.8954 33.1046 15 32 15Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={cn(
                  "transition-colors",
                  isCameraLocked
                    ? "fill-primary/35 group-hover:fill-primary/45"
                    : "group-hover:fill-primary/15"
                )}
              />
            </svg>
          </button>
        </TooltipTrigger>
        <TooltipContent side="bottom">Camera Lock</TooltipContent>
      </Tooltip>

      {/* Color Mode Toggle — fillable palette */}
      <Tooltip>
        <TooltipTrigger asChild>
          <button
            onClick={() => {
              if (!hasColorData) {
                toast.info("색상 미지원", "아직 지원하지 않는 모델이에요 ㅜㅜ");
                return;
              }
              toggleColorMode();
            }}
            className={cn(
              "group w-[44px] h-[44px] flex items-center justify-center text-primary transition-all rounded-full",
              "focus-visible:ring-[2px] focus-visible:ring-primary focus-visible:ring-offset-[2px]",
              "disabled:opacity-50 disabled:cursor-not-allowed",
              "hover:bg-primary/10",
              isColorMode && hasColorData && "bg-primary/15",
              !hasColorData && "opacity-40"
            )}
            aria-label="Toggle color mode"
            aria-pressed={isColorMode}
          >
            <svg width="36" height="36" viewBox="0 0 40 40" fill="none">
              <path
                d="M20 4C11.16 4 4 11.16 4 20C4 28.84 11.16 36 20 36C21.1 36 22 35.1 22 34C22 33.5 21.8 33.04 21.48 32.68C21.18 32.34 21 31.9 21 31.4C21 30.3 21.9 29.4 23 29.4H26C31.52 29.4 36 24.92 36 19.4C36 10.88 28.84 4 20 4Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={cn(
                  "transition-colors",
                  isColorMode && hasColorData
                    ? "fill-primary/35 group-hover:fill-primary/45"
                    : "group-hover:fill-primary/15"
                )}
              />
              <circle
                cx="13"
                cy="17"
                r="2.5"
                fill="currentColor"
                opacity="0.7"
              />
              <circle
                cx="20"
                cy="12"
                r="2.5"
                fill="currentColor"
                opacity="0.7"
              />
              <circle
                cx="27"
                cy="17"
                r="2.5"
                fill="currentColor"
                opacity="0.7"
              />
            </svg>
          </button>
        </TooltipTrigger>
        <TooltipContent side="bottom">Color</TooltipContent>
      </Tooltip>
    </div>
  );
}
