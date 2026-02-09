"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";

const ClerkAuthButton = dynamic(
  () =>
    import("@clerk/nextjs").then((mod) => {
      const { SignedOut, SignedIn, UserButton } = mod;
      return {
        default: function ClerkAuth() {
          return (
            <>
              <SignedOut>
                <Link href="/sign-in">
                  <button
                    className="w-[210px] h-[72px] flex items-center justify-center rounded-[24px] px-[24px] py-[16px] text-[32px] font-semibold leading-[1.25] text-neutral-50 shadow-[4px_4px_20px_rgba(2,238,225,0.1)] hover:brightness-125 transition-all"
                    style={{
                      background:
                        "radial-gradient(50% 50% at 50% 50%, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0.3) 100%)",
                    }}
                  >
                    로그인/가입
                  </button>
                </Link>
              </SignedOut>
              <SignedIn>
                <UserButton
                  appearance={{
                    elements: { avatarBox: "w-[48px] h-[48px]" },
                  }}
                />
              </SignedIn>
            </>
          );
        },
      };
    }),
  { ssr: false }
);
import { Logo } from "@/components/ui/logo";
import { CTAButton } from "@/components/ui/cta-button";

const navLinks = [
  { label: "소개", href: "#intro" },
  { label: "기능", href: "#functions" },
  { label: "AI 튜터", href: "#pivot" },
  { label: "학습 모델", href: "#models" },
  { label: "문의", href: "#footer" },
];

export function LandingHeader() {
  const [activeSection, setActiveSection] = useState("intro");

  useEffect(() => {
    const onSectionChange = (e: Event) => {
      setActiveSection((e as CustomEvent<string>).detail);
    };
    window.addEventListener("section-change", onSectionChange);
    return () => window.removeEventListener("section-change", onSectionChange);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-[80px] h-[102px] flex items-center transition-all duration-300">
      {/* Background with Glow Effect */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Subtle dark backdrop */}
        <div className="absolute inset-0 bg-black/1 backdrop-blur-[2px]" />
        {/* Top Center Glow (Teal) */}
        <div
          className="absolute top-[-50%] left-1/2 -translate-x-1/2 w-[60%] h-[200%] rounded-full blur-[80px] opacity-40"
          style={{
            background:
              "radial-gradient(circle, hsl(var(--primary)) 0%, transparent 70%)",
          }}
        />
      </div>

      {/* Content Container - 1920px Figma Design */}
      <div className="relative z-10 w-full flex items-center gap-[150px]">
        {/* Left: Logo - 325px width matches Figma */}
        <div className="flex-shrink-0">
          <a
            href="#intro"
            aria-label="SIMVEX Home"
            className="transition-opacity duration-300 hover:opacity-70"
            onClick={(e) => {
              e.preventDefault();
              window.dispatchEvent(
                new CustomEvent("navigate-to-section", { detail: "intro" })
              );
            }}
          >
            <Logo size="medium" />
          </a>
        </div>

        {/* Center: Navigation - MainNavigation at 1920px (Scaled 0.75x) */}
        <nav className="flex-1 flex items-center justify-start gap-[60px]">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => {
                e.preventDefault();
                window.dispatchEvent(
                  new CustomEvent("navigate-to-section", {
                    detail: link.href.slice(1),
                  })
                );
              }}
              className="block h-[36px] w-auto px-[8px] relative cursor-pointer"
            >
              <p
                className={`relative w-full h-full text-[30px] font-bold leading-[1.25] text-center transition-colors flex items-center justify-center whitespace-nowrap px-[8px] ${
                  link.href === `#${activeSection}`
                    ? "text-primary"
                    : "text-neutral-50 hover:text-primary"
                }`}
              >
                {link.label}
              </p>
              {link.href === `#${activeSection}` && (
                <span className="absolute bottom-[-4px] left-1/2 -translate-x-1/2 w-[60%] h-[3px] bg-primary rounded-full transition-all duration-300" />
              )}
            </a>
          ))}
        </nav>

        {/* Right: Auth Buttons (Scaled 0.75x) */}
        <div className="flex-shrink-0 flex items-center gap-[12px]">
          <Link href="/sign-in">
            <CTAButton
              variant="default"
              size="default"
              className="!w-[157.5px] !text-[24px] !rounded-[18px] !border-[3.75px] whitespace-nowrap !px-[8px]"
            >
              로그인/가입
            </CTAButton>
          </Link>
          <Link href="/viewer">
            <CTAButton
              variant="primary"
              size="default"
              className="!w-[157.5px] !text-[24px] !rounded-[18px] !border-[3.75px] whitespace-nowrap !px-[8px]"
            >
              시작하기
            </CTAButton>
          </Link>
        </div>
      </div>
    </header>
  );
}
