import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import {VitePWA} from 'vite-plugin-pwa'
import tailwindcss from "@tailwindcss/vite"

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: 'autoUpdate', // actualiza el service worker automáticamente
      includeAssets: ['vite.svg', 'react.svg'],
      workbox: {
        navigateFallback: '/index.html',
        globPatterns: ['**/*.{js,css,html,ico,png,svg,jpg}']
      },
      manifest: {
        name: 'TidyTag',
        short_name: 'TidyTag',
        description: 'PWA para gestión de inventario rápido y sin errores',
        theme_color: '#2563eb',
        background_color: '#ffffff',
        lang: 'es',
        display: 'standalone',
        orientation: 'portrait',
        start_url: '/',
        icons: [{
            src: '/tidytag.png',
            sizes: '192x192',
            type: 'image/png'
          }]
      }
    })
  ],
})
