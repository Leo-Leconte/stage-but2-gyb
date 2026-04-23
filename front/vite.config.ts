import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom', // jsdom c'est un faux navigateur qui tourne dans le terminal — il permet de simuler des clics, des inputs, etc. (sans ouvrir de navigateur)
    globals: true,
    setupFiles: './src/setupTests.ts',
  },
})