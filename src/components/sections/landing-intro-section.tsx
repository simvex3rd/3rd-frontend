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
        "flex items-center justify-center",
        "px-20 py-24",
        "bg-[#171717]",
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
      <div className="relative z-10 flex items-center justify-between w-full max-w-[1760px] gap-12">
        {/* Left: Text Content */}
        <div className="flex flex-col gap-10 max-w-[792px]">
          {/* Heading */}
          <h1
            className={cn(
              "font-extrabold text-foreground whitespace-pre-line",
              "text-[96px] leading-[1.25]"
            )}
          >
            {landingContent.intro.heading}
          </h1>

          {/* Subtitle */}
          <p
            className={cn(
              "text-[#e5e5e5] whitespace-pre-line font-bold",
              "text-[40px] leading-[1.25]"
            )}
          >
            {landingContent.intro.subtitle
              .split("3D 인터랙션")
              .map((part, i) =>
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
          <div className="flex items-center">
            <CTAButton variant="primary">
              {landingContent.intro.ctaPrimary}
            </CTAButton>
          </div>
        </div>

        {/* Right: Main Visual */}
        <div className="flex-shrink-0 w-[970px] h-[477px] bg-[#1a1a1a] border-2 border-[#333] rounded-lg flex items-center justify-center">
          <span className="text-[#666] text-xl">Main Visual</span>
        </div>
      </div>
    </section>
  );
}
