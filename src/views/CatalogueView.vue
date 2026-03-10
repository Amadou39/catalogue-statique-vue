<template>
  <div class="catalogue-container">

    <!-- Hero Section -->
    <section class="hero-section">
      <div class="hero-bg">
        <div class="hero-line hero-line-1"></div>
        <div class="hero-line hero-line-2"></div>
        <div class="hero-line hero-line-3"></div>
      </div>
      <div class="hero-content">
        <p class="hero-overtitle">Collection Printemps — Été 2026</p>
        <h1 class="hero-title">
          <span class="hero-title-thin">Nouvelle</span>
          <span class="hero-title-bold">Collection</span>
        </h1>
        <p class="hero-desc">L'élégance intemporelle redéfinie pour l'ère contemporaine</p>
        <div class="hero-cta-group">
          <button class="hero-cta-primary" @click="scrollToProducts">Découvrir</button>
          <span class="hero-cta-separator"></span>
          <RouterLink :to="{ name: 'about' }" class="hero-cta-ghost">Notre histoire</RouterLink>
        </div>
      </div>
      <div class="hero-scroll-hint">
        <span>Scroll</span>
        <div class="scroll-line"></div>
      </div>
    </section>

    <!-- Filtres avancés + Compteur -->
    <div class="catalogue-controls" ref="productsSection">

      <!-- Catégories -->
      <CategoryFilter
          :categories="['Tout', 'Vêtements', 'Accessoires']"
          :activeCategory="selectedCategory"
          @filter-change="updateCategory"
      />

      <!-- Filtres avancés (toggle) -->
      <div class="advanced-filter-bar">
        <button class="filter-toggle" @click="showAdvanced = !showAdvanced">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="4" y1="6" x2="20" y2="6"/><line x1="8" y1="12" x2="16" y2="12"/><line x1="11" y1="18" x2="13" y2="18"/></svg>
          Filtres avancés
          <span v-if="hasActiveFilters" class="filter-active-dot"></span>
        </button>

        <Transition name="filters-anim">
          <div v-if="showAdvanced" class="advanced-filters">
            <!-- Prix -->
            <div class="filter-group">
              <label class="filter-group-label">Prix max : <strong>{{ priceMax }} €</strong></label>
              <input type="range" v-model.number="priceMax" :min="0" :max="100" step="5" class="price-range" />
              <div class="range-labels"><span>0 €</span><span>100 €</span></div>
            </div>

            <!-- Tailles -->
            <div class="filter-group">
              <label class="filter-group-label">Taille</label>
              <div class="size-chips">
                <button
                  v-for="t in allSizes"
                  :key="t"
                  class="size-chip"
                  :class="{ active: selectedSizes.includes(t) }"
                  @click="toggleSize(t)"
                >{{ t }}</button>
              </div>
            </div>

            <!-- Reset -->
            <button v-if="hasActiveFilters" class="reset-filters" @click="resetFilters">
              Réinitialiser les filtres
            </button>
          </div>
        </Transition>
      </div>

      <div class="meta-count-wrap">
        <span class="meta-count">{{ produitsFiltres.length }} pièce{{ produitsFiltres.length !== 1 ? 's' : '' }}</span>
      </div>
    </div>

    <!-- Grille produits -->
    <Transition name="fade-grid">
      <div class="produit-list" :key="selectedCategory + priceMax + selectedSizes.join()">
        <ProductsCard
            v-for="(produit, index) in produitsFiltres"
            :key="produit.id"
            :produit="produit"
            :style="{ animationDelay: `${index * 0.07}s` }"
        />
      </div>
    </Transition>

    <!-- Aucun résultat -->
    <div v-if="produitsFiltres.length === 0" class="no-results">
      <p class="no-results-icon">◯</p>
      <p>Aucun produit ne correspond à vos filtres.</p>
      <button class="reset-filters-inline" @click="resetFilters">Réinitialiser</button>
    </div>

    <!-- Footer section -->
    <div class="catalogue-footer">
      <div class="footer-line"></div>
      <p class="footer-text">Matières sélectionnées · Fabrication responsable · Livraison éco-responsable</p>
    </div>

  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { RouterLink } from 'vue-router';
import ProductsCard from '@/components/ProductsCard.vue';
import CategoryFilter from '@/components/CategoryFilter.vue';
import { produits } from '@/data/produits.js';

const selectedCategory = ref('Tout');
const productsSection = ref(null);
const showAdvanced = ref(false);
const priceMax = ref(100);
const selectedSizes = ref([]);

const updateCategory = (category) => { selectedCategory.value = category; };

// Toutes les tailles uniques
const allSizes = computed(() => {
  const sizes = new Set();
  produits.forEach(p => p.tailles?.forEach(t => sizes.add(t)));
  return [...sizes];
});

const toggleSize = (size) => {
  const idx = selectedSizes.value.indexOf(size);
  if (idx === -1) selectedSizes.value.push(size);
  else selectedSizes.value.splice(idx, 1);
};

