import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['app-icon-192.png', 'app-icon-512.png'],
      manifest: {
        name: 'Chakwal Bus Tracker',
        short_name: 'BusTracker',
        description: 'Real-time bus tracking for Chakwal routes',
        start_url: '/',
        display: 'standalone',
        background_color: '#ffffff',
        theme_color: '#00897b',
        icons: [
          {
            src: '/app-icon-192.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'any'
          },
          {
            src: '/app-icon-512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable'
          }
        ]
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg}']
      }
    })
  ]
})