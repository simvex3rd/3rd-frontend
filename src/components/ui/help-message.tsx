import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import type { HTMLAttributes } from "react";

/**
 * Help message component with icon and text for form validation feedback.
 *
 * @component
 * @example
 * ```tsx
 * <HelpMessage variant="default">This is a hint</HelpMessage>
 * <HelpMessage variant="success">Input is valid</HelpMessage>
 * <HelpMessage variant="error">Input is invalid</HelpMessage>
 * ```
 *
 * @param {HelpMessageProps} props - Component props
 * @param {"default" | "success" | "error"} [props.variant="default"] - Message type
 *
 * @see {@link https://figma.com/file/Vz80RydxWcYHVnn2iuyV0m/SIMVEX} Figma Design
 */

const helpMessageVariants = cva(
  // Base classes - 12px body-sm
  "inline-flex items-center gap-1 text-[12px] leading-[1.5]",
  {
    variants: {
      variant: {
        default: "text-[#d4d4d4]",
        success: "text-[#00c950]",
        error: "text-[#fb2c36]",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface HelpMessageProps
  extends
    HTMLAttributes<HTMLParagraphElement>,
    VariantProps<typeof helpMessageVariants> {}

function getIcon(variant: "default" | "success" | "error" | null | undefined) {
  switch (variant) {
    case "success":
      return (
        <svg
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            d="M10 3L4.5 8.5L2 6"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "error":
      return (
        <svg
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <circle cx="6" cy="6" r="5" stroke="currentColor" strokeWidth="2" />
          <path
            d="M6 3v3M6 8h.01"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      );
    default:
      return (
        <svg
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <circle cx="6" cy="6" r="5" stroke="currentColor" strokeWidth="2" />
          <path
            d="M6 4v3M6 9h.01"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      );
  }
}

export function HelpMessage({
  className,
  variant,
  children,
  ...props
}: HelpMessageProps) {
  return (
    <p className={cn(helpMessageVariants({ variant }), className)} {...props}>
      {getIcon(variant)}
      <span>{children}</span>
    </p>
  );
}
