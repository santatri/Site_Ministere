const db = require('../db'); // Connexion à la base de données
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
//Récupérer toutes les Directions
exports.getAllD = (req, res) => {
    const query = 'SELECT * FROM Direction';  // Adapter selon votre table D

    db.query(query, (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Erreur lors de la récupération des Directions Générales.', error: err });
        }
        res.status(200).json({ data: results });
    });
};
exports.getAllMinistres = (req, res) => {
    const query = 'SELECT * FROM Ministre';  // Adapter selon votre table Ministre

    db.query(query, (err, results) => {
        if (err) {
            return res.status(500).json({ message: "Erreur lors de la récupération des ministres.", error: err });
        }
        res.status(200).json({ data: results });
    });
};

// Récupérer toutes les directions avec leur hiérarchie
exports.getAllDirections = (req, res) => {
    const query = `
        WITH RECURSIVE DirectionHierarchy AS (
            SELECT id_d, nom_d, id_parent
            FROM Direction
            WHERE id_parent IS NULL
            UNION ALL
            SELECT d.id_d, d.nom_d, d.id_parent
            FROM Direction d
            INNER JOIN DirectionHierarchy dh ON d.id_parent = dh.id_d
        )
        SELECT * FROM DirectionHierarchy;
    `;
    db.query(query, (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Erreur lors de la récupération des directions.', error: err });
        }
        res.status(200).json({ data: results });
    });
};

// Récupérer tous les services
exports.getAllServices = (req, res) => {
    const query = `
        SELECT 
            s.id_s, 
            s.nom_s, 
            s.porte_s,
            d.nom_d, 
            dg.nom_dg AS nom_direction_generale, 
            sg.nom_sg AS nom_secretaire_generale,
            ms.nom_ms AS nom_ministre
        FROM 
            Service s 
        LEFT JOIN 
            Direction d ON s.id_d = d.id_d
        LEFT JOIN 
            DirectionGenerale dg ON d.id_dg = dg.id_dg OR s.id_dg = dg.id_dg
        LEFT JOIN 
            SecretaireGeneral sg ON d.id_sg = sg.id_sg OR dg.id_sg = sg.id_sg OR s.id_sg = sg.id_sg
        LEFT JOIN 
            Ministre ms ON s.id_ms = ms.id_ms OR d.id_ms = ms.id_ms;
    `;

    db.query(query, (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Erreur lors de la récupération des services.', error: err });
        }

        // Formatage hiérarchique
        const result = results.map(service => {
            let hierarchy = service.nom_s;

            // Ajouter la direction si elle existe
            if (service.nom_d) {
                hierarchy += ` / ${service.nom_d}`;
            }

            // Ajouter la direction générale si elle existe
            if (service.nom_direction_generale) {
                hierarchy += ` / ${service.nom_direction_generale}`;
            }

            // Ajouter le secrétaire général si il existe
            if (service.nom_secretaire_generale) {
                hierarchy += ` / ${service.nom_secretaire_generale}`;
            }

            // Ajouter le ministre si il existe
            if (service.nom_ministre) {
                hierarchy += ` / ${service.nom_ministre}`;
            }

            return { ...service, hierarchy };
        });

        res.status(200).json({ data: result });
    });
};

// Créer un service
exports.createService = (req, res) => {
    const { nom_s, porte_s, id_d, id_dg ,id_sg, id_ms} = req.body;

    // Vérifier si c'est une direction ou une direction générale
    if (id_d && id_dg && id_sg && id_ms) {
        return res.status(400).json({ message: 'Vous ne pouvez pas sélectionner à la fois une direction et une direction générale.' });
    }

    const query = 'INSERT INTO Service (nom_s, porte_s, id_d, id_dg ,id_sg,id_ms) VALUES (?, ?, ?, ? , ?,?)';
    db.query(query, [nom_s, porte_s, id_d || null, id_dg || null, id_sg || null, id_ms || null], (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Erreur lors de l\'ajout du service.', error: err });
        }
        res.status(201).json({ message: 'Service ajouté avec succès', data: result });
    });
};

// Mettre à jour un service
exports.updateService = (req, res) => {
    const { nom_s, porte_s, id_d, id_dg ,id_sg,id_ms} = req.body;
    const { id } = req.params;

    // Vérifier si c'est une direction ou une direction générale
    if (id_d && id_dg &&  id_sg && id_ms) {
        return res.status(400).json({ message: 'Vous ne pouvez pas sélectionner à la fois une direction et une direction générale.' });
    }

    const query = 'UPDATE Service SET nom_s = ?, porte_s = ?, id_d = ?, id_dg = ?, id_sg = ? , id_ms = ? WHERE id_s = ?';
    db.query(query, [nom_s, porte_s, id_d || null, id_dg || null,id_sg || null, id], (err, result) => {
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