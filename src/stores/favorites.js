const CLAVE_STORAGE = 'flicka_favoritos'

export const obtenerFavoritos = () => {
    return JSON.parse(localStorage.getItem(CLAVE_STORAGE) || '[]')
}

export const agregarFavorito = (pelicula) => {
    const favoritos = obtenerFavoritos()
    if (!favoritos.find((p) => p.id === pelicula.id)) {
        favoritos.push(pelicula)
        localStorage.setItem(CLAVE_STORAGE, JSON.stringify(favoritos))
    }
}

export const eliminarFavorito = (idPelicula) => {
    const favoritos = obtenerFavoritos().filter((p) => p.id !== idPelicula)
    localStorage.setItem(CLAVE_STORAGE, JSON.stringify(favoritos))
}

export const esFavorito = (idPelicula) => {
    return obtenerFavoritos().some((p) => p.id === idPelicula)
}