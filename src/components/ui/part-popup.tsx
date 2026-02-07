import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import type { HTMLAttributes } from "react";

/**
 * Part popup component - Tooltip-style question popup for 3D parts.
 * Displays a question with a YES button (Figma spec: 272x78, 말풍선 형태).
 *
 * @component
 * @example
 * ```tsx
 * <PartPopup
 *   text="분해 순서에 대한 힌트가 필요하신가요?"
 *   onConfirm={() => console.log('YES clicked')}
 * />
 * ```
 *
 * @param {PartPopupProps} props - Component props
 * @param {string} [props.text] - Question text
 * @param {() => void} [props.onConfirm] - YES button click handler
 *
 * @see {@link https://figma.com/file/Vz80RydxWcYHVnn2iuyV0m/SIMVEX} Figma Design - Part Popup (272x78, node-236:1141)
 */

const partPopupVariants = cva(
  // Base classes - 272px width, 3-corner border radius (말풍선 형태)
  "inline-flex flex-col items-end justify-center gap-1 rounded-bl-[16px] rounded-br-[16px] rounded-tr-[16px] border-2 border-solid border-[var(--primary-cyan)] bg-[rgba(212,212,212,0.3)] px-4 py-2 transition-all",
  {
    variants: {
      variant: {
        default: "",
        highlight: "shadow-[0_0_12px_rgba(2,238,225,0.2)]",
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
  /** Popup 질문 텍스트 */
  text?: string;
  /** YES 버튼 클릭 핸들러 */
  onConfirm?: () => void;
}

export function PartPopup({
  className,
  variant,
  text = "분해 순서에 대한 힌트가 필요하신가요?",
  onConfirm,
  style,
  ...props
}: PartPopupProps) {
  return (
    <div
      className={cn(partPopupVariants({ variant }), "w-[272px]", className)}
      style={style}
      {...props}
    >
      {/* Question Text - 14px medium, center aligned, #e5e5e5 */}
      <p className="font-medium text-[14px] leading-[1.5] text-[#e5e5e5] text-center w-full">
        {text}
      </p>

      {/* YES Button - 81x37px, body btn style */}
      <button
        onClick={onConfirm}
        className="flex items-center justify-center w-[81px] h-[37px] bg-[rgba(115,115,115,0.3)] border-2 border-[var(--primary-cyan)] rounded-[16px] transition-all hover:bg-[rgba(115,115,115,0.5)] active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--primary-cyan)]"
        aria-label="Confirm"
      >
        <span className="font-semibold text-[14px] leading-[1.5] text-[#e5e5e5]">
          YES
        </span>
      </button>
    </div>
  );
}
