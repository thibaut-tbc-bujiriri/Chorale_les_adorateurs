import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";
import { fileURLToPath, URL } from "node:url";

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      injectRegister: "auto",
      includeAssets: ["favicon.svg", "icons.svg", "logo_Chorale.jpeg"],
      manifest: {
        name: "Les adorateurs",
        short_name: "Les adorateurs",
        description: "Application chorale installable pour Les adorateurs.",
        theme_color: "#357352",
        background_color: "#f8fafc",
        display: "standalone",
        orientation: "portrait",
        start_url: "/",
        scope: "/",
        lang: "fr",
        icons: [
          {
            src: "/logo_Chorale.jpeg",
            sizes: "192x192",
            type: "image/jpeg",
            purpose: "any",
          },
          {
            src: "/logo_Chorale.jpeg",
            sizes: "512x512",
            type: "image/jpeg",
            purpose: "any maskable",
          },
        ],
      },
      workbox: {
        cleanupOutdatedCaches: true,
        clientsClaim: true,
        skipWaiting: true,
        globPatterns: ["**/*.{js,css,html,svg,png,jpg,jpeg,woff2}"],
      },
      devOptions: {
        enabled: false,
      },
    }),
  ],
  envPrefix: ["VITE_", "NEXT_PUBLIC_"],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});

