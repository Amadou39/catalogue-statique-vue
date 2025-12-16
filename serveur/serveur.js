// server.js
import express from 'express';
import mysql from 'mysql2/promise';
import cors from 'cors';

const app = express();
const PORT = 3000;

// Configuration de la connexion (Base: catalogue, Collation: bin)
const dbConfig = {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'catalogue'
};

app.use(cors());
app.use(express.json());

// --- ROUTES API ---

// 1. Récupérer TOUS les produits
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

// 2. Récupérer un produit par son ID
app.get('/api/produits/:id', async (req, res) => {
    let connection;
    try {
        const { id } = req.params;
        connection = await mysql.createConnection(dbConfig);
        const [rows] = await connection.execute('SELECT * FROM produits WHERE id = ?', [id]);

        if (rows.length === 0) {
            return res.status(404).json({ message: 'Produit non trouvé.' });
        }
        res.json(rows[0]);
    } catch (error) {
        console.error('Erreur API (produit unique):', error);
        res.status(500).json({ message: 'Erreur serveur.' });
    } finally {
        if (connection) await connection.end();
    }
});

app.listen(PORT, () => {
    console.log(`✅ Serveur ESM démarré : http://localhost:${PORT}/api/produits`);
});