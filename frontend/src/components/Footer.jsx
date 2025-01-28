import React from 'react';
import '../styles/Footer.css'; // Assurez-vous de créer un fichier CSS pour les styles
import logo1 from '../assets/dgfop.png';
import logo2 from '../assets/Rpp.png'; // Remplacez par le chemin de votre deuxième logo

const Footer = () => {
  // Obtenir l'année en cours dynamiquement
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section logos">
          <img src={logo1} alt="Logo 1" className="footer-logo" />
          <img src={logo2} alt="Logo 2" className="footer-logo" />
        </div>
        <div className="footer-section">
          <h3>Contact</h3>
          <p>67Ha, Bâtiment D1</p>
          <p>Antananarivo, Madagascar</p>
          <p>dgofp@.gov.mg</p>
        </div>
        <div className="footer-section">
          <h3>Liens utiles</h3>
          <ul>
            <li><a href="https://www.presidence.gov.mg">Présidence de la République de Madagascar</a></li>
            <li><a href="http://mtefpls.gov.mg/author/mtefpls/">Ministére du Travail de l'Emploi et de la Fonction Publique</a></li>
            <li><a href="https://www.primature.gov.mg">Primature de Madagascar</a></li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© Direction Générale de la Fonction Publique - Madagascar, {currentYear} | Développé par Toky et Santatra</p>
      </div>
    </footer>
  );
};

export default Footer;