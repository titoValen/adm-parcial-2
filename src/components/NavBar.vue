<template>
  <nav class="navbar">
    <RouterLink :to="{ name: 'inicio' }" class="navbar__item">
      <span class="navbar__icono">🏠</span>
      <span class="navbar__label">Inicio</span>
    </RouterLink>
    <RouterLink :to="{ name: 'buscar' }" class="navbar__item">
      <span class="navbar__icono">🔍</span>
      <span class="navbar__label">Buscar</span>
    </RouterLink>
    <RouterLink :to="{ name: 'favoritos' }" class="navbar__item">
      <span class="navbar__icono">♡</span>
      <span class="navbar__label">Favoritos</span>
    </RouterLink>
  </nav>
</template>

<script setup>
import { RouterLink } from 'vue-router'
</script>