const hasActiveFilters = computed(() =>
  priceMax.value < 100 || selectedSizes.value.length > 0
);

const resetFilters = () => {
  priceMax.value = 100;
  selectedSizes.value = [];
};

const produitsFiltres = computed(() => {
  return produits.filter(p => {
    const catOk = selectedCategory.value === 'Tout' || p.categorie === selectedCategory.value;
    const priceOk = p.prix <= priceMax.value;
    const sizeOk = selectedSizes.value.length === 0 ||
      p.tailles?.some(t => selectedSizes.value.includes(t));
    return catOk && priceOk && sizeOk;
  });
});

const scrollToProducts = () => {
  productsSection.value?.scrollIntoView({ behavior: 'smooth' });
};
</script>

<style scoped>
.catalogue-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 40px 80px;
}

/* ── Hero ── */
.hero-section {
  position: relative; min-height: 520px;
  display: flex; flex-direction: column;
  align-items: center; justify-content: center;
  text-align: center; padding: 100px 20px 80px;
  margin: 0 -40px 80px; overflow: hidden;
  background: linear-gradient(to bottom, #fafaf8, #f0efec);
}
.hero-bg { position: absolute; inset: 0; pointer-events: none; }
.hero-line {
  position: absolute; width: 1px;
  background: linear-gradient(to bottom, transparent, rgba(201, 169, 110, 0.3), transparent);
  top: 0; bottom: 0;
  animation: lineGrow 2s ease both;
}
.hero-line-1 { left: 20%; animation-delay: 0.2s; }
.hero-line-2 { left: 50%; animation-delay: 0.4s; }
.hero-line-3 { right: 20%; animation-delay: 0.6s; }
@keyframes lineGrow { from { transform: scaleY(0); opacity: 0; } to { transform: scaleY(1); opacity: 1; } }

.hero-content { position: relative; z-index: 1; }
.hero-overtitle {
  font-family: 'Inter', sans-serif; font-size: 0.7em;
  letter-spacing: 4px; text-transform: uppercase;
  color: var(--color-gold); margin-bottom: 20px;
  animation: fadeInUp 0.6s ease 0.2s both;
}
.hero-title {
  font-family: 'Cormorant Garamond', serif;
  display: flex; flex-direction: column; align-items: center;
  line-height: 1; margin-bottom: 24px;
}
.hero-title-thin {
  font-size: clamp(3em, 8vw, 6em); font-weight: 300; font-style: italic;
  color: var(--color-gris); animation: fadeInUp 0.6s ease 0.3s both; letter-spacing: 2px;
}
.hero-title-bold {
  font-size: clamp(3.5em, 10vw, 8em); font-weight: 700; color: var(--color-noir);
  letter-spacing: -1px; text-transform: uppercase; animation: fadeInUp 0.6s ease 0.4s both;
}
.hero-desc {
  font-family: 'Inter', sans-serif; font-size: 0.9em; color: var(--color-gris);
  margin-bottom: 40px; letter-spacing: 0.5px; animation: fadeInUp 0.6s ease 0.5s both;
}
.hero-cta-group {
  display: flex; align-items: center; justify-content: center;
  gap: 20px; animation: fadeInUp 0.6s ease 0.6s both;
}
.hero-cta-primary {
  background: var(--color-noir); color: var(--color-gold-light);
  border: none; padding: 14px 36px; font-family: 'Inter', sans-serif;
  font-size: 0.75em; font-weight: 600; letter-spacing: 2px; text-transform: uppercase;
  cursor: pointer; transition: all 0.35s ease; border-radius: 1px;
}
.hero-cta-primary:hover {
  background: var(--color-gold); color: var(--color-blanc);
  transform: translateY(-2px); box-shadow: 0 8px 24px rgba(201,169,110,0.3);
}
.hero-cta-separator { width: 1px; height: 30px; background: rgba(201,169,110,0.4); }
.hero-cta-ghost {
  background: transparent; color: var(--color-gris); text-decoration: none;
  padding: 14px 20px; font-family: 'Inter', sans-serif; font-size: 0.75em;
  cursor: pointer; letter-spacing: 1px; text-transform: uppercase;
  border-bottom: 1px solid transparent; transition: all 0.3s;
}
.hero-cta-ghost:hover { color: var(--color-noir); border-bottom-color: var(--color-gold); }

.hero-scroll-hint {
  position: absolute; bottom: 30px; left: 50%; transform: translateX(-50%);
  display: flex; flex-direction: column; align-items: center; gap: 8px;
  color: var(--color-gris); font-family: 'Inter', sans-serif;
  font-size: 0.6em; letter-spacing: 3px; text-transform: uppercase;
  animation: fadeInUp 1s ease 1s both;
}
.scroll-line {
  width: 1px; height: 40px;
  background: linear-gradient(to bottom, var(--color-gold), transparent);
  animation: scrollPulse 2s ease infinite;
}
@keyframes scrollPulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.3; } }

/* ── Contrôles catalogue ── */
.catalogue-controls {
  display: flex; flex-direction: column; align-items: center;
  gap: 20px; margin-bottom: 50px;
}

