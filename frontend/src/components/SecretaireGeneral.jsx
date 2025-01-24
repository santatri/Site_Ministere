import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import '../styles/SecretaireGenerale.css'; // Assurez-vous que les styles ci-dessus sont dans ce fichier

const SecretaireGeneral = () => {
  const [formData, setFormData] = useState({
    nom_sg: '',
    porte_sg: '',
  });

  const [elements, setElements] = useState([]);
  const [message, setMessage] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [activeTab, setActiveTab] = useState('list'); // Onglet actif

  const formRef = useRef(null);

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
      setFormData({ nom_sg: '', porte_sg: '' });
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
    });
    setIsEditing(true);
    setCurrentId(id_sg);
    if (formRef.current) {
      formRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
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
      <h1>Les hautes hiérarchies</h1>
      {message && <p>{message}</p>}

      <div className="tab-container">
        <div
          className={`tab ${activeTab === 'list' ? 'active' : ''}`}
          onClick={() => setActiveTab('list')}
        >
          Liste des hiérarchies
        </div>
        <div
          className={`tab ${activeTab === 'form' ? 'active' : ''}`}
          onClick={() => setActiveTab('form')}
        >
          Ajouter / Modifier
        </div>
      </div>

      <div className={`tab-content ${activeTab === 'list' ? 'active' : ''}`}>
        <h2>Liste des hiérarchies</h2>
        <table>
          <thead>
            <tr>
              <th>Nom</th>
              <th>Porte</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {elements.map((element) => (
              <tr key={element.id_sg}>
                <td>{element.nom_sg}</td>
                <td>{element.porte_sg}</td>
                <td>
                  <button onClick={() => handleEdit(element.id_sg)}>Modifier</button>
                  <button onClick={() => handleDelete(element.id_sg)}>Supprimer</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className={`tab-content ${activeTab === 'form' ? 'active' : ''}`}>
        <form ref={formRef} onSubmit={handleSubmit}>
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
      </div>
    </div>
  );
};

export default SecretaireGeneral;
