"use client";

import { cn } from "@/lib/utils";
import {
  createContext,
  useContext,
  useState,
  useRef,
  useEffect,
  type ReactNode,
  type HTMLAttributes,
} from "react";

/**
 * Tooltip component system for toolbar button hints.
 * Lightweight CSS-based implementation following shadcn/ui patterns.
 *
 * @component
 * @example
 * ```tsx
 * <TooltipProvider>
 *   <Tooltip>
 *     <TooltipTrigger asChild>
 *       <IconButton iconName="menu" />
 *     </TooltipTrigger>
 *     <TooltipContent side="top">
 *       Open menu
 *     </TooltipContent>
 *   </Tooltip>
 * </TooltipProvider>
 * ```
 *
 * Features:
 * - Positioning: top (default), bottom, left, right
 * - Delay: 300ms on hover before showing
 * - Arrow indicator pointing to trigger
 * - ARIA: role="tooltip", accessible via aria-describedby
 * - Auto-dismiss on trigger blur or mouse leave
 *
 * Design tokens:
 * - Background: bg-neutral-700
 * - Text: text-neutral-50, text-[12px]
 * - Padding: px-[12px] py-[6px]
 * - Border radius: rounded-[8px]
 * - Arrow: 6px triangle using border trick
 */

interface TooltipContextValue {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  delay: number;
}

const TooltipContext = createContext<TooltipContextValue | null>(null);

function useTooltipContext() {
  const context = useContext(TooltipContext);
  if (!context) {
    throw new Error("Tooltip components must be used within TooltipProvider");
  }
  return context;
}

// ============================================================================
// TooltipProvider - Manages global tooltip settings
// ============================================================================

interface TooltipProviderProps {
  children: ReactNode;
  delayDuration?: number;
}

export function TooltipProvider({
  children,
  delayDuration = 300,
}: TooltipProviderProps) {
  return <div>{children}</div>;
}

// ============================================================================
// Tooltip - Root component managing open state
// ============================================================================

interface TooltipProps {
  children: ReactNode;
  delayDuration?: number;
}

export function Tooltip({ children, delayDuration = 300 }: TooltipProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <TooltipContext.Provider
      value={{ isOpen, setIsOpen, delay: delayDuration }}
    >
      <div className="relative inline-flex">{children}</div>
    </TooltipContext.Provider>
  );
}

// ============================================================================
// TooltipTrigger - Interactive element that shows tooltip on hover
// ============================================================================

interface TooltipTriggerProps extends HTMLAttributes<HTMLDivElement> {
  asChild?: boolean;
}

export function TooltipTrigger({
  asChild,
  children,
  ...props
}: TooltipTriggerProps) {
  const { setIsOpen, delay } = useTooltipContext();
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = () => {
    timeoutRef.current = setTimeout(() => {
      setIsOpen(true);
    }, delay);
  };

  const handleMouseLeave = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsOpen(false);
  };

  const handleFocus = () => {
    timeoutRef.current = setTimeout(() => {
      setIsOpen(true);
    }, delay);
  };

  const handleBlur = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsOpen(false);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  // If asChild, clone the child and add event handlers
  if (
    asChild &&
    typeof children === "object" &&
    children !== null &&
    "props" in children
  ) {
    const child = children as React.ReactElement;
    return (
      <div
        role="presentation"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onFocus={handleFocus}
        onBlur={handleBlur}
        {...props}
      >
        {child}
      </div>
    );
  }

  // Otherwise wrap in a div
  return (
    <div
      role="presentation"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onFocus={handleFocus}
      onBlur={handleBlur}
      {...props}
    >
      {children}
    </div>
  );
}

// ============================================================================
// TooltipContent - Tooltip popup with arrow
// ============================================================================

interface TooltipContentProps extends HTMLAttributes<HTMLDivElement> {
  side?: "top" | "bottom" | "left" | "right";
  sideOffset?: number;
}

export function TooltipContent({
  side = "top",
  sideOffset = 8,
  children,
  className,
  ...props
}: TooltipContentProps) {
  const { isOpen } = useTooltipContext();
  const contentRef = useRef<HTMLDivElement>(null);

  if (!isOpen) return null;

  // Position classes based on side
  const positionClasses = {
    top: `bottom-full left-1/2 -translate-x-1/2 mb-[${sideOffset}px]`,
    bottom: `top-full left-1/2 -translate-x-1/2 mt-[${sideOffset}px]`,
    left: `right-full top-1/2 -translate-y-1/2 mr-[${sideOffset}px]`,
    right: `left-full top-1/2 -translate-y-1/2 ml-[${sideOffset}px]`,
  };

  // Arrow classes based on side
  const arrowClasses = {
    top: "bottom-[-6px] left-1/2 -translate-x-1/2 border-l-[6px] border-r-[6px] border-t-[6px] border-l-transparent border-r-transparent border-t-neutral-700",
    bottom:
      "top-[-6px] left-1/2 -translate-x-1/2 border-l-[6px] border-r-[6px] border-b-[6px] border-l-transparent border-r-transparent border-b-neutral-700",
    left: "right-[-6px] top-1/2 -translate-y-1/2 border-t-[6px] border-b-[6px] border-l-[6px] border-t-transparent border-b-transparent border-l-neutral-700",
    right:
      "left-[-6px] top-1/2 -translate-y-1/2 border-t-[6px] border-b-[6px] border-r-[6px] border-t-transparent border-b-transparent border-r-neutral-700",
  };

  return (
    <div
      ref={contentRef}
      role="tooltip"
      className={cn(
        // Base styles
        "absolute z-50 pointer-events-none",
        "bg-neutral-700 text-neutral-50",
        "px-[12px] py-[6px] rounded-[8px]",
        "text-[12px] font-medium leading-[1.4]",
        "whitespace-nowrap",
        // Animations
        "animate-in fade-in-0 zoom-in-95",
        "data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95",
        // Position
        positionClasses[side],
        className
      )}
      {...props}
    >
      {children}
      {/* Arrow */}
      <div className={cn("absolute w-0 h-0", arrowClasses[side])} />
    </div>
  );
}
