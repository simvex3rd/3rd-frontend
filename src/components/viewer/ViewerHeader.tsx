"use client";

import { cn } from "@/lib/utils";
import { Logo } from "@/components/ui/logo";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface ViewerHeaderProps {
  className?: string;
}

export function ViewerHeader({ className }: ViewerHeaderProps) {
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
        "w-full h-[102px] px-[80px] flex items-center justify-between z-50 absolute top-0 left-0",
        className
      )}
    >
      {/* Left: Logo */}
      <div className="flex items-center gap-[17px]">
        <Logo size="medium" />
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
                "font-bold text-[30px] leading-[1.25] transition-colors",
                // Active: Primary Teal (#02eee1), Inactive: White (#fafafa)
                isActive
                  ? "text-primary"
                  : "text-neutral-50 hover:text-primary/80"
              )}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>
    </header>
  );
}
