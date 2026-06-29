<template>
  <nav class="navbar">
    <RouterLink :to="{ name: 'inicio' }" class="navbar__item">
      <IconHome width="24" height="24" :color="rutaActual === 'inicio' ? '#6e2fe7' : '#7F7F7F'" />
      <span class="navbar__label" :style="{ color: rutaActual === 'inicio' ? '#6e2fe7' : '#7F7F7F' }">Inicio</span>
    </RouterLink>
    <RouterLink :to="{ name: 'buscar' }" class="navbar__item">
      <IconSearch width="24" height="24" :color="rutaActual === 'buscar' ? '#6e2fe7' : '#7F7F7F'" />
      <span class="navbar__label" :style="{ color: rutaActual === 'buscar' ? '#6e2fe7' : '#7F7F7F' }">Buscar</span>
    </RouterLink>
    <RouterLink :to="{ name: 'favoritos' }" class="navbar__item">
      <IconFavorite width="24" height="24" :color="rutaActual === 'favoritos' ? '#6e2fe7' : '#7F7F7F'" />
      <span class="navbar__label" :style="{ color: rutaActual === 'favoritos' ? '#6e2fe7' : '#7F7F7F' }">Favoritos</span>
    </RouterLink>
  </nav>
</template>

<script setup>
import { computed } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import IconHome from '@/components/icons/IconHome.vue'
import IconSearch from '@/components/icons/IconSearch.vue'
import IconFavorite from '@/components/icons/IconFavorite.vue'

const ruta = useRoute()
const rutaActual = computed(() => ruta.name)
</script>
