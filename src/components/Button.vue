<template>
  <button class="button" :style="{ width: width ? width + 'px' : '100%' }">
    <slot></slot>
  </button>
</template>

<script setup>
defineOptions({ name: 'AppButton' })
defineProps({
  width: {
    type: Number,
    required: false,
  },
})
</script>

<style scoped>
.button {
  background-color: var(--color-acento);
  color: var(--color-texto);
  border: none;
  padding: 0.8438rem 0;
  width: 100%;
  max-width: 500px;
  cursor: pointer;
  border-radius: 1rem;
}
</style>
