<template>
  <div class="detail-container">
    <div v-if="product">
      <h2 class="detail-name">✨ {{ product.name }}</h2>
      <p class="detail-id">ID Produit: {{ id }}</p>
      <p class="detail-description">{{ product.description }}</p>
      <p class="detail-price">Prix : <strong>{{ product.price.toFixed(2) }} €</strong></p>

      <RouterLink to="/" class="back-link">Retour au Catalogue</RouterLink>
    </div>

    <div v-else class="not-found">
      ❌ Produit non trouvé. L'ID {{ id }} n'existe pas.
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { RouterLink } from 'vue-router';
import { products } from '@/data/products.js'; // Importe les données statiques

// 1. Définit l'ID comme une prop, grâce à 'props: true' dans router/index.js
const props = defineProps({
  id: {
    type: [String, Number],
    required: true,
  }
});

// 2. Utilise une propriété calculée pour trouver le produit correspondant à l'ID
const product = computed(() => {
  // L'ID de la prop est une chaîne, on le convertit en nombre pour la comparaison stricte
  const productId = parseInt(props.id);
  // Recherche le produit dans le tableau par son ID
  return products.find(p => p.id === productId);
});
</script>

<style scoped>
.detail-container {
  max-width: 700px;
  margin: 40px auto;
  padding: 30px;
  border: 1px solid #e9ecef;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  background-color: white;
}

.detail-name {
  font-size: 2em;
  color: #007bff;
  margin-bottom: 10px;
}

.detail-price {
  font-size: 1.5em;
  color: #28a745;
  margin: 15px 0;
}

.detail-description {
  margin-bottom: 25px;
  line-height: 1.6;
}

.back-link {
  display: inline-block;
  margin-top: 20px;
  padding: 10px 15px;
  background-color: #6c757d;
  color: white;
  text-decoration: none;
  border-radius: 4px;
}

.not-found {
  font-size: 1.5em;
  color: #dc3545;
  text-align: center;
}
</style>