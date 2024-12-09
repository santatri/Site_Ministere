import React from "react";

import rppImage from "../assets/MTEFOP.png"; // Importation de l'image
import '../styles/WelcomePage.css';
const WelcomePage = () => {
  return (
    <div className="welcome-container">
      <div className="welcome-section">
        {/* Cadre gauche avec image */}
        <div className="image-frame">
          <img src={rppImage} alt="Représentation" className="frame-image" />
        </div>

        {/* Texte */}
        <div className="text-content">
          <h1 className="welcome-titlee">
            Bienvenue sur le plateforme digital du Ministère du Travail, de l'Emploi et de la Fonction Publique
          </h1>
          <p className="welcome-subtitle">
            La Présidence s’est engagée à créer une administration de proximité, à l’écoute de la population et de ses besoins,
            et à améliorer la qualité de vie des citoyens et de faciliter le travail des entreprises.
          </p>
          <p className="welcome-footer">
          Mme RAZAKABOANA Hanitra Fitiavana<br />
            <span>Secrétaire Général de la Ministère du Travail, de l'Emploi et de la Fonction Publique Madagascar</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;
