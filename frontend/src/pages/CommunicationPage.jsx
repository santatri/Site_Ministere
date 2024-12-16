// pages/CommunicationPage.js
import React from 'react';
import LogoutButton from '../components/LogoutButton';
import { useAuth } from '../context/authContext';  // Importer le contexte
import Actualité from '../components/Actualité';

import '../styles/CommunicationPage.css';

const CommunicationPage = () => {
  const { user } = useAuth();  // Accéder à l'utilisateur connecté

  return (
    <div>
      <h1>Page de Communication</h1>
      {user ? (
        <div>
          <h2>Bienvenue, {user.nom} {user.prenom}!</h2>
          {user.image && <img src={user.image} alt="User Profile" className="user-image" />}  {/* Afficher l'image */}
        </div>
      ) : (
        <p>Veuillez vous connecter pour voir vos informations.</p>
      )}
      <Actualité/>
      <LogoutButton />
    </div>
  );
};

export default CommunicationPage;
