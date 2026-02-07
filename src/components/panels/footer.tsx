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
  copyright: _copyright = "© 2026 All rights reserved.",
  ...props
}: FooterProps) {
  return (
    <footer
      className={cn(
        "w-full h-[339px] flex items-center px-20 py-10 bg-black",
        className
      )}
      {...props}
    >
      <div className="flex w-full items-end justify-between">
        {/* Left Side: Logo & Copyright */}
        <div className="flex flex-col gap-2 items-start justify-center py-[75px]">
          <Logo size="small" />
          <p className="text-[16px] text-[var(--gray-300)] leading-[1.4] mt-2">
            © 2026
          </p>
          <p className="text-[16px] text-[var(--gray-50)] leading-normal">
            All rights reserved.
          </p>
        </div>

        {/* Right Side: Policy Links */}
        <div className="flex gap-10 items-end justify-end pb-[75px]">
          <LinkButton
            href="/privacy"
            className="text-[32px] font-semibold text-[var(--gray-50)] leading-[1.25] hover:text-[var(--primary-cyan)]"
          >
            Privacy Policy
          </LinkButton>
          <LinkButton
            href="/terms"
            className="text-[32px] font-semibold text-[var(--gray-50)] leading-[1.25] hover:text-[var(--primary-cyan)]"
          >
            Terms of Service
          </LinkButton>
        </div>
      </div>
    </footer>
  );
}
