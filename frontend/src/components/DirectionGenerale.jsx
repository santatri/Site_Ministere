import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

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

  // Reference to the form section
  const formRef = useRef(null);

  const fetchSecretaireGeneraux = async () => {
    try {
      const response = await axios.get('http://localhost:5001/api/secretaire_general/all');
      setSecretaireGeneraux(response.data.data);
    } catch (error) {
      setMessage('Erreur lors du chargement des secrétaires généraux.');
    }
  };
  useEffect(() => {
    fetchSecretaireGeneraux();
  }, []);

  const fetchElements = async () => {
    try {
      const response = await axios.get('http://localhost:5001/api/direction_generale/all');
      setElements(response.data.data);
    } catch (error) {
      setMessage('Erreur lors du chargement des éléments.');
    }
  };

  useEffect(() => {
    fetchSecretaireGeneraux();
    fetchElements();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { ...formData };
    try {
      const url = isEditing
        ? `http://localhost:5001/api/direction_generale/${currentId}`
        : 'http://localhost:5001/api/direction_generale/insertion';
      const method = isEditing ? 'put' : 'post';
      const response = await axios[method](url, data);
      setMessage(response.data.message);
      fetchElements();
      setFormData({ id_sg: '', nom_dg: '', porte_dg: '' });
      setIsEditing(false);
      setCurrentId(null);
      if (formRef.current) {
        formRef.current.scrollIntoView({ behavior: 'smooth' }); // Scroll to form after submission
      }
    } catch (error) {
      setMessage('Erreur lors de la soumission.');
    }
  };

  const handleEdit = (id) => {
    const element = elements.find((el) => el.id_dg === id);
    setFormData({
      id_sg: element.id_sg,
      nom_dg: element.nom_dg,
      porte_dg: element.porte_dg,
    });
    setIsEditing(true);
    setCurrentId(id);
    if (formRef.current) {
      formRef.current.scrollIntoView({ behavior: 'smooth' }); // Scroll to form when editing
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:5001/api/direction_generale/${id}`);
      setMessage(response.data.message);
      fetchElements();
    } catch (error) {
      setMessage('Erreur lors de la suppression.');
    }
  };

  return (
    <div>
      <h1>Direction Générale</h1>
      {message && <p>{message}</p>}

      {/* Form section */}
      <div ref={formRef}>
        <form onSubmit={handleSubmit}>
          <select
            name="id_sg"
            value={formData.id_sg}
            onChange={handleChange}
            required
          >
            <option value="">Sélectionnez un Secrétaire Général</option>
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

      {/* List section */}
      <div>
        <h2>Directions Générales</h2>
        <table border="1">
          <thead>
            <tr>
              <th>Nom</th>
              <th>Porte</th>
              <th>Secrétaire Général</th>
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
    </div>
  );
};

export default DirectionGenerale;
