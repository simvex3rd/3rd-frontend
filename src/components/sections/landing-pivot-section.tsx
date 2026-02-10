"use client";

import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { MessageSquare, Bot, FileQuestion } from "lucide-react";
import { landingContent } from "@/app/landing/content";

/**
 * Landing page pivot section featuring the "Pivot" persona.
 *
 * @component
 * @see {@link https://www.figma.com/design/Vz80RydxWcYHVnn2iuyV0m?node-id=385-4754} Figma Design
 */
export function LandingPivotSection() {
  const { ref, isVisible } = useIntersectionObserver({
    threshold: 0.1,
    once: true,
  });

  const icons = [
    <MessageSquare className="w-[118px] h-[118px] text-primary" key="msg" />,
    <Bot className="w-[118px] h-[118px] text-primary" key="bot" />,
    <FileQuestion className="w-[118px] h-[118px] text-primary" key="quiz" />,
  ];

  return (
    <section
      ref={ref}
      className={cn(
        "relative w-full h-full",
        "flex flex-col items-center justify-center",
        "px-[80px] py-[24px]", // 1920px Figma spacing
        "bg-background",
        "gap-0", // Removed gap for visual separation
        "transition-all duration-700 ease-out",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
      )}
      aria-label="Pivot Persona Section"
    >
      {/* Top Part: Image & Heading */}
      <div className="flex gap-[80px] items-center justify-center w-full relative">
        {/* Character Image */}
        <div className="w-[1320px] h-[575px] relative shrink-0">
          <Image
            src="/cutie.png"
            alt="Pivot Persona"
            fill
            className="object-contain"
            priority
          />
        </div>
      </div>

      {/* Bottom Part: Feature Cards */}
      <div className="flex items-center justify-between w-[1773px] relative shrink-0 gap-[24px] mt-[-70px]">
        {landingContent.pivot.features.map((feature, index) => (
          <FeatureCard
            key={index}
            icon={icons[index]}
            title={feature.title}
            description={feature.description}
          />
        ))}
      </div>
    </section>
  );
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="relative w-[567px] h-[358px] rounded-[24px] overflow-hidden group transition-all duration-300 hover:-translate-y-2 cursor-pointer">
      {/* Background & Border */}
      <div className="absolute inset-0 bg-[rgba(212,212,212,0.3)] border-[5px] border-[rgba(2,238,225,0.2)] rounded-[24px] pointer-events-none transition-colors duration-300 group-hover:bg-[rgba(1,169,160,0.3)]" />

      {/* Glow Effect */}
      <div className="absolute inset-0 shadow-[4px_4px_20px_0px_rgba(2,238,225,0.1)] rounded-[24px] pointer-events-none" />

      {/* Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-[32px] p-[32px] text-center text-balance">
        <div className="shrink-0 drop-shadow-[0_0_15px_rgba(2,238,225,0.5)]">
          {icon}
        </div>
        <div className="flex flex-col gap-[8px] items-center">
          <h3 className="font-bold text-[36px] leading-[1.25] text-primary drop-shadow-md">
            {title}
          </h3>
          <p
            className="font-semibold text-[20px] leading-[1.25] text-neutral-300"
            dangerouslySetInnerHTML={{ __html: description }}
          />
        </div>
      </div>
    </div>
  );
}
