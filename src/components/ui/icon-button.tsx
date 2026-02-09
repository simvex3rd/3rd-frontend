import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { Icon } from "@/components/common/Icon";
import type { ButtonHTMLAttributes } from "react";

/**
 * Icon button component with 6 icon types and interactive states.
 * Button size: 40×40px (Figma node: 375-1336)
 * Icon size: 32px default (80% fill ratio for 1920px Figma design)
 *
 * @component
 * @example
 * ```tsx
 * <IconButton iconName="menu" />
 * <IconButton iconName="close" disabled />
 * ```
 *
 * @param {IconButtonProps} props - Component props
 * @param {string} props.iconName - Icon filename (without extension)
 * @param {number} [props.iconSize=32] - Icon size in pixels (default 32 for 1920px design)
 * @param {boolean} [props.disabled=false] - Disable button interaction
 *
 * @see {@link https://figma.com/file/Vz80RydxWcYHVnn2iuyV0m/SIMVEX} Figma Design
 */

const iconButtonVariants = cva(
  // Base classes - square button that changes to rounded on hover
  "inline-flex items-center justify-center transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",
  {
    variants: {
      size: {
        default: "h-[40px] w-[40px]",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
);

export interface IconButtonProps
  extends
    ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof iconButtonVariants> {
  iconName: string;
  iconSize?: number;
}

export function IconButton({
  className,
  size,
  iconName,
  iconSize = 32,
  disabled,
  ...props
}: IconButtonProps) {
  return (
    <button
      className={cn(
        iconButtonVariants({ size }),
        "rounded-[12px] hover:bg-white/10 active:bg-white/20 active:scale-95 transition-all text-neutral-50 hover:text-primary",
        "disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-transparent",
        className
      )}
      disabled={disabled}
      {...props}
    >
      <Icon
        name={iconName}
        size={iconSize}
        alt={`${iconName} icon`}
        className="shrink-0"
      />
    </button>
  );
}
