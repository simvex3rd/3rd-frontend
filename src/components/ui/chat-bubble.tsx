import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import type { HTMLAttributes, ReactNode } from "react";

/**
 * Chat Bubble component for displaying messages in a conversation.
 *
 * @component
 * @example
 * ```tsx
 * <ChatBubble variant="user" avatar="/avatar.jpg" timestamp="2:30 PM">
 *   Hello, how can I help you?
 * </ChatBubble>
 * ```
 *
 * @param {ChatBubbleProps} props - Component props
 * @param {"user" | "ai"} [props.variant="user"] - Chat bubble variant (user: right-aligned, ai: left-aligned)
 * @param {string} [props.avatar] - Avatar image URL
 * @param {string} [props.timestamp] - Message timestamp
 * @param {ReactNode} props.children - Message content (supports markdown)
 *
 * @see {@link https://figma.com/file/Vz80RydxWcYHVnn2iuyV0m/SIMVEX} Figma Design
 */

const chatBubbleVariants = cva(
  "flex gap-[12px] w-full transition-all duration-300",
  {
    variants: {
      variant: {
        user: "flex-row-reverse justify-start",
        ai: "flex-row justify-start",
      },
    },
    defaultVariants: {
      variant: "user",
    },
  }
);

const chatBubbleContentVariants = cva(
  "flex flex-col gap-[4px] max-w-[70%] min-w-[120px]",
  {
    variants: {
      variant: {
        user: "items-end",
        ai: "items-start",
      },
    },
    defaultVariants: {
      variant: "user",
    },
  }
);

const chatBubbleMessageVariants = cva(
  "rounded-[16px] px-[16px] py-[12px] text-[16px] leading-6 break-words",
  {
    variants: {
      variant: {
        user: "bg-primary text-neutral-50",
        ai: "bg-neutral-100 text-neutral-950 border border-neutral-300",
      },
    },
    defaultVariants: {
      variant: "user",
    },
  }
);

export interface ChatBubbleProps
  extends
    HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof chatBubbleVariants> {
  variant?: "user" | "ai";
  avatar?: string;
  timestamp?: string;
  children: ReactNode;
}

export function ChatBubble({
  className,
  variant = "user",
  avatar,
  timestamp,
  children,
  ...props
}: ChatBubbleProps) {
  return (
    <div className={cn(chatBubbleVariants({ variant }), className)} {...props}>
      {/* Avatar */}
      {avatar && (
        <div className="flex-shrink-0">
          <div className="w-[40px] h-[40px] rounded-full overflow-hidden bg-neutral-200 flex items-center justify-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={avatar}
              alt={`${variant} avatar`}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      )}

      {/* Content */}
      <div className={cn(chatBubbleContentVariants({ variant }))}>
        {/* Message */}
        <div className={cn(chatBubbleMessageVariants({ variant }))}>
          {children}
        </div>

        {/* Timestamp */}
        {timestamp && (
          <span className="text-[14px] text-neutral-500 px-[8px]">
            {timestamp}
          </span>
        )}
      </div>
    </div>
  );
}
