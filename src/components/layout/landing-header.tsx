"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/ui/logo";
import { CTAButton } from "@/components/ui/cta-button";

const navLinks = [
  { label: "소개", href: "#intro" },
  { label: "기능", href: "#functions" },
  { label: "학습 모델", href: "#models" },
  { label: "문의", href: "#footer" },
];

export function LandingHeader() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-20 h-[102px] flex items-center transition-all duration-300">
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
          <Link href="/" aria-label="SIMVEX Home">
            <Logo size="medium" />
          </Link>
        </div>

        {/* Center: Navigation - MainNavigation at 1920px (Scaled 0.75x) */}
        <nav className="flex-1 flex items-center justify-start gap-[60px]">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="block h-[36px] w-auto px-2 relative cursor-pointer"
            >
              <p className="relative w-full h-full text-neutral-50 text-[30px] font-bold leading-[1.25] text-center hover:text-primary transition-colors flex items-center justify-center whitespace-nowrap px-2">
                {link.label}
              </p>
            </Link>
          ))}
        </nav>

        {/* Right: Auth Buttons (Scaled 0.75x) */}
        <div className="flex-shrink-0 flex items-center gap-[12px]">
          <CTAButton
            variant="default"
            size="default"
            className="!w-[157.5px] !text-[24px] !rounded-[18px] !border-[3.75px] whitespace-nowrap !px-2"
          >
            로그인/가입
          </CTAButton>
          <CTAButton
            variant="primary"
            size="default"
            className="!w-[157.5px] !text-[24px] !rounded-[18px] !border-[3.75px] whitespace-nowrap !px-2"
          >
            시작하기
          </CTAButton>
        </div>
      </div>
    </header>
  );
}
