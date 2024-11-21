import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/authContext';

const ProtectedRoute = ({ element }) => {
  const { user } = useAuth(); // Vérifier si l'utilisateur est connecté

  // Si l'utilisateur n'est pas connecté, rediriger vers Home
  if (!user) {
    return <Navigate to="/" replace />;
  }

  // Sinon, afficher le composant de la route
  return element;
};

export default ProtectedRoute;
