import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/donne.css';
import Services from '../pages/Services/Services';
import {  FaBook} from 'react-icons/fa';
import { motion } from "framer-motion";

const Donne = () => {
  const [services, setServices] = useState([]);
  const [servicesByDirection, setServicesByDirection] = useState([]);
  const [selectedService, setSelectedService] = useState(null);
  const [serviceDetails, setServiceDetails] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchCategory, setSearchCategory] = useState("all");
  const [isSearchVisible, setIsSearchVisible] = useState(true);

  useEffect(() => {
    // Récupérer la liste des services
    axios.get('http://localhost:5001/api/services')
      .then((response) => {
        const sortedServices = response.data.sort((a, b) =>
          a.nom_service.localeCompare(b.nom_service)
        );
        setServices(sortedServices);
      })
      .catch((error) => {
        console.error('Erreur lors de la récupération des services:', error);
      });

    // Récupérer les services par Direction
    axios.get('http://localhost:5001/api/services/by-direction')
      .then((response) => {
        const sortedServicesByDirection = response.data.sort((a, b) =>
          a.nom_service.localeCompare(b.nom_service)
        );
        setServicesByDirection(sortedServicesByDirection);
      })
      .catch((error) => {
        console.error('Erreur lors de la récupération des services par Direction:', error);
      });
  }, []);

  const handleViewDetails = (serviceId) => {
    axios.get(`http://localhost:5001/api/service/${serviceId}`)
        .then((response) => {
            setSelectedService(serviceId);
            setServiceDetails(response.data);
            setIsSearchVisible(false); // Hide search bar when entering details
            
            // Wait for UI updates before scrolling
            setTimeout(() => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }, 100);
        })
        .catch((error) => {
            console.error('Erreur lors de la récupération des détails du service:', error);
        });
};

  const handleBackToList = () => {
    setSelectedService(null);
    setServiceDetails(null);
    setIsSearchVisible(true); // Show search bar when going back to the list
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const filteredServices = services.filter(service =>
    service.nom_service.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredServicesByDirection = servicesByDirection.filter(service =>
    service.nom_service.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const icons = [ FaBook];
  const animationVariants = {
    hidden: { opacity: 0, y: 0 },
    visible: { opacity: 500, y: 0, transition: { duration: 2 } },
  };

  const getEtage = (porteNumber) => {
    const porte = parseInt(porteNumber, 10); // Assurez-vous que le numéro de porte est un nombre entier

    if (porte >= 1 && porte <= 17) {
      return "1er étage";
    } else if (porte >= 201 && porte <= 222) {
      return "2ème étage";
    } else if (porte >= 301 && porte <= 321) {
      return "3ème étage";
    } else if (porte >= 401 && porte <= 421) {
      return "4ème étage";
    } else if (porte >= 422) {
      return "5ème étage";
    } else {
      return "Numéro de porte invalide";
    }
  };

  return (
    <motion.div
      className="donne-container"
      initial="hidden"
      animate="visible"
      variants={animationVariants}
    >
      <Services />
      {isSearchVisible && (
        <div className="searches-section">
          <div className="searches-bar">
            <select
              value={searchCategory}
              onChange={(e) => setSearchCategory(e.target.value)}
              className="searches-category"
            >
              <option value="all">Tous les services</option>
              <option value="direction">Services par direction</option>
              <option value="offered">Services offerts</option>
            </select>
            <input
              type="text"
              placeholder="Rechercher un service..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="searches-input"
            />
            <button className="searches-button" onClick={() => console.log("Recherche effectuée")}>
              Rechercher
            </button>
          </div>
        </div>
      )}

      {!selectedService && (
        <>
          {(searchCategory === "all" || searchCategory === "offered") && (
            <>
              <h2 className="services-titlees">Tous les Services Offerts</h2>
              <p className='servi'> Trouver les services publics que vous souhaitez parmi toutes les services.</p>
              <motion.div
                className="services-list"
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: { opacity: 0 },
                  visible: {
                    opacity: 1,
                    transition: { staggerChildren: 0.2 },
                  },
                }}
              >
                {filteredServices.map((service, index) => {
                  const Icon = icons[index % icons.length];
                  return (
                    <motion.button
                      key={service.id_service}
                      className="view-details-button"
                      variants={animationVariants}
                      onClick={() => handleViewDetails(service.id_service)}
                    >
                      <div className="service-card">
                        <span className="service-badge">#{index + 1}</span>
                        <Icon className="service-icon" />
                        <p className="service-text">{service.nom_service}</p>
                      </div>
                    </motion.button>
                  );
                })}
              </motion.div>
            </>
          )}

          {(searchCategory === "all" || searchCategory === "direction") && (
            <>
              <h2 className="services-titlees">Services Offerts par une Direction</h2>
              <div className="services-list">
                {filteredServicesByDirection.map((service, index) => {
                  const Icon = icons[index % icons.length];
                  return (
                    <motion.button
                      key={service.id_service}
                      className="view-details-button"
                      variants={animationVariants}
                      onClick={() => handleViewDetails(service.id_service)}
                    >
                      <div className="service-card">
                        <span className="service-badge">#{index + 1}</span>
                        <Icon className="service-icon" />
                        <p className="service-text">{service.nom_service}</p>
                      </div>
                    </motion.button>
                  );
                })}
              </div>
            </>
          )}
        </>
      )}

      {selectedService && serviceDetails && (
        <div className="service-details">
          {/* Bouton de retour */}
          <button className="back-button" onClick={handleBackToList}>
            Retour à la service
          </button>
          <h2 className="details-title">Détail du Service</h2>
          <div className="service-content">
            {/* Colonne gauche */}
            <div className="service-left">
              <div className="service-title-box">
                <h3>{serviceDetails.nom_service}</h3>
              </div>
              <div className="service-description-box">
                <p>{serviceDetails.description || "Description indisponible."}</p>
              </div>
              <div className="service-dossier-box">
                <h4>Documents à fournir</h4>
                {serviceDetails.dossier_prepare ? (
                  <ul>
                    {serviceDetails.dossier_prepare.split(',').map((item, index) => (
                      <li key={index}>{item.trim()}</li>
                    ))}
                  </ul>
                ) : (
                  <p>Aucun Document à fournir disponible.</p>
                )}
              </div>
            </div>
            {/* Colonne droite */}
            <div className="service-right">
              <div className="service-info-box">
                <h4>Hiérarchie</h4>
                <p>{serviceDetails.hierarchy || "Non définie"}</p>
              </div>
              <div className="service-info-box">
                <h4>Porte</h4>
                <p>
                  {serviceDetails.porte_hierarchique 
                    ? `${serviceDetails.porte_hierarchique} - ${getEtage(serviceDetails.porte_hierarchique)}`
                    : "Non définie"}
                </p>
              </div>
              <div className="service-info-box">
                <h4>Délai</h4>
                <p>{serviceDetails.delai || "Aucun délai disponible"}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default Donne;
