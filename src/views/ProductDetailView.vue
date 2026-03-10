<template>
  <div class="detail-page">
    <!-- Fil d'Ariane -->
    <div class="breadcrumb">
      <RouterLink to="/" class="breadcrumb-link">Catalogue</RouterLink>
      <span class="breadcrumb-sep">›</span>
      <span v-if="produit" class="breadcrumb-current">{{ produit.nom }}</span>
    </div>

    <!-- Contenu principal -->
    <div v-if="produit" class="detail-layout">

      <!-- Colonne gauche : image -->
      <div class="detail-image-col">
        <div class="detail-image-wrap">
          <img :src="`/images/${produit.image}`" :alt="produit.nom" class="detail-img" />
          <span v-if="produit.badge" class="detail-badge">{{ produit.badge }}</span>
        </div>
      </div>

      <!-- Colonne droite : informations -->
      <div class="detail-info-col">

        <div class="detail-head">
          <p class="detail-category">{{ produit.categorie }}</p>
          <h1 class="detail-name">{{ produit.nom }}</h1>
          <div class="detail-price-wrap">
            <span class="detail-price">{{ parseFloat(produit.prix).toFixed(2) }} €</span>
            <span class="detail-tax">TTC — Livraison offerte dès 60€</span>
          </div>
        </div>

        <div class="detail-separator"></div>

        <p class="detail-description">{{ produit.description }}</p>

        <!-- Couleurs -->
        <div class="detail-option" v-if="produit.couleurs && produit.couleurs.length">
          <p class="option-label">
            Couleur : <span class="option-value">{{ selectedColor || 'Sélectionner' }}</span>
          </p>
          <div class="colors-grid">
            <button
              v-for="(couleur, i) in produit.couleurs"
              :key="i"
              class="color-swatch"
              :class="{ active: selectedColor === couleur }"
              :style="{ background: couleur }"
              @click="selectedColor = couleur"
              :title="couleur"
            ></button>
          </div>
        </div>

        <!-- Tailles -->
        <div class="detail-option" v-if="produit.tailles && produit.tailles.length">
          <div class="option-header">
            <p class="option-label">
              Taille : <span class="option-value">{{ selectedTaille || 'Sélectionner' }}</span>
            </p>
            <button class="guide-link">Guide des tailles</button>
          </div>
          <div class="tailles-grid">
            <button
              v-for="taille in produit.tailles"
              :key="taille"
              class="size-btn"
              :class="{ active: selectedTaille === taille }"
              @click="selectedTaille = taille"
            >{{ taille }}</button>
          </div>
        </div>

        <!-- Alerte taille manquante -->
        <Transition name="toast">
          <div v-if="showAlert" class="toast-alert">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
            {{ alertMessage }}
          </div>
        </Transition>

        <!-- CTA -->
        <div class="cta-section">
          <button class="btn-add-cart" @click="handleAddToCart">
            <span>Ajouter au panier</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
              <line x1="3" y1="6" x2="21" y2="6"/>
              <path d="M16 10a4 4 0 0 1-8 0"/>
            </svg>
          </button>

          <!-- Wishlist toggle -->
          <button
            class="btn-wishlist"
            :class="{ 'in-wishlist': isInWishlist(produit.id) }"
            :title="isInWishlist(produit.id) ? 'Retirer des favoris' : 'Ajouter aux favoris'"
            @click="handleToggleWishlist(produit)"
          >
            <svg
              width="18" height="18" viewBox="0 0 24 24"
              :fill="isInWishlist(produit.id) ? 'currentColor' : 'none'"
              stroke="currentColor" stroke-width="1.5"
            >
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
            </svg>
          </button>
        </div>

        <!-- Toast panier -->
        <Transition name="toast">
          <div v-if="showToast" class="toast-notification">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
            Ajouté au panier !
          </div>
        </Transition>

        <!-- Toast wishlist -->
        <Transition name="toast">
          <div v-if="showWishlistToast" class="toast-wishlist">
            <svg width="14" height="14" viewBox="0 0 24 24" :fill="wishlistAdded ? 'currentColor' : 'none'" stroke="currentColor" stroke-width="2">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
            </svg>
            {{ wishlistAdded ? 'Ajouté aux favoris !' : 'Retiré des favoris' }}
          </div>
        </Transition>

        <div class="detail-separator"></div>

        <!-- Réassurances -->
        <div class="reassurances">
          <div class="reassurance-item">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>
            <span>Retours gratuits sous 30 jours</span>
          </div>
          <div class="reassurance-item">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
            <span>Paiement sécurisé par Stripe</span>
          </div>
          <div class="reassurance-item">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
            <span>Matières responsables & éco-sourcées</span>
          </div>
        </div>

        <RouterLink to="/" class="back-link">← Revenir au catalogue</RouterLink>

      </div>
    </div>

    <!-- Produit non trouvé -->
    <div v-else class="not-found">
      <p class="not-found-icon">◯</p>
      <h2>Produit introuvable</h2>
      <RouterLink to="/" class="back-link">← Retour au catalogue</RouterLink>
    </div>

  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { RouterLink } from 'vue-router';
