import React, { useState } from 'react';
import axios from 'axios';

const AssistantComponent = () => {
    const [question, setQuestion] = useState('');
    const [service, setService] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleAskQuestion = async () => {
        if (!question) return;

        setLoading(true);
        setError(null);

        try {
            const response = await axios.post('http://localhost:5001/api/assistant/ask', { question });
            setService(response.data); // On suppose que la réponse est un service trouvé
        } catch (err) {
            setError('Erreur lors de la recherche du service');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="assistant">
            <h1>Posez votre question à l'assistante virtuelle</h1>
            <input 
                type="text" 
                value={question} 
                onChange={(e) => setQuestion(e.target.value)} 
                placeholder="Demandez un service..."
            />
            <button onClick={handleAskQuestion} disabled={loading}>
                {loading ? 'Chargement...' : 'Poser la question'}
            </button>

            {error && <p style={{ color: 'red' }}>{error}</p>}

            {service && (
                <div>
                    <h2>Service trouvé :</h2>
                    <p>Nom du service : {service.nom_service}</p>
                    {/* Vous pouvez afficher plus de détails ici si nécessaire */}
                </div>
            )}
        </div>
    );
};

export default AssistantComponent;
