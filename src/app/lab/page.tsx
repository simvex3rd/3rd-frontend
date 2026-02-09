"use client";

import { ViewerHeader } from "@/components/viewer/ViewerHeader";
import { Rocket } from "lucide-react";

export default function LabPage() {
  return (
    <div className="relative w-full max-[1919px]:h-[133.33vh] h-screen bg-neutral-900 overflow-hidden">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-[16px] focus:left-[16px] focus:z-[9999] focus:px-[16px] focus:py-[8px] focus:bg-primary focus:text-background focus:rounded-[8px] focus:font-semibold"
      >
        Skip to main content
      </a>

      <ViewerHeader />

      <main
        id="main-content"
        className="absolute inset-x-0 top-[102px] bottom-0 flex flex-col items-center justify-center gap-[24px]"
      >
        <Rocket className="w-[64px] h-[64px] text-primary" strokeWidth={1.5} />
        <p className="font-semibold text-[32px] leading-[1.5] text-white">
          아직 개발되지 않았어요!
        </p>
      </main>
    </div>
  );
}
