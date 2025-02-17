import React, { useState, useEffect } from 'react';
import LogoutButton from '../components/LogoutButton';
import { useAuth } from '../context/authContext';
import Actualité from '../components/Actualité';
import '../styles/CommunicationPage.css';

const CommunicationPage = () => {
  const [image, setImage] = useState('');
  const { user } = useAuth(); // Accéder à l'utilisateur connecté
  const [isNavbarOpen, setIsNavbarOpen] = useState(false); // État pour gérer l'ouverture/fermeture de la navbar

  useEffect(() => {
    if (user && user.image) {
      setImage(user.image);
    }
  }, [user]);

  const toggleNavbar = () => {
    setIsNavbarOpen(!isNavbarOpen);
  };

  return (
    <div className="communication-page">
      {/* Menu Burger */}
      <div className={`menu-burger ${isNavbarOpen ? 'open' : ''}`} onClick={toggleNavbar}>
        <span></span>
        <span></span>
        <span></span>
      </div>

      {/* Navbar */}
      <div className={`navbar ${isNavbarOpen ? 'open' : 'closed'}`}>
  <div className="navbar-profile">
    {image && <img src={`http://localhost:5001/uploads/${image}`} alt="User" />}
    <span>{user?.prenom} {user?.nom}</span>
    {/* Ajouter la croix pour fermer la navbar */}
    <span className="close-navbar" onClick={toggleNavbar}>❌</span>
  </div>
  <ul className="navbar-menu">
    <li><a href="#">Actualités</a></li>
    
  </ul>
  <div className="logout-button">
    <LogoutButton />
  </div>
</div>

      {/* Contenu principal */}
      <div className="content">
        <h1>Page de Communication</h1>
        {user ? (
          <div>
            <div className="navbar-profile">
              <h2>{user.nom} {user.prenom}!</h2>
              {image && <img src={`http://localhost:5001/uploads/${image}`} alt="User" />}

            </div>
          </div>
        ) : (
          <p>Veuillez vous connecter pour voir vos informations.</p>
        )}
        <Actualité />
      </div>
    </div>
  );
};

export default CommunicationPage;