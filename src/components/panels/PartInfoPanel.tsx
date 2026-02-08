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
      <div className="absolute right-4 top-4 w-80 rounded-lg border border-neutral-700 bg-neutral-900/90 p-4 text-neutral-50 backdrop-blur-sm">
        <p className="text-sm text-neutral-400">
          Click on a part to see its details
        </p>
      </div>
    );
  }

  const partInfo = getPartByMeshName(selectedObject);

  if (!partInfo) {
    return (
      <div className="absolute right-4 top-4 w-80 rounded-lg border border-neutral-700 bg-neutral-900/90 p-4 text-neutral-50 backdrop-blur-sm">
        <h3 className="mb-2 text-lg font-semibold">Selected Part</h3>
        <p className="text-sm text-neutral-300">{selectedObject}</p>
        <p className="mt-2 text-xs text-warning">
          Part information not available (API pending)
        </p>
      </div>
    );
  }

  return (
    <div className="absolute right-4 top-4 w-80 rounded-[24px] border-2 border-primary/30 bg-neutral-950/40 p-6 text-neutral-50 shadow-[0_0_30px_rgba(2,238,225,0.1)] backdrop-blur-md transition-all hover:border-primary/60">
      <h3 className="mb-4 text-[24px] font-bold leading-tight text-primary">
        {partInfo.name ?? "Unknown Part"}
      </h3>

      <div className="mb-6 text-[14px] font-medium leading-[1.6] text-neutral-200">
        <p>{partInfo.description ?? "No description available"}</p>
      </div>

      <div className="space-y-3 border-t border-primary/20 pt-4">
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

      <div className="mt-6 border-t border-primary/20 pt-3">
        <p className="text-xs text-primary/50 font-mono">ID: {partInfo.id}</p>
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
      <span className="text-neutral-400">{label}:</span>
      {isPending ? (
        <span className="text-warning">API pending</span>
      ) : (
        <span className="font-medium">{value || "N/A"}</span>
      )}
    </div>
  );
}
