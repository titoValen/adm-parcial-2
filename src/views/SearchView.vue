<template>
  <main class="buscar">
    <h1 class="buscar__titulo">Buscar</h1>
    <p class="buscar__subtitulo">Encontrá tu próxima película favorita</p>

    <SearchBar @buscar="alBuscar" />

    <div class="buscar__generos">
      <button
        class="buscar__chip"
        :class="{ 'buscar__chip--activo': generoSeleccionado === '' }"
        @click="seleccionarGenero('')"
      >
        Todos
      </button>
      <button
        v-for="genero in generos"
        :key="genero.id"
        class="buscar__chip"
        :class="{ 'buscar__chip--activo': generoSeleccionado === genero.id }"
        @click="seleccionarGenero(genero.id)"
      >
        {{ genero.name }}
      </button>
    </div>

    <p v-if="cargando">Cargando...</p>
    <p v-if="!cargando && peliculas.length === 0 && consultaActual">No se encontraron resultados</p>

    <div v-if="!cargando" class="buscar__grilla">
      <MovieCard v-for="pelicula in peliculasFiltradas" :key="pelicula.id" :pelicula="pelicula" />
    </div>
  </main>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { buscarPeliculas, obtenerGeneros} from '@/api/tmdb.js'
import MovieCard from '@/components/MovieCard.vue'
import SearchBar from '@/components/SearchBar.vue'

const peliculas = ref([])
const generos = ref([])
const generoSeleccionado = ref('')
const consultaActual = ref('')
const cargando = ref(false)
let temporizador = null

onMounted(async () => {
  try {
    const datos = await obtenerGeneros()
    generos.value = datos.genres
  } catch (e) {
    console.error('Error al cargar géneros')
  }
})

const peliculasFiltradas = computed(() => {
  if (!generoSeleccionado.value) return peliculas.value
  return peliculas.value.filter((p) =>
    p.genre_ids.includes(Number(generoSeleccionado.value)),
  )
})

const alBuscar = (consulta) => {
  clearTimeout(temporizador)
  consultaActual.value = consulta

  if (!consulta.trim()) {
    peliculas.value = []
    return
  }

  temporizador = setTimeout(async () => {
    cargando.value = true
    try {
      const datos = await buscarPeliculas(consulta)
      peliculas.value = datos.results
    } catch (e) {
      console.error('Error al buscar películas')
    } finally {
      cargando.value = false
    }
  }, 400)
}

const seleccionarGenero = (idGenero) => {
  generoSeleccionado.value = idGenero
}
</script>
