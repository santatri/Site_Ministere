import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/ActuDetails.css"; // Ajouter un fichier CSS pour le style

const ActualiteDetails = () => {
  const { id } = useParams(); // Récupère l'ID de l'actualité depuis l'URL
  const [actualite, setActualite] = useState(null);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchActualiteDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5001/api/actu/${id}`);
        setActualite(response.data);
      } catch (error) {
        setMessage("Erreur lors du chargement des détails de l'actualité.");
      }
    };

    fetchActualiteDetails();
  }, [id]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    };
    return date.toLocaleDateString("fr-FR", options);
  };

  if (!actualite) {
    return <div>{message || "Chargement en cours..."}</div>;
  }

  return (
    <div className="actualite-details-container">
      <button className="back-button" onClick={() => navigate(-1)}>
        Retour
      </button>
      <h1 className="actualite-title">{actualite.titre}</h1>
      <p className="actualite-date">Publié le : {formatDate(actualite.date_insertion)}</p>
      <div className="actualite-media">
        {actualite.media_image && (
          <img
            src={`http://localhost:5001/uploads/${actualite.media_image}`}
            alt="Actualité"
            className="actualite-image"
          />
        )}
        {actualite.media_video && (
          <video controls className="actualite-video">
            <source
              src={`http://localhost:5001/uploads/${actualite.media_video}`}
              type="video/mp4"
            />
            Votre navigateur ne supporte pas les vidéos HTML5.
          </video>
        )}
      </div>
      <p className="actualite-description">{actualite.description}</p>
    </div>
  );
};

export default ActualiteDetails;
