<template>
    <main class="detalle">
        <p v-if="cargando">Cargando...</p>
        <p v-if="error">{{ error }}</p>

        <div v-if="!cargando && pelicula">
            <h1>{{ pelicula.title }}</h1>
            <p>{{ pelicula.overview }}</p>
            <p>Año: {{ pelicula.release_date?.slice(0, 4) }}</p>
            <p>Clasificación: {{ pelicula.adult ? '+18' : 'ATP' }}</p>
            <p>Rating: {{ pelicula.vote_average?.toFixed(1) }}</p>
            <img :src="`https://image.tmdb.org/t/p/w500${pelicula.poster_path}`" :alt="pelicula.title" />

            <h2>Reparto</h2>
            <ul>
                <li v-for="actor in creditos.cast?.slice(0, 10)" :key="actor.id">
                {{ actor.name }} — {{ actor.character }}
                </li>
            </ul>

            <h2>Director</h2>
            <p>{{ director?.name }}</p>

            <h2>Plataformas</h2>
            <p v-if="!plataformas.length">No disponible en Argentina</p>
            <ul>
                <li v-for="plataforma in plataformas" :key="plataforma.provider_id">
                {{ plataforma.provider_name }}
                </li>
            </ul>

            <h2>Películas Similares</h2>
            <ul>
                <li v-for="similar in similares.slice(0, 6)" :key="similar.id">
                <RouterLink :to="{ name: 'detalle-pelicula', params: { id: similar.id } }">
                    {{ similar.title }}
                </RouterLink>
                </li>
            </ul>
        </div>
    </main>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import {
    obtenerDetallePelicula,
    obtenerCreditosPelicula,
    obtenerProveedoresPelicula,
    obtenerPeliculasSimilares,
} from '@/api/tmdb.js'

const ruta = useRoute()
const idPelicula = ruta.params.id

const pelicula = ref(null)
const creditos = ref({})
const plataformas = ref([])
const similares = ref([])
const cargando = ref(false)
const error = ref(null)

const director = computed(() =>
    creditos.value.crew?.find((persona) => persona.job === 'Director'),
)

onMounted(async () => {
    cargando.value = true
    try {
        const [detalle, credito, proveedores, parecidas] = await Promise.all([
            obtenerDetallePelicula(idPelicula),
            obtenerCreditosPelicula(idPelicula),
            obtenerProveedoresPelicula(idPelicula),
            obtenerPeliculasSimilares(idPelicula),
        ])

        pelicula.value = detalle
        creditos.value = credito
        plataformas.value = proveedores.results?.AR?.flatrate || []
        similares.value = parecidas.results || []
    } catch (e) {
        error.value = 'Error al cargar el detalle de la película'
    } finally {
        cargando.value = false
    }
})
</script>