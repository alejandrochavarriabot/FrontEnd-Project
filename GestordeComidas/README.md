# GestordeComidas (NutriDecide)

Este proyecto tiene **dos partes que conviven**:

| Parte | Dónde está | Qué es |
|---|---|---|
| Versión HTML | `HTML/`, `CSS/`, `js/` | Las páginas de todo el equipo (Bootstrap + JS normal). **No se tocó.** |
| Versión React + Vite | `index.html`, `src/` | Las vistas 6 y 7 (Mi Presupuesto, y Favoritos e Historial) convertidas a React |

## Cómo correr el React
1. Instala Node.js (versión 18 o más nueva).
2. En la terminal, dentro de esta carpeta:
   ```
   npm install
   npm run dev
   ```
3. Abre el link que sale (normalmente http://localhost:5173):
   - `/presupuesto` → Mi Presupuesto
   - `/favoritos` → Favoritos e Historial

Mientras `npm run dev` esté corriendo, las páginas HTML de los compañeros también se abren desde el mismo link, por ejemplo `http://localhost:5173/HTML/descubrir.html`. El menú de las páginas React ya apunta a ellas.

## Carpetas de React (`src/`)
- `pages/` → Presupuesto.jsx y Favoritos.jsx
- `components/` → menú lateral y estructura (Layout), barra superior, tarjeta de plato
- `data/` → textos, precios y platos (si quieres cambiar un dato, es aquí)
- `context/` → el aviso emergente que sale abajo a la derecha
- Los estilos NO se duplicaron: React usa los mismos `CSS/nd-base.css`, `CSS/presupuesto.css` y `CSS/favoritos.css` que la versión HTML.

## Pendientes conocidos
- `npm run build` genera solo la parte React. Las páginas HTML de los compañeros no entran en el build hasta que se conviertan a React.
- Los tacos no tienen foto: ponla en `src/data/favoritos.js` (campo `img`).
- Las fotos de los otros platos son links externos de Google; pueden dejar de cargar.

## Al subir a GitHub
No subas a `main`. Crea tu rama (`git checkout -b vistas-6-7-react`) y súbela con `git push -u origin vistas-6-7-react`. El `.gitignore` ya evita subir `node_modules`.
