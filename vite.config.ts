
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import path from 'path'
// import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
    test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setupTests.ts', // opsional, bisa dibuat nanti
    include: ['src/**/*.{test,spec}.{ts,tsx}'],
  },
})
