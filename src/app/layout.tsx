import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SIMVEX - 3D Simulation Platform",
  description:
    "High-performance 3D simulation and visualization platform built with React Three Fiber and Next.js",
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
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
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
          colorPrimary: "#3b82f6", // Blue-500
          colorBackground: "#0a0a0a", // Background color
          colorInputBackground: "#18181b", // Zinc-900
          colorInputText: "#ffffff",
        },
      }}
    >
      {content}
    </ClerkProvider>
  );
}
