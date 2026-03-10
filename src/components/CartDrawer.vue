<template>
  <!-- Overlay -->
  <Transition name="overlay-fade">
    <div v-if="isCartOpen" class="cart-overlay" @click="isCartOpen = false"></div>
  </Transition>

  <!-- Drawer -->
  <Transition name="drawer-slide">
    <aside v-if="isCartOpen" class="cart-drawer">

      <!-- Header drawer -->
      <div class="drawer-header">
        <div class="drawer-title-wrap">
          <h2 class="drawer-title">Mon Panier</h2>
          <span class="drawer-count" v-if="cartCount > 0">{{ cartCount }}</span>
        </div>
        <button class="drawer-close" @click="isCartOpen = false" aria-label="Fermer">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <line x1="18" y1="6" x2="6" y2="18"/>
            <line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>
      </div>

      <div class="drawer-line"></div>

      <!-- Panier vide -->
      <div v-if="cartItems.length === 0" class="drawer-empty">
        <div class="empty-icon">
          <svg width="52" height="52" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1">
            <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
            <line x1="3" y1="6" x2="21" y2="6"/>
            <path d="M16 10a4 4 0 0 1-8 0"/>
          </svg>
        </div>
        <p class="empty-text">Votre panier est vide</p>
        <button class="btn-continue" @click="isCartOpen = false">Continuer mes achats</button>
      </div>

      <!-- Liste articles -->
      <div v-else class="drawer-items">
        <div v-for="item in cartItems" :key="item.key" class="cart-item">
          <!-- Image -->
          <div class="item-image-wrap">
            <img :src="`/images/${item.produit.image}`" :alt="item.produit.nom" class="item-img" />
          </div>

          <!-- Détails -->
          <div class="item-details">
            <div class="item-head">
              <span class="item-category">{{ item.produit.categorie }}</span>
              <button class="item-remove" @click="removeItem(item.key)" title="Supprimer">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
              </button>
            </div>
            <p class="item-name">{{ item.produit.nom }}</p>
            <div class="item-meta">
              <span v-if="item.taille && item.taille !== 'Sélectionner'" class="item-tag">{{ item.taille }}</span>
              <span
                v-if="item.couleur"
                class="item-color-dot"
                :style="{ background: item.couleur }"
              ></span>
            </div>
            <div class="item-footer">
              <!-- Quantité -->
              <div class="qty-control">
                <button class="qty-btn" @click="updateQty(item.key, -1)">−</button>
                <span class="qty-value">{{ item.qty }}</span>
                <button class="qty-btn" @click="updateQty(item.key, +1)">+</button>
              </div>
              <span class="item-price">{{ (item.produit.prix * item.qty).toFixed(2) }} €</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Pied du drawer -->
      <div v-if="cartItems.length > 0" class="drawer-footer">
        <div class="drawer-line"></div>

        <div class="subtotal-row">
          <span class="subtotal-label">Sous-total</span>
          <span class="subtotal-value">{{ cartTotal.toFixed(2) }} €</span>
        </div>
        <p class="subtotal-note">Frais de livraison calculés à l'étape suivante</p>

        <RouterLink to="/checkout" class="btn-checkout" @click="isCartOpen = false">
          Procéder au paiement
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="5" y1="12" x2="19" y2="12"/>
            <polyline points="12 5 19 12 12 19"/>
          </svg>
        </RouterLink>

        <button class="btn-continue-shopping" @click="isCartOpen = false">
          ← Continuer mes achats
        </button>
      </div>

    </aside>
  </Transition>
</template>

<script setup>
import { RouterLink } from 'vue-router';
import { useCart } from '@/composables/useCart.js';

const { cartItems, cartCount, cartTotal, isCartOpen, updateQty, removeItem } = useCart();
</script>

<style scoped>
/* Overlay */
.cart-overlay {
  position: fixed;
  inset: 0;
  background: rgba(13, 13, 13, 0.55);
  z-index: 1100;
  backdrop-filter: blur(2px);
}

/* Drawer */
.cart-drawer {
  position: fixed;
  top: 0;
  right: 0;
  width: 420px;
  max-width: 100vw;
  height: 100dvh;
  background: var(--color-blanc);
  z-index: 1200;
  display: flex;
  flex-direction: column;
  box-shadow: -8px 0 40px rgba(0,0,0,0.12);
}

/* Header */
.drawer-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 28px 28px 20px;
}

.drawer-title-wrap {
  display: flex;
  align-items: center;
  gap: 10px;
}

.drawer-title {
  font-family: 'Cormorant Garamond', serif;
  font-size: 1.5em;
  font-weight: 600;
  color: var(--color-noir);
  letter-spacing: 0.5px;
}

.drawer-count {
  background: var(--color-gold);
  color: white;
  font-family: 'Inter', sans-serif;
  font-size: 0.65em;
  font-weight: 700;
  min-width: 22px;
  height: 22px;
  border-radius: 11px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 6px;
}

.drawer-close {
  background: none;
  border: none;
  cursor: pointer;
  color: var(--color-gris);
  padding: 6px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s;
}
.drawer-close:hover {
  background: var(--color-gris-clair);
  color: var(--color-noir);
}

