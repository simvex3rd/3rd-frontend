/**
 * Environment variable validation
 *
 * Validates environment variables at startup using Zod.
 * In development, allows placeholder values for easier setup.
 * In production, requires valid values.
 */

import { z } from "zod";

const isDevelopment = process.env.NODE_ENV !== "production";

/**
 * Environment variable schema (production mode)
 *
 * Requires valid Clerk keys (no placeholders).
 */
const productionEnvSchema = z.object({
  // Clerk Authentication (Public)
  NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: z
    .string()
    .min(1, "Clerk publishable key is required")
    .refine(
      (val) => !val.includes("your_"),
      "Clerk publishable key must be a valid key (not placeholder)"
    ),

  // Clerk Authentication (Server)
  CLERK_SECRET_KEY: z
    .string()
    .min(1, "Clerk secret key is required")
    .refine(
      (val) => !val.includes("your_"),
      "Clerk secret key must be a valid key (not placeholder)"
    ),

  // Clerk URLs (Optional, with defaults)
  NEXT_PUBLIC_CLERK_SIGN_IN_URL: z.string().default("/sign-in"),
  NEXT_PUBLIC_CLERK_SIGN_UP_URL: z.string().default("/sign-up"),
  NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL: z.string().default("/"),
  NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL: z.string().default("/"),

  // Next.js
  NODE_ENV: z.enum(["development", "production", "test"]),
});

/**
 * Environment variable schema (development mode)
 *
 * Allows placeholder values for easier local setup.
 */
const developmentEnvSchema = z.object({
  // Clerk Authentication (Public) - optional in dev
  NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: z.string().optional(),

  // Clerk Authentication (Server) - optional in dev
  CLERK_SECRET_KEY: z.string().optional(),

  // Clerk URLs (Optional, with defaults)
  NEXT_PUBLIC_CLERK_SIGN_IN_URL: z.string().default("/sign-in"),
  NEXT_PUBLIC_CLERK_SIGN_UP_URL: z.string().default("/sign-up"),
  NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL: z.string().default("/"),
  NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL: z.string().default("/"),

  // Next.js
  NODE_ENV: z.enum(["development", "production", "test"]),
});

const envSchema = isDevelopment ? developmentEnvSchema : productionEnvSchema;

/**
 * Parse and validate environment variables
 *
 * Runs at module load time. In production, throws if validation fails.
 * In development, allows missing/placeholder values.
 */
const result = envSchema.safeParse({
  NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY:
    process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
  CLERK_SECRET_KEY: process.env.CLERK_SECRET_KEY,
  NEXT_PUBLIC_CLERK_SIGN_IN_URL: process.env.NEXT_PUBLIC_CLERK_SIGN_IN_URL,
  NEXT_PUBLIC_CLERK_SIGN_UP_URL: process.env.NEXT_PUBLIC_CLERK_SIGN_UP_URL,
  NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL:
    process.env.NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL,
  NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL:
    process.env.NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL,
  NODE_ENV: process.env.NODE_ENV,
});

if (!result.success) {
  console.error("❌ Invalid environment variables:");
  console.error(result.error.flatten().fieldErrors);
  throw new Error("Invalid environment variables");
}

export const env = result.data;

/**
 * Type-safe environment variables
 *
 * @example
 * ```ts
 * import { env } from '@/lib/env';
 * console.log(env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY);
 * ```
 */
export type Env = z.infer<typeof envSchema>;

/**
 * Check if Clerk is configured with valid keys
 *
 * @returns true if Clerk keys are present and not placeholders
 */
export function hasValidClerkKeys(): boolean {
  const key = env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;
  return !!key && !key.includes("your_");
}
