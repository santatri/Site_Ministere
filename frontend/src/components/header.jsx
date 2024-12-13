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
                    <p>67Ha département 1, Antananarivo</p>
                </div>
                <div className="header-item">
                    <i className="fas fa-envelope icon"></i>
                    <p>mtefop@gmail.com</p>
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
                    <p>Horaires d'ouverture : Lundi à Samedi - 8h à 17h</p>
                </div>
            </div>
        </div>
    );
};

export default Header;
