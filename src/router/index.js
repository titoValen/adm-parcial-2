import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'inicio',
      component: () => import('@/views/HomeView.vue'),
    },
    {
      path: '/pelicula/:id',
      name: 'detalle-pelicula',
      component: () => import('@/views/MovieDetailView.vue'),
    },
    {
      path: '/favoritos',
      name: 'favoritos',
      component: () => import('@/views/FavoritesView.vue'),
    },
  ],
})

export default router