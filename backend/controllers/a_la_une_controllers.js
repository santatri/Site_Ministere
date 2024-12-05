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

// Ajouter un nouvel élément
exports.register = [
  upload.single('image'),
  (req, res) => {
    const { titre, description } = req.body;
    const image = req.file ? req.file.filename : null;

    const query = `INSERT INTO a_la_une (titre, description, image, date_insertion)
                   VALUES (?, ?, ?, NOW())`;

    db.query(query, [titre, description, image], (err) => {
      if (err) {
        return res.status(500).send({ message: 'Erreur lors de l\'insertion', error: err });
      }
      res.status(201).send({ message: 'Ajout réussi.' });
    });
  },
];

// Récupérer tous les éléments
exports.getAll = (req, res) => {
  db.query('SELECT * FROM a_la_une ORDER BY date_insertion DESC', (err, results) => {
    if (err) {
      return res.status(500).send({ message: 'Erreur lors de la récupération', error: err });
    }
    res.status(200).send({ data: results });
  });
};

// Mettre à jour un élément
exports.update = [
  upload.single('image'),
  (req, res) => {
    const { id } = req.params;
    const { titre, description } = req.body;
    const image = req.file ? req.file.filename : null;

    const query = `UPDATE a_la_une SET titre = ?, description = ?, image = ? WHERE id = ?`;

    db.query(query, [titre, description, image, id], (err) => {
      if (err) {
        return res.status(500).send({ message: 'Erreur lors de la mise à jour', error: err });
      }
      res.status(200).send({ message: 'Mise à jour réussie.' });
    });
  },
];

// Supprimer un élément
exports.delete = (req, res) => {
  const { id } = req.params;

  db.query('DELETE FROM a_la_une WHERE id = ?', [id], (err) => {
    if (err) {
      return res.status(500).send({ message: 'Erreur lors de la suppression', error: err });
    }
    res.status(200).send({ message: 'Suppression réussie.' });
  });
};