.advanced-filter-bar {
  width: 100%; max-width: 700px; text-align: center;
}

.filter-toggle {
  display: inline-flex; align-items: center; gap: 8px;
  background: none; border: 1px solid rgba(201,169,110,0.3);
  color: var(--color-gris); cursor: pointer;
  padding: 8px 20px; border-radius: 2px;
  font-family: 'Inter', sans-serif; font-size: 0.72em;
  letter-spacing: 1.5px; text-transform: uppercase;
  transition: all 0.3s; position: relative;
}
.filter-toggle:hover { border-color: var(--color-gold); color: var(--color-noir); }

.filter-active-dot {
  width: 6px; height: 6px; border-radius: 50%;
  background: var(--color-gold); position: absolute; top: 6px; right: 6px;
}

.advanced-filters {
  margin-top: 20px; padding: 28px;
  background: var(--color-gris-clair);
  border: 1px solid rgba(201,169,110,0.15);
  border-radius: 2px;
  display: flex; flex-wrap: wrap; gap: 28px; justify-content: center;
}

.filter-group { display: flex; flex-direction: column; gap: 10px; min-width: 180px; }
.filter-group-label {
  font-family: 'Inter', sans-serif; font-size: 0.68em;
  letter-spacing: 1.5px; text-transform: uppercase; color: var(--color-noir); font-weight: 600;
}

/* Slider prix */
.price-range {
  -webkit-appearance: none; width: 100%; height: 2px;
  background: linear-gradient(to right, var(--color-gold) 0%, var(--color-gold) var(--val, 100%), #ddd var(--val, 100%));
  outline: none; cursor: pointer;
}
.price-range::-webkit-slider-thumb {
  -webkit-appearance: none; width: 18px; height: 18px;
  border-radius: 50%; background: var(--color-gold);
  border: 2px solid #fff; box-shadow: 0 2px 8px rgba(201,169,110,0.4); cursor: pointer;
}
.range-labels {
  display: flex; justify-content: space-between;
  font-family: 'Inter', sans-serif; font-size: 0.65em; color: var(--color-gris);
}

/* Chips tailles */
.size-chips { display: flex; flex-wrap: wrap; gap: 8px; }
.size-chip {
  padding: 6px 14px; border: 1px solid #ddd;
  background: #fff; cursor: pointer;
  font-family: 'Inter', sans-serif; font-size: 0.72em;
  border-radius: 2px; transition: all 0.25s;
}
.size-chip:hover { border-color: var(--color-noir); }
.size-chip.active { background: var(--color-noir); color: #fff; border-color: var(--color-noir); }

.reset-filters, .reset-filters-inline {
  align-self: center; background: none; border: 1px solid #ddd;
  color: var(--color-gris); cursor: pointer;
  padding: 8px 20px; font-family: 'Inter', sans-serif;
  font-size: 0.68em; text-transform: uppercase; letter-spacing: 1px;
  border-radius: 2px; transition: all 0.3s;
}
.reset-filters:hover, .reset-filters-inline:hover { border-color: var(--color-gold); color: var(--color-gold); }

.meta-count-wrap { margin-top: 8px; }
.meta-count {
  font-family: 'Inter', sans-serif; font-size: 0.75em;
  letter-spacing: 2px; text-transform: uppercase; color: var(--color-gris);
}

/* ── Grille ── */
.produit-list {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 32px 24px;
}

.fade-grid-enter-active, .fade-grid-leave-active { transition: opacity 0.3s ease; }
.fade-grid-enter-from, .fade-grid-leave-to { opacity: 0; }

.filters-anim-enter-active, .filters-anim-leave-active { transition: all 0.35s ease; max-height: 400px; }
.filters-anim-enter-from, .filters-anim-leave-to { opacity: 0; max-height: 0; padding: 0 28px; }

/* ── No results ── */
.no-results {
  text-align: center; padding: 80px 20px;
  color: var(--color-gris); font-family: 'Inter', sans-serif;
  display: flex; flex-direction: column; align-items: center; gap: 20px;
}
.no-results-icon { font-size: 3em; opacity: 0.3; }

/* ── Footer ── */
.catalogue-footer { margin-top: 80px; text-align: center; }
.footer-line { width: 80px; height: 1px; background: var(--color-gold); margin: 0 auto 20px; }
.footer-text {
  font-family: 'Inter', sans-serif; font-size: 0.72em;
  color: var(--color-gris); letter-spacing: 2px; text-transform: uppercase;
}

/* ── Responsive ── */
@media (max-width: 1024px) { .produit-list { grid-template-columns: repeat(2, 1fr); } }
@media (max-width: 640px) {
  .catalogue-container { padding: 0 16px 60px; }
  .hero-section { margin: 0 -16px 60px; min-height: 400px; }
  .produit-list { grid-template-columns: repeat(2, 1fr); gap: 16px; }
}
@media (max-width: 380px) { .produit-list { grid-template-columns: 1fr; } }

@keyframes fadeInUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
</style>
