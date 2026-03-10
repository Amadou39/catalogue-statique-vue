<template>
  <header class="app-header" :class="{ 'scrolled': isScrolled }">

    <!-- Barre de recherche overlay -->
    <Transition name="search-overlay">
      <div v-if="searchOpen" class="search-overlay" @click.self="closeSearch">
        <div class="search-box">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
          </svg>
          <input
            ref="searchInput"
            v-model="searchQuery"
            class="search-input"
            type="text"
            placeholder="Rechercher un produit..."
            @keydown.escape="closeSearch"
            @keydown.enter="goToSearch"
          />
          <button class="search-close" @click="closeSearch">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>
        <!-- Résultats rapides -->
        <div v-if="searchResults.length > 0" class="search-results">
          <RouterLink
            v-for="p in searchResults"
            :key="p.id"
            :to="{ name: 'produit-detail', params: { id: p.id } }"
            class="search-result-item"
            @click="closeSearch"
          >
            <img :src="`/images/${p.image}`" :alt="p.nom" class="search-result-img" />
            <div>
              <p class="search-result-name">{{ p.nom }}</p>
              <p class="search-result-price">{{ p.prix.toFixed(2) }} €</p>
            </div>
          </RouterLink>
        </div>
        <p v-else-if="searchQuery.length > 1" class="search-no-result">Aucun résultat pour "{{ searchQuery }}"</p>
      </div>
    </Transition>

    <nav class="nav-container">
      <!-- Logo -->
      <RouterLink :to="{ name: 'catalogue' }" class="site-logo">
        <span class="logo-main">Habits</span>
        <span class="logo-amp">&</span>
        <span class="logo-sub">Compagnie</span>
      </RouterLink>

      <!-- Navigation centrale -->
      <div class="nav-links">
        <RouterLink :to="{ name: 'catalogue' }" class="nav-link">Collection</RouterLink>
        <span class="nav-separator">·</span>
        <RouterLink :to="{ name: 'about' }" class="nav-link">Notre histoire</RouterLink>
        <span class="nav-separator">·</span>
        <RouterLink :to="{ name: 'wishlist' }" class="nav-link">Favoris</RouterLink>
      </div>

      <!-- Actions droite -->
      <div class="nav-actions">
        <button class="icon-btn" title="Rechercher" @click="openSearch">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
          </svg>
        </button>

        <!-- Favoris -->
        <RouterLink :to="{ name: 'wishlist' }" class="icon-btn" title="Favoris">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
          </svg>
          <Transition name="badge-pop">
            <span v-if="wishlistCount > 0" class="wish-count">{{ wishlistCount }}</span>
          </Transition>
        </RouterLink>

        <!-- Panier -->
        <button class="icon-btn cart-btn" title="Panier" @click="isCartOpen = true">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
            <line x1="3" y1="6" x2="21" y2="6"/>
            <path d="M16 10a4 4 0 0 1-8 0"/>
          </svg>
          <Transition name="badge-pop">
            <span v-if="cartCount > 0" class="cart-count">{{ cartCount }}</span>
          </Transition>
        </button>
      </div>
    </nav>

    <!-- Bandeau promo -->
    <div class="promo-banner">
      <span>✦ Livraison offerte dès 60€ d'achat ✦ Collection Printemps-Été 2026 disponible ✦ Code promo : HABITS10</span>
    </div>
  </header>
</template>

<script setup>
import { ref, computed, nextTick, onMounted, onUnmounted } from 'vue';
import { RouterLink, useRouter } from 'vue-router';
import { useCart } from '@/composables/useCart.js';
import { useWishlist } from '@/composables/useWishlist.js';
import { produits } from '@/data/produits.js';

const { cartCount, isCartOpen } = useCart();
const { wishlistCount } = useWishlist();
const router = useRouter();

// Scroll
const isScrolled = ref(false);
const handleScroll = () => { isScrolled.value = window.scrollY > 20; };
onMounted(() => window.addEventListener('scroll', handleScroll));
onUnmounted(() => window.removeEventListener('scroll', handleScroll));

// Recherche
const searchOpen = ref(false);
const searchQuery = ref('');
const searchInput = ref(null);

const searchResults = computed(() => {
  if (searchQuery.value.length < 2) return [];
  const q = searchQuery.value.toLowerCase();
  return produits.filter(p =>
    p.nom.toLowerCase().includes(q) ||
    p.categorie.toLowerCase().includes(q) ||
    p.description?.toLowerCase().includes(q)
  ).slice(0, 5);
});

const openSearch = async () => {
  searchOpen.value = true;
  await nextTick();
  searchInput.value?.focus();
};

const closeSearch = () => {
  searchOpen.value = false;
  searchQuery.value = '';
};

const goToSearch = () => {
  if (searchResults.value.length === 1) {
    router.push({ name: 'produit-detail', params: { id: searchResults.value[0].id } });
    closeSearch();
  }
};

// Fermer la recherche avec Escape global
onMounted(() => {
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeSearch(); });
});
</script>

<style scoped>
.app-header {
  background-color: rgba(250, 250, 248, 0.95);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-bottom: 1px solid transparent;
  position: sticky;
  top: 0;
  z-index: 1000;
  transition: all 0.35s ease;
}
.app-header.scrolled {
  border-bottom-color: rgba(201, 169, 110, 0.3);
  box-shadow: 0 2px 30px rgba(0,0,0,0.06);
}

.nav-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 40px;
  height: 80px;
}

