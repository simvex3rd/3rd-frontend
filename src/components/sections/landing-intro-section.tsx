"use client";

import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import { cn } from "@/lib/utils";
import { CTAButton } from "@/components/ui/cta-button";
import { landingContent } from "@/app/landing/content";
import Image from "next/image";
import Link from "next/link";

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
        "relative w-full h-full",
        "flex items-center justify-center",
        "px-[80px] py-[80px]", // 1920px Figma spacing
        "bg-background",
        "transition-all duration-500 ease-out",
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

      <div className="relative z-10 w-full">
        {/* Left: Text Content */}
        <div className="flex flex-col gap-[40px] w-[792px] relative z-10">
          {/* Heading */}
          <h1
            className={cn(
              "font-extrabold text-foreground",
              "text-[96px]",
              "leading-[1.25]"
            )}
            dangerouslySetInnerHTML={{ __html: landingContent.intro.heading }}
          />

          {/* Subtitle + CTA */}
          <div className="flex flex-col gap-[40px]">
            <p
              className={cn(
                "text-neutral-200 font-bold",
                "text-[40px]",
                "leading-[1.25]"
              )}
            >
              {landingContent.intro.subtitle
                .split("3D 인터랙션")
                .map((part, i) =>
                  i === 0 ? (
                    <span key={i} dangerouslySetInnerHTML={{ __html: part }} />
                  ) : (
                    <span key={i}>
                      <span className="text-primary">3D 인터랙션</span>
                      <span
                        dangerouslySetInnerHTML={{
                          __html: part.split("AI 튜터")[0],
                        }}
                      />
                      <span className="text-primary">AI 튜터</span>
                      <span
                        dangerouslySetInnerHTML={{
                          __html: part.split("AI 튜터")[1],
                        }}
                      />
                    </span>
                  )
                )}
            </p>

            {/* CTA Button */}
            <div className="flex items-center">
              <Link href="/viewer">
                <CTAButton
                  variant="primary"
                  className="shadow-glow-md w-[415px]"
                >
                  지금 바로 학습 시작하기
                </CTAButton>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Right: Main Visual - Absolute positioned to viewport edge */}
      {/* Moved outside the padded container to stick to the right edge */}
      <div className="absolute right-0 top-0 w-[1800px] h-full z-0 pointer-events-none mix-blend-lighten">
        <Image
          src="/3d.png"
          alt="3D Simulation View"
          fill
          className="object-contain object-right"
          priority
        />
      </div>
    </section>
  );
}
