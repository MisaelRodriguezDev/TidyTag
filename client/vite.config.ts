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
        globPatterns: ['**/*.{js,css,html,ico,png,svg,jpg}'],
        runtimeCaching: [
          //CACHE-FIRST para recursos estáticos (CSS, imágenes)
          {
            urlPattern: /\.(css|png|jpg|jpeg|svg|gif)$/,
            handler: "CacheFirst",
            options: {
              cacheName: "static-assets",
              expiration: {
                maxEntries: 20,
                maxAgeSeconds: 60 * 60 * 24 * 30, // 30 días
              },
              cacheableResponse: {
                statuses: [0, 200]
              }
            },
          },
          
          // NETWORK-FIRST para API's
          {
            urlPattern: /^https:\/\/world\.openfoodfacts\.org\/api\/v2\/product\/.*\.json$/i,
            handler: "NetworkFirst",
            options: {
              cacheName: "api-data",
              networkTimeoutSeconds: 3,
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 60 * 60 * 2, // 2 horas
              },
              cacheableResponse: {
                statuses: [0, 200]
              }
            },
          },
          
          // NETWORK-FIRST para el documento principal
          {
            urlPattern: /\/index\.html|\/$/,
            handler: "NetworkFirst",
            options: {
              cacheName: "html-documents",
              networkTimeoutSeconds: 3,
            },
          },
        ]
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
      },
    })
  ],
})
