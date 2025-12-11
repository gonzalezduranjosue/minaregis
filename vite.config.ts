import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // IMPORTANTE: Esto asegura que los archivos busquen recursos en la carpeta actual (./)
  // en lugar de la raíz del dominio (/). Es vital para que funcione en GitHub Pages.
  base: './', 
})