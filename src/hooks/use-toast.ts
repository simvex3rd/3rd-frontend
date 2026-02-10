import { useState, useCallback, useEffect } from "react";

/**
 * Toast notification hook with queue management
 *
 * Features:
 * - Queue system: max 3 visible toasts, FIFO
 * - Auto-dismiss: 5 seconds default
 * - Variants: success, error, info, warning
 *
 * @example
 * ```tsx
 * const { toast } = useToast();
 * toast.success("Saved!");
 * toast.error("Failed to save");
 * ```
 */

export type ToastVariant = "success" | "error" | "info" | "warning";

export interface Toast {
  id: string;
  title: string;
  description?: string;
  variant: ToastVariant;
  duration?: number;
}

interface ToastState {
  toasts: Toast[];
}

const MAX_TOASTS = 3;
const DEFAULT_DURATION = 5000; // 5 seconds

let toastCounter = 0;
const generateId = () => `toast-${Date.now()}-${++toastCounter}`;

// Global state for toasts (shared across all useToast hooks)
let listeners: Array<(state: ToastState) => void> = [];
let state: ToastState = { toasts: [] };

function setState(newState: ToastState) {
  state = newState;
  listeners.forEach((listener) => listener(state));
}

function addToast(toast: Omit<Toast, "id">): string {
  const id = generateId();
  const newToast: Toast = {
    ...toast,
    id,
    duration: toast.duration ?? DEFAULT_DURATION,
  };

  setState({
    toasts: [...state.toasts, newToast].slice(-MAX_TOASTS), // Keep only last 3
  });

  // Auto-dismiss
  if (newToast.duration && newToast.duration > 0) {
    setTimeout(() => {
      removeToast(id);
    }, newToast.duration);
  }

  return id;
}

function removeToast(id: string) {
  setState({
    toasts: state.toasts.filter((t) => t.id !== id),
  });
}

// Standalone toast for use outside React components (hooks, utilities)
export const toast = {
  success: (title: string, description?: string, duration?: number) =>
    addToast({ title, description, variant: "success", duration }),
  error: (title: string, description?: string, duration?: number) =>
    addToast({ title, description, variant: "error", duration }),
  info: (title: string, description?: string, duration?: number) =>
    addToast({ title, description, variant: "info", duration }),
  warning: (title: string, description?: string, duration?: number) =>
    addToast({ title, description, variant: "warning", duration }),
};

export function useToast() {
  const [, setLocalState] = useState(state);

  // Subscribe to global state changes
  const subscribe = useCallback(() => {
    listeners.push(setLocalState);
    return () => {
      listeners = listeners.filter((l) => l !== setLocalState);
    };
  }, []);

  // Subscribe on mount, cleanup on unmount
  useEffect(() => {
    return subscribe();
  }, [subscribe]);

  const toast = {
    success: useCallback(
      (title: string, description?: string, duration?: number) =>
        addToast({ title, description, variant: "success", duration }),
      []
    ),
    error: useCallback(
      (title: string, description?: string, duration?: number) =>
        addToast({ title, description, variant: "error", duration }),
      []
    ),
    info: useCallback(
      (title: string, description?: string, duration?: number) =>
        addToast({ title, description, variant: "info", duration }),
      []
    ),
    warning: useCallback(
      (title: string, description?: string, duration?: number) =>
        addToast({ title, description, variant: "warning", duration }),
      []
    ),
  };

  const dismiss = useCallback((id: string) => {
    removeToast(id);
  }, []);

  return {
    toasts: state.toasts,
    toast,
    dismiss,
  };
}
