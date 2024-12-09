import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import '../styles/Actualité.css';

const Actualité = () => {

  const input = useRef(null)
  const [formData, setFormData] = useState({
    titre: '',
    description: '',
    media_image: null,
    media_video: null,
  });
  const [actualités, setActualités] = useState([]);
  const [message, setMessage] = useState('');
  const [search, setSearch] = useState({ mots: '', dateStart: '', dateEnd: '' });
  const [isEditing, setIsEditing] = useState(false);
  const [currentId, setCurrentId] = useState(null);

  // Récupérer les actualités depuis l'API
  const fetchActualités = async (filters = {}) => {
    try {
      const response = await axios.get('http://localhost:5001/api/actu/all', { params: filters });
      setActualités(response.data.data);
    } catch (error) {
      setMessage('Erreur lors du chargement des actualités.');
    }
  };

  useEffect(() => {
    fetchActualités();
  }, []);

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
      const url = isEditing
        ? `http://localhost:5001/api/actu/${currentId}`
        : 'http://localhost:5001/api/actu/insertion';
      const method = isEditing ? 'put' : 'post';
      const response = await axios[method](url, data, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setMessage(response.data.message);
      fetchActualités(); // Recharge les actualités après modification ou ajout
      setFormData({
        titre: '',
        description: '',
        media_image: null,
        media_video: null,
      });
      setIsEditing(false);
      setCurrentId(null);
    } catch (error) {
      setMessage(error.response?.data?.message || 'Erreur lors de l’insertion ou de la mise à jour.');
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchActualités(search);
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:5001/api/actu/${id}`);
      setMessage(response.data.message);
      fetchActualités(); // Recharge les actualités après suppression
    } catch (error) {
      setMessage('Erreur lors de la suppression.');
    }
  };

  const handleUpdate = (id) => {
  input.current.focus();
    
    // Permet de pré-remplir le formulaire pour l'édition
    const actu = actualités.find((item) => item.id === id);  
    setFormData({
      titre: actu.titre,
      description: actu.description,
      media_image: actu.media_image,
      media_video: actu.media_video,
    });
    setIsEditing(true);
    setCurrentId(id);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' };
    return date.toLocaleDateString('fr-FR', options);
  };

  return (
    <div className="actualites-container">
  <h2>{isEditing ? 'Modifier l\'actualité' : 'Insertion d\'actualité'}</h2>
  <form className="for-actualite" onSubmit={handleSubmit}>
    <input
      ref={input}
      type="text"
      name="titre"
      className="for-inpute"
      placeholder="Titre"
      onChange={handleChange}
      value={formData.titre}
      required
    />
    <textarea
      name="description"
      className="for-textarea"
      placeholder="Description"
      onChange={handleChange}
      value={formData.description}
      required
    />
    <label>Image (facultatif) :</label>
    <input
      type="file"
      name="media_image"
      className="for-file-input"
      accept="image/*"
      onChange={handleFileChange}
    />
    <label>Vidéo (facultatif) :</label>
    <input
      type="file"
      name="media_video"
      className="for-file-input"
      accept="video/*"
      onChange={handleFileChange}
    />
    <button type="submit" className="for-submite-button">
      {isEditing ? 'Mettre à jour' : 'Soumettre'}
    </button>
  </form>
  {message && <p className="for-message">{message}</p>}

  <h4>Archives des actualités</h4>
  <form className="sear-forme" onSubmit={handleSearch}>
    <input
      type="text"
      className="sear-inpute"
      placeholder="Rechercher par mots-clés"
      value={search.mots}
      onChange={(e) => setSearch({ ...search, mots: e.target.value })}
    />
    <input
      type="date"
      className="sear-inpute"
      value={search.dateStart}
      onChange={(e) => setSearch({ ...search, dateStart: e.target.value })}
    />
    <input
      type="date"
      className="sear-inpute"
      value={search.dateEnd}
      onChange={(e) => setSearch({ ...search, dateEnd: e.target.value })}
    />
    <button type="submit" className="sear-buttone">Rechercher</button>
  </form>

  <div className="news-liste">
    {actualités.length === 0 ? (
      <p>Aucune actualité disponible.</p>
    ) : (
      actualités.map((actu) => (
        <div key={actu.id} className="news-carde">
          <h3 className="newse-title">{actu.titre}</h3>
          <p className="newse-date">{formatDate(actu.date_insertion)}</p>
       
          {actu.media_image && (
            <img
              src={`http://localhost:5001/uploads/${actu.media_image}`}
              alt="Actualité"
              className="news-imagee"
            />
          )}
          {actu.media_video && (
            <video controls className="newse-video">
              <source
                src={`http://localhost:5001/uploads/${actu.media_video}`}
                type="video/mp4"
              />
              Votre navigateur ne supporte pas les vidéos HTML5.
            </video>
          )}
             <p className="newse-description">{actu.description}</p>
          <div className="newse-actions">
            <button
              onClick={() => handleUpdate(actu.id)}
              className="actione-button update-button"
            >
              Modifier
            </button>
            <button
              onClick={() => handleDelete(actu.id)}
              className="actione-button delete-button"
            >
              Supprimer
            </button>
          </div>
        </div>
      ))
    )}
  </div>
</div>

  );
};

export default Actualité;

