"use client";

import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import { cn } from "@/lib/utils";
import { ModelCard } from "@/components/ui/model-card";
import { landingContent } from "@/app/landing/content";

/**
 * Landing page study model section displaying model cards.
 * Features responsive grid layout and scroll-triggered fade-in animation.
 *
 * @component
 * @example
 * ```tsx
 * <LandingStudyModelSection />
 * ```
 *
 * @see {@link https://www.figma.com/design/Vz80RydxWcYHVnn2iuyV0m?node-id=147-354} Figma Design
 */
export function LandingStudyModelSection() {
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
      aria-label="Study models section"
    >
      {/* Section Heading */}
      <h2
        className={cn(
          "text-left font-bold text-[#e5e5e5] mb-6 md:mb-8 lg:mb-6",
          "text-[32px] md:text-[40px] lg:text-[52px]",
          "leading-[1.25]",
          "w-full"
        )}
      >
        {landingContent.studyModel.heading}
      </h2>

      {/* Model Cards - Horizontal Row */}
      <div
        className={cn(
          "flex gap-6 items-center justify-start",
          "w-full overflow-x-auto"
        )}
      >
        {landingContent.studyModel.models.map((model, index) => (
          <ModelCard
            key={index}
            variant="default"
            iconName={model.iconName}
            modelName={model.modelName}
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
