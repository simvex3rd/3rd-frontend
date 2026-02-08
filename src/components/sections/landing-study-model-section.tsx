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
        "w-full",
        "flex flex-col items-center justify-center",
        "px-20 py-24", // Adjusted padding
        "bg-background",
        "transition-all duration-700 ease-out",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
      )}
      aria-label="Study models section"
    >
      {/* Content Container */}
      <div className="w-full max-w-[1400px] flex flex-col gap-10">
        {/* Section Heading */}
        <h2
          className={cn(
            "text-left font-bold text-foreground",
            "text-[40px]", // Adjusted size
            "leading-[1.3]"
          )}
        >
          {landingContent.studyModel.heading}
        </h2>

        {/* Model Cards - Grid */}
        <div
          className={cn(
            "grid grid-cols-5 gap-6", // 5 columns as per Figma
            "w-full"
          )}
        >
          {landingContent.studyModel.models.map((model, index) => (
            <ModelCard
              key={index}
              variant="default"
              iconName={model.iconName}
              modelName={model.modelName}
              className={cn(
                "w-full aspect-square",
                "transition-all duration-300",
                "hover:scale-105 hover:bg-white/5"
              )}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
