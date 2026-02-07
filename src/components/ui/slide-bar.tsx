"use client";

import { cn } from "@/lib/utils";
import { useState, useCallback, type HTMLAttributes } from "react";

/**
 * Slide bar component with 10 zoom levels and keyboard accessibility.
 *
 * @component
 * @example
 * ```tsx
 * <SlideBar
 *   value={5}
 *   onChange={(value) => console.log(value)}
 *   label="Zoom Level"
 * />
 * ```
 *
 * @param {SlideBarProps} props - Component props
 * @param {number} [props.value=5] - Current zoom level (1-10)
 * @param {(value: number) => void} [props.onChange] - Value change callback
 * @param {string} [props.label] - Accessible label
 * @param {number} [props.min=1] - Minimum value
 * @param {number} [props.max=10] - Maximum value
 *
 * @see {@link https://figma.com/file/Vz80RydxWcYHVnn2iuyV0m/SIMVEX} Figma Design
 */

export interface SlideBarProps extends Omit<
  HTMLAttributes<HTMLDivElement>,
  "onChange"
> {
  value?: number;
  onChange?: (value: number) => void;
  label?: string;
  min?: number;
  max?: number;
}

export function SlideBar({
  className,
  value: controlledValue,
  onChange,
  label = "Zoom level",
  min = 1,
  max = 10,
  ...props
}: SlideBarProps) {
  const [internalValue, setInternalValue] = useState(1);
  const value = controlledValue ?? internalValue;

  const handleChange = useCallback(
    (newValue: number) => {
      const clampedValue = Math.max(min, Math.min(max, newValue));
      setInternalValue(clampedValue);
      onChange?.(clampedValue);
    },
    [min, max, onChange]
  );

  // Position calculation for the 120px wide thumb on a 1200px track
  // At min (1), left = 0px
  // At max (10), left = 1080px (1200 - 120)
  const thumbPosition = ((value - min) / (max - min)) * (1200 - 120);

  return (
    <div
      className={cn("relative h-[57px] w-[1200px] select-none", className)}
      {...props}
    >
      {/* Track */}
      <div className="absolute top-[21px] h-[16px] w-full rounded-full bg-[#D9D9D9] shadow-[inset_0px_4px_4px_rgba(0,0,0,0.25)]" />

      {/* Thumb / Slider Handle */}
      <div
        className="absolute top-[13px] h-[32px] w-[120px] rounded-full border-2 border-[#02EEE1] bg-[#02EEE1]/30 shadow-[4px_4px_10px_2px_rgba(0,0,0,0.25)] backdrop-blur-md transition-all duration-300 ease-out cursor-pointer"
        style={{ left: `${thumbPosition}px` }}
      />

      {/* Hidden input for accessibility and interaction */}
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(e) => handleChange(Number(e.target.value))}
        className="absolute inset-0 z-10 h-full w-full cursor-pointer opacity-0"
        aria-label={label}
      />
    </div>
  );
}
