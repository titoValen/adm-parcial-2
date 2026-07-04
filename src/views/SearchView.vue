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

    <div v-if="cargando" class="buscar__grilla">
      <SkeletorMovieCard v-for="i in 10" :key="i" />
    </div>
    <div
      v-if="
        !cargando && peliculasFiltradas.length === 0 && (consultaActual || !estaSeleccionadoTodos)
      "
      class="buscar__sin-resultados"
    >
      <IconNoResult width="141" height="119" />
      <p>Sin resultados</p>
      <p>
        No encontramos películas que coincidan con tu búsqueda. Probá sacando algún filtro o revisá
        si escribiste bien el nombre.
      </p>
    </div>

    <div v-if="!cargando" class="buscar__grilla">
      <MovieCard v-for="pelicula in peliculasFiltradas" :key="pelicula.id" :pelicula="pelicula" />
    </div>
  </main>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import {
  buscarPeliculas,
  obtenerGeneros,
  obtenerPeliculasPopulares,
  obtenerPeliculasPorGenero,
} from '@/api/tmdb.js'
import MovieCard from '@/components/MovieCard.vue'
import SearchBar from '@/components/SearchBar.vue'
import IconNoResult from '@/components/icons/IconNoResult.vue'
import Chips from '@/components/Chips.vue'
import SkeletorMovieCard from '@/components/SkeletorMovieCard.vue'

const peliculas = ref([])
const generos = ref([])
const generosSeleccionados = ref([''])
const consultaActual = ref('')
const cargando = ref(false)

const contenedorGeneros = ref(null)
const estaArrastrando = ref(false)

const MAXIMO_GENEROS = 3
const CANTIDAD_POR_GENERO = 10

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

const peliculasFiltradas = computed(() => peliculas.value)

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

const mezclarPeliculasPorGenero = (resultadosPorGenero) => {
  const mezcladas = []
  const vistos = new Set()
  const listas = resultadosPorGenero.map((lista) => [...lista].sort(() => Math.random() - 0.5))
  const maximo = Math.max(...listas.map((lista) => lista.length), 0)

  for (let indice = 0; indice < maximo; indice += 1) {
    listas.forEach((lista) => {
      const pelicula = lista[indice]
      if (pelicula && !vistos.has(pelicula.id)) {
        vistos.add(pelicula.id)
        mezcladas.push(pelicula)
      }
    })
  }

  return mezcladas
}

const cargarPeliculasPorGeneros = async () => {
  const generosActivos = generosSeleccionados.value.filter((genero) => genero !== '')

  if (generosActivos.length === 0) {
    await cargarPeliculasPopulares()
    return
  }

  cargando.value = true

  try {
    const resultados = await Promise.all(
      generosActivos.map((idGenero) => obtenerPeliculasPorGenero(idGenero)),
    )

    const peliculasPorGenero = resultados.map((resultado) =>
      resultado.results.slice(0, CANTIDAD_POR_GENERO),
    )
    peliculas.value = mezclarPeliculasPorGenero(peliculasPorGenero)
  } catch {
    console.error('Error al cargar películas por género')
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
    cargarPeliculasPopulares()
  }
}

const seleccionarGenero = (idGenero) => {
  if (!estaArrastrando.value) {
    if (generosSeleccionados.value.includes('')) {
      generosSeleccionados.value = [idGenero]
      cargarPeliculasPorGeneros()
      return
    }

    if (generosSeleccionados.value.includes(idGenero)) {
      if (generosSeleccionados.value.length === 1) return

      generosSeleccionados.value = generosSeleccionados.value.filter(
        (genero) => genero !== idGenero,
      )
      cargarPeliculasPorGeneros()
      return
    }

    if (generosSeleccionados.value.length >= MAXIMO_GENEROS) return

    generosSeleccionados.value = [...generosSeleccionados.value, idGenero]
    cargarPeliculasPorGeneros()
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
  margin: 3rem 0;
  display: grid;
  place-items: center;
  text-align: center;
}

.buscar__sin-resultados p:first-of-type {
  font-size: 1.125rem;
  font-weight: 700;
  margin-top: 20px;
  color: var(--color-texto);
}

.buscar__sin-resultados p:nth-of-type(2) {
  margin-top: 10px;
  max-width: 400px;
  color: var(--color-texto-secundario);
}
</style>
