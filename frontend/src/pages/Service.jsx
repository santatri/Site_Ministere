import React from 'react';
import '../styles/Service.css';

const Service = () => {
  return (
    <div className="service-container">
      <h1 className="service-heading">Nos Services</h1>
      <p className="service-description">
        Bienvenue sur la page de nos services. Découvrez ce que nous offrons pour répondre à vos besoins professionnels.
      </p>
      
      <div className="service-cards">
        <div className="service-card">
          <h2>Développement Web</h2>
          <p>
            Nous offrons des services de développement web sur mesure, de la création de sites web vitrine à des solutions complexes.
          </p>
        </div>
        <div className="service-card">
          <h2>Consultation en IT</h2>
          <p>
            Nos experts IT vous accompagnent pour optimiser vos infrastructures et systèmes informatiques, afin d'améliorer votre performance.
          </p>
        </div>
        <div className="service-card">
          <h2>Design UX/UI</h2>
          <p>
            Nous créons des expériences utilisateurs fluides et esthétiques pour vos produits numériques, en nous assurant de l’ergonomie et de l’accessibilité.
          </p>
        </div>
        <div className="service-card">
          <h2>Marketing Digital</h2>
          <p>
            De la stratégie de contenu au référencement, nous vous aidons à booster votre visibilité en ligne et à atteindre votre audience cible.
          </p>
        </div>
        <div className="service-card">
          <h2>Maintenance & Support</h2>
          <p>
            Nous offrons des services de maintenance continue pour garantir le bon fonctionnement de vos applications et systèmes.
          </p>
        </div>
      </div>

      <footer className="service-footer">
        <p>© 2024 Nos Services - Tous droits réservés</p>
      </footer>
    </div>
  );
};

export default Service;
