import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { Icon } from "@/components/common/Icon";
import type { HTMLAttributes } from "react";

/**
 * Value card component displaying icon, title, and description.
 *
 * @component
 * @example
 * ```tsx
 * <ValueCard
 *   variant="default"
 *   iconName="ai-fill"
 *   title="AI-Powered"
 *   description="Advanced AI technology for simulation"
 * />
 * ```
 *
 * @param {ValueCardProps} props - Component props
 * @param {"default" | "primary"} [props.variant="default"] - Card style variant
 * @param {string} props.iconName - Icon filename without extension
 * @param {string} props.title - Card title
 * @param {string} props.description - Card description
 *
 * @see {@link https://figma.com/file/Vz80RydxWcYHVnn2iuyV0m/SIMVEX} Figma Design
 */

const valueCardVariants = cva(
  "relative flex flex-col items-center justify-center text-center w-[567px] h-[358px] p-8 rounded-[24px] border-[5px] border-solid transition-all duration-300 backdrop-blur-md",
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
  return (
    <div className={cn(valueCardVariants({ variant }), className)} {...props}>
      <div className="flex flex-col items-center gap-8">
        <div className="flex items-center justify-center shrink-0">
          <Icon
            name={iconName}
            size={118}
            className={cn(
              "transition-transform duration-300 group-hover:scale-110",
              variant === "primary" ? "text-white" : "text-(--primary-cyan)"
            )}
            alt=""
          />
        </div>
        <div className="flex flex-col gap-4">
          <h3
            className={cn(
              "text-[40px] font-bold leading-[1.25] tracking-tight",
              variant === "primary" ? "text-white" : "text-(--primary-cyan)"
            )}
          >
            {title}
          </h3>
          <p className="text-[24px] font-semibold text-[#d4d4d4] leading-normal opacity-80">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}
