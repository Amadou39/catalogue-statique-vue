// src/composables/useCart.js
import { ref, computed, watch } from 'vue';

// Charger depuis localStorage au démarrage
const savedCart = (() => {
  try { return JSON.parse(localStorage.getItem('hc_cart') || '[]'); }
  catch { return []; }
})();

const cartItems = ref(savedCart);
const isCartOpen = ref(false);

export function useCart() {
  const cartCount = computed(() =>
    cartItems.value.reduce((sum, item) => sum + item.qty, 0)
  );

  const cartTotal = computed(() =>
    cartItems.value.reduce((sum, item) => sum + item.produit.prix * item.qty, 0)
  );

  const addItem = (produit, taille, couleur) => {
    const key = `${produit.id}-${taille}-${couleur}`;
    const existing = cartItems.value.find(i => i.key === key);
    if (existing) {
      existing.qty++;
    } else {
      cartItems.value.push({ key, produit, taille, couleur, qty: 1 });
    }
    isCartOpen.value = true;
  };

  const updateQty = (key, delta) => {
    const item = cartItems.value.find(i => i.key === key);
    if (!item) return;
    item.qty += delta;
    if (item.qty <= 0) removeItem(key);
  };

  const removeItem = (key) => {
    cartItems.value = cartItems.value.filter(i => i.key !== key);
  };

  const clearCart = () => {
    cartItems.value = [];
  };

  // 💾 Persistance automatique en localStorage
  watch(cartItems, (val) => {
    try { localStorage.setItem('hc_cart', JSON.stringify(val)); }
    catch { /* quota dépassé */ }
  }, { deep: true });

  return {
    cartItems, cartCount, cartTotal,
    isCartOpen, addItem, updateQty, removeItem, clearCart,
  };
}
