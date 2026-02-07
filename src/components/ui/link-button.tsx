import { cn } from "@/lib/utils";
import Link, { type LinkProps } from "next/link";
import type { AnchorHTMLAttributes } from "react";

/**
 * Link button component styled as a clickable link.
 *
 * @component
 * @example
 * ```tsx
 * <LinkButton href="/about">About</LinkButton>
 * <LinkButton href="/contact" className="text-primary">Contact</LinkButton>
 * ```
 *
 * @param {LinkButtonProps} props - Component props
 * @param {string} props.href - Link destination URL
 *
 * @see {@link https://figma.com/file/Vz80RydxWcYHVnn2iuyV0m/SIMVEX} Figma Design
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
        "inline-flex items-center text-[40px] font-bold leading-[1.25] text-[#fafafa] transition-all hover:text-[#02EEE1] active:scale-95",
        className
      )}
      {...props}
    >
      {children}
    </Link>
  );
}
