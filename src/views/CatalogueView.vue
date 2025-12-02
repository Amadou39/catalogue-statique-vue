<template>
  <div class="catalogue-container">
    <div class="hero-section">
      <h2>Nouvelle Collection</h2>
      <p class="subtitle">L'élégance intemporelle pour développeurs</p>
    </div>

    <CategoryFilter
        :categories="['Tout', 'Vêtements', 'Accessoires']"
        :activeCategory="selectedCategory"
        @filter-change="updateCategory"
    />

    <div class="produit-list">
      <ProductsCard
          v-for="produit in produitsFiltres"
          :key="produit.id"
          :produit="produit"
      />
    </div>

    <div v-if="produitsFiltres.length === 0" class="no-results">
      Aucun produit dans cette catégorie.
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import ProductsCard from '@/components/ProductsCard.vue';
import CategoryFilter from '@/components/CategoryFilter.vue';
import { produits } from '@/data/produits.js';

const selectedCategory = ref('Tout');

const updateCategory = (category) => {
  selectedCategory.value = category;
};

// Logique de filtrage
const produitsFiltres = computed(() => {
  if (selectedCategory.value === 'Tout') {
    return produits;
  }
  return produits.filter(p => p.category === selectedCategory.value);
});
</script>


<style scoped>

.hero-carousel {
  width: 100%;
  height: 500px; /* Grande hauteur pour un impact visuel */
  overflow: hidden;
  position: relative;
  margin-bottom: 60px; /* Espace après le carrousel */
  border-radius: 4px; /* Coins légèrement arrondis */
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
}

.slide {
  width: 100%;
  height: 100%;
  /* Simuler l'image de fond d'un site de vêtements */
  background-image: url('#333333');
  background-size: cover;
  background-position: center 30%;
  display: flex;
  align-items: center; /* Centrer le contenu verticalement */
  justify-content: flex-start; /* Aligner le contenu à gauche (généralement) */
  padding-left: 10%;
  color: white; /* Texte blanc si l'image est foncée */
}

.slide-content {
  background-color: rgba(0, 0, 0, 0.4); /* Overlay pour lisibilité */
  padding: 20px 40px;
  border-radius: 4px;
  text-align: left;
}

.slide-content h1 {
  font-size: 4em;
  font-weight: 700;
  margin-bottom: 15px;
  text-transform: uppercase;
  letter-spacing: 3px;
}

.slide-content p {
  font-size: 1.5em;
  margin-bottom: 30px;
  font-weight: 300;
}

.cta-btn {
  background-color: #ffffff;
  color: #1a1a1a;
  border: 2px solid #1a1a1a;
  padding: 12px 30px;
  font-size: 1em;
  font-weight: bold;
  text-transform: uppercase;
  cursor: pointer;
  transition: all 0.3s;
}

.cta-btn:hover {
  background-color: #1a1a1a;
  color: white;
}


.catalogue-container {
  padding: 60px 20px; /* Augmenter le padding pour plus d'espace blanc */
  max-width: 1400px; /* Élargir le contenu si l'écran le permet */
  margin: 0 auto;
  text-align: center;
}
.hero-section {
  padding: 40px 0 60px 0; /* Plus d'espace vertical */
  margin-bottom: 20px;
  background-color: #ffffff; /* Fond blanc pour accentuer le texte */
}

.hero-section h2 {
  font-size: 3.5em; /* Grande taille de titre, propre aux sites modernes */
  font-weight: 300; /* Poids léger pour un look épuré */
  margin-bottom: 10px;
  letter-spacing: 1px;
  text-transform: uppercase;
}

.subtitle {
  font-size: 1.1em;
  color: #666;
  font-style: italic;
}

.produit-list {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 40px; /* Augmenter l'espace entre les produits */
}

/* Ajustement pour les tablettes (ex: 768px et plus) */
@media (max-width: 1024px) {
  .produit-list {
    /* Passe à 2 colonnes */
    grid-template-columns: 1fr 1fr;
    gap: 20px;
  }
}

/* Ajustement pour les mobiles (ex: moins de 600px) */
@media (max-width: 600px) {
  .produit-list {
    /* Passe à 1 seule colonne */
    grid-template-columns: 1fr;
    gap: 15px;
  }
}

/* Le reste de tes styles... */
</style>
