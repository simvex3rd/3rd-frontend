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
          "border-[#d4d4d4] bg-white text-[#171717] placeholder:text-[#737373] focus-within:border-[#2b7fff]",
        focus: "border-[#2b7fff] bg-white text-[#171717]",
        fill: "border-[#e5e5e5] bg-white text-[#171717]",
        error: "border-[#fb2c36] bg-white text-[#171717]",
        success: "border-[#00c950] bg-white text-[#171717]",
        disable: "border-[#d4d4d4] bg-[#f5f5f5] text-[#d4d4d4]",
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
            disabled ? "text-[#d4d4d4]" : "text-[#737373]"
          )}
        />
      )}
    </div>
  );
}
