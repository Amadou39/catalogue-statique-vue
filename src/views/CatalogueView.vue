<template>
  <div class="catalogue-container">
    <h2>🛍️ Notre Catalogue de Produits</h2>
    <div class="product-list">
      <ProductsCard
          v-for="product in products"
          :key="product.id"
          :product="product"
      />
    </div>
  </div>
</template>

<script setup>
import ProductsCard from '@/components/ProductsCard.vue';
import { products } from '@/data/products.js'; // Importe les données statiques
</script>

<style scoped>
.catalogue-container {
  padding: 20px;
  text-align: center;
}

h2 {
  margin-bottom: 20px;
  color: #343a40;
}

.product-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px; /* Ajoute de l'espace entre les cartes */
}
</style>