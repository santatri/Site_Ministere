const db = require('../db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken'); // JWT pour générer les tokens sécurisés

const SECRET_KEY = '8219'; // Remplacez par une clé secrète complexe


// Inscription d'un utilisateur
exports.registerUser = async (req, res) => {
  const { nom, prenom, matricule, mdp, confirmMdp, role, image } = req.body;

  // Vérification du mot de passe
  if (mdp !== confirmMdp) {
    return res.status(400).send({ message: 'Les mots de passe ne correspondent pas' });
  }

  try {
    // Vérifier si le matricule existe déjà
    const checkUserQuery = 'SELECT * FROM users1 WHERE matricule = ?';
    db.query(checkUserQuery, [matricule], async (err, result) => {
      if (err) return res.status(500).send('Erreur interne du serveur');
      if (result.length > 0) {
        return res.status(400).send('Le matricule est déjà utilisé');
      }

      // Hacher le mot de passe
      const hashedPassword = await bcrypt.hash(mdp, 10);

      // Insérer l'utilisateur
      const insertQuery = `
        INSERT INTO users1 (nom, prenom, matricule, mdp, role, image, validated)
        VALUES (?, ?, ?, ?, ?, ?, FALSE)
      `;
      db.query(
        insertQuery,
        [nom, prenom, matricule, hashedPassword, role, image],
        (err, result) => {
          if (err) {
            console.error('Erreur lors de l\'insertion:', err);
            return res.status(500).send('Erreur interne du serveur');
          }
          res.status(201).send({ message: 'Inscription réussie. En attente de validation par l\'administrateur.Attendé au moin 1h pour se connecté.' });
        }
      );
    });
  } catch (err) {
    res.status(500).send('Erreur interne du serveur');
  }
};
// Validation d'un utilisateur par l'admin
exports.validateUser = (req, res) => {
    const { id } = req.params;
  
    const updateQuery = 'UPDATE users1 SET validated = TRUE WHERE id = ?';
    db.query(updateQuery, [id], (err, result) => {
      if (err) {
        console.error('Erreur lors de la validation:', err);
        return res.status(500).send('Erreur interne du serveur');
      }
      if (result.affectedRows === 0) {
        return res.status(404).send('Utilisateur non trouvé');
      }
      res.status(200).send({ message: 'Utilisateur validé avec succès' });
    });
  };
  // Récupérer les utilisateurs non validés
exports.getUnvalidatedUsers = (req, res) => {
    const query = 'SELECT id, nom, prenom, matricule, role, image,created_at FROM users1 WHERE validated = FALSE';
  
    db.query(query, (err, result) => {
      if (err) {
        console.error('Erreur lors de la récupération des utilisateurs non validés:', err);
        return res.status(500).send('Erreur interne du serveur');
      }
      res.status(200).json(result);
    });
  };

  //recuperation des utilisateur
  exports.getUsers = (req, res) => {
    const query = 'SELECT * FROM direction';
    db.query(query, (err, result) => {
      if (err) {
        console.error('Erreur lors de la récupération des directions:', err);
        return res.status(500).send('Erreur interne du serveur');
      }
      res.status(200).json(result);
    });
  };
  

// Connexion d'un utilisateur
exports.loginUser = async (req, res) => {
    const { matricule, mdp } = req.body;
  
    if (!matricule || !mdp) {
      return res.status(400).send({ message: 'Veuillez fournir le matricule et le mot de passe.' });
    }
  
    try {
      // Vérifier si le matricule existe
      const checkUserQuery = 'SELECT * FROM users1 WHERE matricule = ?';
      db.query(checkUserQuery, [matricule], async (err, result) => {
        if (err) {
          console.error('Erreur lors de la vérification de l\'utilisateur:', err);
          return res.status(500).send('Erreur interne du serveur');
        }
  
        if (result.length === 0) {
          return res.status(404).send({ message: 'Utilisateur introuvable.' });
        }
  
        const user = result[0];
  
        // Vérifier si l'utilisateur est validé
        if (!user.validated) {
          return res.status(403).send({ message: 'Votre compte n\'est pas encore validé par l\'administrateur.' });
        }
  
        // Vérifier le mot de passe
        const isMatch = await bcrypt.compare(mdp, user.mdp);
        if (!isMatch) {
          return res.status(401).send({ message: 'Mot de passe incorrect.' });
        }
  
        // Générer un token JWT
        const token = jwt.sign({ id: user.id, role: user.role }, SECRET_KEY, { expiresIn: '1h' });
  
        res.status(200).send({
          message: 'Connexion réussie',
          token,
          user: {
            id: user.id,
            nom: user.nom,
            prenom: user.prenom,
            role: user.role,
          },
        });
      });
    } catch (err) {
      res.status(500).send('Erreur interne du serveur');
    }
  };
  
