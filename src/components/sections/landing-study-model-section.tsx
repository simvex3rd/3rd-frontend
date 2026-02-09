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
        "w-full h-full",
        "flex flex-col items-center justify-center",
        "px-[80px] py-[80px]", // 1920px Figma spacing
        "bg-background",
        "transition-all duration-500 ease-out",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
      )}
      aria-label="Study models section"
    >
      {/* Content Container */}
      <div className="w-full flex flex-col gap-[24px]">
        {/* Section Heading */}
        <h2
          className={cn(
            "text-left font-bold text-foreground",
            "text-[52px]", // 1920px Figma design
            "leading-[1.25]"
          )}
        >
          {landingContent.studyModel.heading}
        </h2>

        {/* Model Cards - Grid - 1920px Figma Design */}
        <div className={cn("flex gap-[24px] w-full")}>
          {landingContent.studyModel.models.map((model, index) => (
            <ModelCard
              key={index}
              variant="default"
              iconName={model.iconName}
              modelName={model.modelName}
              className={cn(
                "flex-1 h-[241px]", // Exact Figma height, flex-1 for equal width
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
