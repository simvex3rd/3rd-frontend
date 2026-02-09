"use client";

import { useSceneStore } from "@/stores/scene-store";
import { usePartData } from "@/hooks/use-part-data";

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
 * - Expanded metadata display (rpm, diameter, stroke, etc.)
 *
 * @component
 * @see {@link https://figma.com/file/Vz80RydxWcYHVnn2iuyV0m/SIMVEX} Figma Design (node-232:967)
 */

/**
 * Format a metadata key for display (snake_case -> Title Case with units)
 */
function formatMetaKey(key: string): string {
  return key.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

/**
 * Format a metadata value for display
 */
function formatMetaValue(value: unknown): string {
  if (typeof value === "number") {
    return value.toLocaleString();
  }
  if (typeof value === "boolean") {
    return value ? "Yes" : "No";
  }
  return String(value);
}

export function PartInfoPanel() {
  const selectedObject = useSceneStore((state) => state.selectedObject);
  const { partData, loading, error } = usePartData(selectedObject);

  // Extract metadata entries for display
  const metadataEntries = partData?.metadata
    ? Object.entries(partData.metadata).filter(
        ([, value]) => value !== null && value !== undefined
      )
    : [];

  if (!selectedObject) {
    return (
      <div className="flex flex-col items-center justify-center h-full px-[24px] text-center">
        <p className="font-medium text-[14px] leading-[1.5] text-neutral-400">
          3D 뷰어에서 파트를 클릭하여
          <br />
          정보를 확인하세요.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-[16px] p-[20px] overflow-y-auto h-full">
      {/* Part Name */}
      <p className="font-bold text-[16px] leading-[1.4] text-primary">
        {partData?.name || selectedObject}
      </p>

      {/* Description */}
      {partData?.description && (
        <p className="font-medium text-[13px] leading-[1.5] text-neutral-300">
          {partData.description}
        </p>
      )}

      {/* Metadata */}
      {loading ? (
        <p className="font-medium text-[14px] text-neutral-400">Loading...</p>
      ) : error ? (
        <p className="font-medium text-[14px] text-red-400">{error}</p>
      ) : (
        <div className="flex flex-col gap-[8px]">
          {partData?.material && (
            <div className="flex justify-between">
              <span className="font-medium text-[13px] text-neutral-400">
                Material
              </span>
              <span className="font-medium text-[13px] text-neutral-50">
                {partData.material}
              </span>
            </div>
          )}
          {metadataEntries.map(([key, value]) => (
            <div key={key} className="flex justify-between">
              <span className="font-medium text-[13px] text-neutral-400">
                {formatMetaKey(key)}
              </span>
              <span className="font-medium text-[13px] text-neutral-50">
                {formatMetaValue(value)}
              </span>
            </div>
          ))}
          {!partData?.material && metadataEntries.length === 0 && (
            <p className="font-medium text-[13px] text-neutral-400">
              No additional details available
            </p>
          )}
        </div>
      )}
    </div>
  );
}
