const db = require('../db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken'); // JWT pour générer les tokens sécurisés

const SECRET_KEY = '8219'; // Remplacez par une clé secrète complexe

  // Récupérer tous les utilisateurs
  exports.getUsers = (req, res) => {
    const query = 'SELECT id, nom, prenom, matricule, role, image, created_at, validated FROM users1';
  
    db.query(query, (err, result) => {
      if (err) {
        console.error('Erreur lors de la récupération des utilisateurs:', err);
        return res.status(500).send('Erreur interne du serveur');
      }
      res.status(200).json(result);
    });
  };
  
  // suppression  de liste
  // Suppression d'un utilisateur
  exports.deleteUser = (req, res) => {
    const { id } = req.params;
  
    const deleteQuery = 'DELETE FROM users1 WHERE id = ?';
    db.query(deleteQuery, [id], (err, result) => {
      if (err) {
        console.error('Erreur lors de la suppression de l\'utilisateur:', err);
        return res.status(500).send('Erreur interne du serveur');
      }
      if (result.affectedRows === 0) {
        return res.status(404).send('Utilisateur non trouvé');
      }
      res.status(200).send({ message: 'Utilisateur supprimé avec succès' });
    });
  };
  
  
  // Mettre à jour les informations d'un utilisateur
  exports.updateUser = (req, res) => {
    const { id } = req.params;
    const { nom, prenom, matricule, role } = req.body;
  
    const updateQuery = `
      UPDATE users1
      SET nom = ?, prenom = ?, matricule = ?, role = ?
      WHERE id = ?
    `;
  
    db.query(updateQuery, [nom, prenom, matricule, role, id], (err, result) => {
      if (err) {
        console.error('Erreur lors de la mise à jour de l\'utilisateur:', err);
        return res.status(500).send('Erreur interne du serveur');
      }
      if (result.affectedRows === 0) {
        return res.status(404).send('Utilisateur non trouvé');
      }
      res.status(200).send({ message: 'Utilisateur mis à jour avec succès' });
    });
  };
  