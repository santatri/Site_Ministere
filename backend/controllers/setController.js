const db = require('../db');
const multer = require('multer');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({ storage });

exports.gets= (req, res) => {
  db.query('SELECT * FROM settings LIMIT 1', (err, result) => {
    if (err) return res.status(500).json({ error: 'Erreur serveur' });
    res.json(result[0]);
  });
};

exports.updateSettings = [
  upload.single('logo'),
  (req, res) => {
    console.log('Requête reçue:', req.body);  // Vérifie les données reçues
    console.log('Fichier reçu:', req.file);   // Vérifie le fichier téléchargé

    const { email, address } = req.body;
    const logo = req.file ? req.file.filename : null;

    let query = 'UPDATE settings SET email = ?, address = ?';
    let params = [email, address];

    if (logo) {
      query += ', logo = ?';
      params.push(logo);
    }

    query += ' WHERE id = 1';

    db.query(query, params, (err) => {
      if (err) {
        console.error('Erreur lors de la mise à jour:', err);
        return res.status(500).json({ error: 'Erreur lors de la mise à jour' });
      }
      res.json({ message: 'Mise à jour réussie' });
    });
  },
];

