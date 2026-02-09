"use client";

/**
 * ViewerSideToolbar Component
 *
 * Right side vertical toolbar (rotated 90°) with 3 tool icons.
 * Matches Figma design: 300x50px (becomes 50x300px when rotated),
 * rgba(212,212,212,0.3) background, 3px cyan border, 16px border radius.
 *
 * Icons (40x40px each, also rotated -90° to appear upright):
 * - MingcuteAiLine: AI Assistant
 * - FluentTagSearch24Regular: Search/filter parts
 * - LucideSquarePen: Edit/annotate
 *
 * @see {@link https://www.figma.com/design/Vz80RydxWcYHVnn2iuyV0m?node-id=160-724} Figma Design
 */

import { cn } from "@/lib/utils";
import { useUIStore } from "@/stores/ui-store";

interface ViewerSideToolbarProps {
  className?: string;
}

export function ViewerSideToolbar({ className }: ViewerSideToolbarProps) {
  const { activeSideTool, setSideTool, openChat } = useUIStore();
  return (
    <div
      className={cn(
        "w-[225px] h-[37.5px]",
        "flex items-center justify-center gap-[12px]",
        "bg-gray-30 border-[3px] border-primary rounded-[12px]",
        "px-[90px] py-[12px]",
        "shadow-card-glow",
        "backdrop-blur-sm",
        className
      )}
      role="toolbar"
      aria-label="Side tools"
    >
      {/* AI Assistant - icon rotated to appear upright */}
      <button
        onClick={() => {
          setSideTool("ai");
          openChat();
        }}
        className={cn(
          "w-[44px] h-[44px] flex items-center justify-center -rotate-90 text-primary transition-colors",
          "hover:bg-primary/20 hover:text-primary",
          "active:scale-95 active:bg-primary/40",
          "focus-visible:ring-[2px] focus-visible:ring-primary focus-visible:ring-offset-[2px]",
          "disabled:opacity-50 disabled:cursor-not-allowed",
          activeSideTool === "ai" && "bg-primary/30 ring-[2px] ring-primary"
        )}
        aria-label="Open AI Assistant"
        title="AI Assistant"
      >
        <svg width="30" height="30" viewBox="0 0 40 40" fill="none">
          <path
            d="M20 8L24 16H32L26 22L28 30L20 26L12 30L14 22L8 16H16L20 8Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {/* Search Parts - icon rotated to appear upright */}
      <button
        onClick={() =>
          setSideTool(activeSideTool === "search" ? null : "search")
        }
        className={cn(
          "w-[44px] h-[44px] flex items-center justify-center -rotate-90 text-primary transition-colors",
          "hover:bg-primary/20 hover:text-primary",
          "active:scale-95 active:bg-primary/40",
          "focus-visible:ring-[2px] focus-visible:ring-primary focus-visible:ring-offset-[2px]",
          "disabled:opacity-50 disabled:cursor-not-allowed",
          activeSideTool === "search" && "bg-primary/30 ring-[2px] ring-primary"
        )}
        aria-label="Search parts"
        title="Search parts"
      >
        <svg width="30" height="30" viewBox="0 0 40 40" fill="none">
          <path
            d="M18 28C23.5228 28 28 23.5228 28 18C28 12.4772 23.5228 8 18 8C12.4772 8 8 12.4772 8 18C8 23.5228 12.4772 28 18 28Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
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
      </button>

      {/* Edit/Annotate - icon rotated to appear upright */}
      <button
        onClick={() => setSideTool(activeSideTool === "edit" ? null : "edit")}
        className={cn(
          "w-[44px] h-[44px] flex items-center justify-center -rotate-90 text-primary transition-colors",
          "hover:bg-primary/20 hover:text-primary",
          "active:scale-95 active:bg-primary/40",
          "focus-visible:ring-[2px] focus-visible:ring-primary focus-visible:ring-offset-[2px]",
          "disabled:opacity-50 disabled:cursor-not-allowed",
          activeSideTool === "edit" && "bg-primary/30 ring-[2px] ring-primary"
        )}
        aria-label="Edit annotations"
        title="Edit annotations"
      >
        <svg width="30" height="30" viewBox="0 0 40 40" fill="none">
          <path
            d="M8 32H32M12 32V12C12 10.8954 12.8954 10 14 10H26C27.1046 10 28 10.8954 28 12V32M20 16L24 20L20 24"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </div>
  );
}
