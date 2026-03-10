// src/composables/useWishlist.js
import { ref, computed, watch } from 'vue';

const savedWishlist = (() => {
  try { return JSON.parse(localStorage.getItem('hc_wishlist') || '[]'); }
  catch { return []; }
})();

const wishlistItems = ref(savedWishlist);

export function useWishlist() {
  const wishlistCount = computed(() => wishlistItems.value.length);

  const isInWishlist = (id) => wishlistItems.value.some(p => p.id === id);

  const toggleWishlist = (produit) => {
    if (isInWishlist(produit.id)) {
      wishlistItems.value = wishlistItems.value.filter(p => p.id !== produit.id);
    } else {
      wishlistItems.value.push(produit);
    }
  };

  const removeFromWishlist = (id) => {
    wishlistItems.value = wishlistItems.value.filter(p => p.id !== id);
  };

  // Persistance localStorage
  watch(wishlistItems, (val) => {
    try { localStorage.setItem('hc_wishlist', JSON.stringify(val)); }
    catch { /* quota dépassé */ }
  }, { deep: true });

  return { wishlistItems, wishlistCount, isInWishlist, toggleWishlist, removeFromWishlist };
}
