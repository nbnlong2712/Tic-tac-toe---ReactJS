import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/Tic-tac-toe---ReactJS/',
  plugins: [react()],
  build: {
    outDir: 'build'
  }
})
