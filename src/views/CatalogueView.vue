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

    <div class="product-list">
      <ProductsCard
          v-for="product in filteredProducts"
          :key="product.id"
          :product="product"
      />
    </div>

    <div v-if="filteredProducts.length === 0" class="no-results">
      Aucun produit dans cette catégorie.
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import ProductsCard from '@/components/ProductsCard.vue';
import CategoryFilter from '@/components/CategoryFilter.vue';
import { products } from '@/data/products.js';

const selectedCategory = ref('Tout');

const updateCategory = (category) => {
  selectedCategory.value = category;
};

// Logique de filtrage
const filteredProducts = computed(() => {
  if (selectedCategory.value === 'Tout') {
    return products;
  }
  return products.filter(p => p.category === selectedCategory.value);
});
</script>


<style scoped>
.catalogue-container {
  padding: 40px 20px;
  max-width: 1200px;
  margin: 0 auto;
  text-align: center; /* Force le centrage global */
}

.hero-section {
  text-align: center;
  margin-bottom: 40px;
}

/* Le reste de tes styles... */
</style>
