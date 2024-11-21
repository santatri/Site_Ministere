import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/LoginPage1.css';

const LoginPage = () => {
  const [matricule, setMatricule] = useState('');
  const [mdp, setMdp] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5001/api/users1/login', { matricule, mdp });
      const { role } = response.data.user;

      if (role === 'Admin') {
        navigate('/admin');
      } else if (role === 'Communication') {
        navigate('/communication');
      } else if (role === 'Stan') {
        navigate('/stan');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Erreur lors de la connexion.');
    }
  };

  return (
    <div>
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
    </div>
  );
};

export default LoginPage;
