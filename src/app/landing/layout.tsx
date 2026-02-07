import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "SIMVEX - 시뮬레이션으로 미래를 설계하다",
  description:
    "SIMVEX는 3D 시뮬레이션 기반 학습 플랫폼입니다. 실시간 3D 환경에서 직관적인 학습 경험을 제공합니다.",
  keywords: [
    "3D 시뮬레이션",
    "학습 플랫폼",
    "과학 실험",
    "가상 실험",
    "AI 학습",
  ],
  authors: [{ name: "SIMVEX Team" }],
  openGraph: {
    title: "SIMVEX - 시뮬레이션으로 미래를 설계하다",
    description:
      "3D 시뮬레이션 기반 학습 플랫폼으로 안전한 가상 환경에서 다양한 실험을 수행하세요.",
    type: "website",
    locale: "ko_KR",
  },
  twitter: {
    card: "summary_large_image",
    title: "SIMVEX - 시뮬레이션으로 미래를 설계하다",
    description: "3D 시뮬레이션 기반 학습 플랫폼",
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function LandingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
