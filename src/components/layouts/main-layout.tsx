import { cn } from "@/lib/utils";
import {
  LoginHeader,
  type LoginHeaderProps,
} from "@/components/panels/login-header";
import { Footer, type FooterProps } from "@/components/panels/footer";
import type { ReactNode, HTMLAttributes } from "react";

/**
 * Main layout template combining header, content, and footer.
 *
 * @component
 * @example
 * ```tsx
 * <MainLayout
 *   headerProps={{
 *     variant: "landing",
 *     navLinks: [{ href: "/", label: "Home" }],
 *     onCTAClick: () => {}
 *   }}
 *   footerProps={{
 *     sections: [{ title: "Product", links: [...] }]
 *   }}
 * >
 *   <YourPageContent />
 * </MainLayout>
 * ```
 *
 * @param {MainLayoutProps} props - Component props
 * @param {LoginHeaderProps} props.headerProps - Login header configuration
 * @param {FooterProps} props.footerProps - Footer configuration
 * @param {ReactNode} props.children - Page content
 *
 * @see {@link https://figma.com/file/Vz80RydxWcYHVnn2iuyV0m/SIMVEX} Figma Design
 */

export interface MainLayoutProps extends HTMLAttributes<HTMLDivElement> {
  headerProps: Omit<LoginHeaderProps, "className">;
  footerProps: Omit<FooterProps, "className">;
  children: ReactNode;
}

export function MainLayout({
  className,
  headerProps,
  footerProps,
  children,
  ...props
}: MainLayoutProps) {
  return (
    <div className={cn("flex min-h-screen flex-col", className)} {...props}>
      <LoginHeader {...headerProps} />
      <main className="flex-1">
        <div className="container px-8 py-12">{children}</div>
      </main>
      <Footer {...footerProps} />
    </div>
  );
}
