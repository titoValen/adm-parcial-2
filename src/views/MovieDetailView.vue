<template>
  <main class="detalle">
    <p v-if="cargando">Cargando...</p>
    <p v-if="error">{{ error }}</p>

    <div v-if="!cargando && pelicula">
      <!-- Header -->
      <div class="detalle__header">
        <button class="detalle__volver" @click="volver">
          <IconBack :width="32" :height="32" color="#7F7F7F" />
        </button>
        <button
          class="detalle__btn-favorito"
          @click="toggleFavorito"
          :aria-pressed="esFavoritoActual"
        >
          <IconNoFavorite v-if="!esFavoritoActual" width="32" height="32" />
          <IconFavorite v-else width="32" height="32" />
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
            <IconStar :width="11" :height="11" />
            {{ pelicula.vote_average?.toFixed(1) }}
          </span>
          <span class="detalle__anio">{{ pelicula.release_date?.slice(0, 4) }}</span>
          <span v-if="pelicula.adult" class="detalle__clasificacion">+18</span>
          <span v-else-if="pelicula.release_dates" class="detalle__clasificacion">
            {{ clasificacion }}
          </span>
        </div>

        <div class="detalle__generos">
          <span v-for="genero in pelicula.genres" :key="genero.id" class="detalle__genero-chip">
            {{ genero.name }}
          </span>
        </div>

        <!-- Botón de favoritos -->

        <AppButton @click="toggleFavorito">
          <IconNoFavorite :width="20" :height="20" color="var(--color-texto)" />
          {{ esFavoritoActual ? 'Quitar de favoritos' : 'Agregar a favoritos' }}
        </AppButton>
      </div>

      <!-- Sinopsis -->
      <section class="detalle__seccion">
        <h2 class="detalle__seccion-titulo">Sinopsis</h2>
        <p class="detalle__sinopsis">{{ pelicula.overview }}</p>
      </section>

      <!-- Duración y Director -->
      <div class="detalle__datos">
        <div class="detalle__dato">
          <IconDuracion :width="26" :height="26" />
          <div class="detalle__dato-texto">
            <span class="detalle__dato-label">Duración</span>
            <span class="detalle__dato-valor">{{ duracionFormateada }}</span>
          </div>
        </div>
        <div class="detalle__dato">
          <IconDirector :width="26" :height="26" />
          <div class="detalle__dato-texto">
            <span class="detalle__dato-label">Director</span>
            <span class="detalle__dato-valor">{{ director?.name || 'N/D' }}</span>
          </div>
        </div>
      </div>

      <!-- Elenco -->
      <section class="detalle__seccion">
        <h2 class="detalle__seccion-titulo">Elenco</h2>
        <div class="detalle__elenco">
          <div v-for="actor in creditos.cast?.slice(0, 10)" :key="actor.id" class="detalle__actor">
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
import { agregarFavorito, eliminarFavorito, favoritosReactivos } from '@/stores/favoritos.js'
import MovieCard from '@/components/MovieCard.vue'
import IconFavorite from '@/components/icons/IconFavorite.vue'
import IconNoFavorite from '@/components/icons/IconNoFavorite.vue'
import IconStar from '@/components/icons/IconStar.vue'
import AppButton from '@/components/Button.vue'
import IconDuracion from '@/components/icons/IconDuracion.vue'
import IconDirector from '@/components/icons/IconDirector.vue'
import IconBack from '@/components/icons/IconBack.vue'

const ruta = useRoute()
const enrutador = useRouter()
const idPelicula = ruta.params.id

const pelicula = ref(null)
const creditos = ref({})
const plataformas = ref([])
const similares = ref([])
const cargando = ref(false)
const error = ref(null)

const director = computed(() => creditos.value.crew?.find((persona) => persona.job === 'Director'))

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

const esFavoritoActual = computed(() =>
  favoritosReactivos.value.some((peliculaFavorita) => peliculaFavorita.id === Number(idPelicula)),
)

const toggleFavorito = () => {
  if (esFavoritoActual.value) {
    eliminarFavorito(Number(idPelicula))
  } else {
    agregarFavorito(pelicula.value)
  }
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
  } catch {
    error.value = 'Error al cargar el detalle de la película'
  } finally {
    cargando.value = false
  }
})
</script>

<style scoped>
/* Contenedor principal */
.detalle {
  position: relative;
  padding-bottom: 120px;
}

/* Header */
.detalle__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: absolute;
  top: 1.25rem;
  left: 1rem;
  right: 1rem;
  z-index: 2;
}

.detalle__volver,
.detalle__btn-favorito {
  width: 3rem;
  height: 3rem;
  border-radius: 999px;
  border: 1px solid rgba(255, 255, 255, 0.16);
  background: rgba(15, 11, 31, 0.7);
  color: var(--color-texto);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  backdrop-filter: blur(14px);
}

.detalle__volver {
  width: auto;
  height: auto;
  padding: 7px;
  border: 0;
  border-radius: 99px;
  background: var(--color-background-nav-bar);
  backdrop-filter: none;
  box-shadow: none;
  color: var(--color-texto-secundario);
}

.detalle__btn-favorito {
  margin-left: auto;
}

.detalle__btn-favorito[aria-pressed='true'] {
  border-color: rgba(110, 47, 231, 0.28);
  background: rgba(110, 47, 231, 0.16);
  box-shadow: 0 0 0 1px rgba(110, 47, 231, 0.08);
}

.detalle__volver:focus-visible,
.detalle__btn-favorito:focus-visible {
  outline: 2px solid var(--color-acento);
  outline-offset: 2px;
}

