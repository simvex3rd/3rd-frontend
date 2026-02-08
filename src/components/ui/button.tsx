import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import type { ButtonHTMLAttributes } from "react";
import { type LucideIcon } from "lucide-react";

/**
 * Button component with fill/outline variants and disabled states.
 * Based on verified design specs from docs/phase2-ui-basic.md
 *
 * @component
 * @example
 * ```tsx
 * <Button variant="fill">Click me</Button>
 * <Button variant="outline" disabled>Disabled</Button>
 * ```
 *
 * Dimensions: 145×40px (default)
 * Font: 16px/1.5 medium
 * Border Radius: 8px
 * States: Default, Hover, Press, Disabled
 *
 * @see {@link https://figma.com/file/Vz80RydxWcYHVnn2iuyV0m/SIMVEX?node-id=160-989} Figma Design
 */

const buttonVariants = cva(
  // Base classes - matches Figma specs exactly
  "inline-flex items-center justify-center gap-[8px] rounded-[8px] font-medium text-[16px] leading-[1.5] transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed",
  {
    variants: {
      variant: {
        // Fill variant - primary cyan background
        fill: "bg-primary text-neutral-900 hover:bg-primary-hover active:bg-primary-press disabled:bg-neutral-100 disabled:text-neutral-300",
        // Outline variant - transparent with border
        outline:
          "border-2 border-primary text-primary bg-transparent hover:border-primary-hover hover:text-primary-hover active:border-primary-press active:text-primary-press disabled:border-neutral-300 disabled:text-neutral-300 disabled:bg-neutral-100",
      },
      size: {
        default: "h-[40px] w-[145px] px-[16px] py-0",
        sm: "h-[32px] px-[12px] text-[14px]",
        lg: "h-[48px] px-[24px]",
      },
    },
    defaultVariants: {
      variant: "fill",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends
    ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  leadingIcon?: LucideIcon;
  trailingIcon?: LucideIcon;
}

export function Button({
  className,
  variant = "fill",
  size = "default",
  disabled,
  leadingIcon: LeadingIcon,
  trailingIcon: TrailingIcon,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(buttonVariants({ variant, size }), className)}
      disabled={disabled}
      {...props}
    >
      {LeadingIcon && <LeadingIcon className="h-[24px] w-[24px] shrink-0" />}
      {children && <span>{children}</span>}
      {TrailingIcon && <TrailingIcon className="h-[24px] w-[24px] shrink-0" />}
    </button>
  );
}
