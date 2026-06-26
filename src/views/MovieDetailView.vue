<template>
  <main class="detalle">
    <p v-if="cargando">Cargando...</p>
    <p v-if="error">{{ error }}</p>

    <div v-if="!cargando && pelicula">

      <!-- Header -->
      <div class="detalle__header">
        <button class="detalle__volver" @click="volver">‹</button>
        <button class="detalle__btn-favorito" @click="toggleFavorito">
          <IconFavorite
            width="24"
            height="24"
            :color="esFavoritoActual ? '#6e2fe7' : '#dedede'"
          />
        </button>
      </div>

      <!-- Poster -->
      <div class="detalle__poster-wrapper">
        <img
          v-if="pelicula.poster_path"
          :src="`https://image.tmdb.org/t/p/w500${pelicula.poster_path}`"
          :alt="pelicula.title"
          class="detalle__poster"
        />
        <div class="detalle__poster-overlay" />
      </div>

      <!-- Info principal -->
      <div class="detalle__info">
        <h1 class="detalle__titulo">{{ pelicula.title }}</h1>

        <div class="detalle__meta">
          <span class="detalle__rating">
            <IconStar width="11" height="11" />
            {{ pelicula.vote_average?.toFixed(1) }}
          </span>
          <span class="detalle__anio">{{ pelicula.release_date?.slice(0, 4) }}</span>
          <span v-if="pelicula.adult" class="detalle__clasificacion">+18</span>
          <span v-else-if="pelicula.release_dates" class="detalle__clasificacion">
            {{ clasificacion }}
          </span>
        </div>

        <div class="detalle__generos">
          <span
            v-for="genero in pelicula.genres"
            :key="genero.id"
            class="detalle__genero-chip"
          >
            {{ genero.name }}
          </span>
        </div>

        <button class="detalle__favorito" @click="toggleFavorito">
          <IconFavorite
            width="20"
            height="20"
            :color="esFavoritoActual ? '#dedede' : '#dedede'"
          />
          {{ esFavoritoActual ? 'Quitar de favoritos' : 'Agregar a favoritos' }}
        </button>
      </div>

      <!-- Sinopsis -->
      <section class="detalle__seccion">
        <h2 class="detalle__seccion-titulo">Sinopsis</h2>
        <p class="detalle__sinopsis">{{ pelicula.overview }}</p>
      </section>

      <!-- Duración y Director -->
      <div class="detalle__datos">
        <div class="detalle__dato">
          <span class="detalle__dato-label">Duración</span>
          <span class="detalle__dato-valor">{{ duracionFormateada }}</span>
        </div>
        <div class="detalle__dato">
          <span class="detalle__dato-label">Director</span>
          <span class="detalle__dato-valor">{{ director?.name || 'N/D' }}</span>
        </div>
      </div>

      <!-- Elenco -->
      <section class="detalle__seccion">
        <h2 class="detalle__seccion-titulo">Elenco</h2>
        <div class="detalle__elenco">
          <div
            v-for="actor in creditos.cast?.slice(0, 10)"
            :key="actor.id"
            class="detalle__actor"
          >
            <img
              v-if="actor.profile_path"
              :src="`https://image.tmdb.org/t/p/w185${actor.profile_path}`"
              :alt="actor.name"
              class="detalle__actor-foto"
            />
            <div v-else class="detalle__actor-foto detalle__actor-foto--vacio" />
            <span class="detalle__actor-nombre">{{ actor.name }}</span>
            <span class="detalle__actor-personaje">{{ actor.character }}</span>
          </div>
        </div>
      </section>

      <!-- Plataformas -->
      <section class="detalle__seccion">
        <h2 class="detalle__seccion-titulo">Disponible en</h2>
        <p v-if="!plataformas.length" class="detalle__sin-datos">No disponible en Argentina</p>
        <div v-else class="detalle__plataformas">
          <img
            v-for="plataforma in plataformas"
            :key="plataforma.provider_id"
            :src="`https://image.tmdb.org/t/p/w92${plataforma.logo_path}`"
            :alt="plataforma.provider_name"
            class="detalle__plataforma-logo"
          />
        </div>
      </section>

      <!-- Películas similares -->
      <section class="detalle__seccion">
        <h2 class="detalle__seccion-titulo">Películas similares</h2>
        <div class="detalle__similares">
          <MovieCard
            v-for="similar in similares.slice(0, 6)"
            :key="similar.id"
            :pelicula="similar"
          />
        </div>
      </section>

    </div>
  </main>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import {
  obtenerDetallePelicula,
  obtenerCreditosPelicula,
  obtenerProveedoresPelicula,
  obtenerPeliculasSimilares,
} from '@/api/tmdb.js'
import { agregarFavorito, eliminarFavorito, esFavorito } from '@/stores/favoritos.js'
import MovieCard from '@/components/MovieCard.vue'
import IconFavorite from '@/components/icons/IconFavorite.vue'
import IconStar from '@/components/icons/IconStar.vue'

const ruta = useRoute()
const enrutador = useRouter()
const idPelicula = ruta.params.id

const pelicula = ref(null)
const creditos = ref({})
const plataformas = ref([])
const similares = ref([])
const cargando = ref(false)
const error = ref(null)
const esFavoritoActual = ref(false)

const director = computed(() =>
    creditos.value.crew?.find((persona) => persona.job === 'Director'),
)

const duracionFormateada = computed(() => {
    const minutos = pelicula.value?.runtime
    if (!minutos) return 'N/D'
    const horas = Math.floor(minutos / 60)
    const mins = minutos % 60
    return `${horas}h ${mins}min`
})

const clasificacion = computed(() => {
    const resultados = pelicula.value?.release_dates?.results
    if (!resultados) return null
    const argentina = resultados.find((r) => r.iso_3166_1 === 'AR')
    return argentina?.release_dates?.[0]?.certification || null
})

const volver = () => enrutador.back()

const toggleFavorito = () => {
    if (esFavoritoActual.value) {
        eliminarFavorito(pelicula.value.id)
    } else {
        agregarFavorito(pelicula.value)
    }
    esFavoritoActual.value = !esFavoritoActual.value
}

onMounted(async () => {
    cargando.value = true
    try {
        const [detalle, credito, proveedores, parecidas] = await Promise.all([
        obtenerDetallePelicula(idPelicula),
        obtenerCreditosPelicula(idPelicula),
        obtenerProveedoresPelicula(idPelicula),
        obtenerPeliculasSimilares(idPelicula),
        ])

        pelicula.value = detalle
        creditos.value = credito
        plataformas.value = proveedores.results?.AR?.flatrate || []
        similares.value = parecidas.results || []
        esFavoritoActual.value = esFavorito(Number(idPelicula))
    } catch (e) {
        error.value = 'Error al cargar el detalle de la película'
    } finally {
        cargando.value = false
    }
})
</script>