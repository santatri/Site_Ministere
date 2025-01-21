import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FaBars, FaTimes, FaPhone } from 'react-icons/fa';
import logo from '../assets/dgfop.png'; // Importez votre logo ici
import '../styles/Navbar.css';

const Navbar = () => {
  const [show, setShow] = useState(false);
  const [showSubmenu, setShowSubmenu] = useState(false);

  const toggle = () => {
    setShow(!show);
  };

  const toggleSubmenu = () => {
    setShowSubmenu(!showSubmenu);
  };

  return (
    <nav className="navigation-bar">
      <div className="navbar-container">
        {/* Logo à gauche */}
        <div className="navbar-left">
          <img src={logo} alt="Logo" className="navbar-logo" />
        </div>

        {/* Navigation au centre */}
        <div id={`${show ? '' : 'navbar-center'}`} className={`${show ? 'show' : 'navbar-center'}`}>
          <NavLink to="/home" className="nav-link" activeClassName="active-link">
            Accueil
          </NavLink>
          <NavLink to="/bibliotheque" className="nav-link" activeClassName="active-link">
            Bibliothèque numérique
          </NavLink>
          <NavLink to="/service" className="nav-link" activeClassName="active-link">
            Standard de Service
          </NavLink>
          <NavLink to="/archives" className="nav-link" activeClassName="active-link">
            Actualités
          </NavLink>
          {/* Sous-liste pour À propos */}
          <div
  className="nav-link nav-link-dropdown"
  onMouseEnter={() => setShowSubmenu(true)}
  onMouseLeave={() => setShowSubmenu(false)}
>
  À propos
  <div className={`dropdown-menu ${showSubmenu ? 'show' : ''}`}>
    <NavLink to="/about/dgfop" className="dropdown-item" activeClassName="active-link">
      DGFOP
    </NavLink>
    <NavLink to="/about/deped" className="dropdown-item" activeClassName="active-link">
      DEPED
    </NavLink>
    <NavLink to="/about/derhe" className="dropdown-item" activeClassName="active-link">
      DERHE
    </NavLink>
    <NavLink to="/about/drfpae" className="dropdown-item" activeClassName="active-link">
      DRFPAE
    </NavLink>
  </div>
</div>

          <NavLink to="/contact" className="nav-link" activeClassName="active-link">
            Contact
          </NavLink>
        </div>

        {/* Contact rapide à droite */}
        <div id="navbar-right" className="navbar-right">
          <div className="contact-quick">
            <FaPhone className="phone-icon" />
            <div className="contact-text">
              <span className="quick-contact">Contact rapide</span>
              <span className="phone-number">+034 55 997 17</span>
            </div>
          </div>
        </div>
        <div className="burger">
          {show ? (
            <FaTimes size={30} color={'red'} cursor={'pointer'} onClick={toggle} />
          ) : (
            <FaBars size={30} color={'blue'} cursor={'pointer'} onClick={toggle} />
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
