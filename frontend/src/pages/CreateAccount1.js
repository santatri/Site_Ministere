import React, { useState } from 'react';
import axios from 'axios';
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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5001/api/users1/register', formData);
      setMessage(response.data.message);
    } catch (error) {
      setMessage(error.response.data.message || 'Erreur lors de l\'inscription');
    }
  };

  return (
    <div>
      <h2>Inscription</h2>
      <form onSubmit={handleSubmit}>
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
        <input type="file" name="image" onChange={(e) => setFormData({ ...formData, image: e.target.files[0].name })} />
        <button type="submit">S'inscrire</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default Register;