.drawer-line {
  height: 1px;
  background: rgba(201, 169, 110, 0.2);
  margin: 0 28px;
}

/* Panier vide */
.drawer-empty {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
  padding: 40px;
  text-align: center;
}

.empty-icon {
  color: var(--color-gris);
  opacity: 0.3;
}

.empty-text {
  font-family: 'Cormorant Garamond', serif;
  font-size: 1.3em;
  font-weight: 300;
  color: var(--color-gris);
}

.btn-continue {
  background: var(--color-noir);
  color: var(--color-gold-light);
  border: none;
  padding: 12px 28px;
  font-family: 'Inter', sans-serif;
  font-size: 0.72em;
  font-weight: 600;
  letter-spacing: 2px;
  text-transform: uppercase;
  cursor: pointer;
  border-radius: 1px;
  transition: all 0.3s;
}
.btn-continue:hover {
  background: var(--color-gold);
  transform: translateY(-1px);
}

/* Articles */
.drawer-items {
  flex: 1;
  overflow-y: auto;
  padding: 20px 28px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.cart-item {
  display: flex;
  gap: 14px;
  padding-bottom: 20px;
  border-bottom: 1px solid var(--color-gris-clair);
}
.cart-item:last-child { border-bottom: none; }

.item-image-wrap {
  width: 80px;
  height: 100px;
  border-radius: 2px;
  overflow: hidden;
  flex-shrink: 0;
  background: var(--color-gris-clair);
}

.item-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.item-details {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.item-head {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.item-category {
  font-family: 'Inter', sans-serif;
  font-size: 0.6em;
  color: var(--color-gold);
  letter-spacing: 2px;
  text-transform: uppercase;
  font-weight: 500;
}

.item-remove {
  background: none;
  border: none;
  cursor: pointer;
  color: #bbb;
  padding: 2px;
  display: flex;
  align-items: center;
  transition: color 0.2s;
}
.item-remove:hover { color: #e74c3c; }

.item-name {
  font-family: 'Cormorant Garamond', serif;
  font-size: 1.05em;
  font-weight: 600;
  color: var(--color-noir);
}

.item-meta {
  display: flex;
  align-items: center;
  gap: 8px;
}

.item-tag {
  font-family: 'Inter', sans-serif;
  font-size: 0.65em;
  color: var(--color-gris);
  background: var(--color-gris-clair);
  padding: 2px 8px;
  border-radius: 2px;
}

.item-color-dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  border: 1.5px solid rgba(0,0,0,0.12);
}

.item-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: auto;
  padding-top: 8px;
}

/* Quantité */
.qty-control {
  display: flex;
  align-items: center;
  border: 1px solid #e0e0e0;
  border-radius: 2px;
  overflow: hidden;
}

.qty-btn {
  background: none;
  border: none;
  width: 28px;
  height: 28px;
  cursor: pointer;
  font-size: 1em;
  color: var(--color-gris);
  transition: all 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
}
.qty-btn:hover { background: var(--color-gris-clair); color: var(--color-noir); }

.qty-value {
  font-family: 'Inter', sans-serif;
  font-size: 0.85em;
  font-weight: 600;
  width: 28px;
  text-align: center;
  color: var(--color-noir);
}

.item-price {
  font-family: 'Inter', sans-serif;
  font-size: 0.9em;
  font-weight: 600;
  color: var(--color-noir);
}

/* Footer */
.drawer-footer {
  padding: 20px 28px 32px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.subtotal-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 0;
}

.subtotal-label {
  font-family: 'Inter', sans-serif;
  font-size: 0.75em;
  font-weight: 500;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  color: var(--color-noir);
}

.subtotal-value {
  font-family: 'Cormorant Garamond', serif;
  font-size: 1.4em;
  font-weight: 700;
  color: var(--color-noir);
}

.subtotal-note {
  font-family: 'Inter', sans-serif;
  font-size: 0.68em;
  color: var(--color-gris);
  text-align: center;
  margin-top: -4px;
}

.btn-checkout {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  background: var(--color-noir);
  color: var(--color-gold-light);
  text-decoration: none;
  padding: 16px 24px;
  font-family: 'Inter', sans-serif;
  font-size: 0.8em;
  font-weight: 600;
  letter-spacing: 2px;
  text-transform: uppercase;
  border-radius: 1px;
  transition: all 0.35s;
}
.btn-checkout:hover {
  background: var(--color-gold);
  color: #fff;
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(201,169,110,0.35);
}

.btn-continue-shopping {
  background: none;
  border: none;
  color: var(--color-gris);
  font-family: 'Inter', sans-serif;
  font-size: 0.72em;
  cursor: pointer;
  text-align: center;
  padding: 4px;
  transition: color 0.3s;
}
.btn-continue-shopping:hover { color: var(--color-noir); }

/* Transitions */
.overlay-fade-enter-active,
.overlay-fade-leave-active { transition: opacity 0.35s ease; }
.overlay-fade-enter-from,
.overlay-fade-leave-to { opacity: 0; }

.drawer-slide-enter-active,
.drawer-slide-leave-active { transition: transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94); }
.drawer-slide-enter-from,
.drawer-slide-leave-to { transform: translateX(100%); }

@media (max-width: 460px) {
  .cart-drawer { width: 100vw; }
}
</style>
