const express = require('express');
const actualité_Controller = require('../controllers/actualité_Controller');
const router = express.Router();

router.post('/insertion', actualité_Controller.register);
router.get('/all', actualité_Controller.getAll);

router.delete('/:id', actualité_Controller.delete); // Supprimer une actualité
// router.put('/:id', actualité_Controller.update); // Mettre à jour une actualité
router.put('/:id', actualité_Controller.update); // Mettre à jour une actualité



module.exports = router;
