import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom'; // Import de Link pour les redirections
import { useAuth } from '../context/authContext';
import '../styles/LoginPage1.css';

const LoginPage1 = () => {
  const [matricule, setMatricule] = useState('');
  const [mdp, setMdp] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5001/api/users1/login', { matricule, mdp });
      const { role, matricule: userMatricule } = response.data.user;

      login({ matricule: userMatricule, role });

      // Redirection basée sur le rôle
      if (role === 'Admin') {
        navigate('/admin');
      } else if (role === 'Communication') {
        navigate('/communication');
      } else if (role === 'Stan') {
        navigate('/stan');
      } else {
        navigate('/');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Erreur lors de la connexion.');
    }
  };

  return (
    <div className="login-container">
      <h1>Connexion</h1>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Matricule"
          value={matricule}
          onChange={(e) => setMatricule(e.target.value)}
        />
        <input
          type="password"
          placeholder="Mot de passe"
          value={mdp}
          onChange={(e) => setMdp(e.target.value)}
        />
        <button type="submit">Se connecter</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {/* Lien vers l'inscription */}
      <p>
        Pas encore de compte ? <Link to="/register">Créer un compte</Link>
      </p>
    </div>
  );
};

export default LoginPage1;
