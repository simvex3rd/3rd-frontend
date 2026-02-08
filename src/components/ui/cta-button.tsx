import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import type { ButtonHTMLAttributes } from "react";

/**
 * CTA (Call To Action) button component with glassmorphic styling.
 * Larger, more prominent button for primary actions on landing pages.
 * Based on verified design specs from docs/phase2-ui-basic.md
 *
 * @component
 * @example
 * ```tsx
 * <CTAButton variant="primary">시작하기</CTAButton>
 * <CTAButton variant="default">로그인/가입</CTAButton>
 * ```
 *
 * Dimensions: 210×(52-68)px
 * Font: 32px/1.25 semibold
 * Border Radius: 24px
 * Border: 5px solid with opacity
 * Shadow: Card glow (4px 4px 20px rgba(2,238,225,0.1))
 * States: Default, Primary, Hover, Press
 *
 * @see {@link https://figma.com/file/Vz80RydxWcYHVnn2iuyV0m/SIMVEX?node-id=90-41} Figma Design
 */

const ctaButtonVariants = cva(
  // Base classes - glassmorphic effect with border and shadow
  "inline-flex items-center justify-center gap-0 rounded-[24px] border-[5px] border-solid font-semibold text-[32px] leading-[1.25] transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 backdrop-blur-sm shadow-card-glow !px-[8px]",
  {
    variants: {
      variant: {
        // Default - white glassmorphic background
        default:
          "bg-white/30 text-neutral-50 border-primary/20 hover:bg-hover-30 active:bg-press-30",
        // Primary - cyan glassmorphic background
        primary:
          "bg-primary-30 text-neutral-50 border-primary/20 hover:bg-hover-30 active:bg-press-30",
        // Hover state (for demo/storybook)
        hover: "bg-hover-30 text-neutral-50 border-primary/20",
        // Press state (for demo/storybook)
        press: "bg-press-30 text-neutral-50 border-primary/20",
      },
      size: {
        // Default size - landing page CTA
        default: "w-[210px] px-[24px] py-[16px]",
        // Compact size - header CTA
        compact: "w-[210px] px-[24px] py-[12px]",
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
  variant = "primary",
  size = "default",
  disabled,
  children,
  ...props
}: CTAButtonProps) {
  return (
    <button
      className={cn(
        ctaButtonVariants({ variant, size }),
        disabled && "opacity-50 cursor-not-allowed pointer-events-none",
        className
      )}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}
