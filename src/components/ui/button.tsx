import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import type { ButtonHTMLAttributes } from "react";

/**
 * Button component with fill/outline variants and disabled states.
 *
 * @component
 * @example
 * ```tsx
 * <Button variant="fill">Click me</Button>
 * <Button variant="outline" disabled>Disabled</Button>
 * ```
 *
 * @param {ButtonProps} props - Component props
 * @param {"fill" | "outline"} [props.variant="fill"] - Button style variant
 * @param {boolean} [props.disabled=false] - Disable button interaction
 *
 * @see {@link https://figma.com/file/Vz80RydxWcYHVnn2iuyV0m/SIMVEX} Figma Design
 */

import { type LucideIcon } from "lucide-react";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-[8px] font-medium text-[16px] leading-[1.5] transition-all duration-200 focus-visible:outline-none disabled:cursor-not-allowed",
  {
    variants: {
      variant: {
        fill: "bg-[#02EEE1] text-white hover:bg-[#01A9A0] active:bg-[#01645F] shadow-sm hover:shadow-md",
        outline:
          "border-2 border-[#02EEE1] text-[#02EEE1] bg-transparent hover:bg-[#02EEE1]/10 active:bg-[#02EEE1]/20",
      },
      size: {
        default: "h-[40px] w-[145px] px-4",
      },
      status: {
        default: "",
        disable:
          "bg-[#f5f5f5] text-[#d4d4d4] border-[#d4d4d4] cursor-not-allowed pointer-events-none",
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
  size,
  disabled,
  leadingIcon: LeadingIcon,
  trailingIcon: TrailingIcon,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        buttonVariants({
          variant,
          size,
          status: disabled ? "disable" : "default",
        }),
        className
      )}
      disabled={disabled}
      {...props}
    >
      {LeadingIcon && <LeadingIcon className="h-5 w-5 shrink-0" />}
      <span>{children}</span>
      {TrailingIcon && <TrailingIcon className="h-5 w-5 shrink-0" />}
    </button>
  );
}
