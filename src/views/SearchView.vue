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
        :active="generosSeleccionados.includes('')"
        @click="seleccionarTodos"
      >
        Todos
      </Chips>
      <Chips
        v-for="genero in generos"
        :key="genero.id"
        class="buscar__chip"
        :active="generosSeleccionados.includes(genero.id)"
        @click="seleccionarGenero(genero.id)"
      >
        {{ genero.name }}
      </Chips>
    </div>

    <p v-if="cargando">Cargando...</p>
    <div
      v-if="
        !cargando && peliculasFiltradas.length === 0 && (consultaActual || !estaSeleccionadoTodos)
      "
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
import { buscarPeliculas, obtenerGeneros, obtenerPeliculasPopulares } from '@/api/tmdb.js'
import MovieCard from '@/components/MovieCard.vue'
import SearchBar from '@/components/SearchBar.vue'
import IconNoResult from '@/components/icons/IconNoResult.vue'
import Chips from '@/components/Chips.vue'

const peliculas = ref([])
const generos = ref([])
const generosSeleccionados = ref([''])
const consultaActual = ref('')
const cargando = ref(false)

const contenedorGeneros = ref(null)
const estaArrastrando = ref(false)

const MAXIMO_GENEROS = 3

let temporizador = null
let esClick = false
let posicionInicialX = 0
let scrollIzquierda = 0

onMounted(async () => {
  await cargarPeliculasPopulares()

  try {
    const datos = await obtenerGeneros()
    generos.value = datos.genres
  } catch {
    console.error('Error al cargar géneros')
  }
})

const estaSeleccionadoTodos = computed(() => generosSeleccionados.value.includes(''))

const peliculasFiltradas = computed(() => {
  if (estaSeleccionadoTodos.value) return peliculas.value

  const generosActivos = generosSeleccionados.value.filter((genero) => genero !== '')
  if (generosActivos.length === 0) return peliculas.value

  return peliculas.value.filter((p) =>
    generosActivos.some((generoId) => p.genre_ids.includes(Number(generoId))),
  )
})

const cargarPeliculasPopulares = async () => {
  cargando.value = true

  try {
    const datos = await obtenerPeliculasPopulares()
    peliculas.value = datos.results
  } catch {
    console.error('Error al cargar películas populares')
  } finally {
    cargando.value = false
  }
}

const alBuscar = (consulta) => {
  clearTimeout(temporizador)
  consultaActual.value = consulta

  if (!consulta.trim()) {
    cargarPeliculasPopulares()
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

const seleccionarTodos = () => {
  if (!estaArrastrando.value) {
    generosSeleccionados.value = ['']
  }
}

const seleccionarGenero = (idGenero) => {
  if (!estaArrastrando.value) {
    if (generosSeleccionados.value.includes('')) {
      generosSeleccionados.value = [idGenero]
      return
    }

    if (generosSeleccionados.value.includes(idGenero)) {
      if (generosSeleccionados.value.length === 1) return

      generosSeleccionados.value = generosSeleccionados.value.filter(
        (genero) => genero !== idGenero,
      )
      return
    }

    if (generosSeleccionados.value.length >= MAXIMO_GENEROS) return

    generosSeleccionados.value = [...generosSeleccionados.value, idGenero]
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

.buscar__sin-resultados {
  margin: 2rem 0;
  display: grid;
  place-items: center;
}
</style>
