const multer = require('multer');
const db = require('../db');

// Configuration Multer pour le téléchargement des fichiers
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  },
});
const upload = multer({ storage });

// Ajouter un nouvel secrétaire général
exports.register = [
  upload.single('image'),
  (req, res) => {
    const { nom_sg, porte_sg } = req.body;
    const image = req.file ? req.file.filename : null;

    const query = `INSERT INTO SecretaireGeneral (nom_sg, porte_sg, id_ms)
                   VALUES (?, ?, ?)`;

    db.query(query, [nom_sg, porte_sg, 1], (err) => {
      if (err) {
        return res.status(500).send({ message: "Erreur lors de l'insertion", error: err });
      }
      res.status(201).send({ message: "Ajout réussi." });
    });
  },
];


// Récupérer tous les secrétaires généraux
exports.getAll = (req, res) => {
  db.query('SELECT * FROM SecretaireGeneral', (err, results) => {
    if (err) {
      return res.status(500).send({ message: 'Erreur lors de la récupération', error: err });
    }
    res.status(200).send({ data: results });
  });
};

// Mettre à jour un secrétaire général
exports.update = [
  upload.single('image'),
  (req, res) => {
    const { id_sg } = req.params;
    const { nom_sg, porte_sg } = req.body;
    const image = req.file ? req.file.filename : null;

    const query = `UPDATE SecretaireGeneral SET nom_sg = ?, porte_sg = ? WHERE id_sg = ?`;

    db.query(query, [nom_sg, porte_sg, id_sg], (err) => {
      if (err) {
        return res.status(500).send({ message: 'Erreur lors de la mise à jour', error: err });
      }
      res.status(200).send({ message: 'Mise à jour réussie.' });
    });
  },
];

// Supprimer un secrétaire général
exports.delete = (req, res) => {
  const { id_sg } = req.params;

  db.query('DELETE FROM SecretaireGeneral WHERE id_sg = ?', [id_sg], (err) => {
    if (err) {
      return res.status(500).send({ message: 'Erreur lors de la suppression', error: err });
    }
    res.status(200).send({ message: 'Suppression réussie.' });
  });
};
