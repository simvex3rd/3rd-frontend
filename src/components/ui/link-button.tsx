import { cn } from "@/lib/utils";
import Link, { type LinkProps } from "next/link";
import type { AnchorHTMLAttributes } from "react";

/**
 * LinkButton component (ALinkButton in Figma) - text-only link for inline navigation.
 * Based on verified design specs from docs/phase2-ui-basic.md
 *
 * @component
 * @example
 * ```tsx
 * <LinkButton href="/about">About</LinkButton>
 * <LinkButton href="/contact">Contact</LinkButton>
 * ```
 *
 * Dimensions: 48×24px (text-dependent)
 * Font: 40px/1.25 bold
 * States: Default (white), Hover/Press (cyan)
 *
 * @see {@link https://figma.com/file/Vz80RydxWcYHVnn2iuyV0m/SIMVEX?node-id=147-841} Figma Design
 */

export interface LinkButtonProps
  extends
    Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href">,
    Pick<LinkProps, "href"> {}

export function LinkButton({
  className,
  href,
  children,
  ...props
}: LinkButtonProps) {
  return (
    <Link
      href={href}
      className={cn(
        "inline-flex items-center text-[40px] font-bold leading-tight text-neutral-50 transition-colors duration-150 hover:text-primary active:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
        className
      )}
      {...props}
    >
      {children}
    </Link>
  );
}