/* Logo */
.site-logo {
  text-decoration: none;
  display: flex;
  align-items: baseline;
  gap: 4px;
  flex: 1;
}
.logo-main {
  font-family: 'Cormorant Garamond', serif;
  font-size: 1.6em;
  font-weight: 600;
  color: var(--color-noir);
  letter-spacing: 3px;
  text-transform: uppercase;
  transition: color 0.3s;
}
.logo-amp { font-family: 'Cormorant Garamond', serif; font-size: 1.3em; color: var(--color-gold); margin: 0 2px; }
.logo-sub { font-family: 'Cormorant Garamond', serif; font-size: 1.6em; font-weight: 300; color: var(--color-gris); letter-spacing: 3px; text-transform: uppercase; }
.site-logo:hover .logo-main { color: var(--color-gold); }

/* Nav links */
.nav-links { display: flex; align-items: center; gap: 12px; }
.nav-link {
  font-family: 'Inter', sans-serif;
  font-size: 0.75em;
  font-weight: 500;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: var(--color-gris);
  text-decoration: none;
  padding: 4px 0;
  position: relative;
  transition: color 0.3s;
}
.nav-link::after {
  content: ''; position: absolute; bottom: 0; left: 0;
  width: 0; height: 1px; background: var(--color-gold);
  transition: width 0.35s ease;
}
.nav-link:hover, .nav-link.router-link-active { color: var(--color-noir); }
.nav-link:hover::after, .nav-link.router-link-active::after { width: 100%; }
.nav-separator { color: var(--color-gold); opacity: 0.5; }

/* Actions */
.nav-actions { flex: 1; display: flex; align-items: center; justify-content: flex-end; gap: 8px; }
.icon-btn {
  background: none; border: none; cursor: pointer;
  color: var(--color-gris); padding: 8px; border-radius: 50%;
  transition: all 0.3s; display: flex; align-items: center; justify-content: center;
  position: relative; text-decoration: none;
}
.icon-btn:hover { color: var(--color-noir); background: var(--color-gris-clair); }

.cart-count, .wish-count {
  position: absolute; top: 0px; right: 0px;
  background: var(--color-gold); color: white;
  font-family: 'Inter', sans-serif; font-size: 0.55em;
  min-width: 18px; height: 18px; border-radius: 9px;
  display: flex; align-items: center; justify-content: center;
  font-weight: 700; padding: 0 4px;
}
.wish-count { background: #e74c3c; }

.badge-pop-enter-active { animation: badgePop 0.35s cubic-bezier(0.175, 0.885, 0.32, 1.275); }
.badge-pop-leave-active { transition: opacity 0.2s, transform 0.2s; }
.badge-pop-leave-to { opacity: 0; transform: scale(0); }
@keyframes badgePop { from { transform: scale(0); opacity: 0; } to { transform: scale(1); opacity: 1; } }

/* Promo */
.promo-banner {
  background: var(--color-noir); color: var(--color-gold-light);
  text-align: center; padding: 8px;
  font-size: 0.7em; letter-spacing: 2px; text-transform: uppercase;
  font-family: 'Inter', sans-serif; overflow: hidden; white-space: nowrap;
}
.promo-banner span { display: inline-block; animation: scrollText 25s linear infinite; }
@keyframes scrollText { from { transform: translateX(100vw); } to { transform: translateX(-100%); } }

/* ─── Search Overlay ─── */
.search-overlay {
  position: fixed;
  inset: 0;
  background: rgba(13, 13, 13, 0.7);
  backdrop-filter: blur(6px);
  z-index: 2000;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 120px;
  gap: 8px;
}

.search-box {
  width: 100%;
  max-width: 680px;
  display: flex;
  align-items: center;
  gap: 16px;
  background: var(--color-blanc);
  border: 1px solid rgba(201,169,110,0.4);
  border-radius: 2px;
  padding: 18px 24px;
  box-shadow: 0 20px 60px rgba(0,0,0,0.3);
  color: var(--color-gris);
}

.search-input {
  flex: 1;
  border: none;
  outline: none;
  background: transparent;
  font-family: 'Cormorant Garamond', serif;
  font-size: 1.4em;
  color: var(--color-noir);
  letter-spacing: 0.5px;
}
.search-input::placeholder { color: #ccc; }

.search-close {
  background: none; border: none; cursor: pointer;
  color: var(--color-gris); transition: color 0.2s;
  display: flex; align-items: center;
}
.search-close:hover { color: var(--color-noir); }

.search-results {
  width: 100%;
  max-width: 680px;
  background: var(--color-blanc);
  border: 1px solid rgba(201,169,110,0.2);
  border-radius: 2px;
  overflow: hidden;
}

.search-result-item {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 14px 24px;
  text-decoration: none;
  color: var(--color-noir);
  border-bottom: 1px solid var(--color-gris-clair);
  transition: background 0.2s;
}
.search-result-item:last-child { border-bottom: none; }
.search-result-item:hover { background: var(--color-gris-clair); }

.search-result-img {
  width: 44px; height: 56px;
  object-fit: cover; border-radius: 1px;
  background: var(--color-gris-clair);
}

.search-result-name {
  font-family: 'Cormorant Garamond', serif;
  font-size: 1.1em; font-weight: 600;
  color: var(--color-noir);
}
.search-result-price { font-family: 'Inter', sans-serif; font-size: 0.78em; color: var(--color-gold); }

.search-no-result {
  width: 100%; max-width: 680px;
  font-family: 'Inter', sans-serif; font-size: 0.85em;
  color: rgba(255,255,255,0.6); text-align: center; padding: 16px;
}

/* Transitions search */
.search-overlay-enter-active, .search-overlay-leave-active { transition: opacity 0.25s ease; }
.search-overlay-enter-from, .search-overlay-leave-to { opacity: 0; }

@media (max-width: 768px) {
  .nav-links { display: none; }
  .nav-container { padding: 0 20px; }
  .logo-sub { display: none; }
}
</style>