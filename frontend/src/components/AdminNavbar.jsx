import React from 'react';
import { FaSun, FaMoon } from 'react-icons/fa';
import { useAuth } from '../context/authContext';
import '../styles/AdminNavbar.css'; // Fichier CSS associé
import logo from '../assets/MTEFOP.png';

const AdminNavbar = ({ toggleTheme, isDarkMode }) => {
  const { user } = useAuth();

  return (
    
    <div className="admin-navbar">
      <div className="navbar-content">
        {/* Partie gauche */}
        <div className="navbar-left">
          <p>Bienvenue, {user?.nom|| 'Admin'}</p>
        </div>

        {/* Centre */}
        <div className="navbar-center">
          <img
            src={logo}
            alt="Logo"
            className="logo"
          />
        </div>

        {/* Partie droite */}
        <div className="navbar-right">
          <button
            onClick={toggleTheme}
            className="theme-toggle-button"
          >
            {isDarkMode ? <FaSun /> : <FaMoon />}
            <span>Changer le thème</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminNavbar;
