import { cn } from "@/lib/utils";
import type { HTMLAttributes } from "react";

/**
 * Spinner loading component with size variants.
 *
 * Variants:
 * - sm: 16×16px (inline, buttons)
 * - md: 32×32px (sections)
 * - lg: 64×64px (full-page)
 *
 * @component
 * @example
 * ```tsx
 * <Spinner size="md" />
 * <Spinner size="lg" className="text-primary" />
 * ```
 */

export interface SpinnerProps extends HTMLAttributes<HTMLDivElement> {
  size?: "sm" | "md" | "lg";
}

export function Spinner({ size = "md", className, ...props }: SpinnerProps) {
  const sizeClasses = {
    sm: "w-[16px] h-[16px]",
    md: "w-[32px] h-[32px]",
    lg: "w-[64px] h-[64px]",
  };

  return (
    <div
      className={cn(
        "animate-spin rounded-full border-2 border-neutral-700 border-t-primary",
        "duration-1000 ease-linear",
        sizeClasses[size],
        className
      )}
      aria-busy="true"
      aria-label="Loading"
      role="status"
      {...props}
    />
  );
}
