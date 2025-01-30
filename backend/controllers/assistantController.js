const natural = require('natural');
const db = require('../db'); // Assurez-vous que le chemin est correct
const tokenizer = new natural.WordTokenizer();

// Fonction pour trouver le service correspondant à la demande de l'utilisateur
function findMatchingService(userInput, services) {
    const tokens = tokenizer.tokenize(userInput.toLowerCase());
    let bestMatch = null;
    let bestScore = 0;

    services.forEach(service => {
        const serviceTokens = tokenizer.tokenize(service.nom_service.toLowerCase());
        const score = natural.JaroWinklerDistance(tokens.join(' '), serviceTokens.join(' '));
        if (score > bestScore) {
            bestScore = score;
            bestMatch = service;
        }
    });

    return bestMatch;
}

// Route pour l'assistante virtuelle
exports.askAssistant = (req, res) => {
    const userQuestion = req.body.question;

    // Récupérer tous les services
    const query = 'SELECT id_service, nom_service FROM serviceOffert';
    db.query(query, (err, services) => {
        if (err) {
            res.status(500).send({ message: 'Erreur lors de la récupération des services', error: err });
            return;
        }

        // Trouver le service correspondant
        const matchedService = findMatchingService(userQuestion, services);
        if (matchedService) {
            // Récupérer les détails du service
            const serviceId = matchedService.id_service;
            const getServiceDetails = require('./donneController').getServiceDetails;
            getServiceDetails({ params: { id: serviceId } }, res);
        } else {
            res.status(404).json({ message: 'Service non trouvé' });
        }
    });
};
