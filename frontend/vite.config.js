import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'


// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom', 'axios', 'framer-motion'],
          ui: ['@headlessui/react', 'lucide-react', 'react-hot-toast'],
          utils: ['date-fns', 'clsx', 'tailwind-merge'] // Assuming these might serve generic utility purposes if present
        }
      }
    },
    chunkSizeWarningLimit: 1000,
  }
})
// trigger restart
