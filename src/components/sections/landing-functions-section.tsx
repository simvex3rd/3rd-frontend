"use client";

import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import { cn } from "@/lib/utils";
import { ValueCard } from "@/components/ui/value-card";
import { landingContent } from "@/app/landing/content";

/**
 * Landing page functions section displaying feature cards in a grid.
 * Features scroll-triggered fade-in animation.
 *
 * @component
 * @example
 * ```tsx
 * <LandingFunctionsSection />
 * ```
 *
 * @see {@link https://www.figma.com/design/Vz80RydxWcYHVnn2iuyV0m?node-id=147-327} Figma Design
 */
export function LandingFunctionsSection() {
  const { ref, isVisible } = useIntersectionObserver({
    threshold: 0.1,
    once: true,
  });

  return (
    <section
      ref={ref}
      className={cn(
        "w-full",
        "flex flex-col items-center justify-center",
        "px-20 py-24", // Reduced padding
        "bg-background",
        "transition-all duration-700 ease-out",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
      )}
      aria-label="Functions section"
    >
      {/* Section Heading */}
      <h2
        className={cn(
          "text-center font-extrabold text-foreground mb-20",
          "text-[64px]", // Reduced from 96px to match Figma scale better
          "leading-[1.2]"
        )}
      >
        {landingContent.functions.heading
          .split(landingContent.functions.headingHighlight)
          .map((part, i) =>
            i === 0 ? (
              <span key={i}>{part}</span>
            ) : (
              <span key={i}>
                <span className="text-primary">
                  {landingContent.functions.headingHighlight}
                </span>
                {part}
              </span>
            )
          )}
      </h2>

      {/* Feature Cards - Horizontal Row */}
      <div
        className={cn(
          "grid grid-cols-3 gap-8", // Changed to grid for equal spacing
          "w-full max-w-[1400px]"
        )}
      >
        {landingContent.functions.features.map((feature, index) => (
          <ValueCard
            key={index}
            variant={feature.variant}
            iconName={feature.iconName}
            title={feature.title}
            description={feature.description}
            className={cn(
              "w-full h-auto min-h-[320px]", // Fixed height
              "transition-all duration-300",
              "hover:translate-y-[-8px]"
            )}
          />
        ))}
      </div>
    </section>
  );
}
