<template>
  <Header /> <main>
  <RouterView /> </main>
</template>

<script setup>
import { RouterView } from 'vue-router';
import Header from '@/components/Header.vue'; // Assurez-vous d'avoir créé ce composant !
</script>

<style>
/* Styles globaux (si besoin) */
body {
  margin: 0;
  font-family: sans-serif;
  background-color: #f8f9fa;
}
</style>