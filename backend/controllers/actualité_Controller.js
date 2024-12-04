const db = require('../db');
const multer = require('multer');

// Configuration de multer pour gérer les fichiers
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads'); // Dossier où les fichiers seront sauvegardés
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname); // Nom unique pour chaque fichier
  },
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'video/mp4'];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Format de fichier non pris en charge.'));
  }
};

const upload = multer({ storage, fileFilter });

exports.register = [
  upload.fields([
    { name: 'media_image', maxCount: 1 },
    { name: 'media_video', maxCount: 1 },
  ]), // Middleware pour gérer les fichiers
  (req, res) => {
    const { titre, description } = req.body;
    const media_image = req.files.media_image ? req.files.media_image[0].filename : null;
    const media_video = req.files.media_video ? req.files.media_video[0].filename : null;

    const insertQuery = `
      INSERT INTO actu (titre, description, media_image, media_video, date_insertion)
      VALUES (?, ?, ?, ?, NOW())
    `;

    db.query(insertQuery, [titre, description, media_image, media_video], (err, result) => {
      if (err) {
        console.error("Erreur lors de l'insertion :", err.sqlMessage || err);
        return res.status(500).send({
          message: 'Erreur lors de l\'insertion.',
          error: err.sqlMessage || err.message || err,
        });
      }
      res.status(201).send({
        message: 'Insertion réussie. Vous pouvez aller dans la page d’actualité pour le voir.',
      });
    });
  },
];

exports.getAll = (req, res) => {
  const { mots, dateStart, dateEnd, limit } = req.query;
  let selectQuery = "SELECT * FROM actu WHERE 1=1"; // Toujours vrai, pour ajouter dynamiquement des conditions
  const queryParams = [];

  // Filtre par mots-clés
  if (mots) {
    selectQuery += " AND (titre LIKE ? OR description LIKE ?)";
    queryParams.push(`%${mots}%`, `%${mots}%`);
  }

  // Filtre par date de début
  if (dateStart) {
    selectQuery += " AND date_insertion >= ?";
    queryParams.push(dateStart);
  }

  // Filtre par date de fin
  if (dateEnd) {
    selectQuery += " AND date_insertion <= ?";
    queryParams.push(dateEnd);
  }

  selectQuery += " ORDER BY date_insertion DESC"; // Trier par date décroissante

  // Limiter les résultats si `limit` est fourni
  if (limit) {
    selectQuery += " LIMIT ?";
    queryParams.push(parseInt(limit, 10));
  }

  db.query(selectQuery, queryParams, (err, results) => {
    if (err) {
      console.error("Erreur lors de la récupération des actualités :", err.sqlMessage || err);
      return res.status(500).send({
        message: 'Erreur lors de la récupération des actualités.',
        error: err.sqlMessage || err.message || err,
      });
    }
    res.status(200).send({
      message: 'Actualités récupérées avec succès.',
      data: results,
    });
  });
};
exports.delete = (req, res) => {
  const { id } = req.params;
  const deleteQuery = 'DELETE FROM actu WHERE id = ?';
  db.query(deleteQuery, [id], (err, result) => {
    if (err) {
      console.error("Erreur lors de la suppression :", err.sqlMessage || err);
      return res.status(500).send({
        message: 'Erreur lors de la suppression.',
        error: err.sqlMessage || err.message || err,
      });
    }
    res.status(200).send({
      message: 'Actualité supprimée avec succès.',
    });
  });
};

exports.update = [
  upload.fields([
    { name: 'media_image', maxCount: 1 },
    { name: 'media_video', maxCount: 1 },
  ]), // Middleware pour gérer les fichiers
  (req, res) => {
    const { id } = req.params;
    const { titre, description } = req.body;
    const media_image = req.files.media_image ? req.files.media_image[0].filename : null;
    const media_video = req.files.media_video ? req.files.media_video[0].filename : null;

    const updateQuery = `
      UPDATE actu
      SET titre = ?, description = ?, media_image = ?, media_video = ?
      WHERE id = ?
    `;

    db.query(updateQuery, [titre, description, media_image, media_video, id], (err, result) => {
      if (err) {
        console.error("Erreur lors de la mise à jour :", err.sqlMessage || err);
        return res.status(500).send({
          message: 'Erreur lors de la mise à jour.',
          error: err.sqlMessage || err.message || err,
        });
      }
      res.status(200).send({
        message: 'Actualité mise à jour avec succès.',
      });
    });
  },
];

