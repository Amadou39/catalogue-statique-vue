<template>
  <div class="detail-container">
    <div v-if="produit">
<!--      <div class="image-placeholder">
        <span>📸 Image: {{ produit.image }}</span>
      </div>-->


      <div class="image-container">
        <img
            :src="`/images/${produit.image}`"
            :alt="produit.nom"
            class="detail-img"
        >
      </div>

      <h2 class="detail-name">{{ produit.nom }}</h2>
      <p class="detail-description">{{ produit.description }}</p>

<!--      <p class="detail-price">{{ produit.prix.toFixed(2) }} €</p>-->
      <p class="detail-price">{{ parseFloat(produit.prix).toFixed(2) }} €</p>

      <div class="options-container" v-if="produit.tailles">
        <p class="option-label">Taille</p>
        <div class="tailles">
          <button v-for="taille in produit.tailles" :key="taille" class="size-btn">{{ taille }}</button>
        </div>
      </div>

      <button class="add-cart-btn">Ajouter au panier</button>

      <div class="back-container">
        <RouterLink to="/" class="back-link">← Retour au Catalogue</RouterLink>
      </div>
    </div>
    <div v-else class="not-found">
      ❌ Produit introuvable
    </div>
  </div>
</template>

    <script setup>
      import { ref, onMounted } from 'vue';

      // Récupère l'ID passé par le routeur
      const props = defineProps({
        id: {
          type: String,
          required: true
        }
      });

      const produit = ref(null);

      // Fonction Fetch pour appeler ton serveur Node.js
      const chargerDonnees = async () => {
        try {
          const response = await fetch(`http://localhost:3000/api/produits/${props.id}`);
          if (!response.ok) throw new Error('Produit non trouvé');
          produit.value = await response.json();
          console.log(produit);
          console.log(produit.value);
        } catch (error) {
          console.error("Erreur de chargement :", error);
        }
      };

      onMounted(() => {
        chargerDonnees();
      });
    </script>



<!--<script setup>
import { computed } from 'vue';
import { produits } from '@/data/produits.js';

const props = defineProps({ id: { type: [String, Number], required: true } });
const produit = computed(() => produits.find(p => p.id === parseInt(props.id)));
</script>-->

<style scoped>
.detail-container {
  max-width: 800px;
  margin: 60px auto; /* Marge augmentée pour aérer */
  padding: 40px;
  background-color: white;
  text-align: center; /* LE changement clé pour tout centrer */
}

.image-placeholder {
  width: 100%;
  height: 300px;
  background-color: #f4f4f4;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 30px;
  color: #888;
  border-radius: 4px;
}

.detail-name {
  font-size: 2.5em;
  color: #1a1a1a;
  margin-bottom: 15px;
}

.detail-description {
  color: #666;
  line-height: 1.8;
  max-width: 600px;
  margin: 0 auto 25px auto; /* Centre le bloc de texte si plusieurs lignes */
}

.detail-price {
  font-size: 1.8em;
  color: #1a1a1a;
  font-weight: bold;
  margin-bottom: 30px;
}

/* Centrage des tailles */
.options-container {
  margin-bottom: 30px;
}
.option-label {
  font-weight: bold;
  text-transform: uppercase;
  font-size: 0.8em;
  letter-spacing: 1px;
  margin-bottom: 10px;
}
.tailles {
  display: flex;
  justify-content: center; /* Centre les boutons horizontalement */
  gap: 10px;
}
.size-btn {
  width: 45px; height: 45px;
  background: #fff;
  border: 1px solid #ddd;
  cursor: pointer;
  font-family: 'Lato', sans-serif;
  transition: all 0.2s;
}
.size-btn:hover {
  background: #1a1a1a;
  color: white;
  border-color: #1a1a1a;
}

.add-cart-btn {
  background-color: #1a1a1a;
  color: white;
  border: none;
  padding: 15px 40px;
  font-size: 1em;
  text-transform: uppercase;
  letter-spacing: 1px;
  cursor: pointer;
  margin-bottom: 30px;
  transition: background 0.3s;
}
.add-cart-btn:hover {
  background-color: #333;
}

.back-link {
  color: #888;
  text-decoration: none;
  font-size: 0.9em;
  border-bottom: 1px solid transparent;
  transition: border-color 0.3s;
}
.back-link:hover {
  border-bottom-color: #888;
}
</style>