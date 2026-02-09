"use client";

/**
 * ViewerZoomSlider Component
 *
 * Bottom explode slider control with zoom buttons.
 * Matches Figma design:
 * - Default: 1200x57px (no part selected)
 * - Compact: 960x57px (part selected)
 * - Track: #d9d9d9 with inset shadow
 * - Thumb: 120x32px, rgba(2,238,225,0.3) bg, 2px cyan border, rounded full
 * - Zoom buttons: 30x30px +/- buttons flanking slider
 *
 * Uses direct pointer events instead of invisible <input> for natural feel.
 *
 * @see {@link https://www.figma.com/design/Vz80RydxWcYHVnn2iuyV0m?node-id=160-576} Figma Design
 */

import { useRef, useCallback, useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { useSceneStore } from "@/stores/scene-store";
import { Minus, Plus } from "lucide-react";

interface ViewerZoomSliderProps {
  className?: string;
  compact?: boolean;
}

const THUMB_WIDTH = 120;

export function ViewerZoomSlider({
  className,
  compact = false,
}: ViewerZoomSliderProps) {
  const explodeLevel = useSceneStore((state) => state.explodeLevel);
  const setExplodeLevel = useSceneStore((state) => state.setExplodeLevel);
  const trackRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const isDraggingRef = useRef(false);
  const sliderWidth = compact ? 720 : 900;

  const clamp = (v: number, min: number, max: number) =>
    Math.min(max, Math.max(min, v));

  const pointerToValue = useCallback(
    (clientX: number) => {
      if (!trackRef.current) return explodeLevel;
      const rect = trackRef.current.getBoundingClientRect();
      // Usable range: track width minus thumb width (thumb center stays within track)
      const usable = rect.width - THUMB_WIDTH;
      const x = clientX - rect.left - THUMB_WIDTH / 2;
      return clamp(x / usable, 0, 1);
    },
    [explodeLevel]
  );

  const handlePointerDown = useCallback(
    (e: React.PointerEvent) => {
      e.preventDefault();
      (e.target as HTMLElement).setPointerCapture(e.pointerId);
      isDraggingRef.current = true;
      setIsDragging(true);
      setExplodeLevel(pointerToValue(e.clientX));
    },
    [pointerToValue, setExplodeLevel]
  );

  const handlePointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!isDraggingRef.current) return;
      setExplodeLevel(pointerToValue(e.clientX));
    },
    [pointerToValue, setExplodeLevel]
  );

  const handlePointerUp = useCallback(() => {
    isDraggingRef.current = false;
    setIsDragging(false);
  }, []);

  // Keyboard support for accessibility
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      const step = e.shiftKey ? 0.1 : 0.01;
      if (e.key === "ArrowRight" || e.key === "ArrowUp") {
        e.preventDefault();
        setExplodeLevel(clamp(explodeLevel + step, 0, 1));
      } else if (e.key === "ArrowLeft" || e.key === "ArrowDown") {
        e.preventDefault();
        setExplodeLevel(clamp(explodeLevel - step, 0, 1));
      } else if (e.key === "Home") {
        e.preventDefault();
        setExplodeLevel(0);
      } else if (e.key === "End") {
        e.preventDefault();
        setExplodeLevel(1);
      }
    },
    [explodeLevel, setExplodeLevel]
  );

  // Clean up drag state if pointer leaves window
  useEffect(() => {
    const handleGlobalUp = () => {
      if (isDraggingRef.current) {
        isDraggingRef.current = false;
        setIsDragging(false);
      }
    };
    window.addEventListener("pointerup", handleGlobalUp);
    return () => window.removeEventListener("pointerup", handleGlobalUp);
  }, []);

  const handleZoomIn = () => {
    setExplodeLevel(Math.min(1, explodeLevel + 0.1));
  };

  const handleZoomOut = () => {
    setExplodeLevel(Math.max(0, explodeLevel - 0.1));
  };

  return (
    <div
      className={cn(
        "h-[57px] overflow-hidden relative flex items-center gap-[20px]",
        className
      )}
      role="group"
      aria-label="Explode view control"
    >
      {/* Zoom out button */}
      <button
        onClick={handleZoomOut}
        className="w-[44px] h-[44px] flex items-center justify-center rounded-full bg-background border-[2px] border-primary text-primary hover:bg-primary hover:text-background transition-all duration-150 focus-visible:ring-[2px] focus-visible:ring-primary focus-visible:ring-offset-[2px] disabled:opacity-30 disabled:cursor-not-allowed"
        aria-label="Zoom out"
        disabled={explodeLevel === 0}
      >
        <Minus className="w-[16px] h-[16px]" />
      </button>

      {/* Slider container — handles all pointer events */}
      <div
        ref={trackRef}
        className="h-[57px] overflow-hidden relative cursor-pointer touch-none"
        style={{ width: `${sliderWidth}px` }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        onKeyDown={handleKeyDown}
        role="slider"
        tabIndex={0}
        aria-label="Explode level"
        aria-valuemin={0}
        aria-valuemax={1}
        aria-valuenow={Math.round(explodeLevel * 100) / 100}
        aria-valuetext={`${Math.round(explodeLevel * 100)}%`}
      >
        {/* Track background container with padding */}
        <div className="absolute left-0 top-[10.5px] w-full flex flex-col items-start p-[10px]">
          {/* Track */}
          <div className="h-[16px] bg-neutral-200 rounded-full relative w-full shadow-track-inset" />
        </div>

        {/* Custom thumb — visual only, pointer events handled by parent */}
        <div
          className={cn(
            "absolute top-[12.5px] h-[32px] w-[120px] bg-primary-30 border-[2px] border-primary rounded-full pointer-events-none shadow-slider-thumb",
            isDragging && "scale-110 shadow-lg"
          )}
          style={{
            left: `${explodeLevel * (sliderWidth - THUMB_WIDTH)}px`,
            transition: isDragging ? "none" : "left 150ms ease-out",
          }}
        />
      </div>

      {/* Zoom in button */}
      <button
        onClick={handleZoomIn}
        className="w-[44px] h-[44px] flex items-center justify-center rounded-full bg-background border-[2px] border-primary text-primary hover:bg-primary hover:text-background transition-all duration-150 focus-visible:ring-[2px] focus-visible:ring-primary focus-visible:ring-offset-[2px] disabled:opacity-30 disabled:cursor-not-allowed"
        aria-label="Zoom in"
        disabled={explodeLevel === 1}
      >
        <Plus className="w-[16px] h-[16px]" />
      </button>
    </div>
  );
}
