/// <reference types="vitest" />
import { defineConfig } from 'vite'
import path from 'path'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  test: {
    alias: {
      '@': path.resolve(__dirname, './'),
    },
    environment: 'happy-dom',
  },
})
