"use client";

import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import { cn } from "@/lib/utils";
import { CTAButton } from "@/components/ui/cta-button";
import { landingContent } from "@/app/landing/content";

/**
 * Landing page intro/hero section with logo, heading, subtitle, and CTA buttons.
 * Features scroll-triggered fade-in animation.
 *
 * @component
 * @example
 * ```tsx
 * <LandingIntroSection />
 * ```
 *
 * @see {@link https://www.figma.com/design/Vz80RydxWcYHVnn2iuyV0m?node-id=147-317} Figma Design
 */
export function LandingIntroSection() {
  const { ref, isVisible } = useIntersectionObserver({
    threshold: 0.1,
    once: true,
  });

  return (
    <section
      ref={ref}
      className={cn(
        "relative w-full",
        "flex items-center justify-center",
        "px-20 pt-[298px] pb-32", // Exact Figma top spacing
        "bg-background",
        "transition-all duration-700 ease-out",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
      )}
      aria-label="Hero section"
    >
      {/* Background grid overlay */}
      <div
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage: "url(/grid.svg)",
          backgroundSize: "64px 64px",
          backgroundPosition: "center",
        }}
      />

      {/* Two-column layout: Text (left) + Visual (right) */}
      <div className="relative z-10 flex items-start justify-between w-full max-w-[1760px] gap-8">
        {/* Left: Text Content */}
        <div className="flex flex-col gap-8 max-w-[800px] pt-4">
          {/* Heading */}
          <h1
            className={cn(
              "font-black text-foreground whitespace-pre-line", // font-black for thicker weight
              "text-[80px]",
              "leading-[1.1]",
              "tracking-tight"
            )}
          >
            {landingContent.intro.heading}
          </h1>

          {/* Subtitle */}
          <div className="flex flex-col gap-8 pl-1">
            <p
              className={cn(
                "text-neutral-200 whitespace-pre-line font-medium",
                "text-[24px]",
                "leading-[1.5]",
                "opacity-80"
              )}
            >
              {landingContent.intro.subtitle
                .split("3D 인터랙션")
                .map((part, i) =>
                  i === 0 ? (
                    <span key={i}>{part}</span>
                  ) : (
                    <span key={i}>
                      <span className="text-primary font-bold">
                        3D 인터랙션
                      </span>
                      {part.split("AI 튜터")[0]}
                      <span className="text-primary font-bold">AI 튜터</span>
                      {part.split("AI 튜터")[1]}
                    </span>
                  )
                )}
            </p>

            {/* CTA Button */}
            <div className="flex items-center pt-6">
              <CTAButton variant="primary" className="shadow-glow-md">
                {landingContent.intro.ctaPrimary}
              </CTAButton>
            </div>
          </div>
        </div>

        {/* Right: Main Visual */}
        <div className="flex-shrink-0 w-[800px] h-[500px] bg-neutral-900 border border-neutral-700 rounded-[24px] flex items-center justify-center overflow-hidden relative">
          {/* Placeholder with clearer wireframe style */}
          <div
            className="absolute inset-0 opacity-100"
            style={{
              backgroundImage:
                "linear-gradient(45deg, transparent 48%, rgb(55, 65, 81) 48%, rgb(55, 65, 81) 52%, transparent 52%), linear-gradient(-45deg, transparent 48%, rgb(55, 65, 81) 48%, rgb(55, 65, 81) 52%, transparent 52%)",
              backgroundSize: "100% 100%",
            }}
          />
          <span className="relative z-10 text-neutral-500 text-2xl font-semibold bg-neutral-900 px-4 py-2 rounded">
            3D Simulation View
          </span>
        </div>
      </div>
    </section>
  );
}
