import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Disable StrictMode — R3F v9 Canvas initialization conflicts with
  // React 19's double-render in StrictMode (dev-only issue)
  reactStrictMode: false,

  // Force webpack bundler (Turbopack has CSS parsing issues with Tailwind v4)
  // Turbopack's strict CSS parser can't handle var(--spacing/N,Npx) syntax
  // See: https://github.com/vercel/next.js/issues/73983
  webpack: (config) => {
    return config;
  },
};

export default nextConfig;
