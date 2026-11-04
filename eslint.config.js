import { defineConfig } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
// @ts-expect-error -- eslint-plugin-drizzle ships no type declarations
import drizzle from "eslint-plugin-drizzle";
import tseslint from "typescript-eslint";

export default defineConfig(
  {
    ignores: [
      ".next/**",
      "out/**",
      "build/**",
      "reports/**",
      "playwright-report/**",
      "test-results/**",
      "next-env.d.ts",
      ".dependency-cruiser.cjs",
    ],
  },
  ...nextVitals,
  ...tseslint.configs.strictTypeChecked,
  ...tseslint.configs.stylisticTypeChecked,
  {
    plugins: { drizzle },
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  {
    // eslint-plugin-drizzle ships no types, so its import is untyped here.
    files: ["eslint.config.js"],
    extends: [tseslint.configs.disableTypeChecked],
  },
);
