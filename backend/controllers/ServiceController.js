const db = require('../db'); // Connexion à la base de données

// Récupérer tous les services
exports.getAllServices = (req, res) => {
    const query = `
        SELECT 
            s.id_s, s.nom_s, s.porte_s, d.nom_d 
        FROM 
            Service s 
        LEFT JOIN 
            Direction d ON s.id_d = d.id_d`;

    db.query(query, (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Erreur lors de la récupération des services.', error: err });
        }
        res.status(200).json({ data: results });
    });
};

// Créer un service
exports.createService = (req, res) => {
    const { nom_s, porte_s, id_d } = req.body;

    const query = 'INSERT INTO Service (nom_s, porte_s, id_d) VALUES (?, ?, ?)';
    db.query(query, [nom_s, porte_s, id_d], (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Erreur lors de l\'ajout du service.', error: err });
        }
        res.status(201).json({ message: 'Service ajouté avec succès', data: result });
    });
};

// Mettre à jour un service
exports.updateService = (req, res) => {
    const { nom_s, porte_s, id_d } = req.body;
    const { id } = req.params;

    const query = 'UPDATE Service SET nom_s = ?, porte_s = ?, id_d = ? WHERE id_s = ?';
    db.query(query, [nom_s, porte_s, id_d, id], (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Erreur lors de la mise à jour du service.', error: err });
        }
        res.status(200).json({ message: 'Service mis à jour avec succès' });
    });
};

// Supprimer un service
exports.deleteService = (req, res) => {
    const { id } = req.params;

    const query = 'DELETE FROM Service WHERE id_s = ?';
    db.query(query, [id], (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Erreur lors de la suppression du service.', error: err });
        }
        res.status(200).json({ message: 'Service supprimé avec succès' });
    });
};
