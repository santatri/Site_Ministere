import React, { useState, useEffect, useRef } from 'react'; // Ajoutez useRef
import axios from 'axios';
import '../styles/ÀLaUne.css';

const ALaUne = () => {
  const [formData, setFormData] = useState({
    titre: '',
    description: '',
    image: null,
  });

  const [elements, setElements] = useState([]);
  const [message, setMessage] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Créez une référence pour le formulaire
  const formRef = useRef(null);

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
      image: null,
    });
    setIsEditing(true);
    setCurrentId(id);

    // Faire défiler la page jusqu'au formulaire
    if (formRef.current) {
      formRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
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

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };
    return date.toLocaleDateString('fr-FR', options);
  };

  const filteredElements = elements.filter((element) =>
    element.titre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container">
      <h1 className='Gestion'>Gestion à la une</h1>
      <h2 className="titre">Insertion à la Une</h2>
      {message && <p className="message">{message}</p>}

      {/* Ajoutez la référence au formulaire */}
      <form onSubmit={handleSubmit} className="form" ref={formRef}>
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
        <button type="submit" className="submit-button">
          {isEditing ? 'Modifier' : 'Ajouter'}
        </button>
      </form>

      <h2 className="titra">Toutes les à la une</h2>
      <input
        type="text"
        className="searches-bare"
        placeholder="Rechercher une à la une..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <div className="elements-container">
        {filteredElements.length > 0 ? (
          filteredElements.map((element) => (
            <div key={element.id} className="element-card">
              <h3 className="element-title">{element.titre}</h3>
              <p className="element-description">{element.description}</p>
              {element.image && (
                <img
                  src={`http://localhost:5001/uploads/${element.image}`}
                  alt={element.titre}
                  className="element-image"
                />
              )}
              <div className="button-group">
                <button onClick={() => handleEdit(element.id)}>Modifier</button>
                <button onClick={() => handleDelete(element.id)}>Supprimer</button>
              </div>
            </div>
          ))
        ) : (
          <p className="no-elements">Aucune à la une</p>
        )}
      </div>
    </div>
  );
};

export default ALaUne;