// backend/routes/directionRoutes.js
const express = require('express');
const directionController = require('../controllers/directionController');

const router = express.Router();

router.post('/create', directionController.createDirection);
router.get('/list', directionController.getDirections);
router.delete('/delete/:id', directionController.deleteDirection);
router.put('/update/:id', directionController.updateDirection);

module.exports = router;
