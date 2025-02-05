const express = require('express');
const router = express.Router();
const assistantController = require('../controllers/assistantController');

// Route pour poser une question à l'assistante virtuelle
router.post('/ask', assistantController.askAssistant);

module.exports = router;
