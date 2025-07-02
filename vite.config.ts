import { defineConfig } from "vite";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(() => ({
  server: {
    host: "::",
    port: 8080,
    middlewareMode: false,
  },
  root: "./leirisonda-deploy",
  build: {
    outDir: "../dist/spa",
  },
  plugins: [],
  publicDir: false,
}));
