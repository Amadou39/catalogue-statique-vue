// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import CatalogueView from '@/views/CatalogueView.vue';
import ProductDetailView from '@/views/ProductDetailView.vue';
import CheckoutView from '@/views/CheckoutView.vue';
import WishlistView from '@/views/WishlistView.vue';
import AboutView from '@/views/AboutView.vue';
import NotFoundView from '@/views/NotFoundView.vue';

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'catalogue',
            component: CatalogueView,
            meta: { title: 'Habits & Compagnie — Collection' }
        },
        {
            path: '/produit/:id',
            name: 'produit-detail',
            component: ProductDetailView,
            props: true,
            meta: { title: 'Détail produit — Habits & Compagnie' }
        },
        {
            path: '/checkout',
            name: 'checkout',
            component: CheckoutView,
            meta: { title: 'Paiement — Habits & Compagnie' }
        },
        {
            path: '/wishlist',
            name: 'wishlist',
            component: WishlistView,
            meta: { title: 'Mes Favoris — Habits & Compagnie' }
        },
        {
            path: '/about',
            name: 'about',
            component: AboutView,
            meta: { title: 'Notre Histoire — Habits & Compagnie' }
        },
        // 404 catch-all
        {
            path: '/:pathMatch(.*)*',
            name: 'not-found',
            component: NotFoundView,
            meta: { title: 'Page introuvable — Habits & Compagnie' }
        }
    ],
    scrollBehavior() {
        return { top: 0 };
    }
});

// SEO : mise à jour dynamique du titre de l'onglet
router.afterEach((to) => {
    document.title = to.meta.title || 'Habits & Compagnie';
});

export default router;