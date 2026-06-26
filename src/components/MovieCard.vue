<template>
  <RouterLink :to="{ name: 'detalle-pelicula', params: { id: pelicula.id } }" class="tarjeta">
    <img
      v-if="pelicula.poster_path"
      :src="`https://image.tmdb.org/t/p/w500${pelicula.poster_path}`"
      :alt="pelicula.title"
      class="tarjeta__poster"
    />
    <div class="tarjeta__info">
      <h3 class="tarjeta__titulo">{{ pelicula.title }}</h3>
      <span class="tarjeta__rating"> {{ pelicula.vote_average?.toFixed(1) }}</span>
      <span class="tarjeta__anio">{{ pelicula.release_date?.slice(0, 4) }}</span>
    </div>
  </RouterLink>
</template>

<script setup>
import { RouterLink } from 'vue-router'

defineProps({
  pelicula: {
    type: Object,
    required: true,
  },
})
</script>
