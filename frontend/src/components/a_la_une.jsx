import React, { useState } from 'react';
import axios from 'axios';

const AjoutALaUne = () => {
  const [formData, setFormData] = useState({
    titre: '',
    description: '',
    media_image: null
  });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, media_image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.titre) {
      setMessage('Le titre est obligatoire.');
      return;
    }

    const data = new FormData();
    data.append('titre', formData.titre);
    data.append('description', formData.description);
    if (formData.media_image) {
      data.append('media_image', formData.media_image);
    }

    try {
      const response = await axios.post('http://localhost:5001/api/a_la_une/insertion', data, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setMessage(response.data.message);
    } catch (error) {
      console.error('Erreur lors de l\'insertion:', error);
      setMessage('Erreur lors de l\'insertion.');
    }
  };

  return (
    <div>
      <h2>Ajouter une actualité "À la Une"</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Titre:</label>
          <input
            type="text"
            name="titre"
            value={formData.titre}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Description:</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Image:</label>
          <input
            type="file"
            name="media_image"
            onChange={handleFileChange}
          />
        </div>
        <button type="submit">Ajouter</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default AjoutALaUne;
