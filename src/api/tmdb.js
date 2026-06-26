const URL_BASE = 'https://api.themoviedb.org/3'
const TOKEN = import.meta.env.VITE_TMDB_TOKEN

const cabeceras = {
    Authorization: `Bearer ${TOKEN}`,
    'Content-Type': 'application/json',
}

const obtener = (endpoint, parametros = {}) => {
    const url = new URL(`${URL_BASE}${endpoint}`)
    url.searchParams.set('language', 'es-ES')
    Object.entries(parametros).forEach(([clave, valor]) => url.searchParams.set(clave, valor))
    return fetch(url, { headers: cabeceras }).then((res) => res.json())
}

export const obtenerPeliculasPopulares = (pagina = 1) =>
    obtener('/movie/popular', { page: pagina })

export const buscarPeliculas = (consulta, pagina = 1) =>
    obtener('/search/movie', { query: consulta, page: pagina })

export const obtenerDetallePelicula = (id) =>
    obtener(`/movie/${id}`, { append_to_response: 'release_dates' })

export const obtenerCreditosPelicula = (id) =>
    obtener(`/movie/${id}/credits`)

export const obtenerProveedoresPelicula = (id) =>
    obtener(`/movie/${id}/watch/providers`)

export const obtenerPeliculasSimilares = (id) =>
    obtener(`/movie/${id}/similar`)

export const obtenerGeneros = () =>
    obtener('/genre/movie/list')
