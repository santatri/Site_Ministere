import React from 'react';
import { useAuth } from '../context/authContext';
import { useNavigate } from 'react-router-dom';
import { FaSignOutAlt } from 'react-icons/fa'; // Ajout d'une icône pour améliorer l'interface
import '../styles/AdminPage1.css'; // Ajouter des styles dédiés pour une apparence uniforme

const LogoutButton = () => {
  const { logout } = useAuth(); // Récupérer la fonction logout du contexte d'authentification
  const navigate = useNavigate(); // Hook pour la navigation

  const handleLogout = () => {
    logout(); // Supprimer l'utilisateur du contexte et du stockage local
    navigate('/login'); // Rediriger vers la page de connexion
  };

  return (
    <button onClick={handleLogout} className="logout-button">
      <FaSignOutAlt className="logout-icon" /> Se déconnecter
    </button>
  );
};

export default LogoutButton;
