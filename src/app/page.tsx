"use client";

import { LandingIntroSection } from "@/components/sections/landing-intro-section";
import { LandingFunctionsSection } from "@/components/sections/landing-functions-section";
import { LandingStudyModelSection } from "@/components/sections/landing-study-model-section";
import { LandingFooterSection } from "@/components/sections/landing-footer-section";
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
    <div className="min-h-screen bg-background overflow-x-hidden">
      <LandingHeader />
      <main className="flex flex-col">
        <div id="intro">
          <LandingIntroSection />
        </div>
        <div id="functions">
          <LandingFunctionsSection />
        </div>
        <div id="models">
          <LandingStudyModelSection />
        </div>
        <div id="footer">
          <LandingFooterSection />
        </div>
      </main>
    </div>
  );
}
