<template>
    <main class="inicio">
        <h1>Películas Populares</h1>
        <p v-if="cargando">Cargando...</p>
        <p v-if="error">{{ error }}</p>
        <ul v-if="!cargando">
        <li v-for="pelicula in peliculas" :key="pelicula.id">
            <RouterLink :to="{ name: 'detalle-pelicula', params: { id: pelicula.id } }">
            {{ pelicula.title }}
            </RouterLink>
        </li>
        </ul>
    </main>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { obtenerPeliculasPopulares } from '@/api/tmdb.js'

const peliculas = ref([])
const cargando = ref(false)
const error = ref(null)

onMounted(async () => {
    cargando.value = true
    try {
        const datos = await obtenerPeliculasPopulares()
        peliculas.value = datos.results
    } catch (e) {
        error.value = 'Error al cargar las películas'
    } finally {
        cargando.value = false
    }
})
</script>