<template>
  <header class="app-header">
    <nav class="nav-container">
      <RouterLink :to="{ name: 'catalogue' }" class="site-title">
        📦 Catalogue Statique Vue.js
      </RouterLink>

    </nav>
  </header>
</template>

<script setup>
import { RouterLink } from 'vue-router';
// Pas de logique JavaScript nécessaire ici, seulement l'importation de RouterLink
</script>

<style scoped>
.app-header {
  background-color: #343a40; /* Couleur sombre */
  padding: 15px 30px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.nav-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 1200px;
  margin: 0 auto;
}

.site-title {
  color: #ffffff;
  font-size: 1.5em;
  font-weight: bold;
  text-decoration: none; /* Enlève le soulignement du lien */
  transition: color 0.2s;
}

.site-title:hover {
  color: #adb5bd; /* Couleur légèrement plus claire au survol */
}
</style>le>