import Image from "next/image";
import { cn } from "@/lib/utils";

interface IconProps {
  /**
   * Icon name (filename without extension)
   * @example "menu", "close", "search"
   */
  name: string;
  /**
   * Icon size in pixels
   * @default 24
   */
  size?: number;
  /**
   * Additional CSS classes
   */
  className?: string;
  /**
   * Alt text for accessibility
   */
  alt?: string;
}

/**
 * Icon component for PNG icons
 *
 * @example
 * ```tsx
 * <Icon name="menu" size={24} />
 * <Icon name="close" size={32} className="text-error" />
 * ```
 */
export function Icon({ name, size = 24, className, alt = "" }: IconProps) {
  return (
    <Image
      src={`/icons/${name}.png`}
      alt={alt}
      width={size}
      height={size}
      className={cn("inline-block", className)}
    />
  );
}
