<template>
  <div class="skeleton-card" aria-hidden="true">
    <div class="skeleton-card__poster-wrapper">
      <div class="skeleton-card__poster skeleton-card__shine"></div>
      <div class="skeleton-card__badge skeleton-card__badge--left skeleton-card__shine"></div>
      <div class="skeleton-card__badge skeleton-card__badge--right skeleton-card__shine"></div>
    </div>
    <div class="skeleton-card__info">
      <div class="skeleton-card__title skeleton-card__shine"></div>
      <div class="skeleton-card__year skeleton-card__shine"></div>
    </div>
  </div>
</template>

<script setup>
</script>

<style scoped>
.skeleton-card {
  display: block;
}

.skeleton-card__poster-wrapper {
  position: relative;
  border-radius: 12px;
  overflow: hidden;
  aspect-ratio: 2 / 3;
  background: #15131d;
}

.skeleton-card__poster {
  width: 100%;
  height: 100%;
  border-radius: inherit;
  background: linear-gradient(90deg, #1b1823 0%, #262233 50%, #1b1823 100%);
  background-size: 200% 100%;
}

.skeleton-card__badge {
  position: absolute;
  top: 8px;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: linear-gradient(90deg, #1b1823 0%, #262233 50%, #1b1823 100%);
  background-size: 200% 100%;
}

.skeleton-card__badge--left {
  left: 8px;
}

.skeleton-card__badge--right {
  right: 8px;
  width: 48px;
  height: 22px;
  border-radius: 999px;
  top: 12px;
}

.skeleton-card__info {
  margin-top: 8px;
}

.skeleton-card__title {
  width: 78%;
  height: 16px;
  border-radius: 999px;
  background: linear-gradient(90deg, #1b1823 0%, #262233 50%, #1b1823 100%);
  background-size: 200% 100%;
}

.skeleton-card__year {
  width: 40%;
  height: 12px;
  margin-top: 8px;
  border-radius: 999px;
  background: linear-gradient(90deg, #1b1823 0%, #262233 50%, #1b1823 100%);
  background-size: 200% 100%;
}

.skeleton-card__shine {
  position: relative;
  overflow: hidden;
}

.skeleton-card__shine::after {
  content: '';
  position: absolute;
  inset: 0;
  transform: translateX(-100%);
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.08), transparent);
  animation: skeleton-shine 1.35s infinite;
}

@keyframes skeleton-shine {
  100% {
    transform: translateX(100%);
  }
}
</style>