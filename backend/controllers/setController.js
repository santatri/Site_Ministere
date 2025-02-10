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
  upload.fields([
    { name: "logo", maxCount: 1 }, // Champ pour le logo
    { name: "logoDG", maxCount: 1 }, // Champ pour logoDG
  ]),
  (req, res) => {
    console.log('Requête reçue:', req.body);
    console.log('Fichiers reçus:', req.files); // Vérifiez ici les fichiers reçus

    const { email, address, numero } = req.body;
    const logo = req.files["logo"] ? req.files["logo"][0].filename : null;
    const logoDG = req.files["logoDG"] ? req.files["logoDG"][0].filename : null;

    let query = 'UPDATE settings SET email = ?, address = ?, numero = ?';
    let params = [email, address, numero];

    if (logo) {
      query += ', logo = ?';
      params.push(logo);
    }
    if (logoDG) {
      query += ', logoDG = ?';
      params.push(logoDG);
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
