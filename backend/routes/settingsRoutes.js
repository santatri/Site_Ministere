const express = require('express');
const router = express.Router();
const settings = require('../controllers/setController'); // Vérifie ce chemin

// Vérifie si le contrôleur est bien importé
if (!settings.gets) {
  console.error("Erreur : settingsController.getSettings est indéfini !");
}
if (!settings ) {
    console.error("Erreur : settings est indéfini !");
  }
router.get('/set',settings.gets);
router.post('/settings',settings.updateSettings);

module.exports = router;
