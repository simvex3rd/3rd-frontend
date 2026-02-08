import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { Icon } from "@/components/common/Icon";
import type { HTMLAttributes } from "react";

/**
 * ValueCard component - displays value proposition with icon, title, and description.
 * Based on verified design specs from Figma (node-id=144-277)
 *
 * @component
 * @example
 * ```tsx
 * <ValueCard
 *   variant="default"
 *   iconName="ai-fill"
 *   title="AI 기반 학습"
 *   description="인공지능 기술로 맞춤형 학습"
 * />
 * ```
 *
 * Dimensions: 562.67×358px (1920px design)
 * Border: 5px solid, 24px radius
 * States: Default (gray), Primary (cyan), Hover, Press
 *
 * @see {@link https://figma.com/file/Vz80RydxWcYHVnn2iuyV0m/SIMVEX?node-id=144-277} Figma Design
 */

const valueCardVariants = cva(
  "relative flex flex-col items-center justify-center text-center w-[562.67px] h-[358px] rounded-[24px] border-[5px] border-solid transition-all duration-300 backdrop-blur-sm shadow-card-glow",
  {
    variants: {
      variant: {
        // Default - gray background, cyan title
        default:
          "bg-gray-30 border-primary/20 hover:bg-hover-30 active:bg-press-30",
        // Primary - cyan background, white title
        primary:
          "bg-primary-30 border-primary/20 hover:bg-hover-30 active:bg-press-30",
        // Hover state (for demo)
        hover: "bg-hover-30 border-primary/20",
        // Press state (for demo)
        press: "bg-press-30 border-primary/20",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface ValueCardProps
  extends
    Omit<HTMLAttributes<HTMLDivElement>, "title">,
    VariantProps<typeof valueCardVariants> {
  iconName: string;
  title: string;
  description: string;
}

export function ValueCard({
  className,
  variant,
  iconName,
  title,
  description,
  ...props
}: ValueCardProps) {
  const isPrimary =
    variant === "primary" || variant === "hover" || variant === "press";

  return (
    <div className={cn(valueCardVariants({ variant }), className)} {...props}>
      <div className="flex flex-col items-center gap-[32px]">
        <div className="flex items-center justify-center shrink-0">
          <Icon
            name={iconName}
            size={147}
            className={cn(
              "transition-transform duration-300",
              isPrimary ? "text-neutral-50" : "text-primary"
            )}
            alt=""
          />
        </div>
        <div className="flex flex-col gap-[0px]">
          <h3
            className={cn(
              "text-[40px] font-bold leading-tight",
              isPrimary ? "text-neutral-50" : "text-primary"
            )}
          >
            {title}
          </h3>
          <p className="text-[32px] font-semibold text-neutral-300 leading-normal">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}