/* Duración y Director */
.detalle__datos {
  display: flex;
  gap: 1rem;
  margin: 1.5rem 0;
}

.detalle__dato {
  flex: 1;
  background-color: var(--color-background-nav-bar);
  border-radius: 12px;
  padding: 0.875rem 1rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.75rem;
}

.detalle__dato-texto {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.detalle__dato-label {
  font-size: 0.7rem;
  color: var(--color-texto-secundario);
  font-family: var(--font-medium);
}

.detalle__dato-valor {
  font-size: 0.95rem;
  color: var(--color-texto);
  font-family: var(--font-bold);
}

/* Elenco */
.detalle__elenco {
  display: flex;
  gap: 2rem;
  overflow-x: auto;
  padding-bottom: 0.5rem;
  scrollbar-width: none;
}

.detalle__elenco::-webkit-scrollbar {
  display: none;
}

.detalle__actor {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.375rem;
  min-width: 64px;
}

.detalle__actor-foto {
  width: 75px;
  height: 75px;
  border-radius: 50%;
  object-fit: cover;
  background-color: var(--color-background-nav-bar);
}

.detalle__actor-foto--vacio {
  background-color: var(--color-background-nav-bar);
}

.detalle__actor-nombre {
  font-size: 0.8rem;
  color: var(--color-texto);
  font-family: var(--font-bold);
  text-align: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 70px;
}

.detalle__actor-personaje {
  font-size: 0.7rem;
  color: var(--color-texto-secundario);
  font-family: var(--font-medium);
  text-align: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 70px;
}

/* Plataformas */
.detalle__plataformas {
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
}

.detalle__plataforma-logo {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  object-fit: cover;
}

/* --- Poster --- */
.detalle__poster-wrapper {
  position: relative;
  width: 100%;
  height: 340px;
  margin-bottom: 1rem;
}

.detalle__poster {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.detalle__poster-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 60%;
  background: linear-gradient(to bottom, transparent, var(--color-fondo, #0f0b1f));
  pointer-events: none;
}

/* --- Info principal --- */

.detalle__titulo {
  font-size: 1.5rem;
  font-family: var(--font-bold);
  color: var(--color-texto);
  margin-bottom: 0.5rem;
}

.detalle__meta {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
  font-size: 0.8rem;
  color: var(--color-texto-secundario);
}

.detalle__rating {
  display: flex;
  align-items: center;
  gap: 4px;
  color: var(--color-texto);
}

.detalle__meta > span:not(:last-child)::after {
  content: '•';
  margin-left: 0.5rem;
  color: var(--color-texto-secundario);
}

.detalle__generos {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  margin-bottom: 1.25rem;
}

.detalle__genero-chip {
  padding: 0.375rem 0.875rem;
  border-radius: 999px;
  border: 1px solid rgba(255, 255, 255, 0.16);
  font-size: 0.75rem;
  color: var(--color-texto);
}

/* --- Secciones --- */
.detalle__seccion {
  margin-top: 1.75rem;
}

.detalle__seccion-titulo {
  font-size: 1.2rem;
  font-family: var(--font-bold);
  color: var(--color-texto);
  margin-bottom: 0.75rem;
}

.detalle__sinopsis {
  font-size: 1rem;
  line-height: 1.5;
  color: var(--color-texto-secundario);
}

.detalle__sin-datos {
  font-size: 0.8rem;
  color: var(--color-texto-secundario);
}

/* --- Similares --- */
.detalle__similares {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 30px 20px;
}

.detalle__similares::-webkit-scrollbar {
  display: none;
}

.detalle__similares .tarjeta {
  min-width: 140px;
  flex-shrink: 0;
}

/* ── DESKTOP ── */
@media (min-width: 1024px) {
  .detalle {
    padding-bottom: 3rem;
  }

  /* Header flotante alineado con el padding del contenido */
  .detalle__header {
    top: 2rem;
    left: 3rem;
    right: 3rem;
  }

  /* Hero: poster ancho, a todo el ancho del área de contenido */
  .detalle__poster-wrapper {
    height: clamp(420px, 56vh, 620px);
    margin-bottom: 0;
  }

  .detalle__poster-overlay {
    height: 80%;
  }

  /* Columna centrada única para todo lo que va debajo del hero */
  .detalle__info,
  .detalle__seccion,
  .detalle__datos {
    margin-inline: auto;
    padding-inline: 3rem;
  }

  /* El título "muerde" el degradado del poster, como firma visual */
  .detalle__info {
    position: relative;
    z-index: 2;
    margin-top: -130px;
  }

  .detalle__titulo {
    font-size: 2.75rem;
    max-width: 620px;
    text-shadow: 0 4px 20px rgba(2, 0, 5, 0.65);
  }

  .detalle__meta {
    font-size: 0.9rem;
    text-shadow: 0 2px 10px rgba(2, 0, 5, 0.5);
  }

  .detalle__generos {
    margin-bottom: 1.75rem;
  }

  .detalle__seccion-titulo {
    font-size: 1.35rem;
  }

  .detalle__sinopsis {
    font-size: 1rem;
  }

  .detalle__datos {
    gap: 1.25rem;
  }

  .detalle__elenco {
    gap: 2.5rem;
  }

  .detalle__actor-foto {
    width: 88px;
    height: 88px;
  }

  .detalle__actor-nombre,
  .detalle__actor-personaje {
    max-width: 84px;
  }

  .detalle__similares {
    grid-template-columns: repeat(4, 1fr);
    gap: 32px 24px;
  }
}
</style>
