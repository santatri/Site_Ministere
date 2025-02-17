import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/authContext';
import '../styles/StanPage.css';
import LogoutButton from '../components/LogoutButton';
import SecretaireGeneral from '../components/SecretaireGeneral';
import DirectionGenerale from '../components/DirectionGenerale';
import Direction from '../components/Direction';
import Service from '../components/Service';
import ServiceOffert from '../components/ServiceOffert';

const StanPage = () => {
  const { user } = useAuth();
  const [image, setImage] = useState('');
  const [activeComponent, setActiveComponent] = useState('SecretaireGeneral');
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);

  useEffect(() => {
    if (user && user.image) {
      setImage(user.image);
    }
  }, [user]);

  const renderComponent = () => {
    switch (activeComponent) {
      case 'SecretaireGeneral':
        return <SecretaireGeneral />;
      case 'DirectionGenerale':
        return <DirectionGenerale />;
      case 'Direction':
        return <Direction />;
      case 'Service':
        return <Service />;
      case 'ServiceOffert':
        return <ServiceOffert />;
      default:
        return <SecretaireGeneral />;
    }
  };

  const toggleNavbar = () => {
    setIsNavbarOpen(!isNavbarOpen);
  };

  const handleMenuClick = (component) => {
    setActiveComponent(component);
    setIsNavbarOpen(false); // Fermer la navbar après avoir cliqué sur un menu
  };

  return (
    <div className="stan-page">
      {/* Menu Burger */}
      <div className={`menu-burger ${isNavbarOpen ? 'open' : ''}`} onClick={toggleNavbar}>
        <span></span>
        <span></span>
        <span></span>
      </div>

      {/* Navbar */}
      <div className={`navbar ${isNavbarOpen ? 'open' : 'closed'}`}>
        <div className="navbar-profile1">
          {image && <img src={`http://localhost:5001/uploads/${image}`} alt="User" />}
          <span>{user?.prenom} {user?.nom}</span>
          <span className="close-navbar" onClick={toggleNavbar}>❌</span>

        </div>
        <ul className="navbar-menu">
          <li><a href="#" onClick={() => handleMenuClick('SecretaireGeneral')}>Secrétaire Général</a></li>
          <li><a href="#" onClick={() => handleMenuClick('DirectionGenerale')}>Direction Générale</a></li>
          <li><a href="#" onClick={() => handleMenuClick('Direction')}>Direction</a></li>
          <li><a href="#" onClick={() => handleMenuClick('Service')}>Service</a></li>
          <li><a href="#" onClick={() => handleMenuClick('ServiceOffert')}>Service Offert</a></li>
        </ul>
        <div className="logout-button">
          <LogoutButton />
        </div>
      </div>

      {/* Contenu principal */}
      <div className="content">
        
        <div className="navbar-profile">
          <span>Bienvenue {user?.prenom} {user?.nom}</span>
          {image && <img src={`http://localhost:5001/uploads/${image}`} alt="User" />}

        </div>
        {renderComponent()}
      </div>
    </div>
  );
};

export default StanPage;