<template>
  <template v-if="rutaActual === 'buscar'">
    <header class="header">
      <h1 class="header__title">Buscar</h1>
      <p class="header__subtitle">Encontra tu próxima película favorita</p>
    </header>
  </template>
  <template v-else-if="rutaActual === 'favoritos'">
    <header class="header">
      <h1 class="header__title">Favoritos</h1>
    </header>
  </template>
  <template v-else-if="rutaActual === 'inicio'">
    <header class="header">
      <h1 class="header__title">
        <figure><img src="@/assets/icon/logo_text.svg" alt="Icono de Flicka con su icono y texto"></figure>
      </h1>
    </header>
  </template>
</template>

<script setup>
defineOptions({ name: 'AppHeader' })

import { computed } from 'vue'
import { useRoute } from 'vue-router'

const ruta = useRoute()
const rutaActual = computed(() => ruta.name)
</script>

<style scoped>
.header {
  margin-bottom: 1.875rem;
}

.header figure img {
  width: clamp(100px, 20vw, 150px);
}

.header__subtitle {
  font-size: 1.125rem;
  color: var(--color-texto-secundario);
}

@media (min-width: 1024px) {
  .header figure {
    display: none;
  }
}
</style>
