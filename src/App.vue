<template>
  <Header />
  <CartDrawer />
  <main class="main-content">
    <RouterView v-slot="{ Component, route }">
      <Transition :name="route.meta.transition || 'page-fade'" mode="out-in">
        <component :is="Component" :key="route.path" />
      </Transition>
    </RouterView>
  </main>
</template>

<script setup>
import { RouterView } from 'vue-router';
import Header from '@/components/Header.vue';
import CartDrawer from '@/components/CartDrawer.vue';
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;0,700;1,300;1,400&family=Inter:wght@300;400;500;600&display=swap');

:root {
  --color-noir: #0d0d0d;
  --color-blanc: #fafaf8;
  --color-gris: #888888;
  --color-gris-clair: #f0efec;
  --color-gold: #c9a96e;
  --color-gold-light: #e8d5b0;
  --header-height: 80px;
  --transition: 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
html { scroll-behavior: smooth; }

body {
  font-family: 'Inter', 'Helvetica Neue', Arial, sans-serif;
  color: var(--color-noir);
  background-color: var(--color-blanc);
  line-height: 1.6;
  -webkit-font-smoothing: antialiased;
}

::-webkit-scrollbar { width: 6px; }
::-webkit-scrollbar-track { background: var(--color-gris-clair); }
::-webkit-scrollbar-thumb { background: var(--color-gold); border-radius: 3px; }

.main-content { min-height: calc(100vh - var(--header-height)); }

/* ─── Transitions de pages ─── */
.page-fade-enter-active,
.page-fade-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}
.page-fade-enter-from {
  opacity: 0;
  transform: translateY(12px);
}
.page-fade-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}

@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>