// server.js

const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Configuration de la connexion à la base de données MySQL
const dbConfig = {
    host: 'localhost', // Mettez l'hôte de votre BDD
    user: 'root',      // Mettez votre utilisateur BDD
    password: 'votre_mot_de_passe', // ⚠️ Mettez votre mot de passe réel
    database: 'catalogue_bdd' // Nom de la base de données créée
};

// Middleware pour autoriser les requêtes cross-origin depuis votre application Vue
// C'est essentiel pour le développement.
app.use(cors());
app.use(express.json());

// --- ROUTES API ---

// 1. Route pour récupérer TOUS les produits
app.get('/api/produits', async (req, res) => {
    let connection;
    try {
        // Établir la connexion
        connection = await mysql.createConnection(dbConfig);

        // Exécuter la requête SQL
        const [rows] = await connection.execute('SELECT * FROM produits');

        // Renvoyer les résultats en JSON
        res.json(rows);

    } catch (error) {
        console.error('Erreur lors de la récupération des produits:', error);
        // Renvoyer un statut d'erreur 500
        res.status(500).json({ message: 'Erreur serveur lors de la récupération des données.' });
    } finally {
        // Toujours fermer la connexion si elle a été établie
        if (connection) connection.end();
    }
});

// 2. Route pour récupérer un produit par son ID
app.get('/api/produits/:id', async (req, res) => {
    let connection;
    try {
        const produitId = req.params.id;
        connection = await mysql.createConnection(dbConfig);

        // Requête préparée pour éviter les injections SQL
        const [rows] = await connection.execute('SELECT * FROM produits WHERE id = ?', [produitId]);

        if (rows.length === 0) {
            return res.status(404).json({ message: 'Produit non trouvé.' });
        }

        // Renvoyer le premier (et unique) résultat
        res.json(rows[0]);

    } catch (error) {
        console.error('Erreur lors de la récupération du produit:', error);
        res.status(500).json({ message: 'Erreur serveur.' });
    } finally {
        if (connection) connection.end();
    }
});


// Démarrage du serveur
app.listen(PORT, () => {
    console.log(`Serveur Node.js démarré sur le port ${PORT}`);
    console.log(`Accès API : http://localhost:${PORT}/api/produits`);
});