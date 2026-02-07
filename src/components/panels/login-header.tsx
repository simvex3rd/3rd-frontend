import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/ui/logo";
import { Navigation, type NavigationLink } from "./navigation";
import { CTAButton } from "@/components/ui/cta-button";
import type { HTMLAttributes } from "react";

/**
 * Login header component with 3 variants and sticky positioning.
 *
 * @component
 * @example
 * ```tsx
 * <LoginHeader
 *   variant="landing"
 *   navLinks={[
 *     { href: "/", label: "Home" },
 *     { href: "/features", label: "Features" }
 *   ]}
 *   onCTAClick={() => console.log("CTA clicked")}
 * />
 * ```
 *
 * @param {LoginHeaderProps} props - Component props
 * @param {"landing" | "tap3" | "main"} [props.variant="landing"] - Header style variant
 * @param {NavigationLink[]} props.navLinks - Navigation links array
 * @param {() => void} [props.onCTAClick] - CTA button click handler
 * @param {string} [props.ctaText] - CTA button text
 *
 * @see {@link https://figma.com/file/Vz80RydxWcYHVnn2iuyV0m/SIMVEX} Figma Design
 */

const loginHeaderVariants = cva(
  "sticky top-0 z-50 w-full backdrop-blur-sm transition-all",
  {
    variants: {
      variant: {
        landing: "h-[136px]",
        tap3: "h-[136px]",
        main: "h-[133.09px]",
      },
    },
    defaultVariants: {
      variant: "landing",
    },
  }
);

export interface LoginHeaderProps
  extends
    HTMLAttributes<HTMLElement>,
    VariantProps<typeof loginHeaderVariants> {
  navLinks: NavigationLink[];
  onLoginClick?: () => void;
  onSignupClick?: () => void;
  user?: { name: string }; // For 'main' variant
}

export function LoginHeader({
  className,
  variant,
  navLinks,
  onLoginClick,
  onSignupClick,
  user,
  ...props
}: LoginHeaderProps) {
  return (
    <header
      className={cn(
        loginHeaderVariants({ variant }),
        "flex items-center px-20 py-8 bg-transparent", // Transparent fixed height header
        className
      )}
      {...props}
    >
      <div className="flex w-full items-center gap-12">
        <Logo size="large" className="shrink-0" />

        <div className="flex-1 flex justify-center">
          <Navigation links={navLinks} />
        </div>

        <div className="flex items-center gap-4 shrink-0">
          {user ? (
            <CTAButton
              variant="default"
              className="text-[32px] w-[210px] h-[72px]"
            >
              {user.name} 님
            </CTAButton>
          ) : (
            <>
              <CTAButton
                variant="default"
                className="text-[32px] w-[210px] h-[72px]"
                onClick={onLoginClick}
              >
                로그인/가입
              </CTAButton>
              <CTAButton
                variant="primary"
                className="text-[32px] w-[210px] h-[72px]"
                onClick={onSignupClick}
              >
                시작하기
              </CTAButton>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
