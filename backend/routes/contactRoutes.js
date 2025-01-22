const express = require('express');
const contactController = require('../controllers/contactController');

const router = express.Router();

// Route POST pour ajouter un contact
router.post('/contacts', contactController.addContact);
// Route pour récupérer tous les messages
router.get('/messages', contactController.getMessages);

module.exports = router;