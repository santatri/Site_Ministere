// backend/db.js
const mysql = require('mysql');

// Créer la connexion à la base de données
const db = mysql.createConnection({
  host: 'localhost',        // Adresse du serveur de base de données
  user: 'root',             // Nom d'utilisateur
  password: '',             // Mot de passe (si nécessaire)
  database: 'ms' // Nom de votre base de données
});

// Connecter à la base de données
db.connect((err) => {
  if (err) {
    console.error('Erreur de connexion à la base de données: ', err);
    return;
  }
  console.log('Connexion réussie à la base de données');
});

module.exports = db;
