<template>
  <div class="product-card" @mouseenter="hovered = true" @mouseleave="hovered = false">
    <RouterLink :to="{ name: 'produit-detail', params: { id: produit.id } }" class="card-link">

      <!-- Badge -->
      <span v-if="produit.badge" class="product-badge">{{ produit.badge }}</span>

      <!-- Image -->
      <div class="card-image-wrapper">
        <img
          :src="`/images/${produit.image}`"
          :alt="produit.nom"
          class="card-img"
          loading="lazy"
        />
        <div class="card-overlay">
          <span class="overlay-cta">Voir le produit</span>
        </div>
      </div>

      <!-- Infos produit -->
      <div class="card-body">
        <div class="card-category">{{ produit.categorie }}</div>
        <h3 class="card-name">{{ produit.nom }}</h3>
        <div class="card-footer">
          <span class="card-price">{{ produit.prix.toFixed(2) }} €</span>
          <!-- Pastilles couleurs -->
          <div class="color-dots" v-if="produit.couleurs">
            <span
              v-for="(couleur, i) in produit.couleurs.slice(0, 3)"
              :key="i"
              class="color-dot"
              :style="{ background: couleur }"
              :title="couleur"
            ></span>
          </div>
        </div>
      </div>

    </RouterLink>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { RouterLink } from 'vue-router';

defineProps({
  produit: { type: Object, required: true }
});

const hovered = ref(false);
</script>

<style scoped>
.product-card {
  position: relative;
  animation: fadeInUp 0.5s ease both;
}

.card-link {
  display: block;
  text-decoration: none;
  color: inherit;
}

/* Badge */
.product-badge {
  position: absolute;
  top: 14px;
  left: 14px;
  z-index: 2;
  background: var(--color-gold);
  color: #fff;
  font-family: 'Inter', sans-serif;
  font-size: 0.6em;
  font-weight: 600;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  padding: 4px 10px;
  border-radius: 1px;
}

/* Image */
.card-image-wrapper {
  position: relative;
  overflow: hidden;
  aspect-ratio: 3/4;
  background: var(--color-gris-clair);
  border-radius: 2px;
}

.card-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  display: block;
}

.product-card:hover .card-img {
  transform: scale(1.06);
}

/* Overlay */
.card-overlay {
  position: absolute;
  inset: 0;
  background: rgba(13, 13, 13, 0.42);
  display: flex;
  align-items: flex-end;
  justify-content: center;
  padding-bottom: 28px;
  opacity: 0;
  transition: opacity 0.35s ease;
}

.product-card:hover .card-overlay {
  opacity: 1;
}

.overlay-cta {
  font-family: 'Inter', sans-serif;
  font-size: 0.7em;
  font-weight: 600;
  letter-spacing: 2.5px;
  text-transform: uppercase;
  color: #fff;
  border-bottom: 1px solid var(--color-gold);
  padding-bottom: 3px;
  transform: translateY(8px);
  transition: transform 0.35s ease;
}

.product-card:hover .overlay-cta {
  transform: translateY(0);
}

/* Body */
.card-body {
  padding: 16px 4px 8px;
}

.card-category {
  font-size: 0.65em;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: var(--color-gold);
  font-weight: 500;
  margin-bottom: 6px;
  font-family: 'Inter', sans-serif;
}

.card-name {
  font-family: 'Cormorant Garamond', serif;
  font-size: 1.25em;
  font-weight: 600;
  color: var(--color-noir);
  margin-bottom: 10px;
  letter-spacing: 0.5px;
}

.card-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.card-price {
  font-family: 'Inter', sans-serif;
  font-size: 0.9em;
  font-weight: 600;
  color: var(--color-noir);
}

/* Pastilles couleurs */
.color-dots {
  display: flex;
  gap: 5px;
}

.color-dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  border: 1.5px solid rgba(0,0,0,0.12);
  cursor: pointer;
  transition: transform 0.2s;
}
.color-dot:hover { transform: scale(1.3); }

@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(24px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>