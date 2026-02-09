"use client";

import { cn } from "@/lib/utils";

interface GradientBorderProps {
  className?: string;
}

export function GradientBorder({ className }: GradientBorderProps) {
  return (
    <div
      className={cn(
        "absolute inset-0 rounded-[24px] pointer-events-none",
        className
      )}
      style={{
        padding: "3px",
        background:
          "linear-gradient(to right, var(--color-primary), transparent)",
        mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
        maskComposite: "exclude",
        WebkitMaskComposite: "xor",
      }}
    />
  );
}
