import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'apple-touch-icon.png'],
      manifest: {
        name: 'Flicka',
        short_name: 'Flicka',
        start_url: '/',
        display: 'standalone',
        background_color: '#020005',
        theme_color: '#6e2fe7',
        icons: [
          {
            src: '/icons/192.webp',
            sizes: '192x192',
            type: 'image/webp',
          },
          {
            src: '/icons/512.webp',
            sizes: '512x512',
            type: 'image/webp',
          },
          {
            src: '/icons/512.webp',
            sizes: '512x512',
            type: 'image/webp',
            purpose: 'maskable',
          },
        ],
      },
      devOptions: {
        enabled: true,
      },
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
