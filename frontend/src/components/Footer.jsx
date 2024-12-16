import React from "react";
import "../styles/Footer.css";
import logo from "../assets/dgfop.png"; // Chemin vers votre logo

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
<<<<<<< HEAD
        <p className="footer-text">© 2024 DGFOP Site Web</p>
        <div className="icon-container">
          {/* Lien vers Facebook */}
          <a href="https://www.facebook.com/santatrinniaina.nasandratra " target="_blank" rel="noopener noreferrer" className="icon-link">
            <FaFacebook className="icon" />
          </a>
          {/* Lien vers Google */}
          <a href="https://www.google.com" target="_blank" rel="noopener noreferrer" className="icon-link">
            <FaGoogle className="icon" />
          </a>
=======
        {/* Section des coordonnées */}
        <div className="footer-section">
          <img src={logo} alt="Logo" className="footer-logo" />
          <p>
            <strong>Adresse:</strong> 67Ha, Bâtiment D1, Antananarivo Madagascar 101
          </p>
          <p>
            <strong>Email:</strong>{" "}
            <a href="mailto:contact@digital.gov.mg">dgfop@gmail.com.</a>
          </p>
          <p>
            <strong>Téléphone:</strong> +261 34 55 997 17
          </p>
>>>>>>> toky
        </div>

        {/* Section des ministères */}
        <div className="footer-section">
          <h3>Les Ministères</h3>
          <ul>
            <li>Présidence de la République</li>
            <li>Intérieur et Décentralisation</li>
            <li>Économie et Finances</li>
            <li>Éducation Nationale et Enseignement Technique/Professionnel</li>
            <li>Santé Publique</li>
            <li>Postes, Télécommunications et Développement Numérique</li>
          </ul>
        </div>

        {/* Section des sites à visiter */}
        <div className="footer-section">
          <h3>Sites à visiter à Madagascar</h3>
          <ul>
            <li>Banque Centrale</li>
            <li>CNLEGIS</li>
            <li>Economic Development Board of Madagascar</li>
            <li>e-VISA</li>
            <li>Tourisme, Transport, Météorologie</li>
          </ul>
        </div>
      </div>

      {/* Bas du footer */}
      <div className="footer-bottom">
        <p>Direction Génerale et de la Fonction Publique Rights Reserved © 2024</p>
        
      </div>
    </footer>
  );
};

export default Footer;
