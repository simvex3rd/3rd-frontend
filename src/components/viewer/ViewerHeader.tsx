"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/ui/logo";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useSceneStore } from "@/stores/scene-store";
import { api } from "@/lib/api";
import type { ModelListItem } from "@/types/api";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, Check } from "lucide-react";

interface ViewerHeaderProps {
  className?: string;
  variant?: "glass" | "solid";
}

export function ViewerHeader({
  className,
  variant = "glass",
}: ViewerHeaderProps) {
  const pathname = usePathname();
  const router = useRouter();
  const modelId = useSceneStore((state) => state.modelId);
  const [models, setModels] = useState<ModelListItem[]>([]);

  useEffect(() => {
    api.models.list().then(setModels).catch(console.error);
  }, []);

  const currentModel = models.find((m) => String(m.id) === String(modelId));
  const currentModelName = currentModel?.name ?? "Select Model";

  const navItems = [
    { label: "STUDY", href: "/study" },
    { label: "CAD", href: "/viewer" },
    { label: "LAB", href: "/lab" },
  ];

  const handleModelSelect = (id: number) => {
    router.push(`/viewer?modelId=${id}`);
  };

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
        {/* Left: Logo → HOME */}
        <Link href="/" className="flex items-center gap-[17px]">
          <Logo
            size="medium"
            className="hover:scale-105 transition-transform duration-300"
          />
        </Link>

        {/* Right: Model Selector + Navigation */}
        <nav className="flex items-center gap-[80px]">
          {/* Model Selector Dropdown (replaces HOME) */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                className={cn(
                  "flex items-center gap-[8px] font-bold text-[30px] leading-[1.25] transition-colors",
                  "text-primary focus-visible:ring-[2px] focus-visible:ring-primary focus-visible:ring-offset-[2px] focus-visible:outline-none"
                )}
              >
                {currentModelName}
                <ChevronDown className="w-[20px] h-[20px] transition-transform" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              sideOffset={16}
              className="min-w-[260px] bg-neutral-800/95 backdrop-blur-sm border-neutral-700 rounded-[12px] p-[8px]"
            >
              {models.map((model) => {
                const isSelected = String(model.id) === String(modelId);
                return (
                  <DropdownMenuItem
                    key={model.id}
                    onClick={() => handleModelSelect(model.id)}
                    className={cn(
                      "flex items-center gap-[12px] px-[12px] py-[10px] rounded-[8px] cursor-pointer transition-colors",
                      isSelected
                        ? "text-primary bg-primary/10"
                        : "text-neutral-200 hover:text-neutral-50"
                    )}
                  >
                    <span className="text-[16px] font-medium">
                      {model.name}
                    </span>
                    {isSelected && (
                      <Check className="w-[16px] h-[16px] ml-auto text-primary" />
                    )}
                  </DropdownMenuItem>
                );
              })}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Nav Items */}
          {navItems.map((item) => {
            const isActive =
              item.href === "/viewer"
                ? pathname === "/viewer"
                : pathname.startsWith(item.href);

            return (
              <Link
                key={item.label}
                href={item.href}
                className={cn(
                  "relative font-bold text-[30px] leading-[1.25] transition-colors focus-visible:ring-[2px] focus-visible:ring-primary focus-visible:ring-offset-[2px] focus-visible:outline-none",
                  isActive
                    ? "text-primary font-semibold"
                    : "text-neutral-50 hover:text-primary/80"
                )}
              >
                {item.label}
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
