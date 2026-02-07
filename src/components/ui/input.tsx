import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import type { InputHTMLAttributes } from "react";

/**
 * Input component with multiple state variants.
 *
 * @component
 * @example
 * ```tsx
 * <Input variant="default" placeholder="Enter text" />
 * <Input variant="error" value="Invalid input" />
 * <Input variant="success" value="Valid input" />
 * ```
 *
 * @param {InputProps} props - Component props
 * @param {"default" | "focus" | "fill" | "error" | "success" | "disable"} [props.variant="default"] - Input state variant
 *
 * @see {@link https://figma.com/file/Vz80RydxWcYHVnn2iuyV0m/SIMVEX} Figma Design
 */

import { LucideSearch, type LucideIcon } from "lucide-react";

const inputVariants = cva(
  // Base classes
  "relative flex h-[40px] w-full items-center gap-2 rounded-[8px] border border-solid px-3 py-3 text-[16px] leading-[1.5] transition-all backdrop-blur-sm focus-within:outline-none disabled:cursor-not-allowed",
  {
    variants: {
      variant: {
        default:
          "border-[var(--gray-300)] bg-white text-[var(--bg-dark)] placeholder:text-[var(--gray-500)] focus-within:border-[var(--blue-primary)]",
        focus: "border-[var(--blue-primary)] bg-white text-[var(--bg-dark)]",
        fill: "border-[var(--gray-200)] bg-white text-[var(--bg-dark)]",
        error: "border-[var(--red-error)] bg-white text-[var(--bg-dark)]",
        success: "border-[var(--green-success)] bg-white text-[var(--bg-dark)]",
        disable:
          "border-[var(--gray-300)] bg-[var(--gray-100)] text-[var(--gray-300)]",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface InputProps
  extends
    Omit<InputHTMLAttributes<HTMLInputElement>, "size">,
    VariantProps<typeof inputVariants> {
  rightIcon?: LucideIcon | boolean;
}

export function Input({
  className,
  variant,
  disabled,
  rightIcon = false,
  ...props
}: InputProps) {
  const Icon = typeof rightIcon === "function" ? rightIcon : LucideSearch;

  return (
    <div
      className={cn(
        inputVariants({ variant: disabled ? "disable" : variant }),
        className
      )}
    >
      <input
        className="flex-1 bg-transparent outline-none placeholder:text-inherit"
        disabled={disabled}
        {...props}
      />
      {rightIcon && (
        <Icon
          className={cn(
            "h-6 w-6 shrink-0",
            disabled ? "text-[var(--gray-300)]" : "text-[var(--gray-500)]"
          )}
        />
      )}
    </div>
  );
}
