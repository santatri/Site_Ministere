const express = require('express');
const secretaireGeneralController = require('../controllers/secretaireGeneralController');
const router = express.Router();

router.post('/insertion', secretaireGeneralController.register);
router.get('/all', secretaireGeneralController.getAll);

router.put('/:id_sg', secretaireGeneralController.update);
router.delete('/:id_sg', secretaireGeneralController.delete);

module.exports = router;
