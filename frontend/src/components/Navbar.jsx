import React, { useEffect, useState } from "react";
import axios from "axios";
import { NavLink } from 'react-router-dom';
import { FaBars, FaTimes, FaPhone } from 'react-icons/fa';
// import logo from '../assets/dgfop.png'; // Importez votre logo ici
import '../styles/Navbar.css';
import { API_URL } from "../config";
const Navbar = () => {
  const [show, setShow] = useState(false);
  const [showSubmenu, setShowSubmenu] = useState(false);
  const [showDgfopSubmenu, setShowDgfopSubmenu] = useState(false); // État pour le sous-menu DGFOP
  const [logos, setLogos] = useState({ logoDG: "",numero: ""});
  
  useEffect(() => {
      const fetchLogos = async () => {
        try {
          const response = await axios.get(`${API_URL}/api/set`);
          setLogos({
            numero: response.data.numero,
            logoDG: response.data.logoDG,
          });
        } catch (error) {
          console.error("Erreur lors du chargement des logos :", error);
        }
      };
  
      fetchLogos();
    }, []);
  const toggle = () => {
    setShow(!show);
  };

  // Ferme le menu mobile et tous les sous-menus (utilisé après un clic sur un lien)
  const closeMenu = () => {
    setShow(false);
    setShowSubmenu(false);
    setShowDgfopSubmenu(false);
  };

  

  return (
    <nav className="navigation-bar">
      <div className="navbar-container">
        {/* Logo à gauche */}
        <div className="navbar-left">
        {logos.logoDG && (
            <img
              src={`${API_URL}/uploads/${logos.logoDG}`}
              alt="Logo 2"
              className="navbar-logo"
            />
          )}
          {/* <img src={logo} alt="Logo" className="navbar-logo" /> */}
        </div>

        {/* Navigation au centre */}
        <div id={`${show ? '' : 'navbar-center'}`} className={`${show ? 'show' : 'navbar-center'}`}>
          <NavLink to="/home" className="nav-link" activeClassName="active-link" onClick={closeMenu}>
            Accueil 
          </NavLink>
          <NavLink to="/bibliotheque" className="nav-link" activeClassName="active-link" onClick={closeMenu}>
            Bibliothèque numérique
          </NavLink>
          <NavLink to="/service" className="nav-link" activeClassName="active-link" onClick={closeMenu}>
            Standard de Service
          </NavLink>
          <NavLink to="/archives" className="nav-link" activeClassName="active-link" onClick={closeMenu}>
            Actualités
          </NavLink>
{/* Sous-liste pour À propos */}
<div
  className="nav-link nav-link-dropdown"
  onMouseEnter={() => setShowSubmenu(true)}
  onMouseLeave={() => setShowSubmenu(false)}
>
  <NavLink  className="nav-link" >
    À propos
  </NavLink>
  <div className={`dropdown-menu ${showSubmenu ? 'show' : ''}`}>
    {/* Sous-menu de DGFOP */}
    <div
      className="dropdown-item dropdown-item-with-submenu"
      onMouseEnter={() => setShowDgfopSubmenu(true)}
      onMouseLeave={() => setShowDgfopSubmenu(false)}
    >
      <NavLink to="/about/dgfop" className="submenu-item" activeClassName="active-link" onClick={closeMenu}>
        DGFOP
      </NavLink>
      <div className={`submenu ${showDgfopSubmenu ? 'show' : ''}`}>
        <NavLink to="/about/deped" className="submenu-item" activeClassName="active-link" onClick={closeMenu}>
          DEPED
        </NavLink>
        <NavLink to="/about/drhe" className="submenu-item" activeClassName="active-link" onClick={closeMenu}>
          DRHE
        </NavLink>
        <NavLink to="/about/dfpae" className="submenu-item" activeClassName="active-link" onClick={closeMenu}>
          DFPAE
        </NavLink>
        <NavLink to="/about/drfp" className="submenu-item" activeClassName="active-link" onClick={closeMenu}>
          DRFP
        </NavLink>
      </div>
    </div>
  </div>
</div>


          <NavLink to="/contact" className="nav-link" activeClassName="active-link" onClick={closeMenu}>
            Contact
          </NavLink>
        </div>

        {/* Contact rapide à droite */}
        <div id="navbar-right" className="navbar-right">
          <div className="contact-quick">
            <FaPhone className="phone-icon" />
            <div className="contact-text">
              <span className="quick-contact">Contact rapide</span>
              <span className="phone-number">
                +261 {logos.numero}
              </span>
            </div>
          </div>
        </div>

        {/* Bouton burger pour mobile */}
        <div className="burger">
          {show ? (
            <FaTimes size={30} color={'red'} cursor={'pointer'} onClick={toggle} />
          ) : (
            <FaBars size={30} color={'white'} cursor={'pointer'} onClick={toggle} />
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
