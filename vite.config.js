import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { copyFileSync, mkdirSync, existsSync } from 'fs'
import { resolve, dirname } from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(), 
    tailwindcss(),
    {
      name: 'copy-redirects',
      closeBundle() {
        try {
          const destPath = resolve(__dirname, 'dist/_redirects')
          const destDir = dirname(destPath)
          
          // Asegurar que el directorio dist existe
          if (!existsSync(destDir)) {
            mkdirSync(destDir, { recursive: true })
          }
          
          copyFileSync(
            resolve(__dirname, 'public/_redirects'),
            destPath
          )
          console.log('✓ _redirects copied to dist/')
        } catch (err) {
          console.warn('⚠ Could not copy _redirects:', err.message)
        }
      }
    }
  ],
})
