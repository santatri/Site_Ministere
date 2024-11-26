// components/LogoutButton.js
import React from 'react';
import { useAuth } from '../context/authContext';
import { useNavigate } from 'react-router-dom';

const LogoutButton = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();  // Supprimer l'utilisateur du contexte et du stockage local
    navigate('/login');  // Rediriger vers la page de connexion
  };

  return <button onClick={handleLogout}>Se déconnecter</button>;
};

export default LogoutButton;
