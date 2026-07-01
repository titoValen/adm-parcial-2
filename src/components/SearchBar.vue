<template>
  <div class="buscador">
    <IconSearch :width="25" :height="25" class="buscador__icon" />
    <input
      v-model="consulta"
      type="text"
      placeholder="Buscar película..."
      class="buscador__input"
      @input="alEscribir"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import IconSearch from './icons/IconSearch.vue'

const emit = defineEmits(['buscar'])

const consulta = ref('')

const alEscribir = () => {
  emit('buscar', consulta.value)
}
</script>

<style scoped>
.buscador {
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
}

.buscador__icon {
  position: absolute;
  margin-left: 0.5rem;
}

.buscador__input {
  max-width: 600px;
  width: 100%;
  border-radius: 1rem;
  border: 1px solid transparent;
  background-color: var(--color-background-search-bar);
  color: var(--color-texto);
  font-size: 1rem;
  padding: 0.5rem 1rem 0.5rem 2.25rem;
}

.buscador__input::placeholder {
  color: var(--color-texto-secundario);
}

.buscador__input:focus {
  outline: none;
  border-color: var(--color-texto-secundario);
}
</style>
