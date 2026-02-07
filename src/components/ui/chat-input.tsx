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
  "relative flex w-full items-end gap-2 rounded-[8px] border border-solid px-3 py-2 transition-all backdrop-blur-sm focus-within:outline-none disabled:cursor-not-allowed",
  {
    variants: {
      variant: {
        default:
          "border-[var(--gray-300)] bg-white text-[var(--bg-dark)] placeholder:text-[var(--gray-500)] focus-within:border-[var(--blue-primary)]",
        focus: "border-[var(--blue-primary)] bg-white text-[var(--bg-dark)]",
        error: "border-[var(--red-error)] bg-white text-[var(--bg-dark)]",
        success: "border-[var(--green-success)] bg-white text-[var(--bg-dark)]",
        disable:
          "border-[var(--gray-300)] bg-[var(--gray-100)] text-[var(--gray-300)]",
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
      <div className="flex flex-col gap-1">
        <div
          className={cn(
            chatInputVariants({ variant: disabled ? "disable" : variant }),
            className
          )}
        >
          <textarea
            ref={ref}
            className="min-h-[40px] max-h-[120px] flex-1 resize-none bg-transparent py-1.5 text-[16px] leading-[1.5] outline-none placeholder:text-inherit"
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
              "mb-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-[6px] transition-all",
              hasContent && !disabled
                ? "bg-[var(--primary-cyan)] text-white hover:bg-[var(--primary-cyan-hover)] active:bg-[var(--primary-cyan-press)]"
                : "bg-[var(--gray-100)] text-[var(--gray-300)] cursor-not-allowed"
            )}
            aria-label="Send message"
          >
            <SendIcon className="h-5 w-5" />
          </button>
        </div>
        {showCounter && maxLength && (
          <div
            className={cn(
              "text-right text-xs",
              charCount > maxLength * 0.9
                ? "text-[var(--red-error)]"
                : "text-[var(--gray-500)]"
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
