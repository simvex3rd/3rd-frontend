"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

/**
 * Logo component with theme awareness (light/dark mode).
 *
 * @component
 * @example
 * ```tsx
 * <Logo />
 * <Logo size="small" />
 * <Logo size="large" className="my-4" />
 * ```
 *
 * @param {LogoProps} props - Component props
 * @param {"small" | "medium" | "large" | "xlarge" | "xxlarge"} [props.size="medium"] - Logo size
 * @param {string} [props.className] - Additional CSS classes
 *
 * @see {@link https://figma.com/file/Vz80RydxWcYHVnn2iuyV0m/SIMVEX} Figma Design
 */

export interface LogoProps {
  size?: "small" | "medium" | "large" | "xlarge" | "xxlarge";
  className?: string;
}

const sizeMap = {
  small: { width: 163, height: 35 }, // 325×69 / 2
  medium: { width: 244, height: 52 }, // ~75% of original
  large: { width: 325, height: 69 }, // Original Figma size
  xlarge: { width: 487, height: 103 }, // 1.5x
  xxlarge: { width: 650, height: 138 }, // 2x
};

export function Logo({ size = "medium", className }: LogoProps) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Avoid hydration mismatch
  /* eslint-disable react-hooks/set-state-in-effect */
  useEffect(() => {
    setMounted(true);
  }, []);
  /* eslint-enable react-hooks/set-state-in-effect */

  if (!mounted) {
    return (
      <div
        style={{
          width: sizeMap[size].width,
          height: sizeMap[size].height,
        }}
        className={cn("inline-block", className)}
      />
    );
  }

  const logoSrc =
    resolvedTheme === "dark"
      ? "/logos/dark-medium.png"
      : "/logos/light-medium.png";

  return (
    <Image
      src={logoSrc}
      alt="SIMVEX Logo"
      width={sizeMap[size].width}
      height={sizeMap[size].height}
      className={cn("inline-block", className)}
      priority
    />
  );
}
