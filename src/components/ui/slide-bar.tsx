"use client";

import { cn } from "@/lib/utils";
import { useState, useCallback, type HTMLAttributes } from "react";
import { cva, type VariantProps } from "class-variance-authority";

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
 * @param {"default" | "part-click" | "fullscreen"} [props.variant="default"] - Visual variant (1200px, 960px, or 1920px width)
 *
 * @see {@link https://figma.com/file/Vz80RydxWcYHVnn2iuyV0m/SIMVEX} Figma Design
 */

const slideBarVariants = cva("relative h-[57px] select-none", {
  variants: {
    variant: {
      default: "w-[1200px]",
      "part-click": "w-[960px]",
      fullscreen: "w-[1920px]",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

export interface SlideBarProps
  extends
    Omit<HTMLAttributes<HTMLDivElement>, "onChange">,
    VariantProps<typeof slideBarVariants> {
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
  variant = "default",
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

  // Track width varies by variant: 1200px (default), 960px (part-click), or 1920px (fullscreen)
  const trackWidth =
    variant === "fullscreen" ? 1920 : variant === "part-click" ? 960 : 1200;
  const thumbWidth = 120;

  // Position calculation for the 120px wide thumb
  // At min (1), left = 0px
  // At max (10), left = trackWidth - thumbWidth
  const thumbPosition =
    ((value - min) / (max - min)) * (trackWidth - thumbWidth);

  return (
    <div className={cn(slideBarVariants({ variant }), className)} {...props}>
      {/* Track */}
      <div className="absolute top-[23px] h-[12px] w-full rounded-full bg-neutral-300 shadow-track-inset" />

      {/* Thumb / Slider Handle */}
      <div
        className="absolute top-[13px] h-[32px] w-[120px] rounded-full border-2 border-primary bg-primary/30 shadow-slider-thumb backdrop-blur-md transition-all duration-300 ease-out cursor-pointer"
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
