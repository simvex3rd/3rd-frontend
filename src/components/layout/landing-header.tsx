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
    <header className="fixed top-0 left-0 right-0 z-50 px-20 py-8 transition-all duration-300">
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

      {/* Content Container */}
      <div className="relative z-10 w-full flex items-center gap-12">
        {/* Left: Logo */}
        <div className="flex-shrink-0 w-[325px]">
          <Link href="/" aria-label="SIMVEX Home">
            <Logo size="small" />
          </Link>
        </div>

        {/* Center: Navigation */}
        <nav className="flex-1 flex items-center gap-20">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="h-12 w-[70px] flex items-center justify-center text-neutral-50 text-[40px] font-bold leading-[1.25] hover:text-primary transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right: Auth Buttons */}
        <div className="flex-shrink-0 flex items-center gap-4">
          <CTAButton variant="default" size="default" className="w-[210px]">
            로그인/가입
          </CTAButton>
          <CTAButton variant="primary" size="default" className="w-[210px]">
            시작하기
          </CTAButton>
        </div>
      </div>
    </header>
  );
}
