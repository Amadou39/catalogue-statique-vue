<template>
  <div class="product-card">
    <RouterLink :to="{ name: 'product-detail', params: { id: product.id } }">
      <h3 class="product-name">{{ product.name }}</h3>
      <p class="product-price">{{ product.price.toFixed(2) }} €</p>
      <button class="detail-button">Voir Détail</button>
    </RouterLink>
  </div>
</template>

<script setup>
import { RouterLink } from 'vue-router';

// Définit les props que le composant attend de sa Vue parente
const props = defineProps({
  product: {
    type: Object,
    required: true,
  }
});
</script>

<style scoped>
/* Styles de base pour la carte */
.product-card {
  border: 1px solid #ddd;
  padding: 15px;
  margin: 10px;
  width: 250px;
  text-align: center;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.05);
  transition: transform 0.2s;
}

.product-card:hover {
  transform: translateY(-3px);
  box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.1);
}

.product-name {
  color: #333;
  font-size: 1.2em;
}

.product-price {
  color: #007bff;
  font-weight: bold;
  margin: 10px 0;
}

.detail-button {
  background-color: #28a745;
  color: white;
  border: none;
  padding: 8px 15px;
  cursor: pointer;
  border-radius: 4px;
}
</style>