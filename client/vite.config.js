import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',  
      manifest: {
        "name":"Vital Maps",
        "short_name":"Vital Maps",
        "theme_color":"#ffffff",
        "icons":[
          {"src":"./img/icons/android-chrome-192x192.png", "sizes":"192x192","type":"image/png"},
          {"src":"./img/icons/android-chrome-512x512.png", "sizes":"512x512", "type":"image/png"},
          // {"src":"./img/icons/android-chrome-maskable-192x192.png", "sizes":"192x192", "type":"image/png", "purpose":"maskable"},
          // {"src":"./img/icons/android-chrome-maskable-512x512.png", "sizes":"512x512", "type":"image/png", "purpose":"maskable"}
        ],
        "start_url":".",
        "display":"standalone",
        "background_color":"#FFFFFF"
      },
      workbox: {
        // workbox options for generateSW
      }
    })
  ]
})
