<template>
  <header class="app-header">
    <nav class="nav-container">
      <RouterLink :to="{ name: 'catalogue' }" class="site-title">
        Clothes & Co
      </RouterLink>
    </nav>
  </header>
</template>

<script setup>
import { RouterLink } from 'vue-router';
</script>

<style scoped>
.app-header {
  background-color: #ffffff; /* Fond blanc pur pour un look épuré */
  padding: 25px 0;
  border-bottom: 1px solid #f0f0f0; /* Séparation très subtile */
  position: sticky;
  top: 0;
  z-index: 1000;
}

.nav-container {
  display: flex;
  justify-content: center; /* Centre le contenu horizontalement */
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.site-title {
  font-family: 'Playfair Display', 'Didot', 'Times New Roman', serif; /* Police style "Vogue" */
  color: #1a1a1a; /* Noir profond mais pas total */
  font-size: 2.2em; /* Taille imposante */
  font-weight: 700;
  text-decoration: none;
  text-transform: uppercase; /* Majuscules pour l'élégance */
  letter-spacing: 3px; /* Espacement large entre les lettres (très mode) */
  transition: all 0.3s ease;
}

.site-title:hover {
  color: #555; /* Gris foncé au survol */
  letter-spacing: 4px; /* Petit effet d'expansion au survol */
}
</style>