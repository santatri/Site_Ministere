import React from 'react';
import '../styles/Header.css';
import logo from '../assets/MTEFOP.png'; // Importation du logo depuis le dossier assets
import rppImage from '../assets/Rpp.png'; // Importation de l'image rpp.png

const Header = () => {
  return (
    <header className="header">
      {/* Boutons à gauche avec image */}
      <div className="header-left">
        <img src={rppImage} alt="RPP" className="header-image-small" /> {/* Image réduite */}
        <button className="header-button">Public Services</button>
        <button className="header-button">Documents Reference</button>
        <button className="header-button">Recrutement</button>
      </div>

      {/* Logo au centre */}
      <div className="header-center">
        <img src={logo} alt="Logo du ministère" className="header-logo" />
      </div>

      {/* Contact rapide à droite */}
      <div className="header-right">
        <p className="header-contact">
          Contact rapide : <span><br />+261 0345599717</span>
        </p>
      </div>
    </header>
  );
};

export default Header;
