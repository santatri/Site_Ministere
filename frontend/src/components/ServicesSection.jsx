import React from 'react';
import waveBackground from '../assets/wave(2).svg';
import service1 from '../assets/image10.jpg';
import service2 from '../assets/image16.jpg';
import service3 from '../assets/21.jpg';


const ServicesSection = () => {
  return (
    <div className="my-services-section">
      {/* Fond en forme de vague */}
      <div className="my-wave-background">
        <img src={waveBackground} alt="Wave Background" className="my-wave-image" />
      </div>

      {/* Section principale */}
      <div className="my-container">
        <h2 className="my-section-title">Nos Services Principaux</h2>

        {/* Conteneur des cadres */}
        <div className="my-services-wrapper">
          {/* Service 1 */}
          <div className="my-service-card">
            <img src={service1} alt="Service 1" className="my-service-image" />
            <h3 className="my-service-title">Gestion des Citoyens</h3>
            <p className="my-service-description">
              Ce service assure une gestion complète et transparente des informations des citoyens pour améliorer les processus administratifs.
            </p>
          </div>

          {/* Service 2 */}
          <div className="my-service-card">
            <img src={service2} alt="Service 2" className="my-service-image" />
            <h3 className="my-service-title">Services</h3>
            <p className="my-service-description">
              Accédez à divers services administratifs directement en ligne, réduisant les déplacements et optimisant votre temps.
            </p>
          </div>

          {/* Service 3 */}
          <div className="my-service-card">
            <img src={service3} alt="Service 3" className="my-service-image" />
            <h3 className="my-service-title">Assistance Personnalisée</h3>
            <p className="my-service-description">
              Profitez d'une assistance personnalisée pour répondre à vos besoins spécifiques et garantir une satisfaction optimale.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServicesSection;
