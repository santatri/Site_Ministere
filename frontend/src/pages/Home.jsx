import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/Home.css';

const Home = () => {
  const [actualités, setActualités] = useState([]);
  const [message, setMessage] = useState('');

  // Fonction pour formater la date en format lisible
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' };
    return date.toLocaleDateString('fr-FR', options);
  };

  // Récupération des actualités au montage du composant
  useEffect(() => {
    const fetchActualités = async () => {
      try {
        const response = await axios.get('http://localhost:5001/api/actu/all');
        setActualités(response.data.data); // Stocker les actualités dans le state
      } catch (error) {
        setMessage('Erreur lors du chargement des actualités.');
      }
    };

    fetchActualités();
  }, []);

  return (
    <div className="home-container">
      <h1>Bienvenue sur la page d'accueil</h1>
      {message && <p className="error-message">{message}</p>}

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
              <div className="actions">
                <button className="like-btn">J'aime</button>
                <button className="comment-btn">Commenter</button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Home;
