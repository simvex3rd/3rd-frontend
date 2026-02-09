"use client";

/**
 * ViewerSideToolbar Component
 *
 * Right side vertical toolbar (rotated 90° in parent) with 3 tool icons.
 * Uses inline group-hover tooltips instead of Tooltip component
 * to avoid positioning issues from the parent rotate-90 context.
 * Button -rotate-90 cancels out parent rotate-90 (net 0°),
 * so tooltip positioning works in screen coordinates.
 *
 * @see {@link https://www.figma.com/design/Vz80RydxWcYHVnn2iuyV0m?node-id=160-724} Figma Design
 */

import { cn } from "@/lib/utils";
import { useUIStore } from "@/stores/ui-store";

interface ViewerSideToolbarProps {
  className?: string;
}

export function ViewerSideToolbar({ className }: ViewerSideToolbarProps) {
  const { activeSideTool, setSideTool } = useUIStore();
  return (
    <div
      className={cn(
        "w-[260px] h-[64px]",
        "flex items-center justify-center gap-[20px]",
        "bg-gray-30 border-[3px] border-primary rounded-[12px]",
        "px-[32px] py-[10px]",
        "shadow-card-glow",
        "backdrop-blur-sm",
        className
      )}
      role="toolbar"
      aria-label="Side tools"
    >
      {/* AI Assistant — fillable star */}
      <button
        onClick={() => setSideTool("ai")}
        className={cn(
          "group relative w-[44px] h-[44px] flex items-center justify-center -rotate-90 text-primary transition-all rounded-full",
          "focus-visible:ring-[2px] focus-visible:ring-primary focus-visible:ring-offset-[2px]",
          "disabled:opacity-50 disabled:cursor-not-allowed",
          "hover:bg-primary/10",
          activeSideTool === "ai" && "bg-primary/15"
        )}
        aria-label="Open AI Assistant"
        aria-pressed={activeSideTool === "ai"}
      >
        <svg width="36" height="36" viewBox="0 0 40 40" fill="none">
          <path
            d="M20 8L24 16H32L26 22L28 30L20 26L12 30L14 22L8 16H16L20 8Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={cn(
              "transition-colors",
              activeSideTool === "ai"
                ? "fill-primary/35 group-hover:fill-primary/45"
                : "group-hover:fill-primary/15"
            )}
          />
        </svg>
        <span className="absolute right-full top-1/2 -translate-y-1/2 mr-[10px] opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap bg-neutral-700 text-neutral-50 text-[12px] font-medium px-[10px] py-[5px] rounded-[6px]">
          AI Assistant
        </span>
      </button>

      {/* Part Info — fillable search circle */}
      <button
        onClick={() => setSideTool("search")}
        className={cn(
          "group relative w-[44px] h-[44px] flex items-center justify-center -rotate-90 text-primary transition-all rounded-full",
          "focus-visible:ring-[2px] focus-visible:ring-primary focus-visible:ring-offset-[2px]",
          "disabled:opacity-50 disabled:cursor-not-allowed",
          "hover:bg-primary/10",
          activeSideTool === "search" && "bg-primary/15"
        )}
        aria-label="Part Info"
        aria-pressed={activeSideTool === "search"}
      >
        <svg width="36" height="36" viewBox="0 0 40 40" fill="none">
          <path
            d="M18 28C23.5228 28 28 23.5228 28 18C28 12.4772 23.5228 8 18 8C12.4772 8 8 12.4772 8 18C8 23.5228 12.4772 28 18 28Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={cn(
              "transition-colors",
              activeSideTool === "search"
                ? "fill-primary/35 group-hover:fill-primary/45"
                : "group-hover:fill-primary/15"
            )}
          />
          <path
            d="M32 32L26 26"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M15 12L18 18L21 12"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <span className="absolute right-full top-1/2 -translate-y-1/2 mr-[10px] opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap bg-neutral-700 text-neutral-50 text-[12px] font-medium px-[10px] py-[5px] rounded-[6px]">
          Part Info
        </span>
      </button>

      {/* Memo — line icon */}
      <button
        onClick={() => setSideTool("edit")}
        className={cn(
          "group relative w-[44px] h-[44px] flex items-center justify-center -rotate-90 text-primary transition-all rounded-full",
          "focus-visible:ring-[2px] focus-visible:ring-primary focus-visible:ring-offset-[2px]",
          "disabled:opacity-50 disabled:cursor-not-allowed",
          "hover:bg-primary/10",
          activeSideTool === "edit" && "bg-primary/15"
        )}
        aria-label="Memo"
        aria-pressed={activeSideTool === "edit"}
      >
        <svg width="36" height="36" viewBox="0 0 40 40" fill="none">
          <path
            d="M8 32H32M12 32V12C12 10.8954 12.8954 10 14 10H26C27.1046 10 28 10.8954 28 12V32M20 16L24 20L20 24"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <span className="absolute right-full top-1/2 -translate-y-1/2 mr-[10px] opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap bg-neutral-700 text-neutral-50 text-[12px] font-medium px-[10px] py-[5px] rounded-[6px]">
          Memo
        </span>
      </button>
    </div>
  );
}
