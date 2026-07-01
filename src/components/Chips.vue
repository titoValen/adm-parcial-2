<template>
  <button class="chips" :class="{ 'chips--active': active }">
    <slot></slot>
  </button>
</template>

<script setup>
defineOptions({ name: 'AppChips' })

defineProps({
  active: {
    type: Boolean,
    default: false
  }
})
</script>

<style scoped>
.chips {
  flex-shrink: 0;
  background-color: var(--color-background-search-bar);
  color: var(--color-texto-secundario);
  border: 1px solid var(--color-texto-secundario);
  padding: 0.5rem 1rem;
  border-radius: 1rem;
  cursor: pointer;
}

.chips--active {
  flex-shrink: 0;
  background-color: var(--color-acento);
  color: var(--color-texto);
  border: 1px solid var(--color-acento);
}
</style>