import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import '../styles/DirectionGenerale.css';
import { API_URL } from '../config';
const DirectionGenerale = () => {
  const [formData, setFormData] = useState({
    id_sg: '', // L'ID du Secrétaire Général sélectionné
    nom_dg: '',
    porte_dg: '',
  });
  const [secretaireGeneraux, setSecretaireGeneraux] = useState([]); // Liste des secrétaires généraux
  const [elements, setElements] = useState([]); // Liste des directions générales
  const [message, setMessage] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [currentView, setCurrentView] = useState('list'); // Ajout d'un état pour déterminer quelle vue afficher

  // Référence pour le formulaire
  const formRef = useRef(null);

  // Fonction pour récupérer la liste des secrétaires généraux
  const fetchSecretaireGeneraux = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/secretaire_general/all`);
      setSecretaireGeneraux(response.data.data);
    } catch (error) {
      setMessage('Erreur lors du chargement des secrétaires généraux.');
    }
  };

  // Utilisation de useEffect pour charger les données
  useEffect(() => {
    fetchSecretaireGeneraux();
    fetchElements();
  }, []);

  // Fonction pour récupérer la liste des directions générales
  const fetchElements = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/direction_generale/all`);
      setElements(response.data.data);
    } catch (error) {
      setMessage('Erreur lors du chargement des éléments.');
    }
  };

  // Fonction pour gérer les changements dans le formulaire
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Fonction pour soumettre le formulaire (ajouter/modifier)
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { ...formData };
    try {
      const url = isEditing
        ? `${API_URL}/api/direction_generale/${currentId}`
        : `${API_URL}/api/direction_generale/insertion`;
      const method = isEditing ? 'put' : 'post';
      const response = await axios[method](url, data);
      setMessage(response.data.message);
      fetchElements();
      setFormData({ id_sg: '', nom_dg: '', porte_dg: '' });
      setIsEditing(false);
      setCurrentId(null);
      setCurrentView('list'); // Revenir à la vue liste après soumission
      if (formRef.current) {
        formRef.current.scrollIntoView({ behavior: 'smooth' }); // Scroll to form after submission
      }
    } catch (error) {
      setMessage('Erreur lors de la soumission.');
    }
  };

  // Fonction pour activer le mode édition
  const handleEdit = (id) => {
    const element = elements.find((el) => el.id_dg === id);
    setFormData({
      id_sg: element.id_sg,
      nom_dg: element.nom_dg,
      porte_dg: element.porte_dg,
    });
    setIsEditing(true);
    setCurrentId(id);
    setCurrentView('form'); // Passer à la vue formulaire lors de la modification
    if (formRef.current) {
      formRef.current.scrollIntoView({ behavior: 'smooth' }); // Scroll to form when editing
    }
  };

  // Fonction pour supprimer un élément
  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`${API_URL}/api/direction_generale/${id}`);
      setMessage(response.data.message);
      fetchElements();
    } catch (error) {
      setMessage('Erreur lors de la suppression.');
    }
  };

  return (
    <div className="direction-generale">
      <h1>Direction Générale</h1>
      {message && <p>{message}</p>}

      {/* Boutons de navigation */}
      <div className="toggle-buttons">
        <button className="toggle-button"onClick={() => setCurrentView('form')}>Ajout Direction Générale</button>
        <button className="toggle-button"onClick={() => setCurrentView('list')}>Liste Direction Générale</button>
      </div>

      {/* Formulaire d'ajout/modification */}
      {currentView === 'form' && (
        <div ref={formRef} className="direction-generale-form">
          <form onSubmit={handleSubmit}>
            <select
              name="id_sg"
              value={formData.id_sg}
              onChange={handleChange}
              required
            >
              <option value="">Sélectionnez une de premiere Hierarchie</option>
              {secretaireGeneraux.map((sg) => (
                <option key={sg.id_sg} value={sg.id_sg}>
                  {sg.nom_sg}
                </option>
              ))}
            </select>

            <input
              type="text"
              name="nom_dg"
              placeholder="Nom Direction Générale"
              value={formData.nom_dg}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="porte_dg"
              placeholder="Porte Direction Générale"
              value={formData.porte_dg}
              onChange={handleChange}
              required
            />
            <button type="submit">{isEditing ? 'Modifier' : 'Ajouter'}</button>
          </form>
        </div>
      )}

      {/* Liste des directions générales */}
      {currentView === 'list' && (
        <div className="direction-generale-list">
          <h2> Liste Directions Générales</h2>
          <table border="1">
            <thead>
              <tr>
                <th>Nom</th>
                <th>Porte</th>
                <th>Premiere Hierarchie</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {elements.map((element) => (
                <tr key={element.id_dg}>
                  <td>{element.nom_dg}</td>
                  <td>{element.porte_dg}</td>
                  <td>{element.nom_sg}</td> {/* Affichage du nom du secrétaire général */}
                  <td>
                    <button onClick={() => handleEdit(element.id_dg)}>Modifier</button>
                    <button onClick={() => handleDelete(element.id_dg)}>Supprimer</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default DirectionGenerale;
