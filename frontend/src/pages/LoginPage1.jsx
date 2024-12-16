import React, { useContext, useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext, useAuth } from '../context/authContext';
import '../styles/LoginPage1.css';
import { FaUser, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';

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
      const response = await axios.post('http://localhost:5001/api/users1/login', { matricule, mdp });
      const { role, matricule: userMatricule, nom, prenom, image } = response.data.user;

      login({ matricule: userMatricule, role, nom, prenom, image });

      if (role === 'Admin') navigate('/admin');
      else if (role === 'Communication') navigate('/communication');
      else if (role === 'Stan') navigate('/stan');
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
            <img src={require('../assets/dgfop.png')} alt="Connexion illustration" />
           
          </div>
        </div>
        {/* Colonne droite : Formulaire */}
        <div className="login-form">
          <img src={require('../assets/Rpp.png')} alt="Logo" className="login-form-logo" />
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
              <Link to="/forgot-password" className="forgot-password">Mot de passe oublié ?</Link>
            </div>
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
