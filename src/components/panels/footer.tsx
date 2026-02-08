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
        "w-[1920px] py-[40px] px-[160px] bg-background border-t border-neutral-800",
        className
      )}
      {...props}
    >
      <div className="w-full flex items-end justify-end py-[10px]">
        {/* Left Side: Logo & Copyright - 163px width matches Figma */}
        <div className="flex flex-col gap-[8px] items-start py-[75px] w-[163px] h-[239px]">
          <Logo size="small" />
          <p className="text-[16px] text-neutral-300 leading-[1.406]">© 2026</p>
          <p className="text-[16px] text-neutral-50 leading-normal">
            All rights reserved.
          </p>
        </div>

        {/* Right Side: Policy Links */}
        <div className="flex flex-1 gap-[40px] items-end justify-end font-semibold">
          <LinkButton
            href="/privacy"
            className="text-[32px] !text-neutral-50 !font-semibold hover:!text-primary transition-colors no-underline leading-[1.25]"
          >
            Privacy Policy
          </LinkButton>
          <LinkButton
            href="/terms"
            className="text-[32px] !text-neutral-50 !font-semibold hover:!text-primary transition-colors no-underline leading-[1.25]"
          >
            Terms of Service
          </LinkButton>
        </div>
      </div>
    </footer>
  );
}
