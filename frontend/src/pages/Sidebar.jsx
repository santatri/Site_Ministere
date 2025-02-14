import React from 'react';
import { FaUsers, FaNewspaper, FaStar, FaInfoCircle, FaConciergeBell, FaChartBar, FaEnvelope, FaArrowDown, FaSlideshare } from 'react-icons/fa';
import LogoutButton from '../components/LogoutButton';
import logo from '../assets/dgfop.png'; // Remplacez par le chemin réel de votre logo
import '../styles/Sidebar.css';
const Sidebar = ({ activeSection, setActiveSection, isMenuOpen}) => {
  
  return (
    <div className={`sidebar ${isMenuOpen ? 'open' : ''}`}>
      <div className="logo-containeres">
        <img src={logo} alt="DGFOP Logo" className="log" />
      </div>
      <div className="menu" >
        <button
          className={`menu-item ${activeSection === 'utilisateurs' ? 'active' : ''}`}
          onClick={() => setActiveSection('utilisateurs')}
        >
          <FaUsers /> Utilisateurs
        </button>
        <button
          className={`menu-item ${activeSection === 'actualites' ? 'active' : ''}`}
          onClick={() => setActiveSection('actualites')}
        >
          <FaNewspaper /> Actualités
        </button>
        <button
          className={`menu-item ${activeSection === 'a-la-une' ? 'active' : ''}`}
          onClick={() => setActiveSection('a-la-une')}
        >
          <FaStar /> À la une
        </button>
        <button
          className={`menu-item ${activeSection === 'a-propos' ? 'active' : ''}`}
          onClick={() => setActiveSection('a-propos')}
        >
          <FaInfoCircle /> À propos
        </button>
        <button
          className={`menu-item ${activeSection === 'services' ? 'active' : ''}`}
          onClick={() => setActiveSection('services')}
        >
          <FaConciergeBell /> Services
        </button>
        <button
          className={`menu-item ${activeSection === 'indicateurs' ? 'active' : ''}`}
          onClick={() => setActiveSection('indicateurs')}
        >
          <FaChartBar /> Indicateurs
        </button>
        <button
          className={`menu-item ${activeSection === 'slides' ? 'active' : ''}`}
          onClick={() => setActiveSection('slides')}
        >
          <FaSlideshare /> Slides
        </button>
        <button
          className={`menu-item ${activeSection === 'Message' ? 'active' : ''}`}
          onClick={() => setActiveSection('Message')}
        >
          <FaEnvelope /> Message
        </button>
        <button
          className={`menu-item ${activeSection === 'footer' ? 'active' : ''}`}
          onClick={() => setActiveSection('footer')}
        >
          <FaArrowDown /> Footer et Header
        </button>
      </div>
      <LogoutButton />
    </div>
    
  );
};

export default Sidebar;