<template>
  <div class="checkout-page">

    <!-- Étapes -->
    <div class="checkout-steps">
      <span class="step" :class="{ active: step === 1, done: step > 1 }">
        <span class="step-num">{{ step > 1 ? '✓' : '1' }}</span> Livraison
      </span>
      <span class="step-sep">─────</span>
      <span class="step" :class="{ active: step === 2, done: step > 2 }">
        <span class="step-num">{{ step > 2 ? '✓' : '2' }}</span> Paiement
      </span>
      <span class="step-sep">─────</span>
      <span class="step" :class="{ active: step === 3 }">
        <span class="step-num">3</span> Confirmation
      </span>
    </div>

    <!-- Panier vide -->
    <div v-if="cartItems.length === 0 && step < 3" class="empty-checkout">
      <p class="empty-icon">◯</p>
      <h2>Votre panier est vide</h2>
      <RouterLink to="/" class="btn-back-catalogue">← Retour au catalogue</RouterLink>
    </div>

    <div v-else class="checkout-layout">

      <!-- ═══════════════ GAUCHE : Formulaire ═══════════════ -->
      <div class="checkout-form-col">

        <!-- ÉTAPE 1 : Informations de livraison -->
        <section v-if="step === 1" class="form-section">
          <h2 class="section-title">Informations de livraison</h2>

          <div class="form-row">
            <div class="field-group">
              <label class="field-label" for="prenom">Prénom *</label>
              <input id="prenom" v-model="form.prenom" class="field-input" type="text" placeholder="Marie" required />
            </div>
            <div class="field-group">
              <label class="field-label" for="nom">Nom *</label>
              <input id="nom" v-model="form.nom" class="field-input" type="text" placeholder="Dupont" required />
            </div>
          </div>

          <div class="field-group">
            <label class="field-label" for="email">Adresse e-mail *</label>
            <input id="email" v-model="form.email" class="field-input" type="email" placeholder="marie.dupont@exemple.fr" required />
          </div>

          <div class="field-group">
            <label class="field-label" for="tel">Téléphone</label>
            <input id="tel" v-model="form.tel" class="field-input" type="tel" placeholder="+33 6 00 00 00 00" />
          </div>

          <div class="field-group">
            <label class="field-label" for="adresse">Adresse *</label>
            <input id="adresse" v-model="form.adresse" class="field-input" type="text" placeholder="12 rue de la Paix" required />
          </div>

          <div class="form-row">
            <div class="field-group">
              <label class="field-label" for="cp">Code postal *</label>
              <input id="cp" v-model="form.cp" class="field-input" type="text" placeholder="75001" required />
            </div>
            <div class="field-group">
              <label class="field-label" for="ville">Ville *</label>
              <input id="ville" v-model="form.ville" class="field-input" type="text" placeholder="Paris" required />
            </div>
          </div>

          <div class="field-group">
            <label class="field-label" for="pays">Pays *</label>
            <select id="pays" v-model="form.pays" class="field-input field-select">
              <option value="FR">France</option>
              <option value="BE">Belgique</option>
              <option value="CH">Suisse</option>
              <option value="LU">Luxembourg</option>
            </select>
          </div>

          <!-- Alerte livraison -->
          <Transition name="toast">
            <div v-if="formError" class="form-alert">{{ formError }}</div>
          </Transition>

          <button class="btn-next" @click="goToPayment">
            Continuer vers le paiement
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
          </button>
        </section>

        <!-- ÉTAPE 2 : Paiement Stripe -->
        <section v-if="step === 2" class="form-section">
          <button class="btn-back-step" @click="step = 1">← Retour</button>
          <h2 class="section-title">Paiement sécurisé</h2>

          <!-- Résumé adresse -->
          <div class="shipping-recap">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
            <span>{{ form.prenom }} {{ form.nom }}, {{ form.adresse }}, {{ form.cp }} {{ form.ville }}</span>
          </div>

          <div class="field-group">
            <label class="field-label" for="card-titulaire">Nom du titulaire de la carte *</label>
            <input
              id="card-titulaire"
              v-model="form.cardName"
              class="field-input"
              type="text"
              placeholder="MARIE DUPONT"
              style="text-transform: uppercase;"
            />
          </div>

          <!-- Stripe Elements container -->
          <div class="field-group">
            <label class="field-label">Informations de carte bancaire *</label>
            <div id="card-element" class="stripe-element-container"></div>
            <p class="stripe-note">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
              Vos données sont chiffrées et sécurisées par Stripe
            </p>
          </div>

          <!-- Stripe error -->
          <Transition name="toast">
            <div v-if="stripeError" class="form-alert">{{ stripeError }}</div>
          </Transition>

          <button class="btn-pay" @click="handlePayment" :disabled="isProcessing">
            <Transition name="btn-content" mode="out-in">
              <span v-if="!isProcessing" key="text" class="btn-pay-content">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                Payer {{ cartTotal.toFixed(2) }} €
              </span>
              <span v-else key="loading" class="btn-pay-content">
                <svg class="spinner" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10" stroke-dasharray="60" stroke-dashoffset="0"/></svg>
                Traitement en cours…
              </span>
            </Transition>
          </button>

          <p class="payment-legend">
            En cliquant sur "Payer", vous acceptez nos <a href="#" class="inline-link">conditions générales de vente</a>.
          </p>
        </section>

        <!-- ÉTAPE 3 : Confirmation -->
        <section v-if="step === 3" class="confirmation-section">
          <div class="confirm-icon">
            <svg width="52" height="52" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
              <polyline points="22 4 12 14.01 9 11.01"/>
            </svg>
          </div>
          <h2 class="confirm-title">Merci pour votre commande !</h2>
          <p class="confirm-sub">Un e-mail de confirmation a été envoyé à <strong>{{ form.email }}</strong></p>
          <div class="confirm-ref">
            Référence commande : <strong>#HC{{ confirmRef }}</strong>
          </div>
          <RouterLink to="/" class="btn-back-catalogue" @click="clearCart">
            Retour au catalogue
          </RouterLink>
        </section>

      </div>

      <!-- ═══════════════ DROITE : Récapitulatif ═══════════════ -->
      <aside class="checkout-summary-col" v-if="step < 3">
        <div class="summary-box">
          <h3 class="summary-title">Votre commande</h3>
          <div class="summary-line"></div>

          <!-- Articles -->
          <div class="summary-items">
            <div v-for="item in cartItems" :key="item.key" class="summary-item">
              <div class="summary-item-img-wrap">
                <img :src="`/images/${item.produit.image}`" :alt="item.produit.nom" class="summary-item-img" />
                <span class="summary-qty-badge">{{ item.qty }}</span>
              </div>
              <div class="summary-item-info">
                <p class="summary-item-name">{{ item.produit.nom }}</p>
                <p class="summary-item-meta">{{ item.taille }}
                  <span v-if="item.couleur" class="summary-color-dot" :style="{ background: item.couleur }"></span>
                </p>
              </div>
              <span class="summary-item-price">{{ (item.produit.prix * item.qty).toFixed(2) }} €</span>
            </div>
          </div>

          <div class="summary-line"></div>

          <!-- Totaux -->
          <div class="summary-totals">
            <div class="total-row">
              <span>Sous-total</span>
              <span>{{ cartTotal.toFixed(2) }} €</span>
            </div>
            <div class="total-row">
              <span>Livraison</span>
              <span :class="cartTotal >= 60 ? 'free-shipping' : ''">
                {{ cartTotal >= 60 ? 'Offerte' : '4,99 €' }}
              </span>
            </div>
            <div class="total-row total-final">
              <span>Total TTC</span>
              <span>{{ finalTotal }} €</span>
            </div>
          </div>

          <!-- Code promo -->
          <div class="promo-input-wrap">
            <input v-model="promoCode" class="promo-input" type="text" placeholder="Code promo" />
            <button class="promo-btn" @click="applyPromo">Appliquer</button>
          </div>
          <div v-if="promoMessage" class="promo-msg" :class="promoSuccess ? 'promo-ok' : 'promo-err'">
            {{ promoMessage }}
          </div>
        </div>
      </aside>

    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { RouterLink } from 'vue-router';
