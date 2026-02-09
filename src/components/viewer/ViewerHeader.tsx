"use client";

import { cn } from "@/lib/utils";
import { Logo } from "@/components/ui/logo";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface ViewerHeaderProps {
  className?: string;
  variant?: "glass" | "solid";
}

export function ViewerHeader({
  className,
  variant = "glass",
}: ViewerHeaderProps) {
  const pathname = usePathname();

  const navItems = [
    { label: "HOME", href: "/" },
    { label: "STUDY", href: "/study" }, // Assumed href
    { label: "CAD", href: "/viewer" },
    { label: "LAB", href: "/lab" }, // Assumed href
  ];

  return (
    <header
      className={cn(
        "w-full h-[102px] px-[80px] flex items-center justify-between z-50 fixed top-0 left-0 right-0",
        variant === "solid" ? "bg-neutral-900" : "",
        className
      )}
    >
      {/* Glass Effect Background */}
      {variant === "glass" && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute inset-0 bg-white/5 backdrop-blur-[2px]" />
        </div>
      )}

      {/* Content */}
      <div className="relative z-10 w-full flex items-center justify-between">
        {/* Left: Logo */}
        <div className="flex items-center gap-[17px]">
          <Logo
            size="medium"
            className="hover:scale-105 transition-transform duration-300"
          />
        </div>

        {/* Right: Navigation */}
        <nav className="flex items-center gap-[80px]">
          {navItems.map((item) => {
            const isActive =
              item.href === "/viewer"
                ? item.label === "CAD"
                : pathname === item.href;
            // Simple active check for CAD since we are on viewer page
            // Actually, if we are at /viewer, clicking HOME goes to /.

            return (
              <Link
                key={item.label}
                href={item.href}
                className={cn(
                  "relative font-bold text-[30px] leading-[1.25] transition-colors focus-visible:ring-[2px] focus-visible:ring-primary focus-visible:ring-offset-[2px] focus-visible:outline-none",
                  // Active: Primary Teal (#02eee1) + visible underline, Inactive: White (#fafafa)
                  isActive
                    ? "text-primary font-semibold"
                    : "text-neutral-50 hover:text-primary/80"
                )}
              >
                {item.label}
                {/* Underline animation: slides in from left on hover/active */}
                <span
                  className={cn(
                    "absolute left-0 bottom-[-8px] h-[2px] bg-primary transition-all duration-300",
                    isActive ? "w-full" : "w-0"
                  )}
                  style={{
                    width: isActive ? "100%" : "0%",
                  }}
                />
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
