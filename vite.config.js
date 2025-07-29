import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    outDir: 'dist',
  },
  server: {
    // This setting allows Vite dev server to serve index.html for unknown routes (during local dev)
    fs: {
      allow: ['.'],
    },
    historyApiFallback: true, // 👈 Fallback for client-side routing
  }
});
