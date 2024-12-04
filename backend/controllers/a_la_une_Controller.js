const db = require('./db');
const multer = require('multer');
const path = require('path');

// Configuration pour multer (gestion des fichiers)
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Dossier pour stocker les images
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Nom unique pour chaque image
  }
});

const upload = multer({ storage: storage });

// Fonction pour insérer une actualité "À la Une"
exports.insert = [
  upload.single('media_image'),
  (req, res) => {
    const { titre, description } = req.body;
    const media_image = req.file ? req.file.filename : null; // Si image est présente, on l'ajoute

    const query = 'INSERT INTO a_la_une (titre, description, media_image) VALUES (?, ?, ?)';
    db.query(query, [titre, description, media_image], (err, result) => {
      if (err) {
        console.error("Erreur d'insertion:", err);
        return res.status(500).json({ message: 'Erreur lors de l\'insertion.', error: err });
      }
      res.status(200).send({ message: 'Actualité "À la Une" ajoutée avec succès.' });
    });
  }
];
