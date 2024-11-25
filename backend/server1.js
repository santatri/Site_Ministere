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

// Route POST pour la création du compte

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




// app.post('/api/create-account', async (req, res) => {
//     const { name, email, password, role } = req.body;

//     // Vérifier que tous les champs sont fournis
//     if (!name || !email || !password || !role) {
//         return res.status(400).send('Tous les champs sont requis.');
//     }

//     try {
//         // Hachage du mot de passe
//         const hashedPassword = await bcrypt.hash(password, 10);

//         // Vérification si l'email existe déjà
//         const checkEmailQuery = 'SELECT * FROM users WHERE email = ?';
//         db.query(checkEmailQuery, [email], (err, result) => {
//             if (err) {
//                 console.error('Erreur lors de la vérification de l\'email:', err);
//                 return res.status(500).send('Erreur interne du serveur');
//             }

//             if (result.length > 0) {
//                 return res.status(400).send('L\'email est déjà utilisé.');
//             }

//             // Insertion dans la base de données
//             const insertQuery = 'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)';
//             db.query(insertQuery, [name, email, hashedPassword, role], (err, result) => {
//                 if (err) {
//                     console.error('Erreur lors de l\'insertion:', err);
//                     return res.status(500).send('Erreur interne du serveur');
//                 }
//                 res.status(201).send({ message: 'Compte créé avec succès' });
//             });
//         });
//     } catch (err) {
//         console.error('Erreur lors du hachage du mot de passe:', err);
//         res.status(500).send('Erreur lors de la création du compte');
//     }
// });
const userRoutes = require('./routes/userRoutes');
app.use('/api/users1', userRoutes);
// app.use('/api/auth', authRoutes);

const actualité_Routes = require('./routes/actualité_Routes');
app.use('/api/actu',actualité_Routes);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.post('/api/create-direction', async (req, res) => {
    const { nom_direction} = req.body;
// console.log('dir',req.body);

    // Vérifier que tous les champs sont fournis
    try {
        // Hachage du mot de passe
        
        // Vérification si direction existe déjà
        const checkNomQuery = 'SELECT * FROM direction WHERE nom_direction = ?';
        db.query(checkNomQuery, [nom_direction], (err, result) => {
            if (err) {
                console.error('Erreur lors de la vérification de le nom_direction', err);
                return res.status(500).send('Erreur interne du serveur');
            }

            if (result.length > 0) {
                return res.status(400).send('Le nom_direction est déjà utilisé.');
            }

            // Insertion dans la base de données
            const insertQuery = 'INSERT INTO direction (nom_direction) VALUES (?)';
            db.query(insertQuery, [nom_direction], (err, result) => {
                if (err) {
                    console.error('Erreur lors de l\'insertion:', err);
                    return res.status(500).send('Erreur interne du serveur');
                }
                res.status(201).send({ message: 'Compte créé avec succès' });
            });
        });
    } catch (err) {
        console.error('erreur:', err);
        res.status(500).send('Erreur lors de la création de direction');
    }
});


//recuperation de donnee direction
app.get('/api/get-directions', (req, res) => {
    const query = 'SELECT * FROM direction';
    db.query(query, (err, result) => {
        if (err) {
            console.error('Erreur lors de la récupération des directions:', err);
            return res.status(500).send('Erreur interne du serveur');
        }
        res.status(200).json(result);
    });
});
// suppretion
// Supprimer une direction
app.delete('/api/delete-direction/:id', (req, res) => {
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
});

// Mettre à jour une direction
app.put('/api/update-direction/:id', (req, res) => {
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
});

// Route POST pour la connexion
app.post('/api/login', (req, res) => {
    const { email, password } = req.body;

    // Vérification que les champs email et mot de passe sont fournis
    if (!email || !password) {
        return res.status(400).send('Tous les champs sont requis.');
    }

    // Vérification pour le cas spécifique de l'admin
    if (email === 'Admin@gmail.com' && password === 'Admin') {
        return res.status(200).send({
            message: 'Connexion réussie en tant qu\'administrateur',
            role: 'admin', // Identifie cet utilisateur comme un administrateur
        });
    }

    // Vérification dans la table admin pour l'admin
    const query = 'SELECT * FROM admin WHERE email = ?';
    db.query(query, [email], (err, result) => {
        if (err) {
            console.error('Erreur lors de la requête:', err);
            return res.status(500).send('Erreur interne du serveur');
        }

        if (result.length > 0) {
            // Si l'utilisateur existe dans la table admin
            const admin = result[0];

            // Vérification du mot de passe
            bcrypt.compare(password, admin.password, (err, isMatch) => {
                if (err) {
                    return res.status(500).send('Erreur lors de la vérification du mot de passe');
                }

                if (isMatch) {
                    // Connexion réussie pour l'admin
                    res.status(200).send({
                        message: 'Connexion réussie en tant qu\'administrateur',
                        role: 'admin',
                    });
                } else {
                    res.status(400).send('Email ou mot de passe incorrect');
                }
            });
        } else {
            // Si l'utilisateur n'est pas dans la table admin, vérification dans la table users (pour les utilisateurs normaux)
            const queryUser = 'SELECT * FROM users WHERE email = ?';
            db.query(queryUser, [email], (err, result) => {
                if (err) {
                    console.error('Erreur lors de la requête:', err);
                    return res.status(500).send('Erreur interne du serveur');
                }

                if (result.length === 0) {
                    return res.status(400).send('Email ou mot de passe incorrect');
                }

                const user = result[0];

                // Vérification du mot de passe pour un utilisateur normal
                bcrypt.compare(password, user.password, (err, isMatch) => {
                    if (err) {
                        return res.status(500).send('Erreur lors de la vérification du mot de passe');
                    }

                    if (isMatch) {
                        // Connexion réussie pour un utilisateur normal
                        res.status(200).send({
                            message: 'Connexion réussie',
                            role: 'user',
                        });
                    } else {
                        res.status(400).send('Email ou mot de passe incorrect');
                    }
                });
            });
        }
    });
});

//afff


// Lancement du serveur
app.listen(port, () => {
    console.log(`Serveur backend démarré sur http://localhost:${port}`);
});