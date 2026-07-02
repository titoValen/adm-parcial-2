<template>
  <RouterLink :to="{ name: 'detalle-pelicula', params: { id: pelicula.id } }" class="tarjeta">
    <div class="tarjeta__poster-wrapper">
      <img
        v-if="pelicula.poster_path"
        :src="`https://image.tmdb.org/t/p/w500${pelicula.poster_path}`"
        :alt="pelicula.title"
        class="tarjeta__poster"
      />
      <span class="tarjeta__rating">
        <IconStar width="11" height="11" />
        {{ pelicula.vote_average?.toFixed(1) }}
      </span>
    </div>
    <div class="tarjeta__info">
      <h3 class="tarjeta__titulo">{{ pelicula.title }}</h3>
    </div>
  </RouterLink>
</template>

<script setup>
import { RouterLink } from 'vue-router'
import IconStar from '@/components/icons/IconStar.vue'

defineProps({
  pelicula: {
    type: Object,
    required: true,
  },
})
</script>


<style scoped>
.tarjeta {
  display: block;
  text-decoration: none;
  color: inherit;
}

.tarjeta__poster-wrapper {
  position: relative;
}

.tarjeta__poster {
  width: 100%;
  aspect-ratio: 2 / 3;
  object-fit: cover;
  border-radius: 12px;
  display: block;
}

.tarjeta__rating {
  position: absolute;
  top: 8px;
  right: 8px;
  display: flex;
  align-items: center;
  gap: 4px;
  background-color: #0c0a17;
  color: #dedede;
  font-size: 12px;
  font-weight: 600;
  padding: 4px 8px;
  border-radius: 999px;
}

.tarjeta__info {
  margin-top: 8px;
}

.tarjeta__titulo {
  font-size: 14px;
  font-weight: 500;
  color: #dedede;
  margin: 0;
}

.tarjeta__anio {
  display: none;
}
</style>