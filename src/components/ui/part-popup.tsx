import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import type { HTMLAttributes } from "react";

/**
 * Part popup component - Tooltip-style quick info display for 3D parts.
 * Shows name and basic specs when hovering over parts in the 3D viewer.
 *
 * @component
 * @example
 * ```tsx
 * <PartPopup name="Engine Block" material="Aluminum Alloy" />
 * <PartPopup name="Piston" material="Steel" weight="2.5 kg" />
 * ```
 *
 * @param {PartPopupProps} props - Component props
 * @param {string} props.name - Part name
 * @param {string} [props.material] - Material type
 * @param {string} [props.weight] - Weight specification
 * @param {number} [props.x] - X position (for absolute positioning)
 * @param {number} [props.y] - Y position (for absolute positioning)
 *
 * @see {@link https://figma.com/file/Vz80RydxWcYHVnn2iuyV0m/SIMVEX} Figma Design - Part Popup (272x78)
 */

const partPopupVariants = cva(
  // Base classes - 272x78 from Figma
  "inline-flex flex-col gap-2 rounded-lg border border-[var(--primary-cyan)]/30 bg-[#0a0a0a]/95 px-4 py-3 shadow-lg backdrop-blur-sm transition-all",
  {
    variants: {
      variant: {
        default: "hover:border-[var(--primary-cyan)]/60",
        highlight:
          "border-[var(--primary-cyan)]/60 shadow-[0_0_12px_rgba(2,238,225,0.2)]",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface PartPopupProps
  extends
    Omit<HTMLAttributes<HTMLDivElement>, "children">,
    VariantProps<typeof partPopupVariants> {
  /** Part name */
  name: string;
  /** Material type */
  material?: string;
  /** Weight specification */
  weight?: string;
  /** X position for absolute positioning */
  x?: number;
  /** Y position for absolute positioning */
  y?: number;
}

export function PartPopup({
  className,
  variant,
  name,
  material,
  weight,
  x,
  y,
  style,
  ...props
}: PartPopupProps) {
  const positionStyle =
    x !== undefined && y !== undefined
      ? { position: "absolute" as const, left: `${x}px`, top: `${y}px` }
      : {};

  return (
    <div
      className={cn(partPopupVariants({ variant }), "w-[272px]", className)}
      style={{ ...positionStyle, ...style }}
      {...props}
    >
      {/* Part Name - heading-xs (14px, 125% line-height) */}
      <h4 className="text-[14px] font-bold leading-[1.25] text-[var(--primary-cyan)]">
        {name}
      </h4>

      {/* Specs - body-sm (12px, 150% line-height) */}
      <div className="flex flex-col gap-1 text-[12px] leading-[1.5] text-[#d4d4d4]">
        {material && (
          <div className="flex items-center justify-between">
            <span className="text-[#a3a3a3]">Material:</span>
            <span className="font-medium">{material}</span>
          </div>
        )}
        {weight && (
          <div className="flex items-center justify-between">
            <span className="text-[#a3a3a3]">Weight:</span>
            <span className="font-medium">{weight}</span>
          </div>
        )}
      </div>
    </div>
  );
}
