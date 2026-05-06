import { defineConfig } from "vite";

export default defineConfig({
  server: {
    port: 3000,
    proxy: {
      "/supabase": {
        target: "https://supa-purple.compostela.cloud",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/supabase/, "")
      }
    }
  }
});