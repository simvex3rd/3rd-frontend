"use client";

import { ViewerHeader } from "@/components/viewer/ViewerHeader";
import { LucideSparkles, LucideSquarePen } from "lucide-react";

/**
 * Study Page - AI-powered learning interface
 *
 * Layout (1920px baseline with 75% zoom at ≤1919px):
 * - Header: ViewerHeader component
 * - Content: Two-column layout
 *   - Left: AI Assistant (부품 설명)
 *   - Right: Memo + AI Quiz sections
 *
 * @see {@link https://www.figma.com/design/Vz80RydxWcYHVnn2iuyV0m?node-id=376-2442} Figma Design
 */
export default function StudyPage() {
  return (
    <div className="relative w-full h-screen bg-neutral-900 overflow-hidden">
      {/* Skip to main content link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-[16px] focus:left-[16px] focus:z-[9999] focus:px-[16px] focus:py-[8px] focus:bg-primary focus:text-background focus:rounded-[8px] focus:font-semibold"
      >
        Skip to main content
      </a>

      {/* Header - Always visible on top */}
      <ViewerHeader />

      {/* Main content area */}
      <main
        id="main-content"
        className="flex gap-[32px] h-[848px] items-start px-[80px] py-[40px] mt-[102px]"
      >
        {/* Left Column - AI Assistant */}
        <div className="flex-1 flex flex-col gap-[16px] h-full">
          {/* Section Header */}
          <div className="flex gap-[16px] items-center">
            <LucideSparkles className="w-[37px] h-[37px] text-primary" />
            <h2 className="font-semibold text-[32px] leading-[1.25] text-primary">
              AI Assistant
            </h2>
          </div>

          {/* Content Box */}
          <div className="bg-gray-30 border-[3px] border-primary rounded-[24px] flex h-[250px] items-center justify-center px-[153px] py-[105px]">
            <p className="font-medium text-[16px] leading-[1.5] text-white">
              부품 설명어쩌궁..
            </p>
          </div>
        </div>

        {/* Right Column - Memo + AI Quiz */}
        <div className="flex-1 flex flex-col gap-[24px] h-full">
          {/* Memo Section */}
          <div className="flex-1 flex flex-col gap-[16px]">
            {/* Section Header */}
            <div className="flex gap-[16px] items-center">
              <LucideSquarePen className="w-[37px] h-[37px] text-primary" />
              <h2 className="font-semibold text-[32px] leading-[1.25] text-primary">
                Memo
              </h2>
            </div>

            {/* Content Box with Sticky Notes */}
            <div className="bg-gray-30 border-[3px] border-primary rounded-[24px] flex-1 flex items-center justify-center px-[153px] py-[105px] relative overflow-hidden">
              <div className="flex gap-[16px] items-center">
                {/* Sticky Note 1 */}
                <div className="bg-primary/30 rounded-[24px] h-[300px] w-[360px] flex items-center justify-center p-[32px]">
                  <p className="font-semibold text-[16px] leading-[1.5] text-white text-center">
                    메모
                  </p>
                </div>

                {/* Sticky Note 2 */}
                <div className="bg-primary/30 rounded-[24px] h-[300px] w-[360px] flex items-center justify-center p-[32px]">
                  <p className="font-semibold text-[16px] leading-[1.5] text-white text-center">
                    메모
                  </p>
                </div>

                {/* Sticky Note 3 */}
                <div className="bg-primary/30 rounded-[24px] h-[300px] w-[360px] flex items-center justify-center p-[32px]">
                  <p className="font-semibold text-[16px] leading-[1.5] text-white text-center">
                    메모
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* AI Quiz Section */}
          <div className="flex-1 flex flex-col gap-[16px]">
            {/* Section Header */}
            <div className="flex gap-[16px] items-center">
              <LucideSparkles className="w-[37px] h-[37px] text-primary" />
              <h2 className="font-semibold text-[32px] leading-[1.25] text-primary">
                AI Quiz
              </h2>
            </div>

            {/* Content Box */}
            <div className="bg-gray-30 border-[3px] border-primary rounded-[24px] flex-1 flex items-center justify-center px-[153px] py-[105px]">
              <p className="font-medium text-[16px] leading-[1.5] text-white">
                ai quiz
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
