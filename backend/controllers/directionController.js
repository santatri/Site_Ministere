const db = require('../db');  // Assurez-vous que vous avez une instance de connexion à votre base de données

// Récupérer tous les Secrétaires Généraux
exports.getAllSG = (req, res) => {
    const query = 'SELECT * FROM SecretaireGeneral';  // Adapter selon votre table SG

    db.query(query, (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Erreur lors de la récupération des Secrétaires Généraux.', error: err });
        }
        res.status(200).json({ data: results });
    });
};

// Récupérer toutes les Directions Générales
exports.getAllDG = (req, res) => {
    const query = 'SELECT * FROM DirectionGenerale';  // Adapter selon votre table DG

    db.query(query, (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Erreur lors de la récupération des Directions Générales.', error: err });
        }
        res.status(200).json({ data: results });
    });
};

// Récupérer toutes les Directions
// Récupérer toutes les Directions avec les noms des SG et DG
exports.getAllDirections = (req, res) => {
    const query = `
        SELECT 
            d.id_d, 
            d.nom_d, 
            d.porte_d, 
            sg.nom_sg, 
            dg.nom_dg
        FROM 
            Direction d
        LEFT JOIN 
            SecretaireGeneral sg ON d.id_sg = sg.id_sg
        LEFT JOIN 
            DirectionGenerale dg ON d.id_dg = dg.id_dg
    `;

    db.query(query, (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Erreur lors de la récupération des directions.', error: err });
        }
        res.status(200).json({ data: results });
    });
};


// Créer une Direction
exports.createDirection = (req, res) => {
    const { nom_d, porte_d, id_sg, id_dg } = req.body;

    const query = 'INSERT INTO Direction (nom_d, porte_d, id_sg, id_dg) VALUES (?, ?, ?, ?)';
    db.query(query, [nom_d, porte_d, id_sg, id_dg], (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Erreur lors de l\'ajout de la direction.', error: err });
        }
        res.status(201).json({ message: 'Direction ajoutée avec succès', data: result });
    });
};

// Mettre à jour une Direction
exports.updateDirection = (req, res) => {
    const { nom_d, porte_d, id_sg, id_dg } = req.body;
    const { id } = req.params;

    const query = 'UPDATE Direction SET nom_d = ?, porte_d = ?, id_sg = ?, id_dg = ? WHERE id_d = ?';
    db.query(query, [nom_d, porte_d, id_sg, id_dg, id], (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Erreur lors de la mise à jour de la direction.', error: err });
        }
        res.status(200).json({ message: 'Direction mise à jour avec succès' });
    });
};

// Supprimer une Direction
exports.deleteDirection = (req, res) => {
    const { id } = req.params;

    const query = 'DELETE FROM Direction WHERE id_d = ?';
    db.query(query, [id], (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Erreur lors de la suppression de la direction.', error: err });
        }
        res.status(200).json({ message: 'Direction supprimée avec succès' });
    });
};
