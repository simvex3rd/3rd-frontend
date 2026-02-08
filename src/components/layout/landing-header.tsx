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
    <header className="fixed top-0 left-0 right-0 z-50 h-[136px] px-[80px] transition-all duration-300">
      {/* Background with Glow Effect */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Subtle dark backdrop */}
        <div className="absolute inset-0 bg-[#000000]/1 backdrop-blur-[2px]" />
        {/* Top Center Glow (Teal) */}
        <div
          className="absolute top-[-50%] left-1/2 -translate-x-1/2 w-[60%] h-[200%] rounded-full blur-[80px] opacity-40"
          style={{
            background:
              "radial-gradient(circle, rgba(2,238,225,1) 0%, transparent 70%)",
          }}
        />
      </div>

      {/* Content Container */}
      <div className="relative z-10 w-full h-full flex items-center justify-between">
        {/* Left: Logo */}
        <div className="flex-shrink-0">
          <Link href="/" aria-label="SIMVEX Home">
            <Logo size="small" />
          </Link>
        </div>

        {/* Center: Navigation - Positioned Absolutely to ensure true center */}
        <nav className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 hidden md:flex items-center gap-[48px]">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className={cn(
                "text-[#FAFAFA]/60 text-[15px] font-medium hover:text-[#02eee1] transition-colors"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right: Auth Buttons */}
        <div className="flex-shrink-0 flex items-center gap-4">
          <CTAButton
            variant="default"
            size="compact"
            className="bg-white/5 border-white/10 text-[#FAFAFA] hover:bg-white/10 text-[14px] font-medium h-[40px] px-6 rounded-full"
          >
            로그인 / 가입
          </CTAButton>
          <CTAButton
            variant="primary"
            size="compact"
            className="h-[40px] px-6 text-[14px] font-bold rounded-full shadow-[0_0_12px_rgba(2,238,225,0.25)] border border-[#02eee1]/30"
          >
            시작하기
          </CTAButton>
        </div>
      </div>
    </header>
  );
}
