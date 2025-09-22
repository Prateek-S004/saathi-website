import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  // Local dev server config
  server: {
    host: "::",
    port: 5000,
    // ✅ FIX: Moved allowedHosts here to apply to the dev server
    allowedHosts: ["saathi-website.onrender.com"],
  },

  // Plugins
  plugins: [react()],

  // Path aliases
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },

  // Build output
  build: {
    outDir: "dist",
  },

  // Preview server (settings for `vite preview` command)
  preview: {
    // This setting can be removed if you're not using the preview command
    allowedHosts: ["saathi-website.onrender.com"],
  },
}));