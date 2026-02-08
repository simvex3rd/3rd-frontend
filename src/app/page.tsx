"use client";

import { LandingIntroSection } from "@/components/sections/landing-intro-section";
import { LandingFunctionsSection } from "@/components/sections/landing-functions-section";
import { LandingStudyModelSection } from "@/components/sections/landing-study-model-section";
import { LandingFooterSection } from "@/components/sections/landing-footer-section";
import { LandingPivotSection } from "@/components/sections/landing-pivot-section";
import { LandingHeader } from "@/components/layout/landing-header";

/**
 * Landing page with scroll-snap sections.
 *
 * Features:
 * - CSS scroll-snap for smooth section transitions
 * - 4 full-screen sections (Intro, Functions, Study Model, Footer)
 * - Scroll-triggered animations on each section
 * - Keyboard navigation support
 * - Mobile touch gesture support
 *
 * @page
 * @example
 * Navigate to: /landing
 *
 * @see {@link https://www.figma.com/design/Vz80RydxWcYHVnn2iuyV0m?node-id=130-652} Figma Design
 */
export default function LandingPage() {
  return (
    <div className="bg-background max-[1919px]:h-[133.33vh] h-screen w-full overflow-y-scroll snap-y snap-mandatory scroll-smooth">
      <LandingHeader />
      {/* Main container for scroll snap sections */}
      <main className="w-full">
        <div
          id="intro"
          className="snap-start max-[1919px]:h-[133.33vh] h-screen flex flex-col justify-center"
        >
          <LandingIntroSection />
        </div>
        <div
          id="functions"
          className="snap-start max-[1919px]:h-[133.33vh] h-screen flex flex-col justify-center"
        >
          <LandingFunctionsSection />
        </div>
        <div
          id="pivot"
          className="snap-start max-[1919px]:h-[133.33vh] h-screen flex flex-col justify-center"
        >
          <LandingPivotSection />
        </div>
        <div
          id="models"
          className="snap-start max-[1919px]:h-[133.33vh] h-screen flex flex-col justify-center"
        >
          <LandingStudyModelSection />
        </div>
        <div
          id="footer"
          className="snap-start h-auto flex flex-col justify-end"
        >
          <LandingFooterSection />
        </div>
      </main>
    </div>
  );
}
