<template>
  <Header /> <main>
  <RouterView /> </main>
</template>

<script setup>
import { RouterView } from 'vue-router';
import Header from '@/components/Header.vue'; // Assurez-vous d'avoir créé ce composant !
</script>

<style>

/* Utilisation de polices modernes et lisibles (Roboto, Lato ou Inter sont de bons choix) */
body {
  font-family: 'Inter', 'Helvetica Neue', Arial, sans-serif;
  color: #1a1a1a; /* Noir très foncé */
  background-color: #f8f8f8; /* Gris très clair pour le fond */
  line-height: 1.6;
}
</style>