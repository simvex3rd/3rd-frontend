"use client";

import { useSceneStore } from "@/stores/scene-store";
import { usePartData } from "@/hooks/use-part-data";
import Image from "next/image";

/**
 * Part Info Panel Component
 *
 * Displays AI Assistant and Part Info when a part is selected in the 3D viewer.
 * Follows Figma design: Side bar-if click part (400x750px, node-232:967)
 * Designed for 1920px viewport with absolute positioning.
 *
 * Features:
 * - Integration with scene store for selected part state
 * - Two sections: AI Assistant + Part Info
 * - Glassmorphism design with rgba(212,212,212,0.3) background
 * - 3px cyan border, 24px border radius, 48px padding
 * - Real-time API integration with loading/error states
 *
 * @component
 * @see {@link https://figma.com/file/Vz80RydxWcYHVnn2iuyV0m/SIMVEX} Figma Design (node-232:967)
 */

export function PartInfoPanel() {
  const selectedObject = useSceneStore((state) => state.selectedObject);
  const { partData, loading, error } = usePartData(selectedObject);

  if (!selectedObject) {
    return null;
  }

  return (
    <aside
      className="flex flex-col items-center justify-center w-[400px] h-[750px] border-[3px] border-solid border-primary bg-gray-30 rounded-[24px] p-[48px] gap-[32px] backdrop-blur-sm transition-all duration-300 shrink-0 z-10"
      role="complementary"
      aria-label="Part information sidebar"
    >
      {/* AI Assistant Section */}
      <div className="flex flex-col gap-[16px] items-start w-full">
        {/* Header with Icon */}
        <div className="flex gap-[16px] items-center">
          <Image
            src="/icons/ai-assistant.svg"
            alt="AI Assistant"
            width={40}
            height={40}
            className="shrink-0"
          />
          <h2 className="font-semibold text-[32px] leading-[1.25] text-primary">
            AI Assistant
          </h2>
        </div>

        {/* Content Box */}
        <div className="w-full h-[250px] bg-gray-30 border-[3px] border-primary rounded-[24px] flex items-center justify-center px-[40px] py-[48px]">
          {loading ? (
            <p className="font-medium text-[16px] leading-[1.5] text-neutral-400 text-center">
              Loading...
            </p>
          ) : error ? (
            <p className="font-medium text-[16px] leading-[1.5] text-red-400 text-center">
              {error}
            </p>
          ) : (
            <p className="font-medium text-[16px] leading-[1.5] text-neutral-50 text-center">
              {partData?.description ||
                `${selectedObject}에 대해 궁금한 점이 있으신가요?`}
            </p>
          )}
        </div>
      </div>

      {/* Part Info Section */}
      <div className="flex flex-col gap-[16px] items-start w-full">
        {/* Header with Icon */}
        <div className="flex gap-[16px] items-start">
          <Image
            src="/icons/part-info.svg"
            alt="Part Info"
            width={40}
            height={40}
            className="shrink-0"
          />
          <h2 className="font-semibold text-[32px] leading-[1.25] text-primary">
            Part Info
          </h2>
        </div>

        {/* Content Box */}
        <div className="w-full h-[250px] bg-gray-30 border-[3px] border-primary rounded-[24px] flex items-center justify-center px-[40px] py-[48px]">
          {loading ? (
            <p className="font-medium text-[16px] leading-[1.5] text-neutral-400 text-center">
              Loading...
            </p>
          ) : error ? (
            <p className="font-medium text-[16px] leading-[1.5] text-red-400 text-center">
              {error}
            </p>
          ) : partData ? (
            <div className="flex flex-col gap-[8px] text-center">
              <p className="font-bold text-[18px] leading-[1.4] text-primary">
                {partData.name || selectedObject}
              </p>
              <p className="font-medium text-[14px] leading-[1.5] text-neutral-50">
                Material: {partData.material || "N/A"}
              </p>
              <p className="font-medium text-[14px] leading-[1.5] text-neutral-50">
                {partData.metadata?.weight
                  ? `Weight: ${partData.metadata.weight}`
                  : ""}
              </p>
            </div>
          ) : (
            <p className="font-medium text-[16px] leading-[1.5] text-neutral-50 text-center">
              {selectedObject}
            </p>
          )}
        </div>
      </div>
    </aside>
  );
}
