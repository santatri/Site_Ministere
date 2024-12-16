import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/donne.css';

const Donne = () => {
  const [services, setServices] = useState([]); 
  const [servicesByDirection, setServicesByDirection] = useState([]); 
  const [selectedService, setSelectedService] = useState(null); 
  const [serviceDetails, setServiceDetails] = useState(null); 
  const [searchQuery, setSearchQuery] = useState(""); // Ajout d'un état pour la recherche

  useEffect(() => {
    // Récupérer la liste des services
    axios.get('http://localhost:5001/api/services')
      .then((response) => {
        const sortedServices = response.data.sort((a, b) => 
          a.nom_service.localeCompare(b.nom_service) // Tri par nom de service
        );
        setServices(sortedServices);
      })
      .catch((error) => {
        console.error('Erreur lors de la récupération des services:', error);
      });

    // Récupérer les services offerts par une Direction
    axios.get('http://localhost:5001/api/services/by-direction')
      .then((response) => {
        const sortedServicesByDirection = response.data.sort((a, b) => 
          a.nom_service.localeCompare(b.nom_service) // Tri par nom de service
        );
        setServicesByDirection(sortedServicesByDirection);
      })
      .catch((error) => {
        console.error('Erreur lors de la récupération des services par Direction:', error);
      });
  }, []);

  // Afficher les détails d'un service
  const handleViewDetails = (serviceId) => {
    axios.get(`http://localhost:5001/api/service/${serviceId}`)
      .then((response) => {
        setSelectedService(serviceId);
        setServiceDetails(response.data);
      })
      .catch((error) => {
        console.error('Erreur lors de la récupération des détails du service:', error);
      });
  };

  // Retour à la liste des services
  const handleBackToList = () => {
    setSelectedService(null);
    setServiceDetails(null);
  };

  // Filtrer les services par la recherche
  const filteredServices = services.filter(service => 
    service.nom_service.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Filtrer les services par direction
  const filteredServicesByDirection = servicesByDirection.filter(service => 
    service.nom_service.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="donne-container">
      <h2>Tous les Services Offerts</h2>

      {/* Barre de recherche */}
      <input 
        type="text" 
        placeholder="Rechercher un service..." 
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="search-input"
      />

      {!selectedService && (
        <>
          <div className="services-list">
            {filteredServices.map((service) => (
              <button 
                key={service.id_service}
                onClick={() => handleViewDetails(service.id_service)} 
                className="view-details-button"
              >
                <div className="service-card">
                  <p>{service.nom_service}</p>
                </div>
              </button>
            ))}
          </div>

          <h2>Services Offerts par une Direction</h2>
          <div className="services-list">
            {filteredServicesByDirection.map((service) => (
              <button 
                key={service.id_service}
                onClick={() => handleViewDetails(service.id_service)} 
                className="view-details-button"
              >
                <div className="service-card">
                  <p><strong>{service.nom_service}</strong></p>
                </div>
              </button>
            ))}
          </div>
        </>
      )}

      {selectedService && serviceDetails && (
        <div className="service-details">
          <h2>Détails du Service</h2>
          
          {/* Nom du service */}
          <p><strong>Titre :</strong> {serviceDetails.nom_service}</p>
          
          {/* Hiérarchie */}
          <p>
            <strong>Hiérarchie :</strong> {serviceDetails.hierarchy || 'Non définie'}
          </p>
          
          {/* Porte */}
          <p>
            <strong>Porte :</strong> {serviceDetails.porte_hierarchique || 'Non définie'}
          </p>
          
          {/* Délai */}
          <p className={serviceDetails.delai ? '' : 'empty'}>
            <strong>Délai :</strong>{' '}
            {serviceDetails.delai ? serviceDetails.delai : 'Aucun délai disponible'}
          </p>

          {/* Dossier Préparé */}
          <div>
            <strong>Dossier Préparé :</strong>
            {serviceDetails.dossier_prepare ? (
              <ul>
                {serviceDetails.dossier_prepare.split(',').map((item, index) => (
                  <li key={index}>{item.trim()}</li>
                ))}
              </ul>
            ) : (
              <p className="empty">Aucun dossier préparé disponible</p>
            )}
          </div>
          
          {/* Bouton Retour */}
          <button 
            onClick={handleBackToList} 
            className="back-button"
          >
            Retour à la liste
          </button>
        </div>
      )}
    </div>
  );
};

export default Donne;
