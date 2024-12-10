import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import '../styles/SecretaireGeneral.css';

const SecretaireGeneral = () => {
  const [formData, setFormData] = useState({
    nom_sg: '',
    porte_sg: '',
    image: null,
  });

  const [elements, setElements] = useState([]);
  const [message, setMessage] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [currentId, setCurrentId] = useState(null);

  const fetchElements = async () => {
    try {
      const response = await axios.get('http://localhost:5001/api/secretaire_general/all');
      setElements(response.data.data);
    } catch (error) {
      setMessage('Erreur lors du chargement des secrétaires généraux.');
    }
  };

  useEffect(() => {
    fetchElements();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('nom_sg', formData.nom_sg);
    data.append('porte_sg', formData.porte_sg);
    if (formData.image) data.append('image', formData.image);

    try {
      const url = isEditing
        ? `http://localhost:5001/api/secretaire_general/${currentId}`
        : 'http://localhost:5001/api/secretaire_general/insertion';
      const method = isEditing ? 'put' : 'post';
      const response = await axios[method](url, data, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setMessage(response.data.message);
      fetchElements();
      setFormData({ nom_sg: '', porte_sg: '', image: null });
      setIsEditing(false);
      setCurrentId(null);
    } catch (error) {
      setMessage(error.response?.data?.message || error.message || 'Erreur lors de la soumission.');
    }
  };

  const handleEdit = (id_sg) => {
    const element = elements.find((el) => el.id_sg === id_sg);
    setFormData({
      nom_sg: element.nom_sg,
      porte_sg: element.porte_sg,
      image: null,
    });
    setIsEditing(true);
    setCurrentId(id_sg);
  };

  const handleDelete = async (id_sg) => {
    try {
      const response = await axios.delete(`http://localhost:5001/api/secretaire_general/${id_sg}`);
      setMessage(response.data.message);
      fetchElements();
    } catch (error) {
      setMessage('Erreur lors de la suppression.');
    }
  };

  return (
    <div className="container">
      <h1>Secrétaire Général</h1>
      {message && <p>{message}</p>}

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="nom_sg"
          placeholder="Nom"
          value={formData.nom_sg}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="porte_sg"
          placeholder="Porte"
          value={formData.porte_sg}
          onChange={handleChange}
          required
        />
        <button type="submit">{isEditing ? 'Modifier' : 'Ajouter'}</button>
      </form>

      <div>
        <h2>Liste des Secrétaires Généraux</h2>
        <ul>
          {elements.map((element) => (
            <li key={element.id_sg}>
              <h3>{element.nom_sg}</h3>
              <p>Porte: {element.porte_sg}</p>
              {element.image && <img src={`http://localhost:5001/uploads/${element.image}`} alt={element.nom_sg} />}
              <button onClick={() => handleEdit(element.id_sg)}>Modifier</button>
              <button onClick={() => handleDelete(element.id_sg)}>Supprimer</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SecretaireGeneral;
