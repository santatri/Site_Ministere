const mysql = require('mysql');
const bcrypt = require('bcrypt');

// Connexion à la base de données
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'ms',
});

db.connect((err) => {
    if (err) {
        console.error('Erreur de connexion à MySQL:', err);
        return;
    }
    console.log('Connecté à MySQL');
});

// Fonction de connexion
const login = (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).send('Tous les champs sont requis.');
    }

    // Vérification de l'utilisateur
    const query = 'SELECT * FROM users WHERE email = ?';
    db.query(query, [email], (err, result) => {
        if (err) {
            console.error('Erreur lors de la requête:', err);
            return res.status(500).send('Erreur interne du serveur');
        }

        if (result.length === 0) {
            return res.status(400).send('Email ou mot de passe incorrect');
        }

        const user = result[0];

        // Vérification du mot de passe
        bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err) {
                return res.status(500).send('Erreur lors de la vérification du mot de passe');
            }

            if (isMatch) {
                res.status(200).send({
                    message: 'Connexion réussie',
                    role: user.role,
                });
            } else {
                res.status(400).send('Email ou mot de passe incorrect');
            }
        });
    });
};

module.exports = { login };
