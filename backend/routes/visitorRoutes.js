const express = require('express');
const router = express.Router();
const visitorController = require('../controllers/visitorController');

// Route pour enregistrer une visite
router.post('/visit', visitorController.recordVisit);

// Route pour récupérer le nombre de visiteurs uniques
router.get('/visitors', visitorController.getVisitorCount);

router.get('/visitors-by-week', visitorController.getVisitorsByWeek);

router.get('/visitors-by-month', visitorController.getVisitorsByMonth);

 router.get('/visitors-by-year', visitorController.getVisitorsByYear);
module.exports = router;
