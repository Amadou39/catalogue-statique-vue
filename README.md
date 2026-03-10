# 🛍️ Habits & Compagnie — Catalogue E-commerce

> Projet professionnel réalisé dans le cadre d'une formation en développement web.
> Application e-commerce complète développée avec **Vue 3**, **Vite** et **Stripe**.

---

## 🚀 Fonctionnalités

### Catalogue & Navigation
- 🔍 **Recherche en temps réel** — overlay instantané avec résultats produits
- 🎛️ **Filtres avancés** — par catégorie, prix maximum (slider), taille
- 🔀 **Transitions de pages** fluides entre toutes les routes

### Panier & Favoris
- 🛒 **Panier** — drawer slide-in depuis la droite, modification des quantités, persistance `localStorage`
- ❤️ **Wishlist** — toggle favoris sur chaque produit, page dédiée `/wishlist`, persistance `localStorage`

### Paiement
- 💳 **Stripe Elements** — formulaire de carte bancaire sécurisé et stylisé
- 📋 **Checkout en 3 étapes** — Livraison → Paiement → Confirmation
- 🛡️ Validation des champs, gestion des erreurs, récapitulatif de commande

### Pages disponibles
| Route | Description |
|---|---|
| `/` | Collection avec hero animé et grille produits responsive |
| `/produit/:id` | Détail produit (image, tailles, couleurs, réassurances) |
| `/checkout` | Processus de paiement complet |
| `/wishlist` | Liste de souhaits personnelle |
| `/about` | Histoire de la marque (valeurs, manifeste, chiffres clés) |
| `/*` | Page 404 personnalisée |

---

## 🛠️ Technologies utilisées

| Technologie | Version | Rôle |
|---|---|---|
| **Vue 3** | 3.5.13 | Framework JavaScript (Composition API) |
| **Vite** | 5.4.11 | Bundler & serveur de développement |
| **Vue Router** | 4.4.5 | Routage SPA (Single Page Application) |
| **Stripe.js** | latest | Formulaire de paiement sécurisé |
| **Express.js** | — | Backend API REST (PaymentIntent) |
| **MySQL2** | — | Base de données (via Laragon) |
| **Node.js** | 18.x | Environnement d'exécution |

**Design** : CSS Vanilla, Google Fonts (`Cormorant Garamond` + `Inter`), animations CSS

---

## 📁 Structure du projet

```
├── public/
│   └── images/              # Images produits (générées par IA)
├── src/
│   ├── components/
│   │   ├── Header.vue           # Navigation + recherche + icônes panier/favoris
│   │   ├── CartDrawer.vue       # Tiroir panier latéral
│   │   ├── ProductsCard.vue     # Carte produit dans le catalogue
│   │   └── CategoryFilter.vue
│   ├── composables/
│   │   ├── useCart.js           # État global du panier (localStorage)
│   │   └── useWishlist.js       # État global des favoris (localStorage)
│   ├── data/
│   │   └── produits.js          # Données statiques des produits
│   ├── router/
│   │   └── index.js             # Routes de l'application + SEO titles
│   └── views/
│       ├── CatalogueView.vue    # Page d'accueil
│       ├── ProductDetailView.vue
│       ├── CheckoutView.vue
│       ├── WishlistView.vue
│       ├── AboutView.vue
│       └── NotFoundView.vue
├── serveur/
│   └── serveur.js           # API Express + endpoint Stripe PaymentIntent
├── database/
│   └── script création Base de données.sql
└── .gitignore
```

---

## ⚙️ Installation & Démarrage

### Prérequis
- **Node.js** v18+ ([laragon.org](https://laragon.org) recommandé sur Windows)
- **MySQL** (inclus dans Laragon)
- Un compte **Stripe** (optionnel — mode démo disponible)

### Installation

```bash
# 1. Cloner le dépôt
git clone https://github.com/TON_USER/catalogue-habits-compagnie.git
cd catalogue-habits-compagnie

# 2. Installer les dépendances
npm install

# 3. Lancer le serveur de développement
npm run dev
```

➡️ L'application est accessible sur **http://localhost:5173**

### Lancer le backend API (optionnel)

```bash
node serveur/serveur.js
```

➡️ API disponible sur **http://localhost:3000**

---

## 💳 Configuration Stripe (paiements réels)

1. Créer un compte sur [dashboard.stripe.com](https://dashboard.stripe.com)
2. Récupérer les clés dans **Développeurs → Clés API**
3. Créer un fichier `.env` à la racine :

```env
STRIPE_SECRET_KEY=sk_test_...
```

4. Remplacer dans `src/views/CheckoutView.vue` :

```js
const STRIPE_PUBLIC_KEY = 'pk_test_...'; // Votre clé publique
```

> ⚠️ Sans configuration, l'application fonctionne en **mode démo** (paiement simulé, aucune clé requise).

---

## 🗃️ Base de données MySQL

```sql
-- Dans phpMyAdmin (Laragon) ou MySQL CLI :
source database/script\ création\ Base\ de\ données.sql
```

---

## 👨‍💻 Auteur

Projet développé dans le cadre d'un **projet professionnel — Formation Développement Web**

---

## 📄 Licence

Ce projet est réalisé à des fins pédagogiques.
