const db = require('../db'); // Assurez-vous d'avoir une instance de connexion à votre base de données
exports.getAllSG = (req, res) => {
    const query = 'SELECT * FROM SecretaireGeneral';  // Adapter selon votre table SG

    db.query(query, (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Erreur lors de la récupération des Secrétaires Généraux.', error: err });
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
//Récupérer toutes les Directions
exports.getAllD = (req, res) => {
    const query = 'SELECT * FROM Service';  // Adapter selon votre table D

    db.query(query, (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Erreur lors de la récupération des Directions Générales.', error: err });
        }
        res.status(200).json({ data: results });
    });
};

// Récupérer tous les Services Offerts
// Fonction pour récupérer tous les services
exports.getAllServices = (req, res) => {
    const query = `
        SELECT 
            so.id_service, 
            so.nom_service, 
            so.dossier_prepare, 
            so.delai, 

            -- Champs pour Service
            s.nom_s AS nom_service_lie, 

            -- Champs pour Direction
            d.nom_d AS nom_direction_lie,

            -- Champs pour DirectionGenerale
            dg.nom_dg AS nom_direction_generale, 

            -- Champs pour SecretaireGeneral
            sg.nom_sg AS nom_secretaire_general,

            -- Champs pour Ministre
            ms.nom_ms AS nom_ministre
        FROM 
            ServiceOffert so

        -- Joindre Service indépendamment
        LEFT JOIN Service s ON so.id_s = s.id_s 

        -- Joindre Direction indépendamment
        LEFT JOIN Direction d ON so.id_d = d.id_d OR s.id_d = d.id_d

        -- Joindre DirectionGenerale indépendamment
        LEFT JOIN DirectionGenerale dg 
            ON so.id_dg = dg.id_dg OR d.id_dg = dg.id_dg OR s.id_dg = dg.id_dg

        -- Joindre SecretaireGeneral indépendamment
        LEFT JOIN SecretaireGeneral sg 
            ON so.id_sg = sg.id_sg 
            OR d.id_sg = sg.id_sg 
            OR dg.id_sg = sg.id_sg
            OR s.id_sg = sg.id_sg

        -- Joindre Ministre indépendamment
        LEFT JOIN Ministre ms 
            ON so.id_ms = ms.id_ms 
            OR s.id_ms = ms.id_ms 
            OR d.id_ms = ms.id_ms;
    `;

    db.query(query, (err, results) => {
        if (err) {
            return res.status(500).json({ 
                message: 'Erreur lors de la récupération des services.', 
                error: err 
            });
        }

        // Formatage hiérarchique dynamique
        const formattedResults = results.map(serviceOffert => {
            const hierarchyParts = [];

            // Ajout des parties non nulles à la hiérarchie
            if (serviceOffert.nom_service_lie) hierarchyParts.push(serviceOffert.nom_service_lie);
            if (serviceOffert.nom_direction_lie) hierarchyParts.push(serviceOffert.nom_direction_lie);
            if (serviceOffert.nom_direction_generale) hierarchyParts.push(serviceOffert.nom_direction_generale);
            if (serviceOffert.nom_secretaire_general) hierarchyParts.push(serviceOffert.nom_secretaire_general);
            if (serviceOffert.nom_ministre) hierarchyParts.push(serviceOffert.nom_ministre);

            // Construction de la chaîne hiérarchique
            const hierarchy = hierarchyParts.length > 0 
                ? "/ " + hierarchyParts.join(" / ") 
                : "Aucune hiérarchie disponible";

            // Retourner l'objet avec la hiérarchie ajoutée
            return { ...serviceOffert, hierarchy };
        });

        // Réponse au client
        res.status(200).json({ data: formattedResults });
    });
};


// Créer un Service Offert
// Créer un Service Offert
exports.createService = (req, res) => {
    const { nom_service, dossier_prepare, delai, id_sg, id_dg, id_d, id_s,id_ms } = req.body;

    // Validation pour n'avoir qu'un seul ID à la fois
    const associatedIds = [id_sg, id_dg, id_d, id_s,id_ms].filter((id) => id);
    if (associatedIds.length > 1) {
        return res.status(400).json({ message: "Un service ne peut être associé qu'à un seul MS, SG, DG, Direction ou Service." });
    }

    // Vérifier si le service existe déjà
    const checkQuery = 'SELECT * FROM ServiceOffert WHERE nom_service = ?';
    db.query(checkQuery, [nom_service], (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Erreur lors de la vérification du service.', error: err });
        }

        if (result.length > 0) {
            return res.status(400).json({ message: 'Un service avec ce nom existe déjà.' });
        }

        // Insérer le nouveau service
        const insertQuery = 'INSERT INTO ServiceOffert (nom_service, dossier_prepare, delai, id_sg, id_dg, id_d, id_s,id_ms) VALUES (?, ?, ?, ?, ?, ?, ? ,?)';
        db.query(insertQuery, [nom_service, dossier_prepare, delai, id_sg || null, id_dg || null, id_d || null, id_s || null, id_ms || null], (err, result) => {
            if (err) {
                return res.status(500).json({ message: 'Erreur lors de l\'ajout du service.', error: err });
            }
            res.status(201).json({ message: 'Service ajouté avec succès', data: result });
        });
    });
};


// Mettre à jour un Service Offert
exports.updateService = (req, res) => {
    const { nom_service, dossier_prepare, delai, id_sg, id_dg, id_d, id_s ,id_ms} = req.body;
    const { id } = req.params;

    // Validation pour n'avoir qu'un seul ID à la fois
    const associatedIds = [id_sg, id_dg, id_d, id_s,id_ms].filter((id) => id);
    if (associatedIds.length > 1) {
        return res.status(400).json({ message: "Un service ne peut être associé qu'à un seul SG, DG, Direction ou Service." });
    }

    const query = 'UPDATE ServiceOffert SET nom_service = ?, dossier_prepare = ?, delai = ?, id_sg = ?, id_dg = ?, id_d = ?, id_s = ?,id_ms = ? WHERE id_service = ?';
    db.query(query, [nom_service, dossier_prepare, delai, id_sg || null, id_dg || null, id_d || null, id_s || null, id_ms || null, id], (err, result) => {
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


// Récupérer le nombre total de services offerts
exports.getServiceCount = (req, res) => {
    const query = "SELECT COUNT(*) AS total FROM ServiceOffert";
    
    db.query(query, (err, result) => {
        if (err) {
            console.error("Erreur SQL:", err);
            return res.status(500).json({ message: "Erreur lors de la récupération du nombre de services.", error: err });
        }

        // console.log("Résultat SQL brut:", result);
        if (result.length > 0) {
            return res.status(200).json({ total: result[0].total });
        } else {
            return res.status(200).json({ total: 0 });
        }
    });
};
