import React from 'react';
import LogoutButton from '../components/LogoutButton';
import '../styles/StanPage.css';
import { useAuth } from '../context/authContext';  // Importer le contexte


const StanPage = () => {
  const { user } = useAuth();  // Accéder à l'utilisateu
  return (
    <div>
      {user ? (
        <div>
          <h2>Bienvenue, {user.nom} {user.prenom}!</h2>
          {user.image && <img src={user.image} alt="User Profile" className="user-image" />}  {/* Afficher l'image */}
        </div>
      ) : (
        <p>Veuillez vous connecter pour voir vos informations.</p>
      )}
      <h1>Page de Stan</h1>
      <p>Bienvenue sur la page dédiée à Stan.</p>
      <LogoutButton />
    </div>
  );
};

export default StanPage;
