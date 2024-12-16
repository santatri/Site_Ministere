import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../styles/CreateAccount1.css';

const Register = () => {
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    matricule: '',
    mdp: '',
    confirmMdp: '',
    role: 'Communication',
    image: '',
  });
  const [message, setMessage] = useState('');
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setTimeout(() => setAnimate(true), 100); // Déclenche l'animation après 100ms
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5001/api/users1/register', formData);
      setMessage(response.data.message);

      // Vider le formulaire après la soumission réussie
      setFormData({
        nom: '',
        prenom: '',
        matricule: '',
        mdp: '',
        confirmMdp: '',
        role: 'Communication',
        image: '',
      });
    } catch (error) {
      setMessage(error.response?.data?.message || 'Erreur lors de l\'inscription ou Le matricule est déjà utilisé');
    }
  };

  return (
    <div className="form-container">
<<<<<<< HEAD
      <header className="header-background">
        <h1>Bienvenue à bord</h1>
        <p>Inscrivez-vous pour profiter de nos services</p>
      </header>
      <div className="form-wrapper">
        <h2>Inscription</h2>
        <form className="custom-form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="nom"
            placeholder="Nom"
            value={formData.nom}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="prenom"
            placeholder="Prénom"
            value={formData.prenom}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="matricule"
            placeholder="Matricule"
            value={formData.matricule}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="mdp"
            placeholder="Mot de passe"
            value={formData.mdp}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="confirmMdp"
            placeholder="Confirmer le mot de passe"
            value={formData.confirmMdp}
            onChange={handleChange}
            required
          />
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
          >
            <option value="Communication">Communication</option>
            <option value="Stan">Stan</option>
            <option value="Admin">Admin</option>
          </select>
          <input
            type="file"
            name="image"
            onChange={(e) => setFormData({ ...formData, image: e.target.files[0].name })}
          />
          <button type="submit">S'inscrire</button>
        </form>
        {message && <p className="form-message">{message}</p>}
        <p className="form-footer">
          Déjà un compte ? <Link to="/login">Se connecter</Link>
        </p>
=======
      <div className={`form-layout ${animate ? 'animate' : ''}`}>
        {/* Partie gauche */}
        <div className="left-column">
          <div className="left-content">
            <img src={require('../assets/dgfop.png')} alt="Connexion illustration" />
           
          </div>
        </div>

        {/* Partie droite */}
        <div className="form-wrapper">
          <h2>Inscription</h2>
          <form className="custom-form" onSubmit={handleSubmit}>
            <input type="text" name="nom" placeholder="Nom" onChange={handleChange} required />
            <input type="text" name="prenom" placeholder="Prénom" onChange={handleChange} required />
            <input type="text" name="matricule" placeholder="Matricule" onChange={handleChange} required />
            <input type="password" name="mdp" placeholder="Mot de passe" onChange={handleChange} required />
            <input type="password" name="confirmMdp" placeholder="Confirmer le mot de passe" onChange={handleChange} required />
            <select name="role" onChange={handleChange}>
              <option value="Communication">Communication</option>
              <option value="Stan">Stan</option>
              <option value="Admin">Admin</option>
            </select>
            <input
              type="file"
              name="image"
              onChange={(e) => setFormData({ ...formData, image: e.target.files[0].name })}
            />
            <button type="submit">S'inscrire</button>
          </form>
          {message && <p className="form-message">{message}</p>}
          <p className="form-footer">
            Déjà un compte ? <Link to="/login">Se connecter</Link>
          </p>
        </div>
>>>>>>> toky
      </div>
    </div>
  );
};

export default Register;
