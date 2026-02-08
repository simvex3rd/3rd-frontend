import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */

  // Force webpack bundler (Turbopack has CSS parsing issues with Tailwind v4)
  // Turbopack's strict CSS parser can't handle var(--spacing/N,Npx) syntax
  // See: https://github.com/vercel/next.js/issues/73983
  webpack: (config) => {
    return config;
  },
};

export default nextConfig;
