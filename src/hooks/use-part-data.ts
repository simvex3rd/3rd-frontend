"use client";

import { useState, useEffect } from "react";
import { api } from "@/lib/api/client";
import type { Part } from "@/types/api";

export function usePartData(
  partId: string | null,
  modelId: string = "default-model"
) {
  const [state, setState] = useState<{
    partData: Part | null;
    loading: boolean;
    error: string | null;
  }>({
    partData: null,
    loading: false,
    error: null,
  });

  useEffect(() => {
    if (!partId) {
      setState({ partData: null, loading: false, error: null });
      return;
    }

    let cancelled = false;

    setState((prev) => ({ ...prev, loading: true, error: null }));

    api.models
      .getDetail(modelId)
      .then((model) => {
        if (cancelled) return;
        const part = model.parts.find(
          (p) => p.id === partId || p.name === partId
        );
        // Convert to PartWithGeometry type (number IDs and proper geometry)
        const partWithModelId = part
          ? {
              id: Number(part.id),
              model_id: Number(model.id),
              name: part.name,
              description: part.description,
              material: part.material,
              metadata: part.metadata,
              geometry: {
                id: 0, // Placeholder - not provided by API
                part_id: Number(part.id),
                initial_pos: {
                  x: part.geometry.initial_position[0],
                  y: part.geometry.initial_position[1],
                  z: part.geometry.initial_position[2],
                },
                initial_rot: {
                  x: part.geometry.initial_rotation[0],
                  y: part.geometry.initial_rotation[1],
                  z: part.geometry.initial_rotation[2],
                },
                initial_scale: {
                  x: part.geometry.initial_scale[0],
                  y: part.geometry.initial_scale[1],
                  z: part.geometry.initial_scale[2],
                },
                exploded_pos: {
                  x: part.geometry.exploded_position[0],
                  y: part.geometry.exploded_position[1],
                  z: part.geometry.exploded_position[2],
                },
              },
            }
          : null;
        setState({ partData: partWithModelId, loading: false, error: null });
      })
      .catch((err) => {
        if (cancelled) return;
        console.error("Failed to fetch part data:", err);
        setState({
          partData: null,
          loading: false,
          error: "Failed to load part data",
        });
      });

    return () => {
      cancelled = true;
    };
  }, [partId, modelId]);

  return state;
}
