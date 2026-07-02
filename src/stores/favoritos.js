import { ref } from 'vue'

const CLAVE_STORAGE = 'flicka_favoritos'

const favoritos = ref(JSON.parse(localStorage.getItem(CLAVE_STORAGE) || '[]'))

const guardarFavoritos = (nuevosFavoritos) => {
    favoritos.value = nuevosFavoritos
    localStorage.setItem(CLAVE_STORAGE, JSON.stringify(nuevosFavoritos))
}

export const obtenerFavoritos = () => {
    return favoritos.value
}

export const agregarFavorito = (pelicula) => {
    if (!favoritos.value.find((p) => p.id === pelicula.id)) {
        guardarFavoritos([...favoritos.value, pelicula])
    }
}

export const eliminarFavorito = (idPelicula) => {
    guardarFavoritos(favoritos.value.filter((p) => p.id !== idPelicula))
}

export const esFavorito = (idPelicula) => {
    return favoritos.value.some((p) => p.id === idPelicula)
}

export const favoritosReactivos = favoritos