import { cn } from "@/lib/utils";
import { Logo } from "@/components/ui/logo";
import { LinkButton } from "@/components/ui/link-button";
import type { HTMLAttributes } from "react";

/**
 * Footer component with multi-column layout.
 *
 * @component
 * @example
 * ```tsx
 * <Footer
 *   sections={[
 *     { title: "Product", links: [{ href: "/features", label: "Features" }] },
 *     { title: "Company", links: [{ href: "/about", label: "About" }] }
 *   ]}
 *   socialLinks={[
 *     { href: "https://twitter.com", label: "Twitter", iconName: "twitter" }
 *   ]}
 * />
 * ```
 *
 * @param {FooterProps} props - Component props
 * @param {FooterSection[]} props.sections - Footer link sections
 * @param {SocialLink[]} [props.socialLinks] - Social media links
 * @param {string} [props.copyright] - Copyright text
 *
 * @see {@link https://figma.com/file/Vz80RydxWcYHVnn2iuyV0m/SIMVEX} Figma Design
 */

export interface FooterLink {
  href: string;
  label: string;
}

export interface FooterSection {
  title: string;
  links: FooterLink[];
}

export interface SocialLink {
  href: string;
  label: string;
  iconName: string;
}

export interface FooterProps extends HTMLAttributes<HTMLElement> {
  sections: FooterSection[];
  socialLinks?: SocialLink[];
  copyright?: string;
}

export function Footer({
  className,
  sections: _sections,
  socialLinks: _socialLinks,
  copyright: _copyright = "© 2026 SIMVEX. All rights reserved.",
  ...props
}: FooterProps) {
  return (
    <footer
      className={cn(
        "w-full py-16 px-20 bg-background border-t border-neutral-800",
        className
      )}
      {...props}
    >
      <div className="w-full max-w-[1760px] mx-auto flex items-end justify-between">
        {/* Left Side: Logo & Copyright */}
        <div className="flex flex-col gap-6 items-start">
          <Logo size="small" />
          <div className="flex flex-col gap-1">
            <p className="text-sm text-neutral-400 leading-relaxed">
              © 2026 SIMVEX
            </p>
            <p className="text-sm text-neutral-500 leading-relaxed">
              All rights reserved.
            </p>
          </div>
        </div>

        {/* Right Side: Policy Links */}
        <div className="flex gap-8 items-center pb-1">
          <LinkButton
            href="/privacy"
            className="text-sm !text-neutral-500 !font-normal hover:!text-primary transition-colors no-underline"
          >
            Privacy Policy
          </LinkButton>
          <LinkButton
            href="/terms"
            className="text-sm !text-neutral-500 !font-normal hover:!text-primary transition-colors no-underline"
          >
            Terms of Service
          </LinkButton>
        </div>
      </div>
    </footer>
  );
}
