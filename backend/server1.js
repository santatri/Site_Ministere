const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const cors = require('cors');
const bcrypt = require('bcrypt');
const app = express();
const multer = require('multer');
const path = require('path');


const port = 5001;

// Middleware
app.use(cors());
app.use(express.json());

// Connexion à la base de données MySQL
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'ms', // Assure-toi que ta base de données est nommée 'ms'
});

// Connexion à MySQL
db.connect((err) => {
    if (err) {
        console.error('Erreur de connexion à MySQL:', err);
        return;
    }
    console.log('Connecté à MySQL');
});

// Configuration de Multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + path.extname(file.originalname)); // Renomme l'image avec un timestamp
    },
  });
  
  const upload = multer({ storage });
  
  // Endpoint pour l'upload
  app.post('/api/upload', upload.single('image'), (req, res) => {
    if (!req.file) {
      return res.status(400).send('Aucun fichier téléchargé');
    }
    res.status(200).send({ filename: req.file.filename });
  });




const userRoutes = require('./routes/userRoutes');
app.use('/api/users1', userRoutes);

//Login
const userRoutesLogin = require('./routes/userRoutesLogin');
app.use('/api/users1', userRoutesLogin);

//CRUD users 
const userRoutesCRUD = require('./routes/userRoutesCRUD');
app.use('/api/users1', userRoutesCRUD);

//Login
// app.use('/api/auth', authRoutes);

const actualité_Routes = require('./routes/actualité_Routes');
app.use('/api/actu',actualité_Routes);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
// // Middleware pour servir les fichiers d'images
// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const aLaUneRoutes = require('./routes/a_la_une');
app.use('/api/a_la_une', aLaUneRoutes);

//SECRETAIRE GENERALE
const secretaireGeneralRoutes = require('./routes/secretaireGeneralRoutes');
app.use('/api/secretaire_general', secretaireGeneralRoutes);
//Direction generale
const directionGeneraleRoutes = require('./routes/directionGeneraleRoutes');
app.use('/api/direction_generale', directionGeneraleRoutes);
//Direction
const directionRoutes = require('./routes/directionRoutes');
app.use('/api/direction', directionRoutes);
//service
const serviceRoutes = require('./routes/serviceRoutes');
app.use('/api/service', serviceRoutes);
//service offert
const serviceOffertRoutes = require('./routes/ServiceOffertRoutes');
app.use('/api/serviceOffert', serviceOffertRoutes);

// Lancement du serveur
app.listen(port, () => {
    console.log(`Serveur backend démarré sur http://localhost:${port}`);
});