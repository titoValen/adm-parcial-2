<template>
  <RouterLink :to="{ name: 'detalle-pelicula', params: { id: pelicula.id } }" class="tarjeta">
    <div class="tarjeta__poster-wrapper">
      <img
        v-if="pelicula.poster_path"
        :src="`https://image.tmdb.org/t/p/w500${pelicula.poster_path}`"
        :alt="pelicula.title"
        class="tarjeta__poster"
      />
      <button type="button" class="tarjeta__favorito" @click.prevent="alternarFavorito">
        <IconNoFavorite v-if="!esFavoritoActual" :width="18" :height="18" />
        <IconFavorite v-else :width="18" :height="18" />
      </button>
      <span class="tarjeta__rating">
        <IconStar :width="11" :height="11" />
        {{ pelicula.vote_average?.toFixed(1) }}
      </span>
    </div>
    <div class="tarjeta__info">
      <h3 class="tarjeta__titulo">{{ pelicula.title }}</h3>
      <span class="tarjeta__anio">{{ pelicula.release_date?.slice(0, 4) }}</span>
    </div>
  </RouterLink>
</template>

<script setup>
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import { agregarFavorito, eliminarFavorito, favoritosReactivos } from '@/stores/favoritos.js'
import IconFavorite from '@/components/icons/IconFavorite.vue'
import IconNoFavorite from '@/components/icons/IconNoFavorite.vue'
import IconStar from '@/components/icons/IconStar.vue'

const props = defineProps({
  pelicula: {
    type: Object,
    required: true,
  },
})

const esFavoritoActual = computed(() =>
  favoritosReactivos.value.some((peliculaFavorita) => peliculaFavorita.id === props.pelicula.id),
)

const alternarFavorito = () => {
  if (esFavoritoActual.value) {
    eliminarFavorito(props.pelicula.id)
  } else {
    agregarFavorito(props.pelicula)
  }
}
</script>


<style scoped>
.tarjeta {
  display: block;
  text-decoration: none;
  color: inherit;
}

.tarjeta__poster-wrapper {
  position: relative;
  border-radius: 12px;
  overflow: hidden;
}

.tarjeta__poster {
  width: 100%;
  aspect-ratio: 2 / 3;
  object-fit: cover;
  display: block;
}

.tarjeta__info {
  margin-top: 8px;
}

.tarjeta__titulo {
  font-size: 16px;
  font-weight: 500;
  color: #dedede;
  margin: 0;
}

.tarjeta__rating {
  position: absolute;
  top: 8px;
  right: 8px;
  display: flex;
  align-items: center;
  gap: 4px;
  background-color: #0c0a17;
  color: #dedede;
  font-size: 12px;
  font-weight: 600;
  padding: 4px 8px;
  border-radius: 999px;
}

.tarjeta__anio {
  display: none;
}

.tarjeta__favorito {
  position: absolute;
  top: 8px;
  left: 8px;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: rgba(0, 0, 0, 0.6);
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

@media (min-width: 1024px) {
  .tarjeta {
    transition: transform 0.2s ease;
  }

  .tarjeta:hover {
    transform: translateY(-4px);
  }

  .tarjeta:hover .tarjeta__poster-wrapper {
    box-shadow: 0 8px 24px 9px rgba(110, 47, 231, 0.25);
  }

  .tarjeta__poster {
    transition: filter 0.2s ease;
  }

  .tarjeta:hover .tarjeta__poster {
    filter: brightness(1.1);
  }
}
</style>
