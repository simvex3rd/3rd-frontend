import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import type { HTMLAttributes } from "react";

/**
 * Model card component displaying thumbnail, name, and metadata.
 *
 * @component
 * @example
 * ```tsx
 * <ModelCard
 *   variant="default"
 *   thumbnailSrc="/models/model-1.png"
 *   modelName="Building Model"
 *   author="John Doe"
 *   date="2024-02-06"
 * />
 * ```
 *
 * @param {ModelCardProps} props - Component props
 * @param {"default" | "primary"} [props.variant="default"] - Card style variant
 * @param {string} props.thumbnailSrc - Thumbnail image path
 * @param {string} props.modelName - Model name
 * @param {string} [props.author] - Model author
 * @param {string} [props.date] - Upload/modified date
 *
 * @see {@link https://figma.com/file/Vz80RydxWcYHVnn2iuyV0m/SIMVEX} Figma Design
 */

import { Icon } from "@/components/common/Icon";

const modelCardVariants = cva(
  "relative flex flex-col items-center justify-center text-center w-[327px] h-[241px] p-6 rounded-[24px] border-[5px] border-solid transition-all duration-300 backdrop-blur-md",
  {
    variants: {
      variant: {
        default:
          "bg-white/10 border-white/10 text-white shadow-lg hover:bg-white/20 active:bg-white/25",
        primary:
          "bg-(--primary-cyan)/30 border-(--primary-cyan)/20 shadow-[0_0_24px_rgba(2,238,225,0.15)] hover:bg-(--primary-cyan-hover)/30 hover:border-(--primary-cyan-hover)/20 active:bg-(--primary-cyan-press)/30",
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
            size={110}
            className={cn(
              "transition-transform duration-300 group-hover:scale-110",
              variant === "primary" ? "text-white" : "text-(--primary-cyan)"
            )}
            alt=""
          />
        </div>
        <h3
          className={cn(
            "text-[32px] font-semibold leading-[1.25] tracking-tight",
            variant === "primary" ? "text-white" : "text-(--primary-cyan)"
          )}
        >
          {modelName}
        </h3>
      </div>
    </div>
  );
}
