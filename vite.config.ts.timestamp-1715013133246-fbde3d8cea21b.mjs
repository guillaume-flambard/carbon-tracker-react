// vite.config.ts
import { crx } from "file:///Users/memo/projects/carbon-tracker-react/node_modules/.pnpm/@crxjs+vite-plugin@2.0.0-beta.23/node_modules/@crxjs/vite-plugin/dist/index.mjs";
import react from "file:///Users/memo/projects/carbon-tracker-react/node_modules/.pnpm/@vitejs+plugin-react@4.2.1_vite@5.2.11/node_modules/@vitejs/plugin-react/dist/index.mjs";
import { defineConfig } from "file:///Users/memo/projects/carbon-tracker-react/node_modules/.pnpm/vite@5.2.11/node_modules/vite/dist/node/index.js";
import tsconfigPaths from "file:///Users/memo/projects/carbon-tracker-react/node_modules/.pnpm/vite-tsconfig-paths@4.3.2_typescript@5.4.5_vite@5.2.11/node_modules/vite-tsconfig-paths/dist/index.mjs";

// manifest.json
var manifest_default = {
  manifest_version: 3,
  name: "carbon tracker react",
  version: "1.0.0",
  action: { default_popup: "index.html" },
  permissions: [
    "storage",
    "tabs",
    "activeTab",
    "webNavigation",
    "webRequest"
  ],
  host_permissions: ["<all_urls>"],
  icons: {
    "16": "logo.png",
    "32": "logo.png",
    "48": "logo.png",
    "128": "logo.png"
  },
  background: {
    service_worker: "./src/background/background.ts",
    persistent: true
  },
  content_security_policy: {
    extension_pages: "script-src 'self'; object-src 'self';",
    sandbox: "sandbox allow-scripts allow-forms allow-popups allow-modals; script-src 'self' 'unsafe-inline' 'unsafe-eval'; child-src 'self';"
  }
};

