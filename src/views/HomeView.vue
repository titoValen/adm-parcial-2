<template>
  <main class="inicio">
    <h1 class="inicio__titulo">Películas más populares</h1>
    <p v-if="cargando">Cargando...</p>
    <p v-if="error">{{ error }}</p>
    <div v-if="!cargando" class="inicio__grilla">
      <MovieCard v-for="pelicula in peliculas" :key="pelicula.id" :pelicula="pelicula" />
    </div>
  </main>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { obtenerPeliculasPopulares } from '@/api/tmdb.js'
import MovieCard from '@/components/MovieCard.vue'

const peliculas = ref([])
const cargando = ref(false)

onMounted(async () => {
  cargando.value = true
  try {
    const datos = await obtenerPeliculasPopulares()
    peliculas.value = datos.results
  } catch {
    console.error('Error al cargar las películas')
  } finally {
    cargando.value = false
  }
})
</script>


<style scoped>
.inicio {
  padding-bottom: 120px;
  padding: 2rem 2.5rem 120px;
}

.inicio__titulo {
  font-size: 25px;
  font-weight: 700;
  color: #dedede;
  margin-bottom: 20px;
}

.inicio__grilla {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 30px 20px;
}

@media (min-width: 1024px) {
  .inicio {
    padding: 2rem 2.5rem 2rem;
  }

  .inicio__grilla {
    grid-template-columns: repeat(5, 1fr);
    gap: 30px 20px;
  }
}
</style>
