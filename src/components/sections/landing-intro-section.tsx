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
            "text-center font-bold text-foreground",
            "text-[32px] leading-tight",
            "md:text-[52px] md:leading-tight",
            "lg:text-[96px] lg:leading-tight",
            "max-w-4xl"
          )}
        >
          {landingContent.intro.heading}
        </h1>

        {/* Subtitle */}
        <p
          className={cn(
            "text-center text-muted-foreground",
            "text-lg md:text-xl lg:text-2xl",
            "max-w-2xl"
          )}
        >
          {landingContent.intro.subtitle}
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6 mt-4 md:mt-8">
          <CTAButton variant="primary">
            {landingContent.intro.ctaPrimary}
          </CTAButton>
          <CTAButton variant="default">
            {landingContent.intro.ctaSecondary}
          </CTAButton>
        </div>
      </div>
    </section>
  );
}
