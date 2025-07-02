import { defineConfig } from "vite";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(() => ({
  server: {
    host: "::",
    port: 8080,
  },
  root: path.resolve(__dirname, "./leirisonda-deploy"),
  build: {
    outDir: "../dist/spa",
  },
  plugins: [],
  publicDir: false,
}));
