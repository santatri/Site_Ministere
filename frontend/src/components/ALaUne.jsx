import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/ÀLaUne.css';

const ALaUne = () => {
  const [formData, setFormData] = useState({
    titre: '',
    description: '',
    image: null,
  });

  console.log('a la une');
  
  const [elements, setElements] = useState([]);
  const [message, setMessage] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [currentId, setCurrentId] = useState(null);

  const fetchElements = async () => {
    try {
      const response = await axios.get('http://localhost:5001/api/a_la_une/all');
      setElements(response.data.data);
    } catch (error) {
      setMessage('Erreur lors du chargement des éléments.');
    }
  };

  useEffect(() => {
    fetchElements();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('titre', formData.titre);
    data.append('description', formData.description);
    if (formData.image) data.append('image', formData.image);

    try {
      const url = isEditing
        ? `http://localhost:5001/api/a_la_une/${currentId}`
        : 'http://localhost:5001/api/a_la_une/insertion';
      const method = isEditing ? 'put' : 'post';
      const response = await axios[method](url, data, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setMessage(response.data.message);
      fetchElements();
      setFormData({ titre: '', description: '', image: null });
      setIsEditing(false);
      setCurrentId(null);
    } catch (error) {
      setMessage(error.response?.data?.message || error.message || 'Erreur lors de la soumission.');
    }
  };

  const handleEdit = (id) => {
    const element = elements.find((el) => el.id === id);
    setFormData({
      titre: element.titre,
      description: element.description,
      image: null, // Ne réutilisez pas l'image existante directement
    });
    setIsEditing(true);
    setCurrentId(id);
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:5001/api/a_la_une/${id}`);
      setMessage(response.data.message);
      fetchElements();
    } catch (error) {
      setMessage('Erreur lors de la suppression.');
    }
  };

  return (
    <div className="container">
      <h1>À la Une</h1>
      {message && <p>{message}</p>}

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="titre"
          placeholder="Titre"
          value={formData.titre}
          onChange={handleChange}
          required
        />
        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          required
        />
        <input type="file" name="image" onChange={handleFileChange} />
        <button type="submit">{isEditing ? 'Modifier' : 'Ajouter'}</button>
      </form>

      <div>
        <h2>Éléments à la Une</h2>
        <ul>
          {elements.map((element) => (
            <li key={element.id}>
              <h3>{element.titre}</h3>
              <p>{element.description}</p>
              {element.image && <img src={`http://localhost:5001/uploads/${element.image}`} alt={element.titre} />}
              <button onClick={() => handleEdit(element.id)}>Modifier</button>
              <button onClick={() => handleDelete(element.id)}>Supprimer</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ALaUne;
