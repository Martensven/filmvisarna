import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),
  tailwindcss()],

  // base: '/',

  esbuild: {
    logOverride: {
      'this-is-undefined-in-esm': 'silent'
    }
  },

  build: {
    rollupOptions: {
      onwarn(warning, warn) {
        // Suppress unused variable warnings
        if (warning.code === 'UNUSED_EXTERNAL_IMPORT') return;
        warn(warning);
      }
    }
  },

  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:4321',
        changeOrigin: true,
        secure: false,
        ws: true
      }
    }
  }
})
