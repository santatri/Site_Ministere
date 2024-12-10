const db = require('../db'); // Assurez-vous d'avoir une instance de connexion à votre base de données

// Récupérer tous les Services Offerts
exports.getAllServices = (req, res) => {
    const query = `
        SELECT 
            so.id_service, 
            so.nom_service, 
            so.dossier_prepare, 
            so.delai, 
            sg.nom_sg, 
            dg.nom_dg, 
            d.nom_d, 
            s.nom_s 
        FROM 
            ServiceOffert so
        LEFT JOIN 
            SecretaireGeneral sg ON so.id_sg = sg.id_sg
        LEFT JOIN 
            DirectionGenerale dg ON so.id_dg = dg.id_dg
        LEFT JOIN 
            Direction d ON so.id_d = d.id_d
        LEFT JOIN 
            Service s ON so.id_s = s.id_s
    `;

    db.query(query, (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Erreur lors de la récupération des services.', error: err });
        }
        res.status(200).json({ data: results });
    });
};

// Créer un Service Offert
exports.createService = (req, res) => {
    const { nom_service, dossier_prepare, delai, id_sg, id_dg, id_d, id_s } = req.body;

    // Validation pour n'avoir qu'un seul ID à la fois
    const associatedIds = [id_sg, id_dg, id_d, id_s].filter((id) => id);
    if (associatedIds.length > 1) {
        return res.status(400).json({ message: "Un service ne peut être associé qu'à un seul SG, DG, Direction ou Service." });
    }

    const query = 'INSERT INTO ServiceOffert (nom_service, dossier_prepare, delai, id_sg, id_dg, id_d, id_s) VALUES (?, ?, ?, ?, ?, ?, ?)';
    db.query(query, [nom_service, dossier_prepare, delai, id_sg || null, id_dg || null, id_d || null, id_s || null], (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Erreur lors de l\'ajout du service.', error: err });
        }
        res.status(201).json({ message: 'Service ajouté avec succès', data: result });
    });
};

// Mettre à jour un Service Offert
exports.updateService = (req, res) => {
    const { nom_service, dossier_prepare, delai, id_sg, id_dg, id_d, id_s } = req.body;
    const { id } = req.params;

    // Validation pour n'avoir qu'un seul ID à la fois
    const associatedIds = [id_sg, id_dg, id_d, id_s].filter((id) => id);
    if (associatedIds.length > 1) {
        return res.status(400).json({ message: "Un service ne peut être associé qu'à un seul SG, DG, Direction ou Service." });
    }

    const query = 'UPDATE ServiceOffert SET nom_service = ?, dossier_prepare = ?, delai = ?, id_sg = ?, id_dg = ?, id_d = ?, id_s = ? WHERE id_service = ?';
    db.query(query, [nom_service, dossier_prepare, delai, id_sg || null, id_dg || null, id_d || null, id_s || null, id], (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Erreur lors de la mise à jour du service.', error: err });
        }
        res.status(200).json({ message: 'Service mis à jour avec succès' });
    });
};

// Supprimer un Service Offert
exports.deleteService = (req, res) => {
    const { id } = req.params;

    const query = 'DELETE FROM ServiceOffert WHERE id_service = ?';
    db.query(query, [id], (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Erreur lors de la suppression du service.', error: err });
        }
        res.status(200).json({ message: 'Service supprimé avec succès' });
    });
};