import { produits } from '@/data/produits.js';
import { useCart } from '@/composables/useCart.js';
import { useWishlist } from '@/composables/useWishlist.js';

const props = defineProps({ id: { type: String, required: true } });
const produit = computed(() => produits.find(p => p.id === parseInt(props.id)));

const selectedColor = ref(null);
const selectedTaille = ref(null);
const showToast = ref(false);
const showAlert = ref(false);
const alertMessage = ref('');
const showWishlistToast = ref(false);
const wishlistAdded = ref(false);

const { addItem } = useCart();
const { isInWishlist, toggleWishlist } = useWishlist();

const handleAddToCart = () => {
  if (produit.value.tailles.length > 1 && !selectedTaille.value) {
    alertMessage.value = 'Veuillez sélectionner une taille.';
    showAlert.value = true;
    setTimeout(() => { showAlert.value = false; }, 3000);
    return;
  }
  const taille = selectedTaille.value || produit.value.tailles[0];
  const couleur = selectedColor.value || produit.value.couleurs[0];
  addItem(produit.value, taille, couleur);
  showToast.value = true;
  setTimeout(() => { showToast.value = false; }, 2500);
};

const handleToggleWishlist = (p) => {
  wishlistAdded.value = !isInWishlist(p.id);
  toggleWishlist(p);
  showWishlistToast.value = true;
  setTimeout(() => { showWishlistToast.value = false; }, 2000);
};
</script>

<style scoped>
.detail-page { max-width: 1300px; margin: 0 auto; padding: 40px 40px 100px; animation: fadeInUp 0.5s ease both; }

.breadcrumb { display: flex; align-items: center; gap: 8px; font-family: 'Inter', sans-serif; font-size: 0.72em; letter-spacing: 1.5px; text-transform: uppercase; color: var(--color-gris); margin-bottom: 50px; }
.breadcrumb-link { color: var(--color-gris); text-decoration: none; transition: color 0.3s; }
.breadcrumb-link:hover { color: var(--color-gold); }
.breadcrumb-sep { color: var(--color-gold); opacity: 0.5; }
.breadcrumb-current { color: var(--color-noir); }

.detail-layout { display: grid; grid-template-columns: 1.1fr 0.9fr; gap: 80px; align-items: start; }

.detail-image-wrap { position: relative; border-radius: 2px; overflow: hidden; aspect-ratio: 3/4; background: var(--color-gris-clair); }
.detail-img { width: 100%; height: 100%; object-fit: cover; display: block; transition: transform 0.6s ease; }
.detail-image-wrap:hover .detail-img { transform: scale(1.03); }
.detail-badge { position: absolute; top: 20px; left: 20px; background: var(--color-gold); color: white; font-family: 'Inter', sans-serif; font-size: 0.65em; letter-spacing: 1.5px; text-transform: uppercase; padding: 5px 12px; border-radius: 1px; }

.detail-head { margin-bottom: 24px; }
.detail-category { font-family: 'Inter', sans-serif; font-size: 0.65em; letter-spacing: 3px; text-transform: uppercase; color: var(--color-gold); margin-bottom: 10px; }
.detail-name { font-family: 'Cormorant Garamond', serif; font-size: clamp(2em, 4vw, 3em); font-weight: 700; color: var(--color-noir); line-height: 1.1; margin-bottom: 16px; }
.detail-price-wrap { display: flex; align-items: baseline; gap: 12px; }
.detail-price { font-family: 'Inter', sans-serif; font-size: 1.5em; font-weight: 600; color: var(--color-noir); }
.detail-tax { font-family: 'Inter', sans-serif; font-size: 0.7em; color: var(--color-gris); }

.detail-separator { width: 100%; height: 1px; background: rgba(201, 169, 110, 0.2); margin: 24px 0; }
.detail-description { font-family: 'Inter', sans-serif; font-size: 0.9em; color: #555; line-height: 1.8; margin-bottom: 30px; }

.detail-option { margin-bottom: 28px; }
.option-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; }
.option-label { font-family: 'Inter', sans-serif; font-size: 0.72em; font-weight: 600; letter-spacing: 2px; text-transform: uppercase; color: var(--color-noir); margin-bottom: 12px; }
.option-value { font-weight: 400; color: var(--color-gris); text-transform: none; letter-spacing: 0; }
.guide-link { background: none; border: none; font-family: 'Inter', sans-serif; font-size: 0.68em; color: var(--color-gris); cursor: pointer; text-decoration: underline; text-underline-offset: 3px; transition: color 0.3s; }
.guide-link:hover { color: var(--color-gold); }

