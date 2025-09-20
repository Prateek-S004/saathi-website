import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  // Local development server configuration
  server: {
    host: "::", // allows access from local network
    port: 8080,  // local dev port
  },

  // Plugins
  plugins: [react()],

  // Path aliases
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"), // allows import "@/components/..." etc.
    },
  },

  // Preview server (used for production build preview / Render)
  preview: {
    // Allow the Render domain to access the preview server
    allowedHosts: ["saathi-website.onrender.com"],
  },
}));
