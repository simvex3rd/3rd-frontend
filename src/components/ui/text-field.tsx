import { cn } from "@/lib/utils";
import { Input, type InputProps } from "./input";
import { HelpMessage } from "./help-message";

/**
 * Text field component combining input and help message.
 *
 * @component
 * @example
 * ```tsx
 * <TextField label="Email" placeholder="Enter email" />
 * <TextField label="Password" error="Password is required" />
 * <TextField label="Username" success="Username is available" />
 * ```
 *
 * @param {TextFieldProps} props - Component props
 * @param {string} [props.label] - Label text for the input
 * @param {string} [props.error] - Error message to display
 * @param {string} [props.success] - Success message to display
 * @param {string} [props.helpText] - Default help text to display
 *
 * @see {@link https://figma.com/file/Vz80RydxWcYHVnn2iuyV0m/SIMVEX} Figma Design
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
        ? "disable"
        : props.value
          ? "fill"
          : "default";

  // Determine message variant and text
  const messageVariant = error ? "error" : success ? "success" : "default";
  const messageText = error || success || helpText;

  return (
    <div className={cn("flex flex-col gap-2", className)}>
      {label && (
        <label
          htmlFor={inputId}
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          {label}
        </label>
      )}
      <Input id={inputId} variant={inputVariant} {...props} />
      {messageText && (
        <HelpMessage variant={messageVariant}>{messageText}</HelpMessage>
      )}
    </div>
  );
}
