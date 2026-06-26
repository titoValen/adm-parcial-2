<template>
  <div class="buscador">
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

const emit = defineEmits(['buscar'])

const consulta = ref('')

const alEscribir = () => {
  emit('buscar', consulta.value)
}
</script>
