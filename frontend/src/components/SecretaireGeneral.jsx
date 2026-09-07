import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import '../styles/SecretaireGenerale.css';
import { API_URL } from '../config';
const SecretaireGeneral = () => {
  const [formData, setFormData] = useState({
    nom_sg: '',
    porte_sg: '',
  });

  const [elements, setElements] = useState([]);
  const [message, setMessage] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [activeTab, setActiveTab] = useState('list'); // Par défaut, on affiche la liste.

  const formRef = useRef(null);

  // Récupération des données depuis l'API.
  const fetchElements = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/secretaire_general/all`);
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
        ? `${API_URL}/api/secretaire_general/${currentId}`
        : '${API_URL}/api/secretaire_general/insertion';
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
    setActiveTab('form'); // Change directement l'onglet actif vers le formulaire.
    if (formRef.current) {
      formRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleDelete = async (id_sg) => {
    try {
      const response = await axios.delete(`${API_URL}/api/secretaire_general/${id_sg}`);
      setMessage(response.data.message);
      fetchElements();
    } catch (error) {
      setMessage('Erreur lors de la suppression.');
    }
  };

  return (
    <div className="secretaire-generale-container">
      <h1 className="secretaire-generale-title">Les hautes hiérarchies</h1>
      {message && <p className="secretaire-generale-message">{message}</p>}

      {/* Onglets de navigation */}
      <div className="secretaire-generale-tab-container">
        <div
          className={`secretaire-generale-tab ${activeTab === 'list' ? 'active' : ''}`}
          onClick={() => setActiveTab('list')}
        >
          Liste des hiérarchies
        </div>
        <div
          className={`secretaire-generale-tab ${activeTab === 'form' ? 'active' : ''}`}
          onClick={() => setActiveTab('form')}
        >
          Ajouter
        </div>
      </div>

      {/* Affichage conditionnel basé sur l'onglet actif */}
      {activeTab === 'list' && (
        <div className="secretaire-generale-tab-content">
          <h2 className="secretaire-generale-subtitle">Liste des hiérarchies</h2>
          <table className="secretaire-generale-table">
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
                    <button
                      className="secretaire-generale-button secretaire-generale-button-edit"
                      onClick={() => handleEdit(element.id_sg)}
                    >
                      Modifier
                    </button>
                    <button
                      className="secretaire-generale-button secretaire-generale-button-delete"
                      onClick={() => handleDelete(element.id_sg)}
                    >
                      Supprimer
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {activeTab === 'form' && (
        <div className="secretaire-generale-tab-content">
          <form
            className="secretaire-generale-form"
            ref={formRef}
            onSubmit={handleSubmit}
          >
            <input
              className="secretaire-generale-input"
              type="text"
              name="nom_sg"
              placeholder="Nom"
              value={formData.nom_sg}
              onChange={handleChange}
              required
            />
            <input
              className="secretaire-generale-input"
              type="text"
              name="porte_sg"
              placeholder="Porte"
              value={formData.porte_sg}
              onChange={handleChange}
              required
            />
            <button
              className="secretaire-generale-button secretaire-generale-button-submit"
              type="submit"
            >
              {isEditing ? 'Modifier' : 'Ajouter'}
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default SecretaireGeneral;
