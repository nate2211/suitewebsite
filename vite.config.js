import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  publicDir: "public",
  server: {
    host: true,
    port: 3000,
  },
  preview: {
    host: true,
    port: 4173,
  },
  build: {
    outDir: "dist",
    emptyOutDir: true,
    target: "es2020",
    cssCodeSplit: true,
    sourcemap: false,
    chunkSizeWarningLimit: 2600,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes("node_modules")) return undefined;
          if (id.includes("@ffmpeg")) return "media-conversion";
          if (id.includes("pdfjs-dist")) return "pdf-renderer";
          if (id.includes("pdf-lib")) return "pdf-writer";
          if (id.includes("jszip")) return "archive-tools";
          if (id.includes("heic-to")) return "image-conversion";
          if (id.includes("@mui") || id.includes("@emotion")) return "ui-vendor";
          if (/node_modules\/(react|react-dom|react-router|react-router-dom|react-helmet-async|scheduler)\//.test(id)) return "react-core";
          return undefined;
        },
      },
    },
  },
  define: {
    global: "globalThis",
  },
});
