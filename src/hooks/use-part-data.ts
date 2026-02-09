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
        setState({ partData: part || null, loading: false, error: null });
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
