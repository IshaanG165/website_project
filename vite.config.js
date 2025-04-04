import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    sourcemap: false,
    minify: 'esbuild',
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          mui: ['@mui/material', '@mui/icons-material']
        }
      }
    },
    chunkSizeWarningLimit: 1000,
    cssCodeSplit: true,
    target: 'esnext',
    assetsInlineLimit: 4096
  },
  server: {
    port: 3000,
    open: true,
    host: true
  },
  base: '/',
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom', '@mui/material', '@mui/icons-material'],
    exclude: []
  },
  resolve: {
    alias: {
      '@': '/src'
    }
  }
})