<template>
  <button class="button" :style="{ width: width ? width + 'px' : '100%' }">
    <span class="button__contenido">
      <slot></slot>
    </span>
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
  box-shadow: 0 0 25px var(--color-acento);
  background: var(--color-acento);
  box-shadow: var(--color-acento) 0px 0px 25px;
  transition: 0.5s;
  transition-property: box-shadow;
  font-family: var(--font-bold);
}
.button__contenido {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  font-family: var(--font-bold);
  font-size: 1rem;
}

  
.button:hover {
  box-shadow: 0 0 5px var(--color-acento),
              0 0 25px var(--color-acento),
              0 0 50px var(--color-acento),
              0 0 100px var(--color-acento);
}
</style>
