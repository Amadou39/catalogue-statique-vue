<template>
  <div class="wishlist-page">
    <!-- Hero minimal -->
    <div class="wishlist-hero">
      <p class="hero-overline">Mes favoris</p>
      <h1 class="hero-title">Liste de souhaits</h1>
      <p class="hero-sub">{{ wishlistItems.length }} article{{ wishlistItems.length !== 1 ? 's' : '' }} sauvegardé{{ wishlistItems.length !== 1 ? 's' : '' }}</p>
    </div>

    <!-- Liste vide -->
    <div v-if="wishlistItems.length === 0" class="empty-state">
      <div class="empty-heart">
        <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1">
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
        </svg>
      </div>
      <h2>Votre liste de souhaits est vide</h2>
      <p>Ajoutez des produits en cliquant sur le cœur ♡ sur leurs pages.</p>
      <RouterLink to="/" class="btn-catalogue">Explorer la collection</RouterLink>
    </div>

    <!-- Grille produits favoris -->
    <div v-else class="wishlist-grid">
      <div v-for="produit in wishlistItems" :key="produit.id" class="wish-card">
        <RouterLink :to="{ name: 'produit-detail', params: { id: produit.id } }" class="wish-card-link">
          <div class="wish-img-wrap">
            <img :src="`/images/${produit.image}`" :alt="produit.nom" class="wish-img" />
          </div>
          <div class="wish-info">
            <span class="wish-category">{{ produit.categorie }}</span>
            <h3 class="wish-name">{{ produit.nom }}</h3>
            <p class="wish-price">{{ produit.prix.toFixed(2) }} €</p>
          </div>
        </RouterLink>
        <button class="wish-remove" @click="removeFromWishlist(produit.id)" title="Retirer des favoris">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>
      </div>
    </div>

    <RouterLink to="/" class="back-link">← Retour au catalogue</RouterLink>
  </div>
</template>

<script setup>
import { RouterLink } from 'vue-router';
import { useWishlist } from '@/composables/useWishlist.js';
const { wishlistItems, removeFromWishlist } = useWishlist();
</script>

<style scoped>
.wishlist-page {
  max-width: 1300px;
  margin: 0 auto;
  padding: 60px 40px 100px;
  animation: fadeInUp 0.5s ease both;
}

.wishlist-hero {
  text-align: center;
  margin-bottom: 60px;
}
.hero-overline {
  font-family: 'Inter', sans-serif;
  font-size: 0.7em; letter-spacing: 4px; text-transform: uppercase;
  color: var(--color-gold); margin-bottom: 12px;
}
.hero-title {
  font-family: 'Cormorant Garamond', serif;
  font-size: clamp(2.5em, 6vw, 4em); font-weight: 300;
  font-style: italic; color: var(--color-noir); margin-bottom: 10px;
}
.hero-sub {
  font-family: 'Inter', sans-serif; font-size: 0.8em;
  color: var(--color-gris); letter-spacing: 1px;
}

/* Empty state */
.empty-state {
  text-align: center; padding: 80px 20px;
  display: flex; flex-direction: column; align-items: center; gap: 16px;
}
.empty-heart { color: var(--color-gris); opacity: 0.25; }
.empty-state h2 {
  font-family: 'Cormorant Garamond', serif;
  font-size: 1.8em; font-weight: 400; color: var(--color-noir);
}
.empty-state p {
  font-family: 'Inter', sans-serif; font-size: 0.85em; color: var(--color-gris);
}

.btn-catalogue {
  display: inline-block; margin-top: 10px;
  background: var(--color-noir); color: var(--color-gold-light);
  text-decoration: none; padding: 14px 32px;
  font-family: 'Inter', sans-serif; font-size: 0.78em;
  font-weight: 600; letter-spacing: 2px; text-transform: uppercase;
  border-radius: 1px; transition: all 0.35s;
}
.btn-catalogue:hover { background: var(--color-gold); color: #fff; transform: translateY(-2px); }

/* Grille */
.wishlist-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 32px 24px;
  margin-bottom: 60px;
}

.wish-card {
  position: relative;
  animation: fadeInUp 0.4s ease both;
}
.wish-card-link { display: block; text-decoration: none; color: inherit; }

.wish-img-wrap {
  aspect-ratio: 3/4; overflow: hidden;
  border-radius: 2px; background: var(--color-gris-clair);
}
.wish-img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.5s ease; }
.wish-card:hover .wish-img { transform: scale(1.04); }

.wish-info { padding: 14px 4px 8px; }
.wish-category {
  font-family: 'Inter', sans-serif; font-size: 0.62em;
  color: var(--color-gold); letter-spacing: 2px; text-transform: uppercase;
}
.wish-name {
  font-family: 'Cormorant Garamond', serif;
  font-size: 1.2em; font-weight: 600;
  color: var(--color-noir); margin: 4px 0;
}
.wish-price {
  font-family: 'Inter', sans-serif; font-size: 0.88em;
  font-weight: 600; color: var(--color-noir);
}

.wish-remove {
  position: absolute; top: 12px; right: 12px;
  background: rgba(255,255,255,0.9); border: none;
  width: 32px; height: 32px; border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  cursor: pointer; color: var(--color-gris);
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  transition: all 0.25s;
}
.wish-remove:hover { background: #fff; color: #e74c3c; transform: scale(1.1); }

.back-link {
  font-family: 'Inter', sans-serif; font-size: 0.75em;
  color: var(--color-gris); text-decoration: none;
  letter-spacing: 1px; transition: color 0.3s; display: inline-block;
}
.back-link:hover { color: var(--color-gold); }

@media (max-width: 900px) { .wishlist-grid { grid-template-columns: repeat(2, 1fr); } }
@media (max-width: 480px) { .wishlist-page { padding: 40px 16px 80px; } }

@keyframes fadeInUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
</style>
