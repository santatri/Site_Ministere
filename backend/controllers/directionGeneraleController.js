const db = require('../db');

// Insertion d'une nouvelle direction générale
exports.insertDirectionGenerale = (req, res) => {
    const { id_sg, nom_dg, porte_dg } = req.body;
    const query = 'INSERT INTO DirectionGenerale (id_sg, nom_dg, porte_dg) VALUES (?, ?, ?)';
    db.query(query, [id_sg, nom_dg, porte_dg], (err, result) => {
      if (err) {
        return res.status(500).send({ message: 'Erreur lors de l\'insertion.', error: err });
      }
      res.status(201).send({ message: 'Direction Générale ajoutée avec succès!' });
    });
  };
  
  // Récupérer toutes les directions générales
// Récupérer toutes les directions générales avec le nom du secrétaire général
exports.getAllDG = (req, res) => {
  const query = `
    SELECT dg.id_dg, dg.nom_dg, dg.porte_dg, sg.nom_sg
    FROM DirectionGenerale dg
    JOIN SecretaireGeneral sg ON dg.id_sg = sg.id_sg
  `;
  
  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).send({ message: 'Erreur lors de la récupération des directions générales.', error: err });
    }
    res.status(200).send({ data: results });
  });
};

  
  // Mettre à jour une direction générale
  exports.updateDirectionGenerale = (req, res) => {
    const { id_sg, nom_dg, porte_dg } = req.body;
    const { id_dg } = req.params;
    const query = 'UPDATE DirectionGenerale SET id_sg = ?, nom_dg = ?, porte_dg = ? WHERE id_dg = ?';
    db.query(query, [id_sg, nom_dg, porte_dg, id_dg], (err, result) => {
      if (err) {
        return res.status(500).send({ message: 'Erreur lors de la mise à jour.', error: err });
      }
      res.status(200).send({ message: 'Direction Générale mise à jour avec succès!' });
    });
  };
  
  // Supprimer une direction générale
  exports.deleteDirectionGenerale = (req, res) => {
    const { id_dg } = req.params;
    const query = 'DELETE FROM DirectionGenerale WHERE id_dg = ?';
    db.query(query, [id_dg], (err, result) => {
      if (err) {
        return res.status(500).send({ message: 'Erreur lors de la suppression.', error: err });
      }
      res.status(200).send({ message: 'Direction Générale supprimée avec succès!' });
    });
  };
  