"use client";

import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import { cn } from "@/lib/utils";
import { Footer } from "@/components/panels/footer";

/**
 * Landing page footer section wrapper.
 * Wraps the existing Footer component with scroll-triggered animation.
 *
 * @component
 * @example
 * ```tsx
 * <LandingFooterSection />
 * ```
 *
 * @see {@link https://www.figma.com/design/Vz80RydxWcYHVnn2iuyV0m?node-id=147-354} Figma Design
 */
export function LandingFooterSection() {
  const { ref, isVisible } = useIntersectionObserver({
    threshold: 0.1,
    once: true,
  });

  return (
    <section
      ref={ref}
      className={cn(
        "w-full",
        "flex items-end justify-center",
        "transition-all duration-700 ease-out",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
      )}
      aria-label="Footer section"
    >
      <Footer sections={[]} className="w-full" />
    </section>
  );
}
