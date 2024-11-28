import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/Home.css';

const Archives = () => {
  const [actualités, setActualités] = useState([]);
  const [message, setMessage] = useState('');
  const [search, setSearch] = useState({ mots: '', dateStart: '', dateEnd: '' });

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' };
    return date.toLocaleDateString('fr-FR', options);
  };

  const fetchActualités = async (filters = {}) => {
    try {
      const response = await axios.get('http://localhost:5001/api/actu/all', { params: filters });
      setActualités(response.data.data);
    } catch (error) {
      setMessage('Erreur lors du chargement des actualités.');
    }
  };

  useEffect(() => {
    fetchActualités();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchActualités(search);
  };

  return (
    <div className="archives-container">
      <h1>Bienvenue sur la page des Archives</h1>
      {message && <p className="error-message">{message}</p>}

      <form className="search-form" onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Rechercher par mots-clés"
          value={search.mots}
          onChange={(e) => setSearch({ ...search, mots: e.target.value })}
        />
        <input
          type="date"
          value={search.dateStart}
          onChange={(e) => setSearch({ ...search, dateStart: e.target.value })}
        />
        <input
          type="date"
          value={search.dateEnd}
          onChange={(e) => setSearch({ ...search, dateEnd: e.target.value })}
        />
        <button type="submit">Rechercher</button>
      </form>

      <div className="actualités-container">
        {actualités.length === 0 ? (
          <p>Aucune actualité disponible.</p>
        ) : (
          actualités.map((actu) => (
            <div key={actu.id} className="actualité-card">
              <h2 className="actualité-title">{actu.titre}</h2>
              <p className="date-publication">{formatDate(actu.date_insertion)}</p>
              <p className="actualité-description">{actu.description}</p>
              <div className="actualité-media">
                {actu.media_image && (
                  <img
                    src={`http://localhost:5001/uploads/${actu.media_image}`}
                    alt="Actualité"
                    className="actualité-image"
                  />
                )}
                {actu.media_video && (
                  <video controls className="actualité-video">
                    <source
                      src={`http://localhost:5001/uploads/${actu.media_video}`}
                      type="video/mp4"
                    />
                    Votre navigateur ne supporte pas les vidéos HTML5.
                  </video>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Archives;
