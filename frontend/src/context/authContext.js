import React, { createContext, useState, useContext } from 'react';

// Créer le contexte d'authentification
const AuthContext = createContext();

// Hook personnalisé pour accéder au contexte d'authentification
export const useAuth = () => {
  return useContext(AuthContext);
};

// Composant Provider pour envelopper l'application
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // État utilisateur (null si non connecté)

  const login = (userData) => setUser(userData); // Fonction de connexion
  const logout = () => setUser(null); // Fonction de déconnexion

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
