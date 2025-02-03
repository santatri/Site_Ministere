const db = require('../db');

// Enregistrer une visite
function normalizeIP(ip) {
    if (ip === "::1") {
        return "127.0.0.1"; // Remplace "::1" par "127.0.0.1"
    }
    if (ip.startsWith("::ffff:")) {
        return ip.substring(7); // Convertit IPv6 mappé en IPv4
    }
    // Convertir IPv4 en IPv6 si nécessaire
    if (ip.includes('.')) {
        return `::ffff:${ip}`; // Convertit IPv4 en IPv6 mappé
    }
    return ip; // Retourne l'IP telle quelle si elle est déjà en IPv6
}
exports.recordVisit = (req, res) => {
    let ipAddress = req.ip; // Récupère l'adresse IP de l'utilisateur
    ipAddress = normalizeIP(ipAddress); // Normalise l'IP en IPv6

    console.log("Adresse IP normalisée : ", ipAddress);  // Log de l'IP normalisée

    // Vérifier la dernière visite de l'IP
    const queryCheck = 'SELECT visit_date FROM visitor WHERE ip_address = ? ORDER BY visit_date DESC LIMIT 1';

    db.query(queryCheck, [ipAddress], (err, result) => {
        if (err) {
            console.error("Erreur lors de la vérification de l'IP :", err);
            return res.status(500).json({ error: 'Erreur serveur' });
        }

        // Si l'utilisateur a déjà visité le site
        if (result.length > 0) {
            const lastVisit = new Date(result[0].visit_date);
            const now = new Date();
            
            // Calculer la différence en minutes
            const diffMinutes = (now - lastVisit) / (1000 * 60);

            if (diffMinutes < 10) { // Moins de 10 minutes = rafraîchissement
                console.log("Rafraîchissement détecté, visite non enregistrée");
                return res.status(200).json({ message: 'Visite ignorée (rafraîchissement)' });
            }
        }

        // Insérer une nouvelle visite si le dernier enregistrement date de plus de 5 minutes
        const queryInsert = 'INSERT INTO visitor (ip_address, visit_date) VALUES (?, NOW())';

        db.query(queryInsert, [ipAddress], (err) => {
            if (err) {
                console.error("Erreur lors de l'enregistrement de la visite :", err);
                return res.status(500).json({ error: 'Erreur serveur' });
            }
            console.log("Visite enregistrée avec succès");
            res.status(200).json({ message: 'Nouvelle visite enregistrée' });
        });
    });
};




// Récupérer le nombre total de visites
exports.getVisitorCount = (req, res) => {
    const query = 'SELECT COUNT(*) AS total FROM visitor'; // Compte toutes les entrées dans la table
    db.query(query, (err, result) => {
        if (err) {
            console.error('Erreur lors de la récupération du nombre de visiteurs :', err);
            return res.status(500).json({ error: 'Erreur serveur' });
        }
        res.status(200).json(result[0]); // Retourne le nombre total des visites
    });
};

// Récupérer le nombre de visiteurs uniques aujourd'hui
exports.getUniqueVisitorCount = (req, res) => {
    const query = `
        SELECT COUNT(DISTINCT ip_address) AS unique_visitors
        FROM visitor
        WHERE DATE(visit_date) = CURDATE()
    `; // Compte les IP distinctes pour la journée en cours

    db.query(query, (err, result) => {
        if (err) {
            console.error('Erreur lors de la récupération du nombre de visiteurs uniques :', err);
            return res.status(500).json({ error: 'Erreur serveur' });
        }
        console.log("Nombre de visiteurs uniques aujourd'hui :", result[0].unique_visitors);
        res.status(200).json(result[0]); // Retourne le nombre de visiteurs uniques
    });
};

// Récupérer les visites par semaine
exports.getVisitorsByWeek = (req, res) => {
    const query = `
        SELECT 
            WEEK(visit_date, 1) AS week_number, 
            COUNT(ip_address) AS total
        FROM visitor 
        WHERE YEAR(visit_date) = YEAR(CURDATE())
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

// Récupérer les visites par mois
exports.getVisitorsByMonth = (req, res) => {
    const query = `
        SELECT 
            MONTH(visit_date) AS month_number, 
            COUNT(ip_address) AS total
        FROM visitor 
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

// Récupérer les visites par année
exports.getVisitorsByYear = (req, res) => {
    const query = `
        SELECT 
            YEAR(visit_date) AS year_number, 
            COUNT(ip_address) AS total
        FROM visitor 
        GROUP BY YEAR(visit_date)
        ORDER BY year_number
    `;

    db.query(query, (err, results) => {
        if (err) {
            console.error('Erreur lors de la récupération des visiteurs par année :', err);
            return res.status(500).json({ error: 'Erreur serveur' });
        }
        res.status(200).json(results);
    });
};

exports.getTotalDailyUniqueVisitorCount = (req, res) => {
    const query = `
        SELECT COUNT(*) AS total_unique_visitors
        FROM (
            SELECT DISTINCT ip_address, DATE(visit_date) 
            FROM visitor
        ) AS unique_daily_visitors
    `; // Compte chaque IP unique par jour

    db.query(query, (err, result) => {
        if (err) {
            console.error('Erreur lors de la récupération du nombre total de visiteurs uniques par jour :', err);
            return res.status(500).json({ error: 'Erreur serveur' });
        }
        console.log("Nombre total de visiteurs :", result[0].total_unique_visitors);
        res.status(200).json(result[0]); // Retourne le nombre total de visiteurs uniques par jour
    });
};
