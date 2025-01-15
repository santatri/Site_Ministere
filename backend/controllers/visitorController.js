const db = require('../db');

// Enregistrer une visite unique
exports.recordVisit = (req, res) => {
    const ipAddress = req.ip; // Récupère l'adresse IP de l'utilisateur
    const queryCheck = `
        SELECT * FROM visitors 
        WHERE ip_address = ? AND DATE(visit_date) = CURDATE()
    `;
    const queryInsert = 'INSERT INTO visitors (ip_address) VALUES (?)';

    db.query(queryCheck, [ipAddress], (err, result) => {
        if (err) {
            console.error('Erreur lors de la vérification de la visite :', err);
            return res.status(500).json({ error: 'Erreur serveur' });
        }

        if (result.length > 0) {
            return res.status(200).json({ message: 'Visite déjà enregistrée aujourd\'hui' });
        }

        db.query(queryInsert, [ipAddress], (err) => {
            if (err) {
                console.error('Erreur lors de l\'enregistrement de la visite :', err);
                return res.status(500).json({ error: 'Erreur serveur' });
            }
            res.status(200).json({ message: 'Visite enregistrée avec succès' });
        });
    });
};

// Récupérer le nombre total de visiteurs uniques
exports.getVisitorCount = (req, res) => {
    const query = 'SELECT COUNT(DISTINCT ip_address) AS total FROM visitors';
    db.query(query, (err, result) => {
        if (err) {
            console.error('Erreur lors de la récupération du nombre de visiteurs :', err);
            return res.status(500).json({ error: 'Erreur serveur' });
        }
        res.status(200).json(result[0]);
    });
};

exports.getVisitorsByWeek = (req, res) => {
    const query = `
        SELECT 
            WEEK(visit_date, 1) AS week_number, 
            COUNT(DISTINCT ip_address) AS total 
        FROM visitors 
        WHERE MONTH(visit_date) = MONTH(CURDATE()) AND YEAR(visit_date) = YEAR(CURDATE())
        GROUP BY WEEK(visit_date, 1)
        ORDER BY week_number
    `;

    db.query(query, (err, results) => {
        if (err) {
            console.error('Erreur lors de la récupération des visiteurs par semaine :', err);
            return res.status(500).json({ error: 'Erreur serveur' });
        }
        res.status(200).json(results);
    });
};
 
// Récupérer le nombre de visiteurs uniques par mois
exports.getVisitorsByMonth = (req, res) => {
    const query = `
        SELECT 
            MONTH(visit_date) AS month_number, 
            COUNT(DISTINCT ip_address) AS total 
        FROM visitors 
        WHERE YEAR(visit_date) = YEAR(CURDATE())
        GROUP BY MONTH(visit_date)
        ORDER BY month_number
    `;

    db.query(query, (err, results) => {
        if (err) {
            console.error('Erreur lors de la récupération des visiteurs par mois :', err);
            return res.status(500).json({ error: 'Erreur serveur' });
        }
        res.status(200).json(results);
    });
};
