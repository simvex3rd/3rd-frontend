import { cn } from "@/lib/utils";
import { Input, type InputProps } from "./input";
import { HelpMessage } from "./help-message";

/**
 * TextField component - composite form field with label, input, and help message.
 * Based on verified design specs from docs/phase2-ui-basic.md
 *
 * @component
 * @example
 * ```tsx
 * <TextField label="Email" placeholder="Enter email" />
 * <TextField label="Password" error="Password is required" />
 * <TextField label="Username" success="Username is available" />
 * ```
 *
 * Dimensions: 320px width, variable height (66px with all elements)
 * Gap: 2px between label/input/help
 * Composite: Label + InputField + HelpMessage
 *
 * @see {@link https://figma.com/file/Vz80RydxWcYHVnn2iuyV0m/SIMVEX?node-id=147-837} Figma Design
 */

export interface TextFieldProps extends Omit<InputProps, "variant"> {
  label?: string;
  error?: string;
  success?: string;
  helpText?: string;
}

export function TextField({
  className,
  label,
  error,
  success,
  helpText,
  id,
  ...props
}: TextFieldProps) {
  const inputId = id || `input-${label?.toLowerCase().replace(/\s+/g, "-")}`;

  // Determine input variant based on state
  const inputVariant = error
    ? "error"
    : success
      ? "success"
      : props.disabled
        ? "disabled"
        : props.value
          ? "fill"
          : "default";

  // Determine message variant and text
  const messageVariant = error ? "error" : success ? "success" : "default";
  const messageText = error || success || helpText;

  return (
    <div className={cn("flex flex-col gap-0.5", className)}>
      {label && (
        <label
          htmlFor={inputId}
          className="text-base font-medium leading-normal text-neutral-200"
        >
          {label}
        </label>
      )}
      <Input
        id={inputId}
        variant={inputVariant}
        aria-describedby={messageText ? `${inputId}-message` : undefined}
        {...props}
      />
      {messageText && (
        <HelpMessage id={`${inputId}-message`} variant={messageVariant}>
          {messageText}
        </HelpMessage>
      )}
    </div>
  );
}
