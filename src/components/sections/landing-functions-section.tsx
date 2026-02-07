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
        "min-h-screen snap-start snap-always",
        "flex flex-col items-center justify-center",
        "px-4 py-12 md:px-8 md:py-24 lg:px-20",
        "bg-background",
        "transition-all duration-700 ease-out",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
      )}
      aria-label="Functions section"
    >
      {/* Section Heading */}
      <h2
        className={cn(
          "text-center font-extrabold text-foreground mb-8 md:mb-12 lg:mb-20",
          "text-[40px] md:text-[52px] lg:text-[96px]",
          "leading-[1.25]"
        )}
      >
        {landingContent.functions.heading
          .split(landingContent.functions.headingHighlight)
          .map((part, i) =>
            i === 0 ? (
              <span key={i}>{part}</span>
            ) : (
              <span key={i}>
                <span className="text-[#02eee1]">
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
          "flex gap-12 items-center justify-center",
          "w-full max-w-[1760px]"
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
              "w-full h-auto",
              "transition-all duration-300",
              "hover:scale-105"
            )}
          />
        ))}
      </div>
    </section>
  );
}
