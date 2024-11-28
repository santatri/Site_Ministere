import React from 'react';
import { FaFacebook, FaGoogle } from 'react-icons/fa'; // Importation des icônes
import '../styles/Footer.css'; // Importation du fichier CSS pour le Footer

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p className="footer-text">© 2024 Votre Site Web</p>
        <div className="icon-container">
          {/* Lien vers Facebook */}
          <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="icon-link">
            <FaFacebook className="icon" />
          </a>
          {/* Lien vers Google */}
          <a href="https://www.google.com" target="_blank" rel="noopener noreferrer" className="icon-link">
            <FaGoogle className="icon" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
