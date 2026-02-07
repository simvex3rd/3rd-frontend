"use client";

import { LandingIntroSection } from "@/components/sections/landing-intro-section";
import { LandingFunctionsSection } from "@/components/sections/landing-functions-section";
import { LandingStudyModelSection } from "@/components/sections/landing-study-model-section";
import { LandingFooterSection } from "@/components/sections/landing-footer-section";

export { metadata } from "./metadata";

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
    <div
      className="h-screen overflow-y-scroll snap-y snap-mandatory scroll-smooth"
      style={{
        // Safari-specific smooth scrolling
        WebkitOverflowScrolling: "touch",
      }}
    >
      <LandingIntroSection />
      <LandingFunctionsSection />
      <LandingStudyModelSection />
      <LandingFooterSection />
    </div>
  );
}
