const express = require('express');
const aLaUneController = require('../controllers/a_la_une_controllers');
const router = express.Router();

router.post('/insertion', aLaUneController.register);
router.get('/all', aLaUneController.getAll);
router.put('/:id', aLaUneController.update);
router.delete('/:id', aLaUneController.delete);

module.exports = router;
