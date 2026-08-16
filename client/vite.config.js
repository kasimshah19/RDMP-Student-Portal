import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'masked-icon.svg'],
      manifest: {
        name: 'RDMP Student Portal',
        short_name: 'RDMP Portal',
        description: 'Admission & Student Management Portal — Raul Daulatsinhji Multipurpose High School & Jr. College of Science, Dondaicha',
        display: 'standalone',
        start_url: '/',
        theme_color: '#1e3a8a',
        background_color: '#ffffff'
      }
    })
  ]
})
