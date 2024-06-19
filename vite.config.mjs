import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  test: {
    environment: "jsdom",
    setupFiles: "./setupTests.ts",
    globals: true,
    reporters: ["verbose"],
    coverage: {
      provider: "v8",
      reporter: ["text", "json", "html", "lcov"],
      all: true,
      include: ["src/**/*.{js,jsx,ts,tsx}"],
      exclude: ["node_modules", "dist", "src/__mocks__", "src/app"],
      clean: true,
      reportOnFailure: true,
      thresholds: {
        lines: 70,
        functions: 70,
        branches: 70,
        statements: 70,
      },
    },
  },
});
