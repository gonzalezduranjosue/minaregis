# Proyecto InnovaWeb - Landing Page SEO

Este proyecto es una aplicación web moderna, responsiva y optimizada para SEO, construida con React, TypeScript y Tailwind CSS.

## Estructura del Proyecto

- `index.html`: Punto de entrada con metaetiquetas SEO y script de arranque.
- `vite.config.ts`: Configuración esencial para el despliegue en subcarpetas (GitHub Pages).
- `App.tsx`: Contenido principal de la página.

## IMPORTANTE: Cómo desplegar en GitHub Pages

Para que la aplicación funcione en GitHub Pages, **no puedes subir simplemente los archivos `.tsx`**. Debes "compilar" el proyecto para que los navegadores lo entiendan.

### Paso 1: Instalación y Construcción (Build)

En tu computadora local, asegúrate de tener Node.js instalado y ejecuta:

1. `npm install` (Instala las dependencias)
2. `npm run build` (Crea la versión optimizada para producción)

Esto generará una carpeta llamada **`dist`**. Esta es la carpeta que contiene tu página web lista.

### Paso 2: Subir a GitHub

Hay varias formas de subir la carpeta `dist`. La más sencilla manualmente es:

1. Ve a la configuración de tu repositorio en GitHub > **Pages**.
2. Asegúrate de que GitHub Pages esté buscando en la rama correcta.
3. **Opción recomendada (gh-pages)**:
   - Instala la herramienta: `npm install gh-pages --save-dev`
   - Añade en tu `package.json` bajo "scripts": `"deploy": "gh-pages -d dist"`
   - Ejecuta: `npm run build` y luego `npm run deploy`.

### Solución de Problemas

**¿Se ve la pantalla en blanco o solo el fondo?**
- Esto suele pasar porque los archivos JS no se encuentran.
- Hemos añadido `base: './'` en `vite.config.ts` para solucionar esto.
- Asegúrate de estar desplegando el contenido de la carpeta `dist`, no el código fuente directo.

## Verificación SEO

1. Edita el archivo `index.html` y actualiza las metaetiquetas `og:url`, `og:image`, `title` y `description` con tu información real.
2. Actualiza `sitemap.xml` con la URL final de tu GitHub Page.
3. Ve a Google Search Console e ingresa la URL de tu sitemap.