import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/donne.css';

const ServiceDetails = () => {
  const { id } = useParams(); // Récupérer l'ID du service depuis l'URL
  const [serviceDetails, setServiceDetails] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Récupérer les détails du service via l'API
    axios.get(`http://localhost:5001/api/service/${id}`)
      .then((response) => {
        setServiceDetails(response.data);
      })
      .catch((error) => {
        console.error('Erreur lors de la récupération des détails du service:', error);
      });
  }, [id]);

  return (
    <div className="service-details-page">
      <button className="back-button" onClick={() => navigate("/")}>
        Retour à la liste des services
      </button>
      {serviceDetails ? (
        <div className="service-content">
          <h2 className="details-title">Détail du Service</h2>
          <div className="service-left">
            <h3>{serviceDetails.nom_service}</h3>
            <p>{serviceDetails.description || "Description indisponible."}</p>
            <h4>Documents à fournir</h4>
            {serviceDetails.dossier_prepare ? (
              <ul>
                {serviceDetails.dossier_prepare.split(',').map((item, index) => (
                  <li key={index}>{item.trim()}</li>
                ))}
              </ul>
            ) : (
              <p>Aucun document disponible.</p>
            )}
          </div>
          <div className="service-right">
            <p><strong>Hiérarchie:</strong> {serviceDetails.hierarchy || "Non définie"}</p>
            <p><strong>Porte:</strong> {serviceDetails.porte_hierarchique || "Non définie"}</p>
            <p><strong>Délai:</strong> {serviceDetails.delai || "Aucun délai disponible"}</p>
          </div>
        </div>
      ) : (
        <p>Chargement...</p>
      )}
    </div>
  );
};

export default ServiceDetails;
