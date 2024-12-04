const express = require('express');
const router = express.Router();
const controller = require('./controller');

// Route pour insérer une actualité "À la Une"
router.post('/a_la_une/insertion', controller.insert);

module.exports = router;