import { loadStripe } from '@stripe/stripe-js';
import { useCart } from '@/composables/useCart.js';

const { cartItems, cartTotal, clearCart } = useCart();
const step = ref(1);
const formError = ref('');
const stripeError = ref('');
const isProcessing = ref(false);
const confirmRef = ref('');
const promoCode = ref('');
const promoMessage = ref('');
const promoSuccess = ref(false);

const form = ref({
  prenom: '', nom: '', email: '', tel: '',
  adresse: '', cp: '', ville: '', pays: 'FR',
  cardName: ''
});

// ─── Total avec livraison ───────────────────────────
const finalTotal = computed(() => {
  const livraison = cartTotal.value >= 60 ? 0 : 4.99;
  return (cartTotal.value + livraison).toFixed(2);
});

// ─── Stripe ────────────────────────────────────────
// ⚠️ Remplacez par votre clé publique Stripe (pk_test_...)
const STRIPE_PUBLIC_KEY = 'pk_test_VOTRE_CLE_PUBLIQUE_ICI';
let stripe = null;
let cardElement = null;

const initStripe = async () => {
  if (step.value !== 2) return;
  try {
    stripe = await loadStripe(STRIPE_PUBLIC_KEY);
    if (!stripe) { stripeError.value = 'Impossible de charger Stripe. Vérifiez votre clé publique.'; return; }
    const elements = stripe.elements({
      fonts: [{ cssSrc: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500&display=swap' }]
    });
    cardElement = elements.create('card', {
      style: {
        base: {
          fontFamily: '"Inter", sans-serif',
          fontSize: '15px',
          color: '#0d0d0d',
          '::placeholder': { color: '#aaa' },
          iconColor: '#c9a96e',
        },
        invalid: { color: '#e74c3c', iconColor: '#e74c3c' },
      },
      hidePostalCode: true,
    });
    cardElement.mount('#card-element');
    cardElement.on('change', (event) => {
      stripeError.value = event.error ? event.error.message : '';
    });
  } catch (e) {
    stripeError.value = 'Erreur lors du chargement du formulaire de paiement.';
  }
};

// ─── Navigation étape 1 → 2 ────────────────────────
const goToPayment = () => {
  formError.value = '';
  if (!form.value.prenom || !form.value.nom || !form.value.email || !form.value.adresse || !form.value.cp || !form.value.ville) {
    formError.value = 'Veuillez remplir tous les champs obligatoires (*).';
    return;
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.value.email)) {
    formError.value = 'Adresse e-mail invalide.';
    return;
  }
  step.value = 2;
  // Monter le card element après transition DOM
  setTimeout(initStripe, 200);
};

// ─── Paiement ──────────────────────────────────────
const handlePayment = async () => {
  if (!form.value.cardName) {
    stripeError.value = 'Veuillez saisir le nom du titulaire de la carte.';
    return;
  }
  if (!stripe || !cardElement) {
    stripeError.value = 'Stripe n\'est pas initialisé. Ajoutez votre clé publique.';
    // Mode démo : simule le paiement quand même
    simulatePayment();
    return;
  }

  isProcessing.value = true;
  stripeError.value = '';

  try {
    // En production : créer un PaymentIntent côté serveur et récupérer le client_secret
    // const { clientSecret } = await fetch('/api/create-payment-intent', { method: 'POST', body: JSON.stringify({ amount: Math.round(parseFloat(finalTotal.value) * 100) }) }).then(r => r.json());
    // const { error } = await stripe.confirmCardPayment(clientSecret, { payment_method: { card: cardElement, billing_details: { name: form.value.cardName } } });

    // Mode démo (sans backend) : simulation
    await new Promise(r => setTimeout(r, 1800));
    simulatePayment();
  } catch (e) {
    stripeError.value = 'Une erreur est survenue. Réessayez.';
    isProcessing.value = false;
  }
};

const simulatePayment = () => {
  isProcessing.value = false;
  confirmRef.value = Math.random().toString(36).substr(2, 8).toUpperCase();
  step.value = 3;
  clearCart();
};

// ─── Code promo ────────────────────────────────────
const applyPromo = () => {
  if (promoCode.value.toUpperCase() === 'HABITS10') {
    promoMessage.value = '✓ Code HABITS10 appliqué : -10% sur votre commande';
    promoSuccess.value = true;
  } else {
    promoMessage.value = 'Code promo invalide ou expiré.';
    promoSuccess.value = false;
  }
};
</script>

<style scoped>
.checkout-page {
  max-width: 1200px;
  margin: 0 auto;
  padding: 50px 40px 100px;
  animation: fadeInUp 0.5s ease both;
}

/* Étapes */
.checkout-steps {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  margin-bottom: 60px;
  font-family: 'Inter', sans-serif;
  font-size: 0.72em;
  letter-spacing: 1px;
  text-transform: uppercase;
}

.step {
  display: flex;
  align-items: center;
  gap: 8px;
  color: var(--color-gris);
  transition: color 0.3s;
}
.step.active { color: var(--color-noir); font-weight: 600; }
.step.done { color: var(--color-gold); }
.step-num {
  width: 24px; height: 24px; border-radius: 50%;
  border: 1.5px solid currentColor;
  display: flex; align-items: center; justify-content: center;
  font-size: 0.9em; font-weight: 700; flex-shrink: 0;
}
.step-sep { color: var(--color-gris); opacity: 0.3; font-size: 0.8em; }

/* Layout principal */
.checkout-layout {
  display: grid;
  grid-template-columns: 1fr 420px;
  gap: 60px;
  align-items: start;
}

/* ─ Formulaire ─ */
.form-section { animation: fadeInUp 0.4s ease both; }
.section-title {
  font-family: 'Cormorant Garamond', serif;
  font-size: 1.8em;
  font-weight: 600;
  margin-bottom: 32px;
  color: var(--color-noir);
}

.form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }

.field-group { display: flex; flex-direction: column; gap: 6px; margin-bottom: 20px; }

.field-label {
  font-family: 'Inter', sans-serif;
  font-size: 0.68em;
  font-weight: 600;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  color: var(--color-noir);
}

.field-input {
  height: 48px;
  border: 1px solid #ddd;
  border-radius: 2px;
  padding: 0 14px;
  font-family: 'Inter', sans-serif;
  font-size: 0.9em;
  color: var(--color-noir);
  background: #fff;
  transition: border-color 0.3s, box-shadow 0.3s;
  outline: none;
  appearance: none;
  -webkit-appearance: none;
}
.field-input:focus {
  border-color: var(--color-gold);
  box-shadow: 0 0 0 3px rgba(201, 169, 110, 0.15);
}
.field-input::placeholder { color: #bbb; }
.field-select { cursor: pointer; }

/* Résumé adresse */
.shipping-recap {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  background: var(--color-gris-clair);
  padding: 14px 18px;
  border-radius: 2px;
  font-family: 'Inter', sans-serif;
  font-size: 0.78em;
  color: #555;
  margin-bottom: 28px;
  border-left: 3px solid var(--color-gold);
}
.shipping-recap svg { color: var(--color-gold); flex-shrink: 0; margin-top: 1px; }

/* Stripe Element */
.stripe-element-container {
  border: 1px solid #ddd;
  border-radius: 2px;
  padding: 14px;
  background: #fff;
  transition: border-color 0.3s, box-shadow 0.3s;
  min-height: 48px;
}
.stripe-element-container:focus-within {
  border-color: var(--color-gold);
  box-shadow: 0 0 0 3px rgba(201, 169, 110, 0.15);
}

.stripe-note {
  display: flex;
  align-items: center;
  gap: 6px;
  font-family: 'Inter', sans-serif;
  font-size: 0.65em;
  color: var(--color-gris);
  margin-top: 6px;
}
.stripe-note svg { color: var(--color-gold); }

/* Alertes */
.form-alert {
  background: #fff3cd; color: #856404;
  border: 1px solid #ffc107;
  border-radius: 2px;
  padding: 10px 16px;
  font-family: 'Inter', sans-serif;
  font-size: 0.78em;
  margin-bottom: 16px;
}

/* Boutons */
.btn-next, .btn-pay {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  background: var(--color-noir);
  color: var(--color-gold-light);
  border: none;
  padding: 18px 30px;
  font-family: 'Inter', sans-serif;
  font-size: 0.85em;
  font-weight: 600;
  letter-spacing: 2px;
  text-transform: uppercase;
  cursor: pointer;
  transition: all 0.35s ease;
  border-radius: 1px;
  margin-top: 8px;
}
.btn-next:hover, .btn-pay:hover:not(:disabled) {
  background: var(--color-gold); color: #fff;
  transform: translateY(-2px);
  box-shadow: 0 10px 30px rgba(201,169,110,0.35);
}
.btn-pay:disabled { opacity: 0.7; cursor: not-allowed; transform: none; }

.btn-pay-content { display: flex; align-items: center; gap: 10px; }

.spinner { animation: spin 0.8s linear infinite; }
@keyframes spin { to { transform: rotate(360deg); } }

.btn-back-step {
  background: none; border: none; font-family: 'Inter', sans-serif;
  font-size: 0.75em; color: var(--color-gris); cursor: pointer;
  margin-bottom: 24px; padding: 0; transition: color 0.3s; letter-spacing: 1px;
}
.btn-back-step:hover { color: var(--color-gold); }

.payment-legend {
  font-family: 'Inter', sans-serif;
  font-size: 0.65em;
  color: var(--color-gris);
  text-align: center;
  margin-top: 14px;
  line-height: 1.6;
}
.inline-link { color: var(--color-gold); }

/* ─ Récapitulatif ─ */
.summary-box {
  background: var(--color-gris-clair);
  border-radius: 2px;
  padding: 30px;
  position: sticky;
  top: 106px;
}

.summary-title {
  font-family: 'Cormorant Garamond', serif;
  font-size: 1.3em;
  font-weight: 600;
  color: var(--color-noir);
  margin-bottom: 20px;
}

.summary-line {
  height: 1px;
  background: rgba(201,169,110,0.25);
  margin: 16px 0;
}

.summary-items {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.summary-item {
  display: flex;
  align-items: center;
  gap: 14px;
}

.summary-item-img-wrap {
  position: relative;
  width: 60px;
  height: 75px;
  flex-shrink: 0;
  border-radius: 2px;
  overflow: hidden;
  background: #fff;
}
.summary-item-img { width: 100%; height: 100%; object-fit: cover; }
.summary-qty-badge {
  position: absolute;
  top: -6px; right: -6px;
  background: var(--color-noir); color: #fff;
  width: 20px; height: 20px; border-radius: 10px;
  font-family: 'Inter', sans-serif; font-size: 0.65em; font-weight: 700;
  display: flex; align-items: center; justify-content: center;
}

.summary-item-info { flex: 1; }
.summary-item-name {
  font-family: 'Cormorant Garamond', serif;
  font-size: 1em; font-weight: 600;
  color: var(--color-noir); margin-bottom: 4px;
}
.summary-item-meta {
  display: flex; align-items: center; gap: 6px;
  font-family: 'Inter', sans-serif; font-size: 0.65em;
  color: var(--color-gris);
}
.summary-color-dot {
  width: 10px; height: 10px; border-radius: 50%;
  border: 1px solid rgba(0,0,0,0.1);
  display: inline-block;
}
.summary-item-price {
  font-family: 'Inter', sans-serif; font-size: 0.85em;
  font-weight: 600; color: var(--color-noir);
  flex-shrink: 0;
}

/* Totaux */
.summary-totals { display: flex; flex-direction: column; gap: 10px; }
.total-row {
  display: flex; justify-content: space-between; align-items: center;
  font-family: 'Inter', sans-serif; font-size: 0.78em; color: #555;
}
.total-final {
  font-size: 0.95em; font-weight: 700; color: var(--color-noir);
  padding-top: 12px;
  border-top: 1px solid rgba(201,169,110,0.3);
  margin-top: 4px;
}
.free-shipping { color: #2ecc71; font-weight: 600; }

/* Code promo */
.promo-input-wrap {
  display: flex;
  gap: 8px;
  margin-top: 16px;
}
.promo-input {
  flex: 1;
  height: 40px;
  border: 1px solid #ddd;
  border-radius: 2px;
  padding: 0 12px;
  font-family: 'Inter', sans-serif;
  font-size: 0.8em;
  outline: none;
  transition: border-color 0.3s;
}
.promo-input:focus { border-color: var(--color-gold); }
.promo-btn {
  height: 40px;
  padding: 0 14px;
  background: var(--color-noir);
  color: #fff;
  border: none;
  border-radius: 2px;
  font-family: 'Inter', sans-serif;
  font-size: 0.72em;
  font-weight: 600;
  letter-spacing: 1px;
  cursor: pointer;
  transition: background 0.3s;
}
.promo-btn:hover { background: var(--color-gold); }
.promo-msg {
  font-family: 'Inter', sans-serif;
  font-size: 0.72em;
  margin-top: 8px;
  padding: 6px 10px;
  border-radius: 2px;
}
.promo-ok { background: #d4edda; color: #155724; }
.promo-err { background: #f8d7da; color: #721c24; }

/* ─ Confirmation ─ */
.confirmation-section {
  grid-column: 1 / -1;
  text-align: center;
  padding: 80px 40px;
  animation: fadeInUp 0.5s ease both;
}

.confirm-icon {
  width: 90px; height: 90px; border-radius: 50%;
  background: linear-gradient(135deg, var(--color-gold), var(--color-gold-light));
  display: flex; align-items: center; justify-content: center;
  margin: 0 auto 30px;
  color: white;
  box-shadow: 0 10px 40px rgba(201,169,110,0.4);
  animation: popIn 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) both;
}
@keyframes popIn {
  from { transform: scale(0); opacity: 0; }
  to { transform: scale(1); opacity: 1; }
}

.confirm-title {
  font-family: 'Cormorant Garamond', serif;
  font-size: 2.5em;
  font-weight: 700;
  color: var(--color-noir);
  margin-bottom: 16px;
}
.confirm-sub {
  font-family: 'Inter', sans-serif;
  font-size: 0.9em;
  color: var(--color-gris);
  margin-bottom: 20px;
}
.confirm-ref {
  display: inline-block;
  background: var(--color-gris-clair);
  padding: 10px 24px;
  border-radius: 2px;
  font-family: 'Inter', sans-serif;
  font-size: 0.85em;
  color: var(--color-noir);
  margin-bottom: 40px;
}

.btn-back-catalogue {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: var(--color-noir);
  color: var(--color-gold-light);
  text-decoration: none;
  padding: 14px 32px;
  font-family: 'Inter', sans-serif;
  font-size: 0.78em;
  font-weight: 600;
  letter-spacing: 2px;
  text-transform: uppercase;
  border-radius: 1px;
  transition: all 0.35s;
}
.btn-back-catalogue:hover {
  background: var(--color-gold);
  color: #fff;
  transform: translateY(-2px);
}

/* Panier vide checkout */
.empty-checkout {
  text-align: center;
  padding: 100px 20px;
  color: var(--color-gris);
}
.empty-icon { font-size: 4em; opacity: 0.2; margin-bottom: 20px; }
.empty-checkout h2 {
  font-family: 'Cormorant Garamond', serif;
  font-size: 2em; font-weight: 300;
  color: var(--color-noir); margin-bottom: 30px;
}

/* Transitions */
.toast-enter-active, .toast-leave-active { transition: all 0.3s ease; }
.toast-enter-from, .toast-leave-to { opacity: 0; transform: translateY(-8px); }
.btn-content-enter-active, .btn-content-leave-active { transition: all 0.2s ease; }
.btn-content-enter-from, .btn-content-leave-to { opacity: 0; transform: scale(0.9); }

/* Responsive */
@media (max-width: 1024px) {
  .checkout-layout { grid-template-columns: 1fr; }
  .summary-box { position: static; order: -1; }
}
@media (max-width: 640px) {
  .checkout-page { padding: 30px 16px 80px; }
  .form-row { grid-template-columns: 1fr; }
  .checkout-steps { font-size: 0.62em; gap: 8px; }
  .step-sep { display: none; }
}

@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>
