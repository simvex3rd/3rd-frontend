import { cn } from "@/lib/utils";
import { LinkButton } from "@/components/ui/link-button";
import type { HTMLAttributes } from "react";

/**
 * Secondary navigation component with alternative layout.
 *
 * @component
 * @example
 * ```tsx
 * <SecondaryNav links={[
 *   { href: "/docs", label: "Documentation" },
 *   { href: "/api", label: "API" },
 *   { href: "/support", label: "Support" }
 * ]} />
 * ```
 *
 * @param {SecondaryNavProps} props - Component props
 * @param {NavigationLink[]} props.links - Array of navigation links
 *
 * @see {@link https://figma.com/file/Vz80RydxWcYHVnn2iuyV0m/SIMVEX} Figma Design
 */

export interface NavigationLink {
  href: string;
  label: string;
}

export interface SecondaryNavProps extends HTMLAttributes<HTMLElement> {
  links: NavigationLink[];
}

export function SecondaryNav({
  links,
  className,
  ...props
}: SecondaryNavProps) {
  return (
    <nav
      className={cn(
        "flex h-[48px] items-center gap-[24px] border-b border-border px-[16px]",
        className
      )}
      {...props}
    >
      {links.map((link) => (
        <LinkButton key={link.href} href={link.href} className="text-[12px]">
          {link.label}
        </LinkButton>
      ))}
    </nav>
  );
}
