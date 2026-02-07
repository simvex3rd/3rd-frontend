import { cn } from "@/lib/utils";
import type { HTMLAttributes } from "react";

/**
 * AI Assistant Panel component.
 * Displays a title with icon and a content area.
 */

export interface AiAssistantProps extends HTMLAttributes<HTMLDivElement> {
  title?: string;
  text?: string;
}

export function AiAssistant({
  className,
  title = "AI Assistant",
  text = "부품 설명어쩌궁..",
  ...props
}: AiAssistantProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4 items-start relative w-[416px]",
        className
      )}
      {...props}
    >
      {/* Header */}
      <div className="flex gap-4 items-center justify-center relative shrink-0">
        <div className="relative shrink-0 size-[37px] overflow-hidden">
          {/* Simple AI Icon Placeholder or SVG */}
          <svg
            width="37"
            height="37"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full text-[#02EEE1]"
          >
            <path
              d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20Z"
              fill="currentColor"
              fillOpacity="0.2"
            />
            <path
              d="M12 6L12 18M6 12L18 12"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </div>
        <h2 className="font-semibold text-[32px] leading-[1.25] text-[#02EEE1]">
          {title}
        </h2>
      </div>

      {/* Content Box */}
      <div className="w-full h-[250px] flex items-center justify-center px-[30px] py-[30px] bg-[#D4D4D4]/30 border-[3px] border-[#02EEE1] rounded-[24px] backdrop-blur-sm">
        <p className="font-medium text-[16px] leading-[1.5] text-white whitespace-pre-wrap">
          {text}
        </p>
      </div>
    </div>
  );
}
