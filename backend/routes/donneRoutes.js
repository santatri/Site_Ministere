// donne.routes.js
const express = require('express');
const router = express.Router();
const donneController = require('../controllers/donneController');

// // Route pour récupérer tous les services
// router.get('/api/services', donneController.getAllServices);
// // Route pour récupérer les détails d'un service
// router.get('/service/:id', donneController.getServiceDetails);

// Route pour récupérer tous les services
router.get('/api/services', donneController.getAllServices);

// Route pour récupérer les services offerts par une Direction
router.get('/api/services/by-direction', donneController.getServicesByDirection);

// Route pour récupérer les détails d'un service
router.get('/api/service/:id', donneController.getServiceDetails);

module.exports = router;
