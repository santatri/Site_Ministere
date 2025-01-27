import React from 'react';
import '../styles/Header.css';
import logo from '../assets/Rpp.png'; // Importation du logo depuis le dossier assets

const Header = () => {
    return (
        <div className="header-bar">
            {/* Section gauche */}
            <div className="header-left">
            <div className="header-item">
                <i className="fas fa-map-marker-alt icon"></i>
                <a 
                    href="https://www.google.com/maps/search/?api=1&query= Ministère de la Fonction Publique, Ministère de la Fonction Publique, du Travail et des Lois Sociales, 67 ha, Antananarivo" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="location-link"
                >
                    67Ha , Antananarivo
                </a>
            </div>

                <div className="header-item">
                    <i className="fas fa-envelope icon"></i>
                    <a href="mailto:santatriniainafeno01@gmail.com" className="email-link">DGFOP@gmail.com</a>
                </div>

            </div>

            {/* Section centrale pour le logo */}
           <div className="header-logo">
            <img src={logo} alt="logo" />
           </div>

            {/* Section droite */}
            <div className="header-right">
                <div className="header-item">
                    <i className="fas fa-clock icon"></i>
                    <p>Horaires d'ouverture : Lundi à Vendredi - 9h à 16h</p>
                </div>
            </div>
        </div>
    );
};

export default Header;
