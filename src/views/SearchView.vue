<template>
  <main class="buscar">
    <SearchBar @buscar="alBuscar" />

    <div 
      ref="contenedorGeneros"
      class="buscar__generos"
      :class="{ 'buscar__generos--arrastrando': estaArrastrando }"
      @mousedown="iniciarArrastre"
      @mouseleave="detenerArrastre"
      @mouseup="detenerArrastre"
      @mousemove="moverArrastre"
    >
      <Chips
        class="buscar__chip"
        :active="generoSeleccionado === ''"
        @click="seleccionarGenero('')"
      >
        Todos
      </Chips>
      <Chips
        v-for="genero in generos"
        :key="genero.id"
        class="buscar__chip"
        :active="generoSeleccionado === genero.id"
        @click="seleccionarGenero(genero.id)"
      >
        {{ genero.name }}
      </Chips>
    </div>

    <p v-if="cargando">Cargando...</p>
    <div
      v-if="!cargando && peliculas.length === 0 && consultaActual"
      class="buscar__sin-resultados"
    >
      <IconNoResult width="141" height="119" />
      <p>No se encontraron resultados</p>
    </div>

    <div v-if="!cargando" class="buscar__grilla">
      <MovieCard v-for="pelicula in peliculasFiltradas" :key="pelicula.id" :pelicula="pelicula" />
    </div>
  </main>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { buscarPeliculas, obtenerGeneros } from '@/api/tmdb.js'
import MovieCard from '@/components/MovieCard.vue'
import SearchBar from '@/components/SearchBar.vue'
import IconNoResult from '@/components/icons/IconNoResult.vue'
import Chips from '@/components/Chips.vue'

const peliculas = ref([])
const generos = ref([])
const generoSeleccionado = ref('')
const consultaActual = ref('')
const cargando = ref(false)

const contenedorGeneros = ref(null)
const estaArrastrando = ref(false)

let temporizador = null
let esClick = false
let posicionInicialX = 0
let scrollIzquierda = 0

onMounted(async () => {
  try {
    const datos = await obtenerGeneros()
    generos.value = datos.genres
  } catch {
    console.error('Error al cargar géneros')
  }
})

const peliculasFiltradas = computed(() => {
  if (!generoSeleccionado.value) return peliculas.value
  return peliculas.value.filter((p) => p.genre_ids.includes(Number(generoSeleccionado.value)))
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
    } catch {
      console.error('Error al buscar películas')
    } finally {
      cargando.value = false
    }
  }, 400)
}

const seleccionarGenero = (idGenero) => {
  if (!estaArrastrando.value) {
    generoSeleccionado.value = idGenero
  }
}

const iniciarArrastre = (e) => {
  esClick = true
  posicionInicialX = e.clientX - contenedorGeneros.value.offsetLeft
  scrollIzquierda = contenedorGeneros.value.scrollLeft
}

const detenerArrastre = () => {
  esClick = false
  setTimeout(() => {
    estaArrastrando.value = false
  }, 50)
}

const moverArrastre = (e) => {
  if (!esClick) return
  e.preventDefault()

  estaArrastrando.value = true

  const x = e.clientX - contenedorGeneros.value.offsetLeft
  const distancia = (x - posicionInicialX) * 1.5
  contenedorGeneros.value.scrollLeft = scrollIzquierda - distancia
}
</script>

<style scoped>
.buscar__generos {
  display: flex;
  gap: 0.5rem;
  overflow-x: auto;
  overflow-y: hidden;
  user-select: none;
  cursor: grab;
  -webkit-overflow-scrolling: touch;
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.buscar__generos::-webkit-scrollbar {
  display: none;
}

.buscar__generos--arrastrando {
  cursor: grabbing;
}

.buscar__grilla {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 30px 20px;
  margin-top: 20px;
}
</style>