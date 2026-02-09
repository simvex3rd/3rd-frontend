"use client";

import { useState, useEffect } from "react";
import { api } from "@/lib/api";
import { useSceneStore } from "@/stores/scene-store";
import { normalizePart, type NormalizedPart } from "@/lib/api/normalize";

export function usePartData(partId: string | null) {
  const modelId = useSceneStore((state) => state.modelId);

  const [state, setState] = useState<{
    partData: NormalizedPart | null;
    loading: boolean;
    error: string | null;
  }>({
    partData: null,
    loading: false,
    error: null,
  });

  useEffect(() => {
    if (!partId || !modelId) {
      setState({ partData: null, loading: false, error: null });
      return;
    }

    let cancelled = false;

    setState((prev) => ({ ...prev, loading: true, error: null }));

    api.models
      .getDetail(modelId)
      .then((model) => {
        if (cancelled) return;
        const rawPart = model.parts.find(
          (p) => String(p.id) === partId || p.name === partId
        );
        const normalized = rawPart
          ? normalizePart(rawPart as unknown as Record<string, unknown>)
          : null;
        setState({ partData: normalized, loading: false, error: null });
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
