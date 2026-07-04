# Flicka

Flicka es una web PWA hecha con Vue 3 y Vite para explorar películas desde la API de TMDB. La app muestra películas populares, permite buscar títulos, filtrar por género, ver el detalle completo de cada película y guardar favoritos de forma persistente en el navegador.

## Funcionalidades

- Inicio con películas populares.
- Búsqueda por nombre de película.
- Filtros por género con selección múltiple.
- Vista de detalle con sinopsis, duración, clasificación, director, reparto, plataformas disponibles y películas similares.
- Sistema de favoritos guardado en `localStorage`.
- Soporte PWA con instalación y actualización automática.

## Requisitos

- Node.js 20.19 o superior.
- pnpm.
- Un token de acceso de TMDB.

## Configuración

1. Instalá dependencias:

```bash
pnpm install
```

2. Creá un archivo `.env` en la raíz del proyecto con tu token de TMDB:

```bash
VITE_TMDB_TOKEN=tu_token_aqui
```

3. Iniciá el servidor de desarrollo:

```bash
pnpm dev
```

## Scripts disponibles

- `pnpm dev`: ejecuta el entorno de desarrollo.
- `pnpm build`: genera la versión de producción.
- `pnpm preview`: previsualiza el build generado.
- `pnpm lint`: ejecuta los linters configurados.
- `pnpm format`: formatea los archivos de `src/` con Prettier.

## Estructura principal

- `src/api/tmdb.js`: cliente para consumir TMDB.
- `src/router/`: rutas de la aplicación.
- `src/stores/favoritos.js`: persistencia de favoritos.
- `src/views/`: vistas principales de la app.
- `src/components/`: componentes reutilizables e íconos.

## Notas

- Los favoritos se guardan localmente en el navegador, así que se mantienen entre recargas.
- La app usa la API de TMDB en español (`es-ES`) para mostrar contenido localizado cuando está disponible.