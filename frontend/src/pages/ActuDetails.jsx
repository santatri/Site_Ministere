import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import '../styles/ActuDetails.css';
import { API_URL } from '../config';
const ActuDetails = () => {
  const { id } = useParams();
  const [actualité, setActualité] = useState(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchActualité = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/actu/${id}`);
        setActualité(response.data);
      } catch (error) {
        setMessage('Erreur lors du chargement des détails de l’actualité.');
      }
    };

    fetchActualité();
  }, [id]);

  return (
    <div className="actu-details-container">
      <h1>Détails de l'actualité</h1>
      {message && <p className="error-message">{message}</p>}
      {actualité ? (
        <div className="actu-details">
          <h2>{actualité.titre}</h2>
          <p>{new Date(actualité.date_insertion).toLocaleDateString('fr-FR')}</p>
          <p>{actualité.description}</p>
          {actualité.media_image && <img src={`http://localhost:5001/uploads/${actualité.media_image}`} alt="Actualité" />}
          {actualité.media_video && (
            <video controls>
              <source src={`http://localhost:5001/uploads/${actualité.media_video}`} type="video/mp4" />
              Votre navigateur ne supporte pas les vidéos HTML5.
            </video>
          )}
        </div>
      ) : (
        <p>Chargement...</p>
      )}
    </div>
  );
};

export default ActuDetails;
