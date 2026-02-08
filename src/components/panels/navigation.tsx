import { cn } from "@/lib/utils";
import { LinkButton } from "@/components/ui/link-button";
import type { HTMLAttributes } from "react";

/**
 * Navigation component - horizontal nav label group for landing/main pages.
 * Based on verified design specs from docs/phase2-layout.md
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
 * Dimensions: Auto width, 48px height
 * Gap: 80px between items
 * Font: 40px/1.25 bold
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
    <nav className={cn("flex items-center gap-20 h-12", className)} {...props}>
      {links.map((link) => (
        <LinkButton key={link.href} href={link.href}>
          {link.label}
        </LinkButton>
      ))}
    </nav>
  );
}
