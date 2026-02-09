"use client";

import { useRef, useEffect, useCallback } from "react";
import { LandingIntroSection } from "@/components/sections/landing-intro-section";
import { LandingFunctionsSection } from "@/components/sections/landing-functions-section";
import { LandingStudyModelSection } from "@/components/sections/landing-study-model-section";
import { LandingFooterSection } from "@/components/sections/landing-footer-section";
import { LandingPivotSection } from "@/components/sections/landing-pivot-section";
import { LandingHeader } from "@/components/layout/landing-header";

const SECTION_IDS = ["intro", "functions", "pivot", "models", "footer"];
const SCROLL_DURATION = 1400;

function easeOutExpo(t: number): number {
  return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
}

/**
 * Landing page with smooth fullpage scroll.
 *
 * Features:
 * - JS-driven smooth section transitions (wheel + touch + keyboard)
 * - 5 full-screen sections (Intro, Functions, Pivot, Study Model, Footer)
 * - Scroll-triggered animations on each section
 *
 * @page
 * @see {@link https://www.figma.com/design/Vz80RydxWcYHVnn2iuyV0m?node-id=130-652} Figma Design
 */
export default function LandingPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isScrolling = useRef(false);
  const currentIndex = useRef(0);
  const touchStartY = useRef(0);
  const rafId = useRef(0);

  const scrollToSection = useCallback((index: number) => {
    const container = containerRef.current;
    if (!container) return;
    const clamped = Math.max(0, Math.min(index, SECTION_IDS.length - 1));
    if (clamped === currentIndex.current && isScrolling.current) return;

    currentIndex.current = clamped;
    isScrolling.current = true;
    cancelAnimationFrame(rafId.current);
    window.dispatchEvent(
      new CustomEvent("section-change", { detail: SECTION_IDS[clamped] })
    );

    const target = container.querySelector(
      `#${SECTION_IDS[clamped]}`
    ) as HTMLElement | null;
    if (!target) return;

    const start = container.scrollTop;
    const end = target.offsetTop;
    const distance = end - start;
    const startTime = performance.now();

    const animate = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / SCROLL_DURATION, 1);
      const eased = easeOutExpo(progress);

      container.scrollTop = start + distance * eased;

      if (progress < 1) {
        rafId.current = requestAnimationFrame(animate);
      } else {
        isScrolling.current = false;
      }
    };

    rafId.current = requestAnimationFrame(animate);
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      if (isScrolling.current) return;

      if (e.deltaY > 0) {
        scrollToSection(currentIndex.current + 1);
      } else if (e.deltaY < 0) {
        scrollToSection(currentIndex.current - 1);
      }
    };

    const onTouchStart = (e: TouchEvent) => {
      touchStartY.current = e.touches[0].clientY;
    };

    const onTouchEnd = (e: TouchEvent) => {
      if (isScrolling.current) return;
      const deltaY = touchStartY.current - e.changedTouches[0].clientY;
      if (Math.abs(deltaY) < 50) return;

      if (deltaY > 0) {
        scrollToSection(currentIndex.current + 1);
      } else {
        scrollToSection(currentIndex.current - 1);
      }
    };

    const onKeyDown = (e: KeyboardEvent) => {
      if (isScrolling.current) return;
      if (e.key === "ArrowDown" || e.key === "PageDown" || e.key === " ") {
        e.preventDefault();
        scrollToSection(currentIndex.current + 1);
      } else if (e.key === "ArrowUp" || e.key === "PageUp") {
        e.preventDefault();
        scrollToSection(currentIndex.current - 1);
      } else if (e.key === "Home") {
        e.preventDefault();
        scrollToSection(0);
      } else if (e.key === "End") {
        e.preventDefault();
        scrollToSection(SECTION_IDS.length - 1);
      }
    };

    const onNavigate = (e: Event) => {
      const sectionId = (e as CustomEvent<string>).detail;
      const idx = SECTION_IDS.indexOf(sectionId);
      if (idx !== -1) scrollToSection(idx);
    };

    container.addEventListener("wheel", onWheel, { passive: false });
    container.addEventListener("touchstart", onTouchStart, { passive: true });
    container.addEventListener("touchend", onTouchEnd, { passive: true });
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("navigate-to-section", onNavigate);

    return () => {
      cancelAnimationFrame(rafId.current);
      container.removeEventListener("wheel", onWheel);
      container.removeEventListener("touchstart", onTouchStart);
      container.removeEventListener("touchend", onTouchEnd);
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("navigate-to-section", onNavigate);
    };
  }, [scrollToSection]);

  return (
    <div
      ref={containerRef}
      className="bg-background max-[1919px]:h-[133.33vh] h-screen w-full overflow-hidden"
    >
      <LandingHeader />
      <main className="w-full">
        <div
          id="intro"
          className="max-[1919px]:h-[133.33vh] h-screen flex flex-col justify-center"
        >
          <LandingIntroSection />
        </div>
        <div
          id="functions"
          className="max-[1919px]:h-[133.33vh] h-screen flex flex-col justify-center"
        >
          <LandingFunctionsSection />
        </div>
        <div
          id="pivot"
          className="max-[1919px]:h-[133.33vh] h-screen flex flex-col justify-center"
        >
          <LandingPivotSection />
        </div>
        <div
          id="models"
          className="max-[1919px]:h-[133.33vh] h-screen flex flex-col justify-center"
        >
          <LandingStudyModelSection />
        </div>
        <div id="footer" className="h-auto flex flex-col justify-end">
          <LandingFooterSection />
        </div>
      </main>
    </div>
  );
}
