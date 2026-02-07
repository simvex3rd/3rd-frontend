import { useEffect, useRef, useState } from "react";

interface UseIntersectionObserverOptions {
  threshold?: number;
  root?: Element | null;
  rootMargin?: string;
  once?: boolean;
}

interface UseIntersectionObserverReturn {
  ref: React.RefObject<HTMLElement>;
  isVisible: boolean;
}

/**
 * Hook to detect when an element enters the viewport
 * Used for scroll-triggered animations
 *
 * @param options - IntersectionObserver options
 * @param options.threshold - Percentage of element visibility (0-1) to trigger (default: 0.1)
 * @param options.root - Root element for intersection (default: viewport)
 * @param options.rootMargin - Margin around root (default: "0px")
 * @param options.once - If true, only trigger once (default: true)
 * @returns Object with ref to attach to element and isVisible state
 *
 * @example
 * ```tsx
 * const { ref, isVisible } = useIntersectionObserver({ threshold: 0.1, once: true });
 * return <div ref={ref} className={isVisible ? "fade-in" : "opacity-0"}>Content</div>
 * ```
 */
export function useIntersectionObserver(
  options: UseIntersectionObserverOptions = {}
): UseIntersectionObserverReturn {
  const {
    threshold = 0.1,
    root = null,
    rootMargin = "0px",
    once = true,
  } = options;

  const ref = useRef<HTMLElement>(null);
  // Initialize state - check reduced motion on first render
  const [isVisible, setIsVisible] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  });

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    // If user prefers reduced motion, skip intersection observer
    if (prefersReducedMotion) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        const inView = entry.isIntersecting;

        if (inView) {
          setIsVisible(true);

          // If once=true, disconnect after first trigger
          if (once) {
            observer.disconnect();
          }
        } else if (!once) {
          // If once=false, toggle visibility
          setIsVisible(false);
        }
      },
      { threshold, root, rootMargin }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [threshold, root, rootMargin, once]);

  return { ref, isVisible };
}
