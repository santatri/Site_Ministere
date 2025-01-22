const db = require('../db');

// Enregistrer une visite unique
exports.recordVisit = (req, res) => {
    const ipAddress = req.ip; // Récupère l'adresse IP de l'utilisateur
    console.log("Adresse IP de la visite : ", ipAddress);  // Log de l'IP

    // Vérifier si l'IP a déjà visité aujourd'hui
    const queryCheck = `
        SELECT * FROM visitors 
        WHERE ip_address = ? AND DATE(visit_date) = CURDATE()
    `;
    
    // Insérer une nouvelle visite
    const queryInsert = 'INSERT INTO visitors (ip_address) VALUES (?)';
    
    // Vérifier si l'IP a déjà visité aujourd'hui et obtenir la dernière visite
    db.query(queryCheck, [ipAddress], (err, result) => {
        if (err) {
            console.error('Erreur lors de la vérification de la visite :', err);
            return res.status(500).json({ error: 'Erreur serveur' });
        }

        if (result.length > 0) {
            // Si l'IP a déjà visité aujourd'hui, on ne fait rien
            return res.status(200).json({ message: 'Visite déjà enregistrée aujourd\'hui' });
        }

        // Si l'IP a visité avant mais le délai est supérieur à 24h, on enregistre à nouveau
        const queryLastVisit = `
            SELECT visit_date FROM visitors
            WHERE ip_address = ?
            ORDER BY visit_date DESC
            LIMIT 1
        `;
        
        db.query(queryLastVisit, [ipAddress], (err, lastVisitResult) => {
            if (err) {
                console.error('Erreur lors de la récupération de la dernière visite :', err);
                return res.status(500).json({ error: 'Erreur serveur' });
            }

            // Si aucune visite précédente n'est trouvée ou si la dernière visite est à plus de 24h
            if (lastVisitResult.length === 0 || new Date() - new Date(lastVisitResult[0].visit_date) > 24 * 60 * 60 * 1000) {
                // Log de l'insertion avant l'exécution de la requête
                console.log("Insertion dans la base de données...");

                // Insérer la nouvelle visite dans la base de données
                db.query(queryInsert, [ipAddress], (err) => {
                    if (err) {
                        console.error('Erreur lors de l\'enregistrement de la visite :', err);
                        return res.status(500).json({ error: 'Erreur serveur' });
                    }
                    console.log("Visite enregistrée avec succès");
                    res.status(200).json({ message: 'Visite enregistrée avec succès' });
                });
            } else {
                // Si la visite précédente a eu lieu dans les 24 heures, ne rien faire
                console.log('Visite ignorée, déjà enregistrée dans les dernières 24 heures');
                return res.status(200).json({ message: 'Visite ignorée, déjà enregistrée dans les dernières 24 heures' });
            }
        });
    });
};


// Récupérer le nombre total de visiteurs uniques
// Récupérer le nombre total de visiteurs (en comptant toutes les visites)
exports.getVisitorCount = (req, res) => {
    const query = 'SELECT COUNT(*) AS total FROM visitors'; // Compte toutes les entrées dans la table
    db.query(query, (err, result) => {
        if (err) {
            console.error('Erreur lors de la récupération du nombre de visiteurs :', err);
            return res.status(500).json({ error: 'Erreur serveur' });
        }
        res.status(200).json(result[0]); // Retourne le nombre total des visiteurs
    });
};


// Récupérer le nombre total de visites par semaine (sans exclure les visites multiples par IP)
exports.getVisitorsByWeek = (req, res) => {
    const query = `
        SELECT 
            WEEK(visit_date, 1) AS week_number, 
            COUNT(ip_address) AS total  -- Compte toutes les visites, sans exclure les visites multiples par IP
        FROM visitors 
        WHERE YEAR(visit_date) = YEAR(CURDATE())  -- On garde toutes les semaines de l'année en cours
        GROUP BY WEEK(visit_date, 1)
        ORDER BY week_number
    `;

    db.query(query, (err, results) => {
        if (err) {
            console.error('Erreur lors de la récupération des visiteurs par semaine :', err);
            return res.status(500).json({ error: 'Erreur serveur' });
        }
        res.status(200).json(results);  // Retourne toutes les visites par semaine
    });
};

// Récupérer le nombre total de visites par mois (sans exclure les visites multiples par IP)
exports.getVisitorsByMonth = (req, res) => {
    const query = `
        SELECT 
            MONTH(visit_date) AS month_number, 
            COUNT(ip_address) AS total  -- Compte toutes les visites, sans exclure les visites multiples par IP
        FROM visitors 
        WHERE YEAR(visit_date) = YEAR(CURDATE())  -- On garde toutes les visites du mois en cours
        GROUP BY MONTH(visit_date)
        ORDER BY month_number
    `;

    db.query(query, (err, results) => {
        if (err) {
            console.error('Erreur lors de la récupération des visiteurs par mois :', err);
            return res.status(500).json({ error: 'Erreur serveur' });
        }
        res.status(200).json(results);  // Retourne toutes les visites par mois
    });
};

// Récupérer le nombre total de visites par année (sans exclure les visites multiples par IP)
exports.getVisitorsByYear = (req, res) => {
    const query = `
        SELECT 
            YEAR(visit_date) AS year_number, 
            COUNT(ip_address) AS total  -- Compte toutes les visites, sans exclure les visites multiples par IP
        FROM visitors 
        GROUP BY YEAR(visit_date)
        ORDER BY year_number
    `;

    db.query(query, (err, results) => {
        if (err) {
            console.error('Erreur lors de la récupération des visiteurs par année :', err);
            return res.status(500).json({ error: 'Erreur serveur' });
        }
        res.status(200).json(results);  // Retourne toutes les visites par année
    });
};
