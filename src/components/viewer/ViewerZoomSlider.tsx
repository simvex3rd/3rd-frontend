"use client";

/**
 * ViewerZoomSlider Component
 *
 * Bottom explode slider control.
 * Matches Figma design:
 * - Default: 1200x57px (no part selected)
 * - Compact: 960x57px (part selected)
 * - Track: #d9d9d9 with inset shadow
 * - Thumb: 120x32px, rgba(2,238,225,0.3) bg, 2px cyan border, rounded full
 *
 * @see {@link https://www.figma.com/design/Vz80RydxWcYHVnn2iuyV0m?node-id=160-576} Figma Design
 */

import { cn } from "@/lib/utils";
import { useSceneStore } from "@/stores/scene-store";

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
  const sliderWidth = compact ? 720 : 900; // 960*0.75=720, 1200*0.75=900

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setExplodeLevel(Number(e.target.value));
  };

  return (
    <div
      className={cn("h-[57px] overflow-hidden relative", className)}
      style={{ width: `${sliderWidth}px` }}
      role="group"
      aria-label="분해도 control"
    >
      {/* Track background container with padding */}
      <div className="absolute left-0 top-[10.5px] w-full flex flex-col items-start p-[10px]">
        {/* Track */}
        <div className="h-[16px] bg-[#d9d9d9] rounded-full relative w-full shadow-track-inset" />
      </div>

      {/* Slider input (invisible but functional) */}
      <input
        type="range"
        min="0"
        max="1"
        step="0.01"
        value={explodeLevel}
        onChange={handleSliderChange}
        className="absolute left-0 top-[12.5px] h-[32px] opacity-0 cursor-pointer z-20"
        style={{ width: `${sliderWidth}px` }}
        aria-label="분해도"
        aria-valuemin={0}
        aria-valuemax={1}
        aria-valuenow={explodeLevel}
      />

      {/* Custom thumb */}
      <div
        className="absolute top-[12.5px] h-[32px] w-[120px] bg-primary-30 border-[2px] border-primary rounded-full pointer-events-none transition-all duration-150 shadow-slider-thumb"
        style={{
          left: `${explodeLevel * (sliderWidth - 120)}px`,
        }}
      />
    </div>
  );
}
