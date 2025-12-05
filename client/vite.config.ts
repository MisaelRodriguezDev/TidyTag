import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'
import tailwindcss from "@tailwindcss/vite"

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // Cargar variables de entorno según el modo
  const env = loadEnv(mode, process.cwd(), '')

  return {
    plugins: [
      react(),
      tailwindcss(),
      VitePWA({
        registerType: 'autoUpdate',
        includeAssets: ['vite.svg', 'react.svg'],
        workbox: {
          navigateFallback: '/index.html',
          globPatterns: ['**/*.{js,css,html,ico,png,svg,jpg}'],
          runtimeCaching: [
            // Cachea recursos estáticos (CSS, imágenes)
            {
              urlPattern: /\.(css|png|jpg|jpeg|svg|gif)$/,
              handler: "CacheFirst",
              options: {
                cacheName: "static-assets",
                expiration: { maxEntries: 20, maxAgeSeconds: 60 * 60 * 24 * 30 },
                cacheableResponse: { statuses: [0, 200] },
              },
            },

            // Cachea llamadas a APIs externas
            {
              urlPattern: /^https:\/\/world\.openfoodfacts\.org\/api\/v2\/product\/.*\.json$/i,
              handler: "NetworkFirst",
              options: {
                cacheName: "api-data",
                networkTimeoutSeconds: 3,
                expiration: { maxEntries: 50, maxAgeSeconds: 60 * 60 * 2 },
                cacheableResponse: { statuses: [0, 200] },
              },
            },

            // Cachea llamadas a tu backend usando la variable de entorno
            {
              urlPattern: new RegExp(env.VITE_SERVER_URL),
              handler: "NetworkFirst",
              options: {
                cacheName: "data-api",
                networkTimeoutSeconds: 3,
                expiration: { maxEntries: 50, maxAgeSeconds: 60 * 60 * 2 },
                cacheableResponse: { statuses: [0, 200] },
              },
            },

            // Cachea el documento principal
            {
              urlPattern: /\/index\.html|\/$/,
              handler: "NetworkFirst",
              options: {
                cacheName: "html-documents",
                networkTimeoutSeconds: 3,
              },
            },

            {
              urlPattern: /\/products/,
              handler: "NetworkFirst",
              options: {
                backgroundSync: {
                  name: "tidytag-sync",
                  options: {
                    maxRetentionTime: 60,
                  },
                },
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
          icons: [
            {
              src: '/tidytag.png',
              sizes: '192x192',
              type: 'image/png'
            }
          ]
        },
      })
    ]
  }
})
