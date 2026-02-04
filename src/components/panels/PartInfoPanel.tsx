"use client";

import { useSceneStore } from "@/stores/scene-store";
import { getPartByMeshName } from "@/lib/mock-data";

/**
 * TODO: Mock 데이터를 API 연동으로 교체 - Track: #12
 * - @/lib/api/parts에서 async fetchPartByMeshName() 구현
 * - 로딩 상태를 위해 Suspense로 컴포넌트 감싸기
 * - API 실패를 위한 error boundary 추가
 * - 관련 이슈: #13
 */

export function PartInfoPanel() {
  const selectedObject = useSceneStore((state) => state.selectedObject);

  if (!selectedObject) {
    return (
      <div className="absolute right-4 top-4 w-80 rounded-lg border border-gray-700 bg-gray-900/90 p-4 text-white backdrop-blur-sm">
        <p className="text-sm text-gray-400">
          Click on a part to see its details
        </p>
      </div>
    );
  }

  const partInfo = getPartByMeshName(selectedObject);

  if (!partInfo) {
    return (
      <div className="absolute right-4 top-4 w-80 rounded-lg border border-gray-700 bg-gray-900/90 p-4 text-white backdrop-blur-sm">
        <h3 className="mb-2 text-lg font-semibold">Selected Part</h3>
        <p className="text-sm text-gray-300">{selectedObject}</p>
        <p className="mt-2 text-xs text-yellow-400">
          Part information not available (API pending)
        </p>
      </div>
    );
  }

  return (
    <div className="absolute right-4 top-4 w-80 rounded-lg border border-gray-700 bg-gray-900/90 p-4 text-white shadow-xl backdrop-blur-sm">
      <h3 className="mb-3 text-xl font-bold">
        {partInfo.name ?? "Unknown Part"}
      </h3>

      <div className="mb-4 text-sm text-gray-300">
        <p>{partInfo.description ?? "No description available"}</p>
      </div>

      <div className="space-y-2 border-t border-gray-700 pt-3">
        <InfoRow
          label="Material"
          value={partInfo.material ?? undefined}
          isPending={false}
        />
        <InfoRow
          label="Weight"
          value={partInfo.metadata?.weight as string | undefined}
          isPending={false}
        />
        <InfoRow
          label="Manufacturer"
          value={partInfo.metadata?.manufacturer as string | undefined}
          isPending={false}
        />
        <InfoRow
          label="Part Number"
          value={partInfo.metadata?.partNumber as string | undefined}
          isPending={false}
        />
        <InfoRow
          label="Tolerance"
          value={partInfo.metadata?.tolerance as string | undefined}
          isPending={false}
        />
      </div>

      <div className="mt-4 border-t border-gray-700 pt-3">
        <p className="text-xs text-gray-500">Part ID: {partInfo.id}</p>
      </div>
    </div>
  );
}

function InfoRow({
  label,
  value,
  isPending = false,
}: {
  label: string;
  value?: string;
  isPending?: boolean;
}) {
  return (
    <div className="flex justify-between text-sm">
      <span className="text-gray-400">{label}:</span>
      {isPending ? (
        <span className="text-yellow-400">API pending</span>
      ) : (
        <span className="font-medium">{value || "N/A"}</span>
      )}
    </div>
  );
}
