import { cn } from "@/lib/utils";
import Link from "next/link";
import type { HTMLAttributes } from "react";

/**
 * Navigation component - horizontal nav label group for landing/main pages.
 * Based on Figma design at 1920px viewport (node-id: 130-135)
 *
 * @component
 * @example
 * ```tsx
 * <Navigation links={[
 *   { href: "#intro", label: "소개" },
 *   { href: "#functions", label: "기능" },
 *   { href: "#models", label: "학습 모델" }
 * ]} />
 * ```
 *
 * Specifications (1920px):
 * - Each item: 70px width × 48px height
 * - Gap: 80px between items
 * - Font: 40px/1.25 bold (Pretendard)
 * - Color: #fafafa (neutral-50)
 * - Hover: #02eee1 (primary)
 *
 * @see {@link https://figma.com/file/Vz80RydxWcYHVnn2iuyV0m/SIMVEX?node-id=130-135} Figma Design
 */

export interface NavigationLink {
  href: string;
  label: string;
}

export interface NavigationProps extends HTMLAttributes<HTMLElement> {
  links: NavigationLink[];
}

export function Navigation({ links, className, ...props }: NavigationProps) {
  return (
    <nav
      className={cn("flex items-center gap-[80px] h-[48px]", className)}
      {...props}
    >
      {links.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className="flex items-center justify-center h-[48px] w-[70px] text-[40px] font-bold leading-[1.25] text-neutral-50 transition-colors duration-150 hover:text-primary active:text-primary cursor-pointer"
        >
          {link.label}
        </Link>
      ))}
    </nav>
  );
}
