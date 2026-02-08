import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import type { HTMLAttributes } from "react";
import { Icon } from "@/components/common/Icon";

/**
 * ModelCard component - displays 3D model category with icon and title.
 * Based on verified design specs from docs/phase2-domain.md
 *
 * @component
 * @example
 * ```tsx
 * <ModelCard
 *   variant="default"
 *   iconName="electronics-chip"
 *   modelName="기계공학"
 * />
 * ```
 *
 * Dimensions: 332.8×241px
 * Border: 5px solid, 24px radius
 * States: Default (gray), Primary (cyan), Hover, Press
 *
 * @see {@link https://figma.com/file/Vz80RydxWcYHVnn2iuyV0m/SIMVEX?node-id=144-299} Figma Design
 */

const modelCardVariants = cva(
  "relative flex flex-col items-center justify-center text-center w-[332.8px] h-[241px] p-6 rounded-[24px] border-[5px] border-solid transition-all duration-300 backdrop-blur-sm shadow-card-glow",
  {
    variants: {
      variant: {
        // Default - gray background, cyan text
        default:
          "bg-[rgba(212,212,212,0.3)] border-[rgba(2,238,225,0.2)] text-primary hover:bg-[rgba(1,169,160,0.3)] hover:text-neutral-50 active:bg-[rgba(1,100,95,0.3)] active:text-neutral-50",
        // Primary - cyan background, white text
        primary:
          "bg-[rgba(2,238,225,0.3)] border-[rgba(2,238,225,0.2)] text-neutral-50 hover:bg-[rgba(1,169,160,0.3)] active:bg-[rgba(1,100,95,0.3)]",
        // Hover state (for demo)
        hover:
          "bg-[rgba(1,169,160,0.3)] border-[rgba(2,238,225,0.2)] text-neutral-50",
        // Press state (for demo)
        press:
          "bg-[rgba(1,100,95,0.3)] border-[rgba(2,238,225,0.2)] text-neutral-50",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface ModelCardProps
  extends
    Omit<HTMLAttributes<HTMLDivElement>, "title">,
    VariantProps<typeof modelCardVariants> {
  iconName: string;
  modelName: string;
}

export function ModelCard({
  className,
  variant,
  iconName,
  modelName,
  ...props
}: ModelCardProps) {
  return (
    <div className={cn(modelCardVariants({ variant }), className)} {...props}>
      <div className="flex flex-col items-center gap-6">
        <div className="flex items-center justify-center shrink-0">
          <Icon
            name={iconName}
            size={113}
            className="transition-transform duration-300"
            alt=""
          />
        </div>
        <h3 className="text-[32px] font-semibold leading-tight">{modelName}</h3>
      </div>
    </div>
  );
}
