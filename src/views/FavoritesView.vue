<template>
  <main class="favoritos">
    

    <div v-if="peliculas.length === 0" class="favoritos__vacio">
      <IconNoFavorite width="149" height="110" />
      <p class="favoritos__vacio-titulo">No tenés ninguna película en favoritos</p>
      <p class="favoritos__vacio-subtitulo">Las películas que agregues a favoritos aparecerán acá</p>
      <AppButton @click="irABuscar">Explorar películas</AppButton>
    </div>

    <div v-else class="favoritos__grilla">
      <MovieCard v-for="pelicula in peliculas" :key="pelicula.id" :pelicula="pelicula" />
    </div>
  </main>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { obtenerFavoritos } from '@/stores/favoritos.js'
import MovieCard from '@/components/MovieCard.vue'
import AppButton from '@/components/Button.vue'
import IconNoFavorite from '@/components/icons/IconNoFavorite.vue'

const enrutador = useRouter()
const peliculas = ref([])

const irABuscar = () => enrutador.push({ name: 'buscar' })

onMounted(() => {
  peliculas.value = obtenerFavoritos()
})
</script>