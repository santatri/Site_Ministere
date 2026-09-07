import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../styles/Message.css';

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
      const response = await axios.get('http://localhost:5001/api/messages');
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
      <h1 className="main-title">Gestion de tous les messages</h1>

      {/* Texte Messages reçus */}
      <h2 className="messages-title">Messages reçus</h2>

      {/* Barre de recherche */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="Rechercher par texte"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
        <input
          type="date"
          value={searchDate}
          onChange={(e) => setSearchDate(e.target.value)}
        />
        <button onClick={fetchMessages}>Rechercher</button>
      </div>

      {/* Affichage des messages */}
      {currentMessages.length > 0 ? (
        <div className="message-container">
          {currentMessages.map((msg) => (
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
        <p className="w3-text-grey w3-center">Aucun message ne correspond à votre recherche.</p>
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
