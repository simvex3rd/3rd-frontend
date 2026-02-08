"use client";

import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/toast";
import { useToast } from "@/hooks/use-toast";

/**
 * Toaster component - renders all active toasts
 *
 * Usage:
 * Add this component to your root layout:
 * ```tsx
 * <Toaster />
 * ```
 *
 * Then use the useToast hook anywhere:
 * ```tsx
 * const { toast } = useToast();
 * toast.success("Saved!");
 * ```
 *
 * Features:
 * - Max 3 visible toasts (FIFO)
 * - Auto-dismiss after 5 seconds
 * - Manual dismiss with close button
 * - Stacked vertically with gap-[8px]
 * - Position: top-[24px] right-[24px]
 */
export function Toaster() {
  const { toasts } = useToast();

  return (
    <ToastProvider>
      {toasts.map(({ id, title, description, variant, ...props }) => (
        <Toast key={id} variant={variant} {...props}>
          <div className="flex-1 grid gap-[4px]">
            {title && <ToastTitle>{title}</ToastTitle>}
            {description && <ToastDescription>{description}</ToastDescription>}
          </div>
          <ToastClose />
        </Toast>
      ))}
      <ToastViewport />
    </ToastProvider>
  );
}
