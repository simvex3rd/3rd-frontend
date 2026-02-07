import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import type { ButtonHTMLAttributes } from "react";

/**
 * Body Button component for selecting body parts.
 *
 * @component
 * @example
 * ```tsx
 * <BodyBtn status="default">Button</BodyBtn>
 * ```
 */

const bodyBtnVariants = cva(
  "flex items-center justify-center rounded-[16px] border-2 border-solid transition-all duration-200 cursor-pointer backdrop-blur-sm",
  {
    variants: {
      status: {
        default:
          "bg-[var(--gray-500)]/30 border-[var(--primary-cyan)] hover:bg-[var(--primary-cyan-hover)]/30 active:bg-[var(--primary-cyan-press)]/30",
        primary: "bg-[var(--primary-cyan)]/30 border-[var(--primary-cyan)]",
        hover: "bg-[var(--primary-cyan-hover)]/30 border-[var(--primary-cyan)]",
        press: "bg-[var(--primary-cyan-press)]/30 border-[var(--primary-cyan)]",
      },
    },
    defaultVariants: {
      status: "default",
    },
  }
);

export interface BodyBtnProps
  extends
    ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof bodyBtnVariants> {
  status?: "default" | "primary" | "hover" | "press";
}

export function BodyBtn({
  className,
  status,
  children = "button",
  ...props
}: BodyBtnProps) {
  return (
    <button
      className={cn(
        bodyBtnVariants({ status }),
        "w-[81px] py-[8px] h-auto",
        className
      )}
      {...props}
    >
      <span className="font-semibold text-[14px] leading-[1.5] text-[var(--gray-200)] text-center">
        {children}
      </span>
    </button>
  );
}
