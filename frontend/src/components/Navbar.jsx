import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import '../styles/Navbar.css';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    // Fonction pour basculer l'état du menu
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <nav className="navigation-bar">
            {/* Bouton de menu pour les petits écrans */}
            <div className="menu-toggle" onClick={toggleMenu}>
                {isMenuOpen ? '✖' : '☰'}
            </div>

            {/* Liens de navigation */}
            <div className={`navigation-links ${isMenuOpen ? 'open' : ''}`}>
                <NavLink to="/home" className="nav-link" activeClassName="active">
                    Accueil
                </NavLink>
                <a href="/" className="nav-link">Bibliothèque numérique</a>
                <a href="/" className="nav-link">Organismes Rattachés</a>
                <a href="/" className="nav-link">Équivalence</a>
                <NavLink to="/service" className="nav-link" activeClassName="active">
                    Standard de Service
                </NavLink>
                <NavLink to="/archives" className="nav-link" activeClassName="active">
                    Actualités
                </NavLink>
                <NavLink to="/about" className="nav-link" activeClassName="active">
                    À propos
                </NavLink>
                <NavLink to="/contact" className="nav-link" activeClassName="active">
                    Contact
                </NavLink>
            </div>

            {/* Barre de recherche */}
            <div className="searche-bare">
                <input 
                    type="text" 
                    className="searche-input" 
                    placeholder="Rechercher..." 
                />
                <button className="searche-buttone">Rechercher</button>
            </div>
        </nav>
    );
};

export default Navbar;
