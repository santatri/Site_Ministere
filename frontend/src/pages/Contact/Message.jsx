import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../styles/Message.css';
import { API_URL } from '../../config';
const Message = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchText, setSearchText] = useState('');
  const [searchDate, setSearchDate] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const messagesPerPage = 5;

  // Fonction pour récupérer les messages
  const fetchMessages = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/messages`);
      setMessages(response.data);
      setLoading(false);
    } catch (err) {
      console.error('Erreur lors de la récupération des messages:', err);
      setError('Une erreur est survenue lors de la récupération des messages.');
      setLoading(false);
    }
  };

  // Filtrer les messages en fonction de la recherche
  const filteredMessages = messages.filter((msg) => {
    const matchesText =
      searchText === '' ||
      msg.subject.toLowerCase().includes(searchText.toLowerCase()) ||
      msg.message.toLowerCase().includes(searchText.toLowerCase());
    const matchesDate =
      searchDate === '' || new Date(msg.created_at).toISOString().split('T')[0] === searchDate;
    return matchesText && matchesDate;
  });

  // Pagination
  const indexOfLastMessage = currentPage * messagesPerPage;
  const indexOfFirstMessage = indexOfLastMessage - messagesPerPage;
  const currentMessages = filteredMessages.slice(indexOfFirstMessage, indexOfLastMessage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  useEffect(() => {
    fetchMessages();
  }, []);

  if (loading) {
    return <p>Chargement des messages...</p>;
  }

  if (error) {
    return <p style={{ color: 'red' }}>{error}</p>;
  }

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(filteredMessages.length / messagesPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="w3-container w3-padding-64">
      {/* Grand titre */}
      <h1 className="main-title">Centre de Gestion des Messages</h1>

      {/* Texte Messages reçus */}
      <h2 className="messages-title">Doléances et Messages des Citoyens</h2>

      {/* Barre de recherche */}
      <div className="search-container">
        <div className="search-bar">
          <input
            type="text"
            placeholder="Rechercher par sujet ou contenu"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <input
            type="date"
            value={searchDate}
            onChange={(e) => setSearchDate(e.target.value)}
          />
          <button onClick={fetchMessages}>
            <i className="fas fa-search"></i> Rechercher
          </button>
        </div>
      </div>

      {/* Affichage des messages */}
      {currentMessages.length > 0 ? (
        <div className="message-container">
          {currentMessages.map((msg) => (
            <div key={msg.id} className="message-bubble">
              <div className="message-header">
                <p className="message-email">
                  <i className="fas fa-user"></i> {msg.email || 'Message Anonyme'}
                </p>
              </div>
              <div className="message-content">
                <h3 className="message-subject">
                  <i className="fas fa-envelope"></i> {msg.subject}
                </h3>
                <p>{msg.message}</p>
              </div>
              <p className="message-timestamp">
                <i className="fas fa-clock"></i> {new Date(msg.created_at).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <div className="empty-message">
          <i className="fas fa-inbox"></i>
          <p>Aucun message ne correspond à votre recherche.</p>
        </div>
      )}

      {/* Pagination */}
      <div className="pagination">
        <button
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Précédent
        </button>
        {pageNumbers.map((number) => (
          <button
            key={number}
            onClick={() => paginate(number)}
            className={currentPage === number ? 'active' : ''}
          >
            {number}
          </button>
        ))}
        <button
          onClick={() => paginate(currentPage + 1)}
          disabled={currentPage === pageNumbers.length}
        >
          Suivant
        </button>
      </div>
    </div>
  );
};

export default Message;
