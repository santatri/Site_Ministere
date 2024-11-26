import React, { useState } from 'react';
import axios from 'axios';
import '../styles/Actualité.css';

const Actualité = () => {
  const [formData, setFormData] = useState({
    titre: '',
    description: '',
    media_image: null,
    media_video: null,
  });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData({ ...formData, [name]: files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('titre', formData.titre);
    data.append('description', formData.description);
    if (formData.media_image) data.append('media_image', formData.media_image);
    if (formData.media_video) data.append('media_video', formData.media_video);

    try {
      const response = await axios.post('http://localhost:5001/api/actu/insertion', data, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setMessage(response.data.message);
    } catch (error) {
      setMessage(error.response?.data?.message || 'Erreur lors de l’insertion.');
    }
  };

  return (
    <div>
      <h2>Insertion d'actualité</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="titre"
          placeholder="Titre"
          onChange={handleChange}
          required
        />
        <textarea
          name="description"
          placeholder="Description"
          onChange={handleChange}
          required
        />
        <label>Image (facultatif) :</label>
        <input
          type="file"
          name="media_image"
          accept="image/*"
          onChange={handleFileChange}
        />
        <label>Vidéo (facultatif) :</label>
        <input
          type="file"
          name="media_video"
          accept="video/*"
          onChange={handleFileChange}
        />
        <button type="submit">Soumettre</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default Actualité;
