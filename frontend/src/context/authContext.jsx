import React, { createContext, useState, useContext, useEffect } from 'react';

// Petit helper pour décoder le payload d'un JWT sans library externe
const parseJwt = (token) => {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return null;
    const payload = parts[1];
    const decoded = atob(payload.replace(/-/g, '+').replace(/_/g, '/'));
    return JSON.parse(decodeURIComponent(escape(decoded)));
  } catch (e) {
    return null;
  }
};

const normalizeRole = (r) => {
  try {
    if (!r) return null;
    if (Array.isArray(r)) return r.map(String).map(s => s.toLowerCase());
    return String(r).toLowerCase();
  } catch (e) {
    return null;
  }
};

export const AuthContext = createContext({
  user: null,
  setUser: () => null,
  login: () => null,
  logout: () => null,
  isAuthenticated: () => false,
  getRole: () => null,
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  // Initialisation depuis localStorage (supporte soit un objet `user`, soit un `token` JWT)
  const getInitialUser = () => {
    try {
      const rawUser = localStorage.getItem('user');
      if (rawUser) {
        // Si on stocke un objet user (avec role), l'utiliser
        const parsed = JSON.parse(rawUser);
        if (parsed && (parsed.role || parsed.token)) {
          // normaliser le rôle pour éviter les différences de casse
          if (parsed.role) parsed.role = normalizeRole(parsed.role);
          return parsed;
        }
      }

      // Si on stocke uniquement le token sous 'token', tenter de décoder
      const token = localStorage.getItem('token');
      if (token) {
        const payload = parseJwt(token);
        if (payload) return { token, role: normalizeRole(payload.role || payload?.roles || null), payload };
      }

      return null;
    } catch (e) {
      return null;
    }
  };

  const [user, setUser] = useState(getInitialUser());

  useEffect(() => {
    // Si l'application recharge et qu'un user existe en localStorage, s'assurer que le state est synchronisé
    const rawUser = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    if (rawUser && !user) {
      const parsed = JSON.parse(rawUser);
      if (parsed.role) parsed.role = normalizeRole(parsed.role);
      setUser(parsed);
    } else if (token && !user) {
      const payload = parseJwt(token);
      setUser({ token, role: normalizeRole(payload?.role || payload?.roles || null), payload });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // login accepte soit un objet user (contenant role), soit une chaîne token
  const login = (userData) => {
    if (typeof userData === 'string') {
      // on considère que c'est un token
      localStorage.setItem('token', userData);
      const payload = parseJwt(userData);
      const newUser = { token: userData, role: normalizeRole(payload?.role || payload?.roles || null), payload };
      setUser(newUser);
      localStorage.setItem('user', JSON.stringify(newUser));
    } else {
      // normaliser le rôle si présent
      const normalized = { ...userData };
      if (normalized.role) normalized.role = normalizeRole(normalized.role);
      setUser(normalized);
      // stocker l'objet user pour persistance (peut contenir token et role)
      localStorage.setItem('user', JSON.stringify(normalized));
      if (normalized.token) localStorage.setItem('token', normalized.token);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  };

  const isAuthenticated = () => !!user;

  const getRole = () => {
    if (!user) return null;
    if (typeof user.role === 'string') return normalizeRole(user.role);
    // parfois roles peut être un tableau
    if (Array.isArray(user.role)) return normalizeRole(user.role[0]) || null;
    // si payload contient des informations
    if (user.payload) return normalizeRole(user.payload.role) || (user.payload.roles && normalizeRole(user.payload.roles[0])) || null;
    return null;
  };

  return (
    <AuthContext.Provider value={{ user, setUser, login, logout, isAuthenticated, getRole }}>
      {children}
    </AuthContext.Provider>
  );
};
