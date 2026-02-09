// For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format
import storybook from "eslint-plugin-storybook";

import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import reactHooks from "eslint-plugin-react-hooks";
import tseslint from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import prettier from "eslint-config-prettier";

const eslintConfig = defineConfig([...nextVitals, ...nextTs, // Global ignores
globalIgnores([
  ".next/**",
  "out/**",
  "build/**",
  "dist/**",
  "node_modules/**",
  "next-env.d.ts",
  ".storybook/**",
  "storybook-static/**",
  "public/draco/**", // External third-party library (compiled)
  ".sisyphus/**",
]), // TypeScript configuration
{
  files: ["**/*.ts", "**/*.tsx"],
  languageOptions: {
    parser: tsParser,
    parserOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      ecmaFeatures: {
        jsx: true,
      },
    },
  },
  plugins: {
    "@typescript-eslint": tseslint,
    "react-hooks": reactHooks,
  },
  rules: {
    // TypeScript rules
    "@typescript-eslint/no-unused-vars": ["warn", {
      argsIgnorePattern: "^_",
      varsIgnorePattern: "^_"
    }],
    "@typescript-eslint/no-explicit-any": "warn",

    // React Hooks rules
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": ["warn", {
      additionalHooks: "(useFrame|useThree)"
    }],
    // Allow setState in effects for data-fetching hooks
    "react-hooks/set-state-in-effect": "off",

    // Accessibility rules
    "jsx-a11y/alt-text": "warn",
    "jsx-a11y/anchor-is-valid": "warn",
    "jsx-a11y/click-events-have-key-events": "warn",
    "jsx-a11y/no-static-element-interactions": "warn",
  },
}, // Prettier must be last to override formatting rules
prettier, ...storybook.configs["flat/recommended"]]);

export default eslintConfig;
