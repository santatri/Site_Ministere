import React, { useEffect, useState } from "react";
import axios from "axios";
import { NavLink } from 'react-router-dom';
import { FaBars, FaTimes, FaPhone } from 'react-icons/fa';
// import logo from '../assets/dgfop.png'; // Importez votre logo ici
import '../styles/Navbar.css';

const Navbar = () => {
  const [show, setShow] = useState(false);
  const [showSubmenu, setShowSubmenu] = useState(false);
  const [showDgfopSubmenu, setShowDgfopSubmenu] = useState(false); // État pour le sous-menu DGFOP
  const [logos, setLogos] = useState({ logoDG: "",numero: ""});
  
  useEffect(() => {
      const fetchLogos = async () => {
        try {
          const response = await axios.get("http://localhost:5001/api/set");
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

  return (
    <nav className="navigation-bar">
      <div className="navbar-container">
        {/* Logo à gauche */}
        <div className="navbar-left">
        {logos.logoDG && (
            <img
              src={`http://localhost:5001/uploads/${logos.logoDG}`}
              alt="Logo 2"
              className="navbar-logo"
            />
          )}
          {/* <img src={logo} alt="Logo" className="navbar-logo" /> */}
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
      <NavLink to="/about/dgfop" className="submenu-item" activeClassName="active-link">
        DGFOP
      </NavLink>
      <div className={`submenu ${showDgfopSubmenu ? 'show' : ''}`}>
        <NavLink to="/about/deped" className="submenu-item" activeClassName="active-link">
          DEPED
        </NavLink>
        <NavLink to="/about/drhe" className="submenu-item" activeClassName="active-link">
          DRHE
        </NavLink>
        <NavLink to="/about/dfpae" className="submenu-item" activeClassName="active-link">
          DFPAE
        </NavLink>
        <NavLink to="/about/drfp" className="submenu-item" activeClassName="active-link">
          DRFP
        </NavLink>
      </div>
    </div>
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
            <FaBars size={30} color={'blue'} cursor={'pointer'} onClick={toggle} />
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
