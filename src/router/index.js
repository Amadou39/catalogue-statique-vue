// src/router/index.js

import { createRouter, createWebHistory } from 'vue-router';
import CatalogueView from '@/views/CatalogueView.vue';
// 1. ASSUREZ-VOUS QUE CE CHEMIN EST CORRECT !
import ProductDetailView from '@/views/ProductDetailView.vue';

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'catalogue',
            component: CatalogueView
        },
        // 2. VOTRE ROUTE DYNAMIQUE (C'EST LA BONNE SYNTAXE)
        {
            path: '/product/:id',
            name: 'product-detail',
            component: ProductDetailView,
            props: true // Permet de passer l'ID comme prop au composant
        }
    ]
});

export default router;