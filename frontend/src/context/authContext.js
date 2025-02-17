import React, { createContext, useState, useContext } from 'react';

export const AuthContext = createContext({
  user:null,
  setUser:() => null
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const updateUser = (updatedUser) => {
    setUser(updatedUser);
  };

  return (
    <AuthContext.Provider value={{ user, setUser, login, logout , updateUser}}>
      {children}
    </AuthContext.Provider>
  );
};
