<template>
  <main class="inicio">
    <h1 class="inicio__titulo">Películas Populares</h1>
    <SearchBar @buscar="alBuscar" />
    <p v-if="cargando">Cargando...</p>
    <p v-if="error">{{ error }}</p>
    <div v-if="!cargando" class="inicio__grilla">
      <MovieCard v-for="pelicula in peliculas" :key="pelicula.id" :pelicula="pelicula" />
    </div>
  </main>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { obtenerPeliculasPopulares, buscarPeliculas } from '@/api/tmdb.js'
import MovieCard from '@/components/MovieCard.vue'
import SearchBar from '@/components/SearchBar.vue'

const peliculas = ref([])
const cargando = ref(false)
const error = ref(null)
let temporizador = null

onMounted(async () => {
  await cargarPopulares()
})

const cargarPopulares = async () => {
  cargando.value = true
  try {
    const datos = await obtenerPeliculasPopulares()
    peliculas.value = datos.results
  } catch (e) {
    error.value = 'Error al cargar las películas'
  } finally {
    cargando.value = false
  }
}

const alBuscar = (consulta) => {
  clearTimeout(temporizador)
  if (!consulta.trim()) {
    cargarPopulares()
    return
  }
  temporizador = setTimeout(async () => {
    cargando.value = true
    try {
      const datos = await buscarPeliculas(consulta)
      peliculas.value = datos.results
    } catch (e) {
      error.value = 'Error al buscar películas'
    } finally {
      cargando.value = false
    }
  }, 400)
}
</script>
