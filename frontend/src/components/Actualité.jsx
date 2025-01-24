import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import '../styles/Actualité.css';

const Actualité = () => {
  const input = useRef(null);
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
  const [expandedDescriptionId, setExpandedDescriptionId] = useState(null); // New state for controlling full description visibility

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
      fetchActualités();
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
      fetchActualités();
    } catch (error) {
      setMessage('Erreur lors de la suppression.');
    }
  };

  const handleUpdate = (id) => {
    input.current.focus();
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
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };
    return date.toLocaleDateString('fr-FR', options);
  };

  return (
    <div className="actualites-containeres">
      <h2>Gestion des Actualités</h2>

   

      <div className="forms-sectiones">
        <h2>{isEditing ? 'Modifier l\'actualité' : 'Insertion d\'actualité'}</h2>
        <form onSubmit={handleSubmit}>
          <input className='tri'
            ref={input}
            type="text"
            name="titre"
            placeholder="Titre"
            onChange={handleChange}
            value={formData.titre}
            required
          />
          <textarea className='tra'
            name="description"
            placeholder="Description"
            onChange={handleChange}
            value={formData.description}
            required
          />
          <label className='texte-image'>Image :</label>
          <input  type="file" name="media_image" accept="image/*" onChange={handleFileChange} />
          <label className='texte-video'>Vidéo :</label>
          <input className='textevideo' type="file" name="media_video" accept="video/*" onChange={handleFileChange} />
          <button className='butto' type="submit">{isEditing ? 'Mettre à jour' : 'Soumettre'}</button>
        </form>
      </div>

      {/* Section des actualités */}
      <div className="news-sectiones">
        <h1>Toutes les actualités</h1>
           {/* Barre de recherche */}
      <form onSubmit={handleSearch} className="filters-bar">
        <input
          type="text"
          placeholder="Rechercher..."
          value={search.mots}
          onChange={(e) => setSearch({ ...search, mots: e.target.value })}
        />
        <input
          type="date"
          value={search.dateStart}
          onChange={(e) => setSearch({ ...search, dateStart: e.target.value })}
        />
        <input
          type="date"
          value={search.dateEnd}
          onChange={(e) => setSearch({ ...search, dateEnd: e.target.value })}
        />
      
      </form>
        {actualités.length === 0 ? (
          <p>Aucune actualité disponible.</p>
        ) : (
          <div className="news-grides">
            {actualités.map((actu) => (
              <div key={actu.id} className="news-cardes">
                <h3>{actu.titre}</h3>
                <p>{formatDate(actu.date_insertion)}</p>
                {actu.media_image && <img src={`http://localhost:5001/uploads/${actu.media_image}`} alt="Actualité" />}
                {actu.media_video && (
                  <video controls>
                    <source src={`http://localhost:5001/uploads/${actu.media_video}`} type="video/mp4" />
                    Votre navigateur ne supporte pas les vidéos HTML5.
                  </video>
                )}
                <p className={`description ${expandedDescriptionId === actu.id ? 'expanded' : ''}`}>
                  {actu.description}
                </p>
                <button onClick={() => setExpandedDescriptionId(expandedDescriptionId === actu.id ? null : actu.id)}>
                  {expandedDescriptionId === actu.id ? 'Voir moins' : 'Voir plus'}
                </button>
                <div>
                  <button  onClick={() => handleUpdate(actu.id)}>Modifier</button>
                  <button  onClick={() => handleDelete(actu.id)}>Supprimer</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Actualité;
