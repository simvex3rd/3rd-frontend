import { cn } from "@/lib/utils";
import { LinkButton } from "@/components/ui/link-button";
import type { HTMLAttributes } from "react";

/**
 * Main navigation component with horizontal layout.
 *
 * @component
 * @example
 * ```tsx
 * <Navigation links={[
 *   { href: "/", label: "Home" },
 *   { href: "/about", label: "About" },
 *   { href: "/contact", label: "Contact" }
 * ]} />
 * ```
 *
 * @param {NavigationProps} props - Component props
 * @param {NavigationLink[]} props.links - Array of navigation links
 *
 * @see {@link https://figma.com/file/Vz80RydxWcYHVnn2iuyV0m/SIMVEX} Figma Design
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
    <nav className={cn("flex items-center gap-20", className)} {...props}>
      {links.map((link) => (
        <LinkButton key={link.href} href={link.href}>
          {link.label}
        </LinkButton>
      ))}
    </nav>
  );
}
