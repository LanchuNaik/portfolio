import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        // Split vendors so the app chunk stays small and libraries cache well.
        manualChunks(id) {
          if (!id.includes('node_modules')) return undefined
          if (/framer-motion|motion-dom|motion-utils/.test(id)) return 'motion'
          if (/@mui|@emotion/.test(id)) return 'mui'
          return 'vendor'
        },
      },
    },
  },
})
