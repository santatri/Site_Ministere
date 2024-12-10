const express = require('express');
const router = express.Router();
const serviceOffertController = require('../controllers/ServiceOffertController');

// Routes pour les Services Offerts
router.get('/all', serviceOffertController.getAllServices);  // Récupérer tous les services
router.post('/', serviceOffertController.createService);  // Ajouter un service
router.put('/:id', serviceOffertController.updateService);  // Mettre à jour un service
router.delete('/:id', serviceOffertController.deleteService);  // Supprimer un service

module.exports = router;
