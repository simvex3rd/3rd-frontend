import { cn } from "@/lib/utils";
import type { HTMLAttributes } from "react";

/**
 * Skeleton placeholder component for loading states.
 *
 * Variants:
 * - text: single line text placeholder (16px height)
 * - card: model card placeholder (332.8×241px)
 * - avatar: circular avatar placeholder (40×40px)
 *
 * @component
 * @example
 * ```tsx
 * <Skeleton variant="text" />
 * <Skeleton variant="card" />
 * <Skeleton variant="avatar" className="rounded-full" />
 * ```
 */

export interface SkeletonProps extends HTMLAttributes<HTMLDivElement> {
  variant?: "text" | "card" | "avatar";
}

export function Skeleton({
  variant = "text",
  className,
  ...props
}: SkeletonProps) {
  const variantClasses = {
    text: "h-[16px] rounded-[4px] w-full",
    card: "w-[332.8px] h-[241px] rounded-[24px]",
    avatar: "w-[40px] h-[40px] rounded-full",
  };

  return (
    <div
      className={cn(
        "animate-pulse bg-neutral-700",
        variantClasses[variant],
        className
      )}
      aria-busy="true"
      {...props}
    />
  );
}

/**
 * Skeleton group component for multiple skeleton lines.
 *
 * @component
 * @example
 * ```tsx
 * <SkeletonGroup>
 *   <Skeleton variant="text" />
 *   <Skeleton variant="text" className="w-[80%]" />
 * </SkeletonGroup>
 * ```
 */

export type SkeletonGroupProps = HTMLAttributes<HTMLDivElement>;

export function SkeletonGroup({
  className,
  children,
  ...props
}: SkeletonGroupProps) {
  return (
    <div
      className={cn("flex flex-col gap-[12px]", className)}
      aria-busy="true"
      {...props}
    >
      {children}
    </div>
  );
}
