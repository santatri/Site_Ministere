const db = require('../db'); // Import de la base de données

// Ajouter un contact
exports.addContact = (req, res) => {
  const { firstName, lastName, email, subject, message } = req.body;

  // Validation : vérifier si les champs obligatoires sont remplis
  if (!subject || !message) {
    return res.status(400).json({ error: 'L\'objet et le message sont requis.' });
  }

  const query = `
    INSERT INTO contacts (first_name, last_name, email, subject, message)
    VALUES (?, ?, ?, ?, ?)
  `;

  // Si un champ non obligatoire n'est pas fourni, on peut passer null
  db.query(query, [firstName || null, lastName || null, email || null, subject, message], (err, result) => {
    if (err) {
      console.error('Erreur lors de l\'insertion des données :', err);
      return res.status(500).json({ error: 'Erreur interne du serveur.' });
    }

    res.status(201).json({ message: 'Contact ajouté avec succès !' });
  });
};

// Récupération des messages
exports.getMessages = (req, res) => {
    const query = 'SELECT * FROM contacts ORDER BY created_at DESC';
    db.query(query, (err, results) => {
      if (err) {
        console.error('Erreur lors de la récupération des messages:', err);
        return res.status(500).json({ message: 'Erreur interne du serveur' });
      }
      res.status(200).json(results);
    });
  };