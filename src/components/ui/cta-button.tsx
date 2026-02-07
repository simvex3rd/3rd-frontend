import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import type { ButtonHTMLAttributes } from "react";

/**
 * CTA (Call To Action) button component with enhanced styling.
 * Larger than regular button for primary actions.
 *
 * @component
 * @example
 * ```tsx
 * <CTAButton variant="primary">Get Started</CTAButton>
 * <CTAButton variant="default">Learn More</CTAButton>
 * ```
 *
 * @param {CTAButtonProps} props - Component props
 * @param {"default" | "primary"} [props.variant="primary"] - Button style variant
 * @param {boolean} [props.disabled=false] - Disable button interaction
 *
 * @see {@link https://figma.com/file/Vz80RydxWcYHVnn2iuyV0m/SIMVEX} Figma Design
 */

const ctaButtonVariants = cva(
  // Base classes
  "inline-flex items-center justify-center rounded-[24px] border-[5px] border-solid font-semibold transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--primary-cyan)]",
  {
    variants: {
      variant: {
        default:
          "bg-white/30 text-[#FAFAFA] border-white/20 hover:bg-white/40 active:bg-white/50 backdrop-blur-sm",
        primary:
          "bg-(--primary-cyan)/30 text-[#FAFAFA] border-(--primary-cyan)/20 shadow-[0_0_24px_rgba(2,238,225,0.15)] hover:bg-(--primary-cyan-hover)/30 hover:border-(--primary-cyan-hover)/20 active:bg-(--primary-cyan-press)/30 active:border-(--primary-cyan-press)/20 backdrop-blur-sm transition-all duration-300",
      },
      size: {
        default: "h-[80px] w-[210px] px-6 py-0 text-[32px] leading-[1.25]",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  }
);

export interface CTAButtonProps
  extends
    ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof ctaButtonVariants> {}

export function CTAButton({
  className,
  variant,
  size,
  disabled,
  ...props
}: CTAButtonProps) {
  return (
    <button
      className={cn(
        ctaButtonVariants({ variant, size }),
        "disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:shadow-none",
        className
      )}
      disabled={disabled}
      {...props}
    />
  );
}
