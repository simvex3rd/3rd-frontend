"use client";

import { Stats as DreiStats } from "@react-three/drei";

export function Stats() {
  const show = process.env.NEXT_PUBLIC_ENABLE_STATS === "true";

  if (!show) return null;
  return <DreiStats />;
}
