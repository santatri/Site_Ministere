const express = require('express');
const router = express.Router();
const visitorController = require('../controllers/visitorController');

// Route pour enregistrer une visite
router.post('/visit', visitorController.recordVisit);

// Route pour récupérer le nombre total de visites
router.get('/visitors', visitorController.getVisitorCount);

// Route pour récupérer le nombre de visiteurs uniques aujourd'hui
router.get('/unique-visitors', visitorController.getUniqueVisitorCount); // Nouvelle route

router.get('/total-daily-visitors', visitorController.getTotalDailyUniqueVisitorCount);


// Routes pour les statistiques par semaine, mois et année
router.get('/visitors-by-week', visitorController.getVisitorsByWeek);
router.get('/visitors-by-month', visitorController.getVisitorsByMonth);
router.get('/visitors-by-year', visitorController.getVisitorsByYear);

module.exports = router;