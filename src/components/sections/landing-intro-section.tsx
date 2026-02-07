"use client";

import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/ui/logo";
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
        "relative min-h-screen snap-start snap-always",
        "flex flex-col items-center justify-center",
        "px-4 py-12 md:px-8 md:py-24",
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

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center gap-8 md:gap-12 lg:gap-16 max-w-6xl">
        {/* Logo */}
        <Logo size="xxlarge" className="mb-4 lg:mb-8" />

        {/* Heading */}
        <h1
          className={cn(
            "text-left font-extrabold text-foreground whitespace-pre-line",
            "text-[32px] leading-[1.25]",
            "md:text-[52px] md:leading-[1.25]",
            "lg:text-[96px] lg:leading-[1.25]",
            "max-w-4xl"
          )}
        >
          {landingContent.intro.heading}
        </h1>

        {/* Subtitle */}
        <p
          className={cn(
            "text-left text-[#e5e5e5] whitespace-pre-line font-bold",
            "text-lg md:text-2xl lg:text-[40px]",
            "leading-[1.25]",
            "max-w-[792px]"
          )}
        >
          {landingContent.intro.subtitle.split("3D 인터랙션").map((part, i) =>
            i === 0 ? (
              <span key={i}>{part}</span>
            ) : (
              <span key={i}>
                <span className="text-[#02eee1]">3D 인터랙션</span>
                {part.split("AI 튜터")[0]}
                <span className="text-[#02eee1]">AI 튜터</span>
                {part.split("AI 튜터")[1]}
              </span>
            )
          )}
        </p>

        {/* CTA Button */}
        <div className="flex items-center mt-4 md:mt-8">
          <CTAButton variant="primary">
            {landingContent.intro.ctaPrimary}
          </CTAButton>
        </div>
      </div>
    </section>
  );
}
