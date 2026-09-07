import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { API_URL } from '../config';
const DetailsActu = () => {
  const { id } = useParams();  // Récupère l'ID de l'actualité depuis l'URL
  const [actualité, setActualité] = useState(null);  // État pour stocker les détails de l'actualité
  const [error, setError] = useState(null);  // Pour gérer les erreurs

  // Fonction pour formater la date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };
    return date.toLocaleDateString('fr-FR', options);
  };

  // Récupérer les détails de l'actualité depuis l'API
  useEffect(() => {
    const fetchActualitéDetails = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/actu/${id}`);
        setActualité(response.data.data);  // Stocke les données dans l'état
      } catch (error) {
        setError('Erreur lors du chargement des détails de l\'actualité.');
      }
    };

    fetchActualitéDetails();
  }, [id]);

  if (error) {
    return <p>{error}</p>;
  }

  if (!actualité) {
    return <p>Chargement...</p>;
  }

  return (
    <div className="details-actualite-container">
      <h1>{actualité.titre}</h1>  {/* Affiche le titre de l'actualité */}
      <p><strong>Date : </strong>{formatDate(actualité.date_insertion)}</p>  {/* Affiche la date au format lisible */}
      {actualité.media_image && (
        <div>
          <img src={`${API_URL}/uploads/${actualité.media_image}`} alt="Actualité" />
        </div>
      )}
      {actualité.media_video && (
        <div>
          <video controls>
            <source src={`${API_URL}/uploads/${actualité.media_video}`} type="video/mp4" />
            Votre navigateur ne supporte pas les vidéos HTML5.
          </video>
        </div>
      )}
      <p>{actualité.description}</p>  {/* Affiche la description */}
    </div>
  );
};

export default DetailsActu;
