import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.config.js/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    watch: {
      ignored: ['**/ChatGPT Image*', '**/*.png', '**/*.jpg', '**/*.jpeg', '**/*.svg', '**/*.gif']
    }
  }
})
