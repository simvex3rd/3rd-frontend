import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { IconButton } from "@/components/ui/icon-button";
import type { HTMLAttributes } from "react";

/**
 * Tool bar component with horizontal/vertical layout variants.
 *
 * @component
 * @example
 * ```tsx
 * <ToolBar
 *   variant="horizontal"
 *   tools={[
 *     { iconName: "ai-fill", onClick: () => {}, label: "AI Tool" },
 *     { iconName: "camera-lock", onClick: () => {}, label: "Camera" }
 *   ]}
 * />
 * ```
 *
 * @param {ToolBarProps} props - Component props
 * @param {"horizontal" | "vertical"} [props.variant="horizontal"] - Layout orientation
 * @param {ToolItem[]} props.tools - Array of tool items
 *
 * @see {@link https://figma.com/file/Vz80RydxWcYHVnn2iuyV0m/SIMVEX} Figma Design
 */

const toolBarVariants = cva(
  "flex items-center justify-center border-[3px] border-primary rounded-[16px] bg-white/10 backdrop-blur-md shadow-primary-glow transition-all",
  {
    variants: {
      variant: {
        horizontal:
          "flex-row w-[500px] h-[50px] gap-[48px] px-[160px] py-[16px]",
        vertical: "flex-col w-[50px] h-[300px] gap-[16px] px-[16px] py-[64px]",
      },
    },
    defaultVariants: {
      variant: "horizontal",
    },
  }
);

export interface ToolItem {
  iconName: string;
  onClick: () => void;
  label: string;
  disabled?: boolean;
}

export interface ToolBarProps
  extends
    Omit<HTMLAttributes<HTMLDivElement>, "onClick">,
    VariantProps<typeof toolBarVariants> {
  tools: ToolItem[];
}

export function ToolBar({ className, variant, tools, ...props }: ToolBarProps) {
  return (
    <div className={cn(toolBarVariants({ variant }), className)} {...props}>
      {tools.map((tool, index) => (
        <div key={index} className="group relative">
          <IconButton
            iconName={tool.iconName}
            onClick={tool.onClick}
            disabled={tool.disabled}
            aria-label={tool.label}
            className="hover:scale-110 active:scale-90 transition-transform"
          />
          <div className="pointer-events-none absolute left-1/2 -top-[48px] z-10 hidden -translate-x-1/2 whitespace-nowrap rounded-[6px] bg-primary px-[12px] py-[6px] text-[12px] font-bold text-neutral-900 opacity-0 transition-opacity group-hover:block group-hover:opacity-100 shadow-primary-glow">
            {tool.label}
          </div>
        </div>
      ))}
    </div>
  );
}
