import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import legacy from "@vitejs/plugin-legacy";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    legacy({
      targets: [
        "iOS >= 10",
        "Android >= 5",
        "Chrome >= 49",
        "Firefox >= 45",
        "Safari >= 10",
        "Edge >= 12",
        "> 1%",
        "not dead",
      ],
      additionalLegacyPolyfills: ["regenerator-runtime/runtime"],
      renderLegacyChunks: true,
      modernPolyfills: [
        "es.promise.finally",
        "es.global-this",
        "es.array.flat",
        "es.array.flat-map",
      ],
      polyfills: [
        "es.symbol",
        "es.array.filter",
        "es.array.for-each",
        "es.array.includes",
        "es.array.map",
        "es.promise",
        "es.promise.finally",
        "es/map",
        "es/set",
        "es.object.assign",
        "es.object.define-properties",
        "es.object.define-property",
        "es.object.keys",
        "es.object.values",
        "es.object.entries",
        "web.dom-collections.for-each",
        "web.url",
      ],
    }),
  ],
  build: {
    target: ["es2017", "chrome49", "firefox45", "safari10", "edge12"],
    cssTarget: ["chrome49", "firefox45", "safari10"],
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ["react", "react-dom"],
          router: ["react-router-dom"],
          mui: ["@mui/material", "@mui/icons-material"],
        },
      },
    },
    // Optimize for mobile performance
    chunkSizeWarningLimit: 1000,
    minify: "terser",
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
  },
  esbuild: {
    target: "es2017",
  },
});
