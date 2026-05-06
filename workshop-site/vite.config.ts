import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // HashRouter handles routing, so base can be set to repo subdirectory for GitHub Pages
  // Change this to '/your-repo-name/' when deploying to GitHub Pages
  base: './',
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('react-syntax-highlighter')) return 'syntax-highlighter'
          if (id.includes('react-router-dom') || id.includes('react-router')) return 'router'
          if (id.includes('node_modules')) return 'vendor'
        },
      },
    },
  },
})
