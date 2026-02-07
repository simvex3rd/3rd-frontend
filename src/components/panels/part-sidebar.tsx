"use client";

import { useSceneStore } from "@/stores/scene-store";
import { getPartByMeshName } from "@/lib/mock-data";
import { X } from "lucide-react";

/**
 * Part Sidebar Component
 *
 * Full-height sidebar that displays detailed part information when a part is selected.
 * Follows Figma design: Side bar-if click part (400x750)
 *
 * Features:
 * - Integration with scene store for selected part state
 * - Dismissible with close button
 * - Displays part details, specifications, and metadata
 * - Different from PartInfoPanel (this is a full sidebar layout)
 *
 * @component
 * @example
 * ```tsx
 * <PartSidebar />
 * ```
 *
 * @see {@link https://figma.com/file/Vz80RydxWcYHVnn2iuyV0m/SIMVEX} Figma Design
 */

export function PartSidebar() {
  const selectedObject = useSceneStore((state) => state.selectedObject);
  const setSelectedObject = useSceneStore((state) => state.setSelectedObject);

  if (!selectedObject) {
    return null;
  }

  const partInfo = getPartByMeshName(selectedObject);

  const handleClose = () => {
    setSelectedObject(null);
  };

  return (
    <aside
      className="fixed right-0 top-0 h-screen w-[400px] border-l-2 border-[var(--primary-cyan)]/30 bg-[var(--bg-black)]/95 shadow-[-8px_0_30px_rgba(2,238,225,0.15)] backdrop-blur-lg transition-transform duration-300 ease-out"
      role="complementary"
      aria-label="Part information sidebar"
    >
      <div className="flex h-full flex-col">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[var(--primary-cyan)]/20 p-6">
          <h2 className="text-[20px] font-bold text-[var(--primary-cyan)]">
            Part Details
          </h2>
          <button
            onClick={handleClose}
            className="rounded-lg p-2 text-gray-400 transition-colors hover:bg-[var(--primary-cyan)]/10 hover:text-[var(--primary-cyan)]"
            aria-label="Close sidebar"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {!partInfo ? (
            <div className="space-y-4">
              <div className="rounded-lg border border-[var(--primary-cyan)]/20 bg-[var(--primary-cyan)]/5 p-4">
                <h3 className="mb-2 text-[18px] font-semibold text-[var(--gray-50)]">
                  Selected Part
                </h3>
                <p className="text-[14px] text-gray-300">{selectedObject}</p>
              </div>
              <div className="rounded-lg border border-yellow-500/30 bg-yellow-500/10 p-4">
                <p className="text-[13px] text-yellow-400">
                  Part information not available (API pending)
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Part Name & ID */}
              <div>
                <h3 className="mb-2 text-[28px] font-bold leading-tight text-[var(--primary-cyan)]">
                  {partInfo.name ?? "Unknown Part"}
                </h3>
                <p className="font-mono text-[12px] text-[var(--primary-cyan)]/50">
                  ID: {partInfo.id}
                </p>
              </div>

              {/* Description */}
              <div className="rounded-lg border border-[var(--primary-cyan)]/20 bg-[var(--primary-cyan)]/5 p-4">
                <h4 className="mb-2 text-[14px] font-semibold uppercase tracking-wider text-gray-400">
                  Description
                </h4>
                <p className="text-[15px] leading-[1.6] text-gray-200">
                  {partInfo.description ?? "No description available"}
                </p>
              </div>

              {/* Specifications */}
              <div>
                <h4 className="mb-3 text-[14px] font-semibold uppercase tracking-wider text-gray-400">
                  Specifications
                </h4>
                <div className="space-y-3">
                  <SpecRow label="Material" value={partInfo.material} />
                  <SpecRow
                    label="Weight"
                    value={partInfo.metadata?.weight as string | undefined}
                  />
                  <SpecRow
                    label="Tolerance"
                    value={partInfo.metadata?.tolerance as string | undefined}
                  />
                </div>
              </div>

              {/* Manufacturing Info */}
              <div>
                <h4 className="mb-3 text-[14px] font-semibold uppercase tracking-wider text-gray-400">
                  Manufacturing
                </h4>
                <div className="space-y-3">
                  <SpecRow
                    label="Manufacturer"
                    value={
                      partInfo.metadata?.manufacturer as string | undefined
                    }
                  />
                  <SpecRow
                    label="Part Number"
                    value={partInfo.metadata?.partNumber as string | undefined}
                  />
                </div>
              </div>

              {/* Additional Metadata */}
              {partInfo.geometries &&
                partInfo.geometries.length > 0 &&
                partInfo.geometries[0] &&
                partInfo.geometries[0].initialPos &&
                partInfo.geometries[0].initialScale && (
                  <div>
                    <h4 className="mb-3 text-[14px] font-semibold uppercase tracking-wider text-gray-400">
                      Geometry Data
                    </h4>
                    <div className="space-y-2 rounded-lg border border-[var(--primary-cyan)]/20 bg-[var(--bg-black)]/40 p-4">
                      <div className="grid grid-cols-3 gap-2 text-[12px]">
                        <div>
                          <span className="text-gray-500">Position</span>
                          <p className="font-mono text-gray-300">
                            {partInfo.geometries[0].initialPos.x.toFixed(1)},{" "}
                            {partInfo.geometries[0].initialPos.y.toFixed(1)},{" "}
                            {partInfo.geometries[0].initialPos.z.toFixed(1)}
                          </p>
                        </div>
                        <div>
                          <span className="text-gray-500">Scale</span>
                          <p className="font-mono text-gray-300">
                            {partInfo.geometries[0].initialScale.x.toFixed(2)}
                          </p>
                        </div>
                        <div>
                          <span className="text-gray-500">Geometries</span>
                          <p className="font-mono text-gray-300">
                            {partInfo.geometries.length}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-[var(--primary-cyan)]/20 p-6">
          <p className="text-center text-[11px] text-gray-500">
            Click on another part to view its details
          </p>
        </div>
      </div>
    </aside>
  );
}

/**
 * Specification row component for displaying key-value pairs
 */
function SpecRow({ label, value }: { label: string; value?: string | null }) {
  return (
    <div className="flex items-center justify-between rounded-lg border border-[var(--primary-cyan)]/10 bg-[var(--bg-black)]/30 px-4 py-3">
      <span className="text-[14px] text-gray-400">{label}</span>
      <span className="text-[14px] font-medium text-[var(--gray-50)]">
        {value || "N/A"}
      </span>
    </div>
  );
}
