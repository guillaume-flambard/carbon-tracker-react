import { crx } from "@crxjs/vite-plugin";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import manifest from "./manifest.json";

export default defineConfig({
  plugins: [react(), crx({ manifest }), tsconfigPaths()],
  resolve: {
    alias: {
      "@": new URL("/", import.meta.url).pathname,
    },
  },
  build: {
    // background.ts to background.js
    rollupOptions: {
      input: {
        background: "src/background/background.ts",
      },
      output: {
        entryFileNames: "[name].js",
      },
    },
  },
});
