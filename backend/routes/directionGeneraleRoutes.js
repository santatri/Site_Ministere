const express = require('express');
const router = express.Router();
const directionGeneraleController = require('../controllers/directionGeneraleController');

// Route pour récupérer toutes les directions générales
router.get('/all', directionGeneraleController.getAllDG);

// Route pour insérer une nouvelle direction générale
router.post('/insertion', directionGeneraleController.insertDirectionGenerale);

// Route pour mettre à jour une direction générale
router.put('/:id_dg', directionGeneraleController.updateDirectionGenerale);

// Route pour supprimer une direction générale
router.delete('/:id_dg', directionGeneraleController.deleteDirectionGenerale);

module.exports = router;
