import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import type { TextareaHTMLAttributes } from "react";
import { LucideSend, type LucideIcon } from "lucide-react";
import { forwardRef, useState } from "react";

/**
 * Chat input component with multi-line textarea and send button.
 *
 * @component
 * @example
 * ```tsx
 * <ChatInput placeholder="Type a message..." />
 * <ChatInput variant="error" value="Invalid message" />
 * <ChatInput showCounter maxLength={500} />
 * ```
 *
 * @param {ChatInputProps} props - Component props
 * @param {"default" | "focus" | "error" | "success" | "disable"} [props.variant="default"] - Input state variant
 * @param {boolean} [props.showCounter=false] - Show character counter
 * @param {LucideIcon} [props.sendIcon] - Custom send icon
 * @param {() => void} [props.onSend] - Send button click handler
 *
 * @see {@link https://figma.com/file/Vz80RydxWcYHVnn2iuyV0m/SIMVEX} Figma Design
 */

const chatInputVariants = cva(
  // Base classes
  "relative flex w-full items-end gap-[8px] rounded-[8px] border border-solid px-[12px] py-[8px] transition-all backdrop-blur-sm focus-within:outline-none disabled:cursor-not-allowed",
  {
    variants: {
      variant: {
        default:
          "border-neutral-300 bg-white text-neutral-950 placeholder:text-neutral-500 focus-within:border-info",
        focus: "border-info bg-white text-neutral-950",
        error: "border-error bg-white text-neutral-950",
        success: "border-success bg-white text-neutral-950",
        disable: "border-neutral-300 bg-neutral-100 text-neutral-300",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface ChatInputProps
  extends
    Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "size">,
    VariantProps<typeof chatInputVariants> {
  sendIcon?: LucideIcon;
  onSend?: () => void;
  showCounter?: boolean;
}

export const ChatInput = forwardRef<HTMLTextAreaElement, ChatInputProps>(
  (
    {
      className,
      variant,
      disabled,
      sendIcon,
      onSend,
      showCounter = false,
      maxLength,
      value,
      onChange,
      ...props
    },
    ref
  ) => {
    const [internalValue, setInternalValue] = useState("");
    const SendIcon = sendIcon || LucideSend;

    const currentValue = value !== undefined ? String(value) : internalValue;
    const charCount = currentValue.length;
    const hasContent = charCount > 0;

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      if (value === undefined) {
        setInternalValue(e.target.value);
      }
      onChange?.(e);
    };

    const handleSend = () => {
      if (!disabled && hasContent && onSend) {
        onSend();
      }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        handleSend();
      }
      props.onKeyDown?.(e);
    };

    return (
      <div className="flex flex-col gap-[4px]">
        <div
          className={cn(
            chatInputVariants({ variant: disabled ? "disable" : variant }),
            className
          )}
        >
          <textarea
            ref={ref}
            className="min-h-[40px] max-h-[120px] flex-1 resize-none bg-transparent py-[6px] text-[16px] leading-[1.5] outline-none placeholder:text-inherit"
            disabled={disabled}
            maxLength={maxLength}
            value={value}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            rows={1}
            {...props}
          />
          <button
            type="button"
            onClick={handleSend}
            disabled={disabled || !hasContent}
            className={cn(
              "mb-[4px] flex h-[32px] w-[32px] shrink-0 items-center justify-center rounded-[6px] transition-all",
              hasContent && !disabled
                ? "bg-primary text-neutral-50 hover:bg-primary-hover active:bg-primary-press"
                : "bg-neutral-100 text-neutral-300 cursor-not-allowed"
            )}
            aria-label="Send message"
          >
            <SendIcon className="h-[20px] w-[20px]" />
          </button>
        </div>
        {showCounter && maxLength && (
          <div
            className={cn(
              "text-right text-[12px]",
              charCount > maxLength * 0.9 ? "text-error" : "text-neutral-500"
            )}
          >
            {charCount} / {maxLength}
          </div>
        )}
      </div>
    );
  }
);

ChatInput.displayName = "ChatInput";