.colors-grid { display: flex; gap: 10px; }
.color-swatch { width: 30px; height: 30px; border-radius: 50%; cursor: pointer; border: 2px solid transparent; transition: all 0.25s ease; box-shadow: 0 0 0 1px rgba(0,0,0,0.12); }
.color-swatch:hover { transform: scale(1.15); }
.color-swatch.active { border-color: var(--color-gold); box-shadow: 0 0 0 3px rgba(201, 169, 110, 0.25); }

.tailles-grid { display: flex; flex-wrap: wrap; gap: 10px; }
.size-btn { min-width: 52px; height: 52px; padding: 0 12px; background: #fff; border: 1px solid #ddd; cursor: pointer; font-family: 'Inter', sans-serif; font-size: 0.8em; font-weight: 500; transition: all 0.25s ease; border-radius: 1px; }
.size-btn:hover { border-color: var(--color-noir); background: #f9f9f9; }
.size-btn.active { background: var(--color-noir); color: #fff; border-color: var(--color-noir); }

.cta-section { display: flex; gap: 12px; margin-bottom: 12px; }
.btn-add-cart { flex: 1; display: flex; align-items: center; justify-content: center; gap: 10px; background: var(--color-noir); color: var(--color-gold-light); border: none; padding: 16px 30px; font-family: 'Inter', sans-serif; font-size: 0.8em; font-weight: 600; letter-spacing: 2px; text-transform: uppercase; cursor: pointer; transition: all 0.35s ease; border-radius: 1px; }
.btn-add-cart:hover { background: var(--color-gold); color: #fff; transform: translateY(-2px); box-shadow: 0 8px 24px rgba(201,169,110,0.3); }

.btn-wishlist { width: 54px; height: 54px; background: #fff; border: 1px solid #ddd; cursor: pointer; display: flex; align-items: center; justify-content: center; color: var(--color-gris); transition: all 0.3s; border-radius: 1px; }
.btn-wishlist:hover { border-color: #e74c3c; color: #e74c3c; }
.btn-wishlist.in-wishlist { border-color: #e74c3c; color: #e74c3c; background: #fff5f5; }

.toast-notification { display: flex; align-items: center; gap: 8px; background: var(--color-noir); color: var(--color-gold-light); padding: 12px 20px; font-family: 'Inter', sans-serif; font-size: 0.75em; letter-spacing: 1px; border-radius: 2px; margin-bottom: 4px; }
.toast-alert { display: flex; align-items: center; gap: 8px; background: #fff3cd; color: #856404; border: 1px solid #ffc107; padding: 10px 16px; font-family: 'Inter', sans-serif; font-size: 0.75em; border-radius: 2px; margin-bottom: 4px; }
.toast-wishlist { display: flex; align-items: center; gap: 8px; background: #fff5f5; color: #c0392b; border: 1px solid #fadbd8; padding: 10px 16px; font-family: 'Inter', sans-serif; font-size: 0.75em; border-radius: 2px; margin-bottom: 4px; }
.toast-enter-active, .toast-leave-active { transition: all 0.3s ease; }
.toast-enter-from, .toast-leave-to { opacity: 0; transform: translateY(-8px); }

.reassurances { display: flex; flex-direction: column; gap: 14px; margin-bottom: 30px; }
.reassurance-item { display: flex; align-items: center; gap: 12px; font-family: 'Inter', sans-serif; font-size: 0.78em; color: #555; }
.reassurance-item svg { color: var(--color-gold); flex-shrink: 0; }

.back-link { font-family: 'Inter', sans-serif; font-size: 0.75em; color: var(--color-gris); text-decoration: none; letter-spacing: 1px; transition: color 0.3s; display: inline-block; margin-top: 10px; }
.back-link:hover { color: var(--color-gold); }

.not-found { text-align: center; padding: 100px 20px; color: var(--color-gris); font-family: 'Inter', sans-serif; }
.not-found-icon { font-size: 4em; opacity: 0.2; margin-bottom: 20px; }
.not-found h2 { font-family: 'Cormorant Garamond', serif; font-size: 2em; font-weight: 300; margin-bottom: 20px; color: var(--color-noir); }

@media (max-width: 900px) { .detail-layout { grid-template-columns: 1fr; gap: 40px; } .detail-image-wrap { max-width: 480px; margin: 0 auto; } .detail-page { padding: 30px 20px 80px; } }

@keyframes fadeInUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
</style>