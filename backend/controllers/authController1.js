const bcrypt = require('bcrypt');
const db = require('../db');

// Fonction pour gérer la connexion
const login = (req, res) => {
    const { matricule, password } = req.body;

    // Requête pour récupérer l'utilisateur correspondant au matricule
    const query = 'SELECT * FROM users1 WHERE matricule = ?';
    db.query(query, [matricule], async (err, results) => {
        if (err) return res.status(500).json({ message: 'Erreur serveur.' });

        // Vérifier si l'utilisateur existe
        if (results.length === 0) return res.status(404).json({ message: 'Utilisateur introuvable.' });

        const user = results[0];

        // Vérifier si l'utilisateur est validé
        if (!user.validated) return res.status(403).json({ message: 'Votre compte n\'est pas encore validé.' });

        // Vérifier le mot de passe
        const isPasswordValid = await bcrypt.compare(password, user.mdp);
        if (!isPasswordValid) return res.status(401).json({ message: 'Mot de passe incorrect.' });

        // Réponse avec le rôle de l'utilisateur
        res.status(200).json({ message: 'Connexion réussie.', role: user.role });
    });
};

module.exports = {
    login,
};
