const express = require('express');
const router = express.Router();
const serviceController = require('../controllers/ServiceController');

// Routes pour les services
router.get('/all', serviceController.getAllServices); // Récupérer tous les services
router.post('/', serviceController.createService); // Ajouter un service
router.put('/:id', serviceController.updateService); // Mettre à jour un service
router.delete('/:id', serviceController.deleteService); // Supprimer un service



module.exports = router;
