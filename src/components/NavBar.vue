<template>
  <div class="navbar__fade"></div>
  <nav class="navbar">
    <div class="navbar__logo">
      <img src="@/assets/icon/logo_text.svg" alt="Flicka" class="navbar__logo-img" />
    </div>
    <RouterLink :to="{ name: 'inicio' }" class="navbar__item">
      <IconHome :width="24" :height="24" :color="rutaActual === 'inicio' ? '#6e2fe7' : '#7F7F7F'" />
      <span class="navbar__label" :style="{ color: rutaActual === 'inicio' ? '#6e2fe7' : '#7F7F7F' }">Inicio</span>
    </RouterLink>
    <RouterLink :to="{ name: 'buscar' }" class="navbar__item">
      <IconSearch :width="24" :height="24" :color="rutaActual === 'buscar' ? '#6e2fe7' : '#7F7F7F'" />
      <span class="navbar__label" :style="{ color: rutaActual === 'buscar' ? '#6e2fe7' : '#7F7F7F' }">Buscar</span>
    </RouterLink>
    <RouterLink :to="{ name: 'favoritos' }" class="navbar__item">
      <IconFavorite :width="24" :height="24" :color="rutaActual === 'favoritos' ? '#6e2fe7' : '#7F7F7F'" />
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

<style scoped>
/* ── MOBILE (default) ── */
.navbar__fade {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 200px;
  background: linear-gradient(to bottom, transparent, rgba(0, 0, 0, 1) 70%);
  pointer-events: none;
  z-index: 10;
}

.navbar {
  position: fixed;
  bottom: 15px;
  left: 0;
  right: 0;
  width: 90%;
  max-width: 450px;
  margin: 0 auto;

  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;

  background-color: #0c0a17;
  border-radius: 999px;
  padding: 12px 28px;

  z-index: 20;
}

.navbar__logo {
  display: none;
}

.navbar__item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  text-decoration: none;
}

.navbar__label {
  font-size: 12px;
  font-weight: 500;
}

/* ── DESKTOP ── */
@media (min-width: 1024px) {
  .navbar__fade {
    display: none;
  }

  .navbar {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: auto;
    width: 220px;
    max-width: none;
    margin: 0;

    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;

    border-radius: 0;
    padding: 2rem 1.5rem;
    gap: 0.5rem;

    border-right: 1px solid #1a1825;
  }

  .navbar__logo {
    display: block;
    margin-bottom: 2.5rem;
  }

  .navbar__logo-img {
    height: 32px;
  }

  .navbar__item {
    flex-direction: row;
    gap: 0.75rem;
    padding: 0.75rem 1rem;
    border-radius: 12px;
    width: 100%;
  }

  .navbar__item:hover {
    background-color: #1a1825;
  }

  .navbar__label {
    font-size: 15px;
  }
}
</style>