"use client";

import { cn } from "@/lib/utils";
import type { HTMLAttributes } from "react";

/**
 * User chat label component - displays a styled label for user chat sections.
 * Styled according to Figma spec: 365x40px with cyan/teal background.
 *
 * @component
 * @example
 * ```tsx
 * <UserChatLabel />
 * <UserChatLabel text="Custom label" />
 * ```
 *
 * @param {UserChatLabelProps} props - Component props
 * @param {string} [props.text="user chat"] - Label text to display
 *
 * @see {@link https://figma.com/file/Vz80RydxWcYHVnn2iuyV0m/SIMVEX} Figma Design - slide bar/user chat (365x40, node-236:1485)
 */

export interface UserChatLabelProps extends HTMLAttributes<HTMLDivElement> {
  text?: string;
}

export function UserChatLabel({
  className,
  text = "user chat",
  ...props
}: UserChatLabelProps) {
  return (
    <div
      className={cn(
        "flex items-center justify-between w-[365px] h-[40px] px-4 py-2 bg-primary/30 rounded-tl-lg rounded-tr-lg rounded-bl-lg",
        className
      )}
      {...props}
    >
      <p className="flex-1 font-normal text-base leading-[1.5] text-neutral-50">
        {text}
      </p>
    </div>
  );
}
