import Image from "next/image";
import { cn } from "@/lib/utils";

/**
 * Logo component.
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
  return (
    <Image
      src="/logo.png"
      alt="SIMVEX Logo"
      width={sizeMap[size].width}
      height={sizeMap[size].height}
      className={cn("inline-block", className)}
      priority
    />
  );
}
