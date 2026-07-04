<template>
  <div class="detalle detalle--skeleton" aria-hidden="true">
    <div class="detalle__header">
      <div class="detalle__skeleton detalle__skeleton--icon detalle__skeleton--shine" />
      <div class="detalle__skeleton detalle__skeleton--icon detalle__skeleton--shine" />
    </div>

    <div class="detalle__poster-wrapper">
      <div class="detalle__skeleton detalle__skeleton--poster detalle__skeleton--poster-backdrop detalle__skeleton--shine" />
      <div class="detalle__skeleton detalle__skeleton--poster detalle__skeleton--poster-vertical detalle__skeleton--shine" />
      <div class="detalle__poster-overlay" />

      <div class="detalle__info-superpuesta">
        <div class="detalle__skeleton detalle__skeleton--title detalle__skeleton--shine" />
        <div class="detalle__meta">
          <div class="detalle__skeleton detalle__skeleton--meta detalle__skeleton--shine" />
          <div class="detalle__skeleton detalle__skeleton--meta detalle__skeleton--shine" />
          <div class="detalle__skeleton detalle__skeleton--meta detalle__skeleton--shine" />
        </div>
        <div class="detalle__generos">
          <span
            v-for="chip in 3"
            :key="chip"
            class="detalle__skeleton detalle__skeleton--chip detalle__skeleton--shine"
          />
        </div>
        <div class="detalle__skeleton detalle__skeleton--button detalle__skeleton--shine" />
      </div>
    </div>

    <div class="detalle__info">
      <div class="detalle__skeleton detalle__skeleton--title detalle__skeleton--shine" />
      <div class="detalle__meta">
        <div class="detalle__skeleton detalle__skeleton--meta detalle__skeleton--shine" />
        <div class="detalle__skeleton detalle__skeleton--meta detalle__skeleton--shine" />
        <div class="detalle__skeleton detalle__skeleton--meta detalle__skeleton--shine" />
      </div>
      <div class="detalle__generos">
        <span
          v-for="chip in 3"
          :key="`mobile-chip-${chip}`"
          class="detalle__skeleton detalle__skeleton--chip detalle__skeleton--shine"
        />
      </div>
      <div class="detalle__skeleton detalle__skeleton--button detalle__skeleton--shine" />
    </div>

    <section class="detalle__seccion">
      <div class="detalle__skeleton detalle__skeleton--section-title detalle__skeleton--shine" />
      <div class="detalle__skeleton detalle__skeleton--paragraph detalle__skeleton--shine" />
      <div class="detalle__skeleton detalle__skeleton--paragraph detalle__skeleton--shine" />
      <div class="detalle__skeleton detalle__skeleton--paragraph detalle__skeleton--shine" />
    </section>

    <div class="detalle__datos">
      <div class="detalle__dato detalle__dato--skeleton">
        <div class="detalle__skeleton detalle__skeleton--icon-detail detalle__skeleton--shine" />
        <div class="detalle__dato-texto">
          <div class="detalle__skeleton detalle__skeleton--label detalle__skeleton--shine" />
          <div class="detalle__skeleton detalle__skeleton--value detalle__skeleton--shine" />
        </div>
      </div>
      <div class="detalle__dato detalle__dato--skeleton">
        <div class="detalle__skeleton detalle__skeleton--icon-detail detalle__skeleton--shine" />
        <div class="detalle__dato-texto">
          <div class="detalle__skeleton detalle__skeleton--label detalle__skeleton--shine" />
          <div class="detalle__skeleton detalle__skeleton--value detalle__skeleton--shine" />
        </div>
      </div>
    </div>

    <section class="detalle__seccion">
      <div class="detalle__skeleton detalle__skeleton--section-title detalle__skeleton--shine" />
      <div class="detalle__elenco">
        <div v-for="actor in 8" :key="actor" class="detalle__actor">
          <div class="detalle__skeleton detalle__skeleton--avatar detalle__skeleton--shine" />
          <div class="detalle__skeleton detalle__skeleton--name detalle__skeleton--shine" />
          <div class="detalle__skeleton detalle__skeleton--role detalle__skeleton--shine" />
        </div>
      </div>
    </section>

    <section class="detalle__seccion">
      <div class="detalle__skeleton detalle__skeleton--section-title detalle__skeleton--shine" />
      <div class="detalle__plataformas">
        <div v-for="plataforma in 5" :key="plataforma" class="detalle__skeleton detalle__skeleton--platform detalle__skeleton--shine" />
      </div>
    </section>

    <section class="detalle__seccion">
      <div class="detalle__skeleton detalle__skeleton--section-title detalle__skeleton--shine" />
      <div class="detalle__similares">
        <div v-for="similar in 4" :key="similar" class="detalle__skeleton detalle__skeleton--similar-card detalle__skeleton--shine" />
      </div>
    </section>
  </div>
</template>

<script setup>
defineOptions({ name: 'SkeletorDetail' })
</script>

<style scoped>
.detalle--skeleton {
  position: relative;
  padding-bottom: 120px;
}

.detalle__skeleton {
  position: relative;
  overflow: hidden;
  background: linear-gradient(90deg, #1b1823 0%, #262233 50%, #1b1823 100%);
  background-size: 200% 100%;
  border-radius: 999px;
}

.detalle__skeleton--shine::after {
  content: '';
  position: absolute;
  inset: 0;
  transform: translateX(-100%);
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.08), transparent);
  animation: skeleton-shine 1.35s infinite;
}

.detalle__skeleton--icon {
  width: 3rem;
  height: 3rem;
  border-radius: 999px;
}

