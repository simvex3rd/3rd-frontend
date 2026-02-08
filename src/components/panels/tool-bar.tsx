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
  "flex items-center justify-center border-3 border-primary rounded-2xl bg-white/10 backdrop-blur-md shadow-primary-glow transition-all",
  {
    variants: {
      variant: {
        horizontal: "flex-row w-[500px] h-[50px] gap-12 px-40 py-4",
        vertical: "flex-col w-[50px] h-[300px] gap-4 px-4 py-16",
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
          <div className="pointer-events-none absolute left-1/2 -top-12 z-10 hidden -translate-x-1/2 whitespace-nowrap rounded-md bg-primary px-3 py-1.5 text-xs font-bold text-neutral-900 opacity-0 transition-opacity group-hover:block group-hover:opacity-100 shadow-primary-glow">
            {tool.label}
          </div>
        </div>
      ))}
    </div>
  );
}
