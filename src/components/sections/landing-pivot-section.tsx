"use client";

import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { MessageSquare, Bot, FileQuestion } from "lucide-react";

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
      <div className="flex items-center justify-between w-[1773px] relative shrink-0 gap-6 mt-[-70px]">
        <FeatureCard
          icon={<MessageSquare className="w-[118px] h-[118px] text-primary" />}
          title="실시간 설계 지능, AI 텍스트 쿼리"
          description={
            <>
              공학 수식부터 개념까지,
              <br />
              3D 데이터 기반의 정확한 설계 답변을 즉시 제공합니다.
            </>
          }
        />
        <FeatureCard
          icon={<Bot className="w-[118px] h-[118px] text-primary" />}
          title="1:1 맞춤형 가이드, 어댑티브 튜터링"
          description={
            <>
              사용자의 학습 진도를 분석하여
              <br />
              Simvex 환경에 최적화된 맞춤형 커리큘럼을 제안합니다.
            </>
          }
        />
        <FeatureCard
          icon={<FileQuestion className="w-[118px] h-[118px] text-primary" />}
          title="경험의 데이터화, 인터랙티브 챌린지"
          description={
            <>
              직접 조작한 시뮬레이션 데이터를 바탕으로
              <br />
              설계 역량을 검증하는 실전형 퀴즈를 생성합니다.
            </>
          }
        />
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
  description: React.ReactNode;
}) {
  return (
    <div className="relative w-[567px] h-[358px] rounded-[24px] overflow-hidden group transition-all duration-300 hover:-translate-y-2 cursor-pointer">
      {/* Background & Border */}
      <div className="absolute inset-0 bg-[rgba(212,212,212,0.3)] border-[5px] border-[rgba(2,238,225,0.2)] rounded-[24px] pointer-events-none transition-colors duration-300 group-hover:bg-[rgba(1,169,160,0.3)]" />

      {/* Glow Effect */}
      <div className="absolute inset-0 shadow-[4px_4px_20px_0px_rgba(2,238,225,0.1)] rounded-[24px] pointer-events-none" />

      {/* Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-[32px] p-8 text-center text-balance">
        <div className="shrink-0 drop-shadow-[0_0_15px_rgba(2,238,225,0.5)]">
          {icon}
        </div>
        <div className="flex flex-col gap-2 items-center">
          <h3 className="font-bold text-[36px] leading-[1.25] text-primary drop-shadow-md">
            {title}
          </h3>
          <div className="font-semibold text-[20px] leading-[1.25] text-neutral-300 whitespace-nowrap">
            {description}
          </div>
        </div>
      </div>
    </div>
  );
}
