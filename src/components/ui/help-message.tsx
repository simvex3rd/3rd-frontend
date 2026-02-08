import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import type { HTMLAttributes } from "react";

/**
 * HelpMessage component for validation and helper text below form inputs.
 * Based on verified design specs from docs/phase2-ui-basic.md
 *
 * @component
 * @example
 * ```tsx
 * <HelpMessage variant="default">This is a hint</HelpMessage>
 * <HelpMessage variant="success">Input is valid</HelpMessage>
 * <HelpMessage variant="error">Input is invalid</HelpMessage>
 * ```
 *
 * Dimensions: Auto width, 18px height
 * Font: 12px/1.5 regular
 * No icons - color is sole differentiator
 *
 * @see {@link https://figma.com/file/Vz80RydxWcYHVnn2iuyV0m/SIMVEX?node-id=147-830} Figma Design
 */

const helpMessageVariants = cva(
  // Base classes - minimal styling, text only
  "text-xs font-normal leading-normal h-[18px]",
  {
    variants: {
      variant: {
        // Default - gray text
        default: "text-neutral-300",
        // Success - green text
        success: "text-success",
        // Error - red text
        error: "text-error",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface HelpMessageProps
  extends
    HTMLAttributes<HTMLParagraphElement>,
    VariantProps<typeof helpMessageVariants> {}

export function HelpMessage({
  className,
  variant,
  children,
  ...props
}: HelpMessageProps) {
  const isError = variant === "error";

  return (
    <p
      className={cn(helpMessageVariants({ variant }), className)}
      role={isError ? "alert" : undefined}
      aria-live={isError ? "assertive" : "polite"}
      {...props}
    >
      {children}
    </p>
  );
}
