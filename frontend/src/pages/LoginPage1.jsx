import React, { useContext, useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext, useAuth } from '../context/authContext';
import '../styles/LoginPage1.css';
import { FaUser, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';

import dgfopImg from '../assets/dgfop.png';
import rppImg from '../assets/Rpp.png';
import { API_URL } from '../config';

const LoginPage1 = () => {
  const [matricule, setMatricule] = useState('');
  const { user, setUser } = useContext(AuthContext);
  const [mdp, setMdp] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API_URL}/api/users1/login`, { matricule, mdp });
      const { role, matricule: userMatricule, nom, prenom, image } = response.data.user;

  // Normaliser le rôle côté client pour éviter les problèmes de casse
  const roleNormalized = role ? String(role).toLowerCase() : null;

  login({ matricule: userMatricule, role: roleNormalized, nom, prenom, image });

  if (roleNormalized === 'admin') navigate('/admin');
  else if (roleNormalized === 'communication') navigate('/communication');
  else if (roleNormalized === 'stan') navigate('/stan');
  else navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Erreur lors de la connexion.');
    }
  };

  return (
    <div className="login-container">
      {/* Vague en haut */}
      <div className="wave-header"></div>

      <div className="login-content">
        <div className="left-column">
          <div className="left-contente">
            <img src={dgfopImg} alt="Connexion illustration" />
          </div>
        </div>
        {/* Colonne droite : Formulaire */}
        <div className="login-form">
          <img src={rppImg} alt="Logo" className="login-form-logo" />
          <h1>Bienvenue</h1>
          <form onSubmit={handleLogin}>
            <div className="input-group">
              <label htmlFor="matricule">Matricule</label>
              <div className="input-with-icon">
                <FaUser className="input-icon" />
                <input
                  id="matricule"
                  type="text"
                  placeholder="Entrer votre matricule"
                  value={matricule}
                  onChange={(e) => setMatricule(e.target.value)}
                />
              </div>
            </div>
            <div className="input-group">
              <label htmlFor="mdp">Mot de passe</label>
              <div className="input-with-icon">
                <FaLock className="input-icon" />
                <input
                  id="mdp"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Entrer votre mot de passe"
                  value={mdp}
                  onChange={(e) => setMdp(e.target.value)}
                />
                <div className="password-toggle" onClick={togglePasswordVisibility}>
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </div>
              </div>
            </div>
            <p className="register-link">
            Mot de passe oublié
          </p>
            <div className="additional-links">
              
            </div>
            <div className="button-container">
              <button type="submit" className="login-button">Se connecter</button>
            </div>
          </form>
           
          {error && <p className="error-message">{error}</p>}
          <p className="register-link">
            Pas encore de compte ? <Link to="/register">Créer un compte</Link>
          </p>
          
        </div>

        {/* Colonne droite : Image avec texte */}
      </div>

      {/* Vague en bas */}
      <div className="wave-footer"></div>
    </div>
  );
};

export default LoginPage1;