// vite.config.ts
var __vite_injected_original_import_meta_url = "file:///Users/memo/projects/carbon-tracker-react/vite.config.ts";
var vite_config_default = defineConfig({
  plugins: [react(), crx({ manifest: manifest_default }), tsconfigPaths()],
  resolve: {
    alias: {
      "@": new URL("/", __vite_injected_original_import_meta_url).pathname
    }
  },
  build: {
    // background.ts to background.js
    rollupOptions: {
      input: {
        background: "src/background/background.ts"
      },
      output: {
        entryFileNames: "[name].js"
      }
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiLCAibWFuaWZlc3QuanNvbiJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIi9Vc2Vycy9tZW1vL3Byb2plY3RzL2NhcmJvbi10cmFja2VyLXJlYWN0XCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvVXNlcnMvbWVtby9wcm9qZWN0cy9jYXJib24tdHJhY2tlci1yZWFjdC92aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vVXNlcnMvbWVtby9wcm9qZWN0cy9jYXJib24tdHJhY2tlci1yZWFjdC92aXRlLmNvbmZpZy50c1wiO2ltcG9ydCB7IGNyeCB9IGZyb20gXCJAY3J4anMvdml0ZS1wbHVnaW5cIjtcbmltcG9ydCByZWFjdCBmcm9tIFwiQHZpdGVqcy9wbHVnaW4tcmVhY3RcIjtcbmltcG9ydCB7IGRlZmluZUNvbmZpZyB9IGZyb20gXCJ2aXRlXCI7XG5pbXBvcnQgdHNjb25maWdQYXRocyBmcm9tIFwidml0ZS10c2NvbmZpZy1wYXRoc1wiO1xuaW1wb3J0IG1hbmlmZXN0IGZyb20gXCIuL21hbmlmZXN0Lmpzb25cIjtcblxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcbiAgcGx1Z2luczogW3JlYWN0KCksIGNyeCh7IG1hbmlmZXN0IH0pLCB0c2NvbmZpZ1BhdGhzKCldLFxuICByZXNvbHZlOiB7XG4gICAgYWxpYXM6IHtcbiAgICAgIFwiQFwiOiBuZXcgVVJMKFwiL1wiLCBpbXBvcnQubWV0YS51cmwpLnBhdGhuYW1lLFxuICAgIH0sXG4gIH0sXG4gIGJ1aWxkOiB7XG4gICAgLy8gYmFja2dyb3VuZC50cyB0byBiYWNrZ3JvdW5kLmpzXG4gICAgcm9sbHVwT3B0aW9uczoge1xuICAgICAgaW5wdXQ6IHtcbiAgICAgICAgYmFja2dyb3VuZDogXCJzcmMvYmFja2dyb3VuZC9iYWNrZ3JvdW5kLnRzXCIsXG4gICAgICB9LFxuICAgICAgb3V0cHV0OiB7XG4gICAgICAgIGVudHJ5RmlsZU5hbWVzOiBcIltuYW1lXS5qc1wiLFxuICAgICAgfSxcbiAgICB9LFxuICB9LFxufSk7XG4iLCAie1xuICBcIm1hbmlmZXN0X3ZlcnNpb25cIjogMyxcbiAgXCJuYW1lXCI6IFwiY2FyYm9uIHRyYWNrZXIgcmVhY3RcIixcbiAgXCJ2ZXJzaW9uXCI6IFwiMS4wLjBcIixcbiAgXCJhY3Rpb25cIjogeyBcImRlZmF1bHRfcG9wdXBcIjogXCJpbmRleC5odG1sXCIgfSxcbiAgXCJwZXJtaXNzaW9uc1wiOiBbXG4gICAgXCJzdG9yYWdlXCIsXG4gICAgXCJ0YWJzXCIsXG4gICAgXCJhY3RpdmVUYWJcIixcbiAgICBcIndlYk5hdmlnYXRpb25cIixcbiAgICBcIndlYlJlcXVlc3RcIlxuICBdLFxuICBcImhvc3RfcGVybWlzc2lvbnNcIjogW1wiPGFsbF91cmxzPlwiXSxcbiAgXCJpY29uc1wiOiB7XG4gICAgXCIxNlwiOiBcImxvZ28ucG5nXCIsXG4gICAgXCIzMlwiOiBcImxvZ28ucG5nXCIsXG4gICAgXCI0OFwiOiBcImxvZ28ucG5nXCIsXG4gICAgXCIxMjhcIjogXCJsb2dvLnBuZ1wiXG4gIH0sXG4gIFwiYmFja2dyb3VuZFwiOiB7XG4gICAgXCJzZXJ2aWNlX3dvcmtlclwiOiBcIi4vc3JjL2JhY2tncm91bmQvYmFja2dyb3VuZC50c1wiLFxuICAgIFwicGVyc2lzdGVudFwiOiB0cnVlXG4gIH0sXG4gIFwiY29udGVudF9zZWN1cml0eV9wb2xpY3lcIjoge1xuICAgIFwiZXh0ZW5zaW9uX3BhZ2VzXCI6IFwic2NyaXB0LXNyYyAnc2VsZic7IG9iamVjdC1zcmMgJ3NlbGYnO1wiLFxuICAgIFwic2FuZGJveFwiOiBcInNhbmRib3ggYWxsb3ctc2NyaXB0cyBhbGxvdy1mb3JtcyBhbGxvdy1wb3B1cHMgYWxsb3ctbW9kYWxzOyBzY3JpcHQtc3JjICdzZWxmJyAndW5zYWZlLWlubGluZScgJ3Vuc2FmZS1ldmFsJzsgY2hpbGQtc3JjICdzZWxmJztcIlxuICB9XG59XG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQTZTLFNBQVMsV0FBVztBQUNqVSxPQUFPLFdBQVc7QUFDbEIsU0FBUyxvQkFBb0I7QUFDN0IsT0FBTyxtQkFBbUI7OztBQ0gxQjtBQUFBLEVBQ0Usa0JBQW9CO0FBQUEsRUFDcEIsTUFBUTtBQUFBLEVBQ1IsU0FBVztBQUFBLEVBQ1gsUUFBVSxFQUFFLGVBQWlCLGFBQWE7QUFBQSxFQUMxQyxhQUFlO0FBQUEsSUFDYjtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxFQUNGO0FBQUEsRUFDQSxrQkFBb0IsQ0FBQyxZQUFZO0FBQUEsRUFDakMsT0FBUztBQUFBLElBQ1AsTUFBTTtBQUFBLElBQ04sTUFBTTtBQUFBLElBQ04sTUFBTTtBQUFBLElBQ04sT0FBTztBQUFBLEVBQ1Q7QUFBQSxFQUNBLFlBQWM7QUFBQSxJQUNaLGdCQUFrQjtBQUFBLElBQ2xCLFlBQWM7QUFBQSxFQUNoQjtBQUFBLEVBQ0EseUJBQTJCO0FBQUEsSUFDekIsaUJBQW1CO0FBQUEsSUFDbkIsU0FBVztBQUFBLEVBQ2I7QUFDRjs7O0FEM0IwTCxJQUFNLDJDQUEyQztBQU0zTyxJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUMxQixTQUFTLENBQUMsTUFBTSxHQUFHLElBQUksRUFBRSwyQkFBUyxDQUFDLEdBQUcsY0FBYyxDQUFDO0FBQUEsRUFDckQsU0FBUztBQUFBLElBQ1AsT0FBTztBQUFBLE1BQ0wsS0FBSyxJQUFJLElBQUksS0FBSyx3Q0FBZSxFQUFFO0FBQUEsSUFDckM7QUFBQSxFQUNGO0FBQUEsRUFDQSxPQUFPO0FBQUE7QUFBQSxJQUVMLGVBQWU7QUFBQSxNQUNiLE9BQU87QUFBQSxRQUNMLFlBQVk7QUFBQSxNQUNkO0FBQUEsTUFDQSxRQUFRO0FBQUEsUUFDTixnQkFBZ0I7QUFBQSxNQUNsQjtBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBQ0YsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
