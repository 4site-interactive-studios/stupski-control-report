import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // This tells Vite to look in the /stupski-control-report/ folder for files
  base: '/stupski-control-report/', 
})
