import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

// VITE_BASE_PATH is used for GitHub Pages project sites, e.g. "/shopsphere/"
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  return {
    base: env.VITE_BASE_PATH || "/",
    plugins: [react()],
    server: { port: 5173, open: true },
    build: { outDir: "dist", sourcemap: true }
  };
});
