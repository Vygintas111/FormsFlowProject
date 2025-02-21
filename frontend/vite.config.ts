import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 6005,
    proxy: {
      '/api': {
        target: process.env.VITE_API_URL || 'https://formflow-backend.up.railway.app',
        changeOrigin: true,
      }
    }
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
  }
});
