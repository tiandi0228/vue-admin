import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': resolve('src/renderer/src')
    }
  },
  plugins: [vue()],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id): string | void {
          if (id.includes('node_modules')) {
            return 'vendor'
          }
        }
      }
    }
  }
})