.detalle__skeleton--poster {
  width: 100%;
  height: 100%;
  border-radius: 0;
}

.detalle__skeleton--poster-vertical {
  display: block;
}

.detalle__skeleton--poster-backdrop {
  display: none;
}

.detalle__skeleton--title {
  width: min(78%, 18rem);
  height: 1.9rem;
  border-radius: 999px;
  margin-bottom: 0.6rem;
}

.detalle__skeleton--meta {
  width: 4.4rem;
  height: 0.85rem;
  border-radius: 999px;
}

.detalle__skeleton--chip {
  width: 5rem;
  height: 1.55rem;
}

.detalle__skeleton--button {
  width: min(100%, 15.5rem);
  height: 2.9rem;
  border-radius: 999px;
}

.detalle__skeleton--section-title {
  width: 9rem;
  height: 1.35rem;
  border-radius: 999px;
  margin-bottom: 0.75rem;
}

.detalle__skeleton--paragraph {
  height: 0.95rem;
  border-radius: 999px;
  margin-bottom: 0.6rem;
}

.detalle__skeleton--paragraph:nth-of-type(2) {
  width: 100%;
}

.detalle__skeleton--paragraph:nth-of-type(3) {
  width: 92%;
}

.detalle__skeleton--paragraph:nth-of-type(4) {
  width: 74%;
  margin-bottom: 0;
}

.detalle__dato--skeleton {
  min-height: 4rem;
}

.detalle__skeleton--icon-detail {
  width: 1.65rem;
  height: 1.65rem;
  border-radius: 999px;
  flex-shrink: 0;
}

.detalle__skeleton--label {
  width: 3.2rem;
  height: 0.65rem;
  border-radius: 999px;
}

.detalle__skeleton--value {
  width: 4.5rem;
  height: 0.95rem;
  border-radius: 999px;
}

.detalle__skeleton--avatar {
  width: 75px;
  height: 75px;
  border-radius: 50%;
}

.detalle__skeleton--name,
.detalle__skeleton--role {
  height: 0.65rem;
  border-radius: 999px;
}

.detalle__skeleton--name {
  width: 4.8rem;
}

.detalle__skeleton--role {
  width: 3.8rem;
}

.detalle__skeleton--platform {
  width: 48px;
  height: 48px;
  border-radius: 50%;
}

.detalle__skeleton--similar-card {
  aspect-ratio: 2 / 3;
  border-radius: 12px;
}

.detalle__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: absolute;
  top: 1.25rem;
  left: 1rem;
  right: 1rem;
  z-index: 2;
}

.detalle__poster-wrapper {
  position: relative;
  width: 100%;
  height: 340px;
  margin-bottom: 1rem;
  overflow: hidden;
}

.detalle__poster-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 60%;
  background: linear-gradient(to bottom, transparent, var(--color-fondo, #0f0b1f));
  pointer-events: none;
}

.detalle__info-superpuesta {
  display: none;
}

.detalle__info {
  margin-inline: 1rem;
}

.detalle__meta {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
  flex-wrap: wrap;
}

.detalle__meta > *:not(:last-child)::after {
  content: '•';
  margin-left: 0.5rem;
  color: var(--color-texto-secundario);
}

.detalle__generos {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  margin-bottom: 1.25rem;
}

.detalle__seccion {
  margin-top: 1.75rem;
  margin-inline: 1rem;
}

.detalle__datos {
  display: flex;
  gap: 1rem;
  margin: 1.5rem 1rem;
}

.detalle__dato {
  flex: 1;
  background-color: var(--color-background-nav-bar);
  border-radius: 12px;
  padding: 0.875rem 1rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.75rem;
}

.detalle__dato-texto {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.detalle__elenco {
  display: flex;
  gap: 2rem;
  overflow-x: auto;
  padding-bottom: 0.5rem;
  scrollbar-width: none;
}

.detalle__elenco::-webkit-scrollbar {
  display: none;
}

.detalle__actor {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.375rem;
  min-width: 64px;
}

.detalle__plataformas {
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
}

.detalle__similares {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 30px 20px;
}

@media (min-width: 768px) {
  .detalle__poster-wrapper {
    height: clamp(420px, 56vh, 620px);
    margin-bottom: 0;
  }

  .detalle__poster-overlay {
    height: 80%;
    background: linear-gradient(to bottom, transparent 20%, #020005 100%);
  }

  .detalle__skeleton--poster-vertical {
    display: none;
  }

  .detalle__skeleton--poster-backdrop {
    display: block;
  }

  .detalle__info-superpuesta {
    display: block;
    position: absolute;
    bottom: 1.5rem;
    left: 1.5rem;
    right: 1.5rem;
    z-index: 2;
  }

  .detalle__info {
    display: none;
  }
}

@media (min-width: 1024px) {
  .detalle--skeleton {
    padding-bottom: 3rem;
  }

  .detalle__header {
    top: 2rem;
    left: 3rem;
    right: 3rem;
  }

  .detalle__datos,
  .detalle__info,
  .detalle__seccion {
    margin-inline: auto;
    padding-inline: 3rem;
  }

  .detalle__info-superpuesta {
    left: 3rem;
    right: 3rem;
  }

  .detalle__skeleton--title {
    width: min(70%, 28rem);
    height: 3rem;
    margin-bottom: 0.8rem;
  }

  .detalle__skeleton--meta {
    width: 5rem;
  }

  .detalle__skeleton--button {
    width: 17rem;
  }

  .detalle__similares {
    grid-template-columns: repeat(4, 1fr);
    gap: 32px 24px;
  }
}

@keyframes skeleton-shine {
  100% {
    transform: translateX(100%);
  }
}
</style>
