import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  // Local dev server config
  server: {
    host: "::",
    port: 8080,
  },

  // Plugins
  plugins: [react()],

  // Path aliases
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },

  // Build output (Vercel will serve this)
  build: {
    outDir: "dist", // default for Vercel
  },

  // Preview server (local preview after build)
  preview: {
    allowedHosts: ["saathi-website.onrender.com"],
  },
}));
