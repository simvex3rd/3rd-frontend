"use client";

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

      {/* Main content area - 848px height total */}
      <main
        id="main-content"
        className="flex gap-[32px] h-[848px] items-start px-[80px] py-[40px] mt-[102px]"
      >
        {/* Left Column - AI Assistant */}
        <div className="flex-1 flex flex-col gap-[16px] h-full min-w-0">
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

          {/* Content Box - 250px height */}
          <div className="bg-gray-30 border-[3px] border-primary rounded-[24px] h-[250px] flex items-center justify-center px-[153px] py-[105px] shrink-0">
            <p className="font-medium text-[16px] leading-[1.5] text-white text-center">
              부품 설명어쩌궁..
            </p>
          </div>
        </div>

        {/* Right Column - Memo + AI Quiz */}
        <div className="flex-1 flex flex-col gap-[24px] h-full min-w-0">
          {/* Memo Section - flex-1 (386px calculated) */}
          <div className="flex-1 flex flex-col gap-[16px] min-h-0">
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
            <div className="bg-gray-30 border-[3px] border-primary rounded-[24px] flex-1 flex items-center justify-center relative overflow-hidden">
              {/* Sticky Notes Container - absolute positioning for overflow */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="flex gap-[16px] items-center">
                  {/* Sticky Note 1 */}
                  <div className="bg-[rgba(2,238,225,0.3)] rounded-[24px] h-[300px] w-[360px] flex items-center justify-center p-[32px] shrink-0">
                    <p className="font-semibold text-[16px] leading-[1.5] text-white text-center">
                      메모
                    </p>
                  </div>

                  {/* Sticky Note 2 */}
                  <div className="bg-[rgba(2,238,225,0.3)] rounded-[24px] h-[300px] w-[360px] flex items-center justify-center p-[32px] shrink-0">
                    <p className="font-semibold text-[16px] leading-[1.5] text-white text-center">
                      메모
                    </p>
                  </div>

                  {/* Sticky Note 3 */}
                  <div className="bg-[rgba(2,238,225,0.3)] rounded-[24px] h-[300px] w-[360px] flex items-center justify-center p-[32px] shrink-0">
                    <p className="font-semibold text-[16px] leading-[1.5] text-white text-center">
                      메모
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* AI Quiz Section - flex-1 (250px calculated) */}
          <div className="flex-1 flex flex-col gap-[16px] min-h-0">
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
            <div className="bg-gray-30 border-[3px] border-primary rounded-[24px] flex-1 flex items-center justify-center px-[153px] py-[105px]">
              <p className="font-medium text-[16px] leading-[1.5] text-white text-center">
                ai quiz
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
