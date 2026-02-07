import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import type { LabelHTMLAttributes } from "react";

/**
 * Label component for form elements.
 *
 * @component
 * @example
 * ```tsx
 * <Label htmlFor="email">Email</Label>
 * <Label variant="press">Pressed Label</Label>
 * ```
 *
 * @param {LabelProps} props - Component props
 * @param {"default" | "press"} [props.variant="default"] - Label variant
 *
 * @see {@link https://figma.com/file/Vz80RydxWcYHVnn2iuyV0m/SIMVEX} Figma Design
 */

const labelVariants = cva(
  // Base classes - 14px body-md
  "inline-flex items-center text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
  {
    variants: {
      variant: {
        default: "text-foreground",
        press: "text-[var(--primary-cyan)]",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface LabelProps
  extends
    LabelHTMLAttributes<HTMLLabelElement>,
    VariantProps<typeof labelVariants> {}

export function Label({ className, variant, ...props }: LabelProps) {
  return (
    <label className={cn(labelVariants({ variant }), className)} {...props} />
  );
}
