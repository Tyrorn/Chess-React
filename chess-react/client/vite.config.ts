import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      // Handles standard API traffic
      "/api": {
        target: "http://localhost:3000",
        changeOrigin: true,
      },
      // Handles real-time WebSocket upgrading handshakes
      "/game-ws": {
        target: "http://localhost:3000", // Note: target must use http/https protocol here, NOT ws://
        ws: true,
        changeOrigin: true,
      },
    },
  },
});
