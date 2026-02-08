import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import type { LabelHTMLAttributes } from "react";

/**
 * Label component for form elements.
 * Based on verified design specs from docs/phase2-ui-basic.md
 *
 * @component
 * @example
 * ```tsx
 * <Label htmlFor="email">Email</Label>
 * <Label size="lg" variant="active">Navigation</Label>
 * ```
 *
 * Note: The "Label" in Figma (node 120:375) is a 40px navigation label.
 * This component supports both form labels (16px) and navigation labels (40px).
 *
 * @see {@link https://figma.com/file/Vz80RydxWcYHVnn2iuyV0m/SIMVEX?node-id=120-375} Figma Design
 */

const labelVariants = cva(
  // Base classes
  "inline-flex items-center font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
  {
    variants: {
      variant: {
        // Default - white text for form labels
        default: "text-neutral-200",
        // Active - cyan text for active navigation
        active: "text-primary",
      },
      size: {
        // Default - form label size (16px)
        default: "text-base leading-normal",
        // Large - navigation label size (40px)
        lg: "text-[40px] font-bold leading-tight",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface LabelProps
  extends
    LabelHTMLAttributes<HTMLLabelElement>,
    VariantProps<typeof labelVariants> {}

export function Label({ className, variant, size, ...props }: LabelProps) {
  return (
    <label
      className={cn(labelVariants({ variant, size }), className)}
      {...props}
    />
  );
}
