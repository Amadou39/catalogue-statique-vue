// serveur/serveur.js
import express from 'express';
import mysql from 'mysql2/promise';
import cors from 'cors';

const app = express();
const PORT = 3000;

// ⚠️ Remplacez par votre clé secrète Stripe (sk_test_...)
const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY || 'sk_test_VOTRE_CLE_SECRETE_ICI';

let stripe;
try {
  const Stripe = (await import('stripe')).default;
  stripe = new Stripe(STRIPE_SECRET_KEY);
} catch (e) {
  console.warn('⚠️  Module Stripe non disponible. Le paiement sera en mode démo.');
}

const dbConfig = {
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'catalogue'
};

app.use(cors({ origin: 'http://localhost:5173' }));
app.use(express.json());

// ─── PRODUITS ────────────────────────────────────────────

app.get('/api/produits', async (req, res) => {
  let connection;
  try {
    connection = await mysql.createConnection(dbConfig);
    const [rows] = await connection.execute('SELECT * FROM produits');
    res.json(rows);
  } catch (error) {
    console.error('Erreur API (tous produits):', error);
    res.status(500).json({ message: 'Erreur serveur.' });
  } finally {
    if (connection) await connection.end();
  }
});

app.get('/api/produits/:id', async (req, res) => {
  let connection;
  try {
    const { id } = req.params;
    connection = await mysql.createConnection(dbConfig);
    const [rows] = await connection.execute('SELECT * FROM produits WHERE id = ?', [id]);
    if (rows.length === 0) return res.status(404).json({ message: 'Produit non trouvé.' });
    res.json(rows[0]);
  } catch (error) {
    console.error('Erreur API (produit unique):', error);
    res.status(500).json({ message: 'Erreur serveur.' });
  } finally {
    if (connection) await connection.end();
  }
});

// ─── STRIPE PAYMENT INTENT ───────────────────────────────

app.post('/api/create-payment-intent', async (req, res) => {
  if (!stripe || STRIPE_SECRET_KEY === 'sk_test_VOTRE_CLE_SECRETE_ICI') {
    // Mode démo : retourne un faux clientSecret
    return res.json({ clientSecret: 'demo_secret', demo: true });
  }

  try {
    const { amount, currency = 'eur', metadata = {} } = req.body;

    if (!amount || amount < 50) {
      return res.status(400).json({ message: 'Montant invalide (minimum 0,50€).' });
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount), // en centimes
      currency,
      automatic_payment_methods: { enabled: true },
      metadata,
    });

    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error('Erreur Stripe:', error);
    res.status(500).json({ message: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Serveur démarré : http://localhost:${PORT}`);
  console.log(`   → API produits : http://localhost:${PORT}/api/produits`);
  console.log(`   → Payment Intent : POST http://localhost:${PORT}/api/create-payment-intent`);
});