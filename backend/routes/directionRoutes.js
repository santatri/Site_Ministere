const express = require('express');
const router = express.Router();
const directionController = require('../controllers/directionController');

// Routes pour obtenir les SG et DG
router.get('/sg', directionController.getAllSG);
router.get('/dg', directionController.getAllDG);

// Routes pour les Directions
router.get('/all', directionController.getAllDirections);  // Récupérer toutes les directions
router.post('/', directionController.createDirection);  // Ajouter une direction
router.put('/:id', directionController.updateDirection);  // Mettre à jour une direction
router.delete('/:id', directionController.deleteDirection);  // Supprimer une direction

module.exports = router;
