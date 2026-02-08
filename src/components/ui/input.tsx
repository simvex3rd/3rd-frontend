import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import type { InputHTMLAttributes } from "react";
import { Search, type LucideIcon } from "lucide-react";

/**
 * Input component with validation states and optional icon.
 * Based on verified design specs from docs/phase2-ui-basic.md
 *
 * @component
 * @example
 * ```tsx
 * <Input placeholder="Search..." />
 * <Input variant="error" placeholder="Invalid input" />
 * <Input variant="success" placeholder="Valid input" rightIcon />
 * ```
 *
 * Dimensions: 320×40px (default)
 * Font: 16px/1.5 regular
 * Border Radius: 8px
 * States: Default, Focus, Fill, Error, Success, Disabled
 *
 * @see {@link https://figma.com/file/Vz80RydxWcYHVnn2iuyV0m/SIMVEX?node-id=147-809} Figma Design
 */

const inputVariants = cva(
  // Base classes - matches Figma specs exactly
  "relative flex h-10 w-full items-center gap-1 rounded-lg border border-solid px-3 py-3 text-base font-normal leading-normal transition-colors duration-150 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 disabled:cursor-not-allowed",
  {
    variants: {
      variant: {
        // Default - gray border, white background
        default:
          "border-neutral-300 bg-white text-foreground placeholder:text-neutral-500 focus-within:border-info focus-within:ring-info",
        // Focus - blue border (programmatic state)
        focus:
          "border-info bg-white text-foreground placeholder:text-neutral-500 ring-2 ring-info ring-offset-2",
        // Fill - light gray border with content
        fill: "border-neutral-200 bg-white text-foreground",
        // Error - red border
        error:
          "border-error bg-white text-foreground placeholder:text-neutral-500 focus-within:border-error focus-within:ring-error",
        // Success - green border
        success:
          "border-success bg-white text-foreground placeholder:text-neutral-500 focus-within:border-success focus-within:ring-success",
        // Disabled - gray background and border
        disabled:
          "border-neutral-300 bg-neutral-100 text-neutral-300 placeholder:text-neutral-300",
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
  const Icon = typeof rightIcon === "function" ? rightIcon : Search;

  return (
    <div
      className={cn(
        inputVariants({ variant: disabled ? "disabled" : variant }),
        className
      )}
    >
      <input
        className="flex-1 bg-transparent outline-none placeholder:text-inherit disabled:cursor-not-allowed"
        disabled={disabled}
        aria-invalid={variant === "error" ? "true" : undefined}
        aria-disabled={disabled ? "true" : undefined}
        {...props}
      />
      {rightIcon && (
        <Icon
          className={cn(
            "h-6 w-6 shrink-0",
            disabled ? "text-neutral-300" : "text-neutral-500"
          )}
          aria-hidden="true"
        />
      )}
    </div>
  );
}
