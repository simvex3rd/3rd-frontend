import type { Metadata } from "next";
import { Geist_Mono } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SIMVEX - 공학 학습용 3D 기계 부품 뷰어",
  description:
    "3D 시각화를 통한 직관적인 기계 구조 학습 플랫폼. 웹 기반 3D 뷰어로 복잡한 기계 부품의 구조를 쉽게 이해하고 학습할 수 있습니다.",
  keywords: [
    "3D 뷰어",
    "기계 부품",
    "공학 교육",
    "3D 시각화",
    "CAD 뷰어",
    "기계 학습",
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
    title: "SIMVEX - 공학 학습용 3D 기계 부품 뷰어",
    description: "3D 시각화를 통한 직관적인 기계 구조 학습 플랫폼",
    url: "https://simvex-3rd.vercel.app",
    siteName: "SIMVEX",
    locale: "ko_KR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SIMVEX - 공학 학습용 3D 기계 부품 뷰어",
    description: "3D 시각화를 통한 직관적인 기계 구조 학습 플랫폼",
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
  verification: {
    google: "google-site-verification-placeholder",
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
      {content}
    </ClerkProvider>
  );
}
