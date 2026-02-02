import { Part } from "@/types/model";

/**
 * Mock Part data for development
 * TODO: Replace with actual API calls when backend is ready
 */
export const mockParts: Record<string, Part> = {
  Crankshaft: {
    id: 1,
    modelId: 1,
    name: "Crankshaft",
    description:
      "Main rotating component that converts reciprocating motion to rotational motion",
    material: "Forged Steel Alloy",
    metadata: {
      weight: "12.5kg",
      manufacturer: "SIMVEX Corp",
      partNumber: "CS-V4-001",
      tolerance: "±0.01mm",
    },
    geometries: [
      {
        id: 1,
        partId: 1,
        initialPos: { x: 0, y: 0, z: 0 },
        initialRot: { x: 0, y: 0, z: 0, w: 1 },
        initialScale: { x: 1, y: 1, z: 1 },
        explodedPos: { x: 0, y: 0, z: 0 },
      },
    ],
  },
  Piston: {
    id: 2,
    modelId: 1,
    name: "Piston",
    description: "Reciprocating component that transfers force to crankshaft",
    material: "Aluminum Alloy",
    metadata: {
      weight: "0.8kg",
      manufacturer: "SIMVEX Corp",
      partNumber: "PS-V4-001",
      tolerance: "±0.02mm",
    },
    geometries: [
      {
        id: 2,
        partId: 2,
        initialPos: { x: 0, y: 10, z: 0 },
        initialRot: { x: 0, y: 0, z: 0, w: 1 },
        initialScale: { x: 1, y: 1, z: 1 },
        explodedPos: { x: 0, y: 20, z: 0 },
      },
    ],
  },
  ConnectingRod: {
    id: 3,
    modelId: 1,
    name: "Connecting Rod",
    description: "Links piston to crankshaft",
    material: "Titanium Alloy",
    metadata: {
      weight: "1.2kg",
      manufacturer: "SIMVEX Corp",
      partNumber: "CR-V4-001",
      tolerance: "±0.015mm",
    },
    geometries: [
      {
        id: 3,
        partId: 3,
        initialPos: { x: 0, y: 5, z: 0 },
        initialRot: { x: 0, y: 0, z: 0, w: 1 },
        initialScale: { x: 1, y: 1, z: 1 },
        explodedPos: { x: 0, y: 15, z: 0 },
      },
    ],
  },
};

/**
 * Get Part info by mesh name
 * @param meshName - Name from Three.js mesh
 * @returns Part data or undefined
 */
export function getPartByMeshName(meshName: string): Part | undefined {
  // Try exact match first
  if (mockParts[meshName]) {
    return mockParts[meshName];
  }

  // Try case-insensitive search
  const normalizedName = meshName.toLowerCase();
  const matchingKey = Object.keys(mockParts).find(
    (key) => key.toLowerCase() === normalizedName
  );

  return matchingKey ? mockParts[matchingKey] : undefined;
}
