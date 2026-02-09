import type { Metadata } from "next";
import { Geist_Mono } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { Analytics } from "@vercel/analytics/react";
import { AuthInit } from "@/components/common/AuthInit";
import "./globals.css";

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://simvex-3rd.vercel.app"),
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
  creator: "SIMVEX",
  publisher: "SIMVEX",
  manifest: "/manifest.json",
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }],
  },
  openGraph: {
    title: "SIMVEX - 시뮬레이션으로 미래를 설계하다",
    description:
      "3D 시뮬레이션 기반 학습 플랫폼으로 안전한 가상 환경에서 다양한 실험을 수행하세요.",
    url: "https://simvex-3rd.vercel.app",
    siteName: "SIMVEX",
    locale: "ko_KR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SIMVEX - 시뮬레이션으로 미래를 설계하다",
    description: "3D 시뮬레이션 기반 학습 플랫폼",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

/**
 * Root layout with conditional Clerk authentication provider
 *
 * Clerk is only initialized when valid API keys are present in environment variables.
 * This allows the app to work without authentication in development when keys are
 * not yet configured (placeholder values like "your_" are detected and skipped).
 *
 * @param children - React children to render
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Check if Clerk keys are valid (not placeholders)
  const hasClerkKeys =
    process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY &&
    !process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY.includes("your_");

  const content = (
    <html lang="ko">
      <head>
        <link
          rel="stylesheet"
          as="style"
          crossOrigin="anonymous"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css"
        />
      </head>
      <body className={`${geistMono.variable} antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  );

  // If no valid Clerk keys, render without authentication
  if (!hasClerkKeys) {
    return content;
  }

  // Wrap with ClerkProvider when keys are available
  return (
    <ClerkProvider
      appearance={{
        baseTheme: dark,
        variables: {
          colorPrimary: "#3b82f6", // 파란색-500
          colorBackground: "#0a0a0a", // 배경색
          colorInputBackground: "#18181b", // Zinc-900
          colorInputText: "#ffffff",
        },
      }}
    >
      <AuthInit />
      {content}
    </ClerkProvider>
  );
}
