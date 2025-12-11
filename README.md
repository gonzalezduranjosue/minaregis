# Proyecto InnovaWeb - Landing Page SEO

Este proyecto es una plantilla de página web moderna, responsiva y optimizada para SEO, construida con React, TypeScript y Tailwind CSS.

## Estructura del Proyecto

- `index.html`: Punto de entrada con metaetiquetas SEO y Open Graph.
- `App.tsx`: Contenido principal de la página.
- `robots.txt` y `sitemap.xml`: Archivos esenciales para la indexación en buscadores.

## Cómo desplegar en GitHub Pages

1. **Crear Repositorio**: Crea un nuevo repositorio público en GitHub.
2. **Subir Archivos**: Sube todos los archivos de este proyecto al repositorio.
   - Nota: Si usas una herramienta de build como Vite o CRA, asegúrate de que el comando de build genere los archivos estáticos en la carpeta que GitHub Pages va a servir (usualmente `/docs` o la raíz de una rama `gh-pages`).
   - **Para este código simple (sin bundler configurado explícitamente)**: Este código está diseñado como código fuente. Para un despliegue rápido "manual" sin Node.js:
     - Puedes usar servicios como **CodeSandbox** o **StackBlitz** para exportar el build estático.
     - O configurar un entorno local con Vite (`npm create vite@latest`), copiar estos archivos en `src`, ejecutar `npm run build`, y subir la carpeta `dist` a GitHub.

3. **Configurar GitHub Pages**:
   - Ve a la pestaña **Settings** de tu repositorio.
   - En el menú lateral izquierdo, haz clic en **Pages**.
   - En **Source**, selecciona `Deploy from a branch`.
   - Selecciona la rama `main` (o la rama donde esté tu código `index.html` compilado) y la carpeta `/` (root).
   - Haz clic en **Save**.

4. **Verificación**:
   - Espera unos minutos. GitHub te mostrará la URL de tu sitio (ej. `https://usuario.github.io/repo/`).
   - Visita la URL y verifica que carga correctamente.

## Verificación SEO

1. Edita el archivo `index.html` y actualiza las metaetiquetas `og:url`, `og:image`, `title` y `description` con tu información real.
2. Actualiza `sitemap.xml` con la URL final de tu GitHub Page.
3. Ve a Google Search Console e ingresa la URL de tu sitemap.