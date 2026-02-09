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
 * @see {@link https://www.figma.com/design/Vz80RydxWcYHVnn2iuyV0m?node-id=160-576} Figma Design
 */

import { useState } from "react";
import { cn } from "@/lib/utils";
import { useSceneStore } from "@/stores/scene-store";
import { Minus, Plus } from "lucide-react";

interface ViewerZoomSliderProps {
  className?: string;
  compact?: boolean;
}

export function ViewerZoomSlider({
  className,
  compact = false,
}: ViewerZoomSliderProps) {
  const explodeLevel = useSceneStore((state) => state.explodeLevel);
  const setExplodeLevel = useSceneStore((state) => state.setExplodeLevel);
  const [isDragging, setIsDragging] = useState(false);
  const sliderWidth = compact ? 720 : 900; // 960*0.75=720, 1200*0.75=900

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setExplodeLevel(Number(e.target.value));
  };

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
        className="w-[44px] h-[44px] flex items-center justify-center rounded-full bg-background border-[2px] border-primary text-primary hover:bg-primary hover:text-background transition-all duration-150 focus-visible:ring-[2px] focus-visible:ring-primary focus-visible:ring-offset-[2px]"
        aria-label="Zoom out"
        disabled={explodeLevel === 0}
      >
        <Minus className="w-[16px] h-[16px]" />
      </button>

      {/* Slider container */}
      <div
        className="h-[57px] overflow-hidden relative"
        style={{ width: `${sliderWidth}px` }}
      >
        {/* Track background container with padding */}
        <div className="absolute left-0 top-[10.5px] w-full flex flex-col items-start p-[10px]">
          {/* Track */}
          <div className="h-[16px] bg-neutral-200 rounded-full relative w-full shadow-track-inset" />
        </div>

        {/* Slider input (invisible but functional) */}
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={explodeLevel}
          onChange={handleSliderChange}
          onMouseDown={() => setIsDragging(true)}
          onMouseUp={() => setIsDragging(false)}
          onTouchStart={() => setIsDragging(true)}
          onTouchEnd={() => setIsDragging(false)}
          className="absolute left-0 top-[12.5px] h-[32px] opacity-0 cursor-pointer z-20"
          style={{ width: `${sliderWidth}px` }}
          aria-label="Explode level"
          aria-valuemin={0}
          aria-valuemax={1}
          aria-valuenow={explodeLevel}
        />

        {/* Custom thumb */}
        <div
          className={cn(
            "absolute top-[12.5px] h-[32px] w-[120px] bg-primary-30 border-[2px] border-primary rounded-full pointer-events-none transition-all duration-150 shadow-slider-thumb",
            isDragging && "scale-110 shadow-lg"
          )}
          style={{
            left: `${explodeLevel * (sliderWidth - 120)}px`,
          }}
        />
      </div>

      {/* Zoom in button */}
      <button
        onClick={handleZoomIn}
        className="w-[44px] h-[44px] flex items-center justify-center rounded-full bg-background border-[2px] border-primary text-primary hover:bg-primary hover:text-background transition-all duration-150 focus-visible:ring-[2px] focus-visible:ring-primary focus-visible:ring-offset-[2px]"
        aria-label="Zoom in"
        disabled={explodeLevel === 1}
      >
        <Plus className="w-[16px] h-[16px]" />
      </button>
    </div>
  );
}
