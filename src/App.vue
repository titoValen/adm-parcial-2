<script setup>
import { RouterView } from 'vue-router'
import NavBar from '@/components/NavBar.vue'
import Header from './components/Header.vue'
</script>

<template>
  <Header />
  <NavBar />
  <Transition>
    <RouterView />
  </Transition>
</template>

<style scope>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
