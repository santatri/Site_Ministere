import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaSearch, FaPhone } from 'react-icons/fa';
import logo from '../assets/dgfop.png'; // Importez votre logo ici
import '../styles/Navbar.css';

const Navbar = () => {
  return (
    <nav className="navigation-bar">
      <div className="navbar-container">
        {/* Logo à gauche */}
        <div className="navbar-left">
          <img src={logo} alt="Logo" className="navbar-logo" />
        </div>

        {/* Navigation au centre */}
        <div className="navbar-center">
          <NavLink to="/home" className="nav-link" activeClassName="active-link">Accueil</NavLink>
          <NavLink to="/bibliotheque" className="nav-link" activeClassName="active-link">Bibliothèque numérique</NavLink>
          <NavLink to="/service" className="nav-link" activeClassName="active-link">Standard de Service</NavLink>
          <NavLink to="/archives" className="nav-link" activeClassName="active-link">Actualités</NavLink>
          <NavLink to="/about" className="nav-link" activeClassName="active-link">À propos</NavLink>
          <NavLink to="/contact" className="nav-link" activeClassName="active-link">Contact</NavLink>
        </div>

        {/* Contact et recherche à droite */}
        <div className="navbar-right">
          <div className="contact-quick">
            <FaPhone className="phone-icon" />
            <div className="contact-text">
              <span className="quick-contact">Contact rapide</span>
              <span className="phone-number">+034 55 997 17</span>
            </div>
          </div>
          
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
