import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [tsconfigPaths(), react()],
  // Next.js inlines these at build time; next/image reads them in the browser.
  define: {
    "process.env.__NEXT_IMAGE_OPTS": "undefined",
    "process.env.NEXT_DEPLOYMENT_ID": "undefined",
  },
  test: {
    dir: "./tests/vitest",
    browser: {
      provider: "playwright",
      enabled: true,
      headless: true,
      instances: [{ browser: "chromium" }],
    },
    testTimeout: 1000 * 60,
    setupFiles: "./tests/vitest/setup.ts",
    coverage: {
      reportsDirectory: "./reports/coverage",
      provider: "istanbul",
    },
  },
});
