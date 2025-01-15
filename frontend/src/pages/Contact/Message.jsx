import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './message.css';

const Message = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fonction pour récupérer les messages
  const fetchMessages = async () => {
    try {
      const response = await axios.get('http://localhost:5001/api/messages');
      setMessages(response.data);
      setLoading(false);
    } catch (err) {
      console.error('Erreur lors de la récupération des messages:', err);
      setError('Une erreur est survenue lors de la récupération des messages.');
      setLoading(false);
    }
  };

  // Utilisation de useEffect pour charger les messages au montage
  useEffect(() => {
    fetchMessages();

    const handleMessageAdded = () => {
      fetchMessages(); // Recharge les messages lorsque l'événement est déclenché
    };

    // Écoute l'événement 'messageAdded'
    window.addEventListener('messageAdded', handleMessageAdded);

    // Nettoyage de l'écouteur d'événement au démontage du composant
    return () => {
      window.removeEventListener('messageAdded', handleMessageAdded);
    };
  }, []);

  if (loading) {
    return <p>Chargement des messages...</p>;
  }

  if (error) {
    return <p style={{ color: 'red' }}>{error}</p>;
  }

  return (
    <div className="w3-container w3-padding-64">
      <h1 className="w3-center w3-text-dark-grey">Messages reçus</h1>
      {messages.length > 0 ? (
        <div className="w3-margin-top message-container">
          {messages.map((msg) => (
            <div key={msg.id} className="message-bubble">
              <p className="message-email">{msg.email || 'Anonyme'}</p>
              <div className="message-content">
                <p className="message-subject">{msg.subject}</p>
                <p>{msg.message}</p>
              </div>
              <p className="message-timestamp">
                {new Date(msg.created_at).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p className="w3-text-grey w3-center">Aucun message pour le moment.</p>
      )}
    </div>
  );
};

export default Message;
