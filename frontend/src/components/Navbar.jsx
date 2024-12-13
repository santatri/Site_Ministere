import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaSearch, FaPhone } from 'react-icons/fa'; // Importez l'icône de téléphone et recherche
import logo from '../assets/dgfop.png'; // Importez le logo
import '../styles/Navbar.css';

const Navbar = () => {
  return (
    <nav className='navigation-bar'>
      <div className='navbar-container'>
        <div className='navbar-left'>
          <img src={logo} alt='Logo' className='navbar-logo' />
          <NavLink to="/home" className='nav-link' activeClassName='active-link'>Accueil</NavLink>
          <NavLink to="/bibliotheque" className='nav-link' activeClassName='active-link'>Bibliothèque numérique</NavLink>
          <NavLink to="/service" className='nav-link' activeClassName='active-link'>Standard de Service</NavLink>
          <NavLink to="/archives" className='nav-link' activeClassName='active-link'>Archives</NavLink>
          <NavLink to="/about" className='nav-link' activeClassName='active-link'>A propos</NavLink>
          <NavLink to="/contact" className='nav-link' activeClassName='active-link'>Contact</NavLink>
        </div>
        <div className='navbar-right'>
          <div className='contact-quick'>
            <FaPhone className='phone-icon' /> {/* Icône de téléphone ajoutée ici */}
            <div className='contact-text'>
              <span className='quick-contact'>Contact rapide</span>
              <span className='phone-number'>+123 456 7890</span>
            </div>
          </div>
          <FaSearch className='search-icon' />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
