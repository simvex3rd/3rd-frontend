"use client";

import { useRouter } from "next/navigation";
import { ViewerHeader } from "@/components/viewer/ViewerHeader";
import { LucideSparkles, LucideSquarePen } from "lucide-react";

/**
 * Study Page - AI-powered learning interface
 *
 * Layout (1920px baseline with 75% zoom at ≤1919px):
 * - Header: ViewerHeader component (102px height: 67px + 35px margin)
 * - Content: Two-column layout (848px height)
 *   - Left: AI Assistant section (250px content box)
 *   - Right: Memo (386px) + AI Quiz (250px) sections
 *
 * Design specs:
 * - Container: px-[80px] py-[40px], gap-[32px]
 * - Section headers: 32px semibold, cyan, with 37×37px icon
 * - Content boxes: bg-gray-30, 3px cyan border, 24px border-radius
 * - Sticky notes: 360×300px, rgba(2,238,225,0.3), 24px border-radius
 *
 * @see {@link https://www.figma.com/design/Vz80RydxWcYHVnn2iuyV0m?node-id=376-2442} Figma Design
 */
export default function StudyPage() {
  const router = useRouter();

  return (
    <div className="relative w-full max-[1919px]:h-[133.33vh] h-screen bg-neutral-900 overflow-hidden">
      {/* Skip to main content link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-[16px] focus:left-[16px] focus:z-[9999] focus:px-[16px] focus:py-[8px] focus:bg-primary focus:text-background focus:rounded-[8px] focus:font-semibold"
      >
        Skip to main content
      </a>

      {/* Header - Always visible on top */}
      <ViewerHeader />

      {/* Main content area - fills remaining viewport */}
      <main
        id="main-content"
        className="flex gap-[32px] items-stretch px-[80px] py-[40px] absolute inset-x-0 top-[102px] bottom-0"
      >
        {/* Left Column - AI Assistant (1:1 width ratio) */}
        <div className="flex-1 flex flex-col gap-[16px] min-w-0">
          {/* Section Header - Icon + Title */}
          <div className="flex gap-[16px] items-center shrink-0">
            <LucideSparkles
              className="w-[37px] h-[37px] text-primary shrink-0"
              strokeWidth={2}
            />
            <h2 className="font-semibold text-[32px] leading-[1.25] text-primary">
              AI Assistant
            </h2>
          </div>

          {/* Content Box - fills remaining space - Clickable */}
          <button
            onClick={() => router.push("/chat")}
            className="bg-gray-30 border-[3px] border-primary rounded-[24px] flex-1 flex flex-col items-start justify-start p-[24px] overflow-y-auto cursor-pointer hover:border-primary/80 hover:bg-gray-30/80 transition-all w-full text-left"
          >
            <div className="space-y-[12px] w-full">
              <div className="flex items-start gap-[12px]">
                <div className="w-[8px] h-[8px] rounded-full bg-primary shrink-0 mt-[6px]" />
                <p className="font-medium text-[14px] leading-[1.5] text-white">
                  선택한 부품의 재질, 기능, 설계 의도 등을 AI가 분석하여
                  설명합니다.
                </p>
              </div>
              <div className="flex items-start gap-[12px]">
                <div className="w-[8px] h-[8px] rounded-full bg-primary shrink-0 mt-[6px]" />
                <p className="font-medium text-[14px] leading-[1.5] text-white">
                  3D 모델과 연계된 상세한 엔지니어링 데이터를 제공받습니다.
                </p>
              </div>
              <div className="flex items-start gap-[12px]">
                <div className="w-[8px] h-[8px] rounded-full bg-primary shrink-0 mt-[6px]" />
                <p className="font-medium text-[14px] leading-[1.5] text-white">
                  궁금한 점을 자유롭게 질문하고 즉시 답변을 받을 수 있습니다.
                </p>
              </div>
            </div>
          </button>
        </div>

        {/* Right Column - Memo + AI Quiz (1:1 width ratio) */}
        <div className="flex-1 flex flex-col gap-[24px] min-w-0">
          {/* Memo Section - 1:1 height ratio with AI Quiz */}
          <div className="flex-1 flex flex-col gap-[16px] min-h-0 basis-0">
            {/* Section Header - Icon + Title */}
            <div className="flex gap-[16px] items-center shrink-0">
              <LucideSquarePen
                className="w-[37px] h-[37px] text-primary shrink-0"
                strokeWidth={2}
              />
              <h2 className="font-semibold text-[32px] leading-[1.25] text-primary">
                Memo
              </h2>
            </div>

            {/* Content Box with Sticky Notes - fills remaining space */}
            <div className="bg-gray-30 border-[3px] border-primary rounded-[24px] flex-1 flex items-start justify-center p-[32px] relative overflow-hidden">
              {/* Sticky Notes Container - positioned at top */}
              <div className="flex gap-[20px] items-start justify-center w-full">
                {/* Sticky Note 1 */}
                <div className="bg-[rgba(2,238,225,0.3)] rounded-[24px] flex-1 min-h-[320px] max-w-[380px] flex flex-col items-start justify-between p-[28px]">
                  <div className="space-y-[12px] w-full">
                    <h3 className="font-bold text-[20px] leading-[1.5] text-white">
                      크랭크샤프트
                    </h3>
                    <p className="font-medium text-[15px] leading-[1.6] text-white/90">
                      - 엔진의 핵심 동력 전달 장치
                      <br />
                      - 피스톤의 왕복운동 → 회전운동 변환
                      <br />- 고강도 합금강 재질
                    </p>
                  </div>
                  <p className="font-medium text-[13px] text-white/70">
                    2025.02.09
                  </p>
                </div>

                {/* Sticky Note 2 */}
                <div className="bg-[rgba(2,238,225,0.3)] rounded-[24px] flex-1 min-h-[320px] max-w-[380px] flex flex-col items-start justify-between p-[28px]">
                  <div className="space-y-[12px] w-full">
                    <h3 className="font-bold text-[20px] leading-[1.5] text-white">
                      학습 포인트
                    </h3>
                    <p className="font-medium text-[15px] leading-[1.6] text-white/90">
                      - 베어링 구조 복습 필요
                      <br />
                      - 4행정 엔진 사이클 이해
                      <br />- 열팽창 계수 개념 정리
                    </p>
                  </div>
                  <p className="font-medium text-[13px] text-white/70">
                    2025.02.09
                  </p>
                </div>

                {/* Sticky Note 3 */}
                <div className="bg-[rgba(2,238,225,0.3)] rounded-[24px] flex-1 min-h-[320px] max-w-[380px] flex flex-col items-start justify-between p-[28px]">
                  <div className="space-y-[12px] w-full">
                    <h3 className="font-bold text-[20px] leading-[1.5] text-white">
                      퀴즈 오답
                    </h3>
                    <p className="font-medium text-[15px] leading-[1.6] text-white/90">
                      Q. 크랭크샤프트의 주요 기능은?
                      <br />
                      <br />
                      틀린 답: 연료 분사
                      <br />
                      정답: 동력 전달 및 변환
                    </p>
                  </div>
                  <p className="font-medium text-[13px] text-white/70">
                    2025.02.08
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* AI Quiz Section - 1:1 height ratio with Memo */}
          <div className="flex-1 flex flex-col gap-[16px] min-h-0 basis-0">
            {/* Section Header - Icon + Title */}
            <div className="flex gap-[16px] items-center shrink-0">
              <LucideSparkles
                className="w-[37px] h-[37px] text-primary shrink-0"
                strokeWidth={2}
              />
              <h2 className="font-semibold text-[32px] leading-[1.25] text-primary">
                AI Quiz
              </h2>
            </div>

            {/* Content Box - fills remaining space */}
            <div className="bg-gray-30 border-[3px] border-primary rounded-[24px] flex-1 flex items-center justify-center p-[24px]">
              <p className="font-semibold text-[24px] leading-[1.5] text-white/80">
                AI QUIZ는 준비 중이에요!
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
