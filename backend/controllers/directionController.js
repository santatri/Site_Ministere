// backend/controllers/directionController.js
const db = require('../db');

// Création d'une direction
exports.createDirection = (req, res) => {
  const { nom_direction } = req.body;

  // Vérifier si la direction existe déjà
  const checkNomQuery = 'SELECT * FROM direction WHERE nom_direction = ?';
  db.query(checkNomQuery, [nom_direction], (err, result) => {
    if (err) {
      console.error('Erreur lors de la vérification du nom_direction:', err);
      return res.status(500).send('Erreur interne du serveur');
    }

    if (result.length > 0) {
      return res.status(400).send('Le nom_direction est déjà utilisé.');
    }

    // Insérer la nouvelle direction
    const insertQuery = 'INSERT INTO direction (nom_direction) VALUES (?)';
    db.query(insertQuery, [nom_direction], (err, result) => {
      if (err) {
        console.error('Erreur lors de l\'insertion:', err);
        return res.status(500).send('Erreur interne du serveur');
      }
      res.status(201).send({ message: 'Direction créée avec succès' });
    });
  });
};

// Récupération des directions
exports.getDirections = (req, res) => {
  const query = 'SELECT * FROM direction';
  db.query(query, (err, result) => {
    if (err) {
      console.error('Erreur lors de la récupération des directions:', err);
      return res.status(500).send('Erreur interne du serveur');
    }
    res.status(200).json(result);
  });
};

// Suppression d'une direction
exports.deleteDirection = (req, res) => {
  const { id } = req.params;

  const query = 'DELETE FROM direction WHERE id_direction = ?';
  db.query(query, [id], (err, result) => {
    if (err) {
      console.error('Erreur lors de la suppression:', err);
      return res.status(500).send('Erreur interne du serveur');
    }
    if (result.affectedRows === 0) {
      return res.status(404).send('Direction non trouvée');
    }
    res.status(200).send({ message: 'Direction supprimée avec succès' });
  });
};

// Mise à jour d'une direction
exports.updateDirection = (req, res) => {
  const { id } = req.params;
  const { nom_direction } = req.body;

  const query = 'UPDATE direction SET nom_direction = ? WHERE id_direction = ?';
  db.query(query, [nom_direction, id], (err, result) => {
    if (err) {
      console.error('Erreur lors de la mise à jour:', err);
      return res.status(500).send('Erreur interne du serveur');
    }
    if (result.affectedRows === 0) {
      return res.status(404).send('Direction non trouvée');
    }
    res.status(200).send({ message: 'Direction mise à jour avec succès' });
  });
};
