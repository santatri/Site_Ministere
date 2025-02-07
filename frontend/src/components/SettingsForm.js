import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "../styles/Settings.css";

const SettingsForm = () => {
  const [settings, setSettings] = useState({ email: '', address: '', logo: '' });
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');  // État pour les messages de succès ou d'erreur

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await axios.get('http://localhost:5001/api/set');
        setSettings(response.data);
      } catch (err) {
        console.error('Erreur lors de la récupération des paramètres :', err);
      }
    };

    fetchSettings();
  }, []);

  const handleChange = (e) => {
    setSettings({ ...settings, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('email', settings.email);
    formData.append('address', settings.address);
    if (file) formData.append('logo', file);

    try {
      await axios.post('http://localhost:5001/api/settings', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setMessage('Mise à jour réussie !');  // Message de succès
    } catch (error) {
      console.error('Erreur lors de la mise à jour:', error);
      setMessage('Erreur lors de la mise à jour.');  // Message d'erreur
    }
  };

  return (
    <div>
      <h2>Modifier les paramètres</h2>
      <form onSubmit={handleSubmit}>
        
        <div>
          <label>Email:</label>
          <input type="email" name="email" value={settings.email} onChange={handleChange} required />
        </div>
        <div>
          <label>Adresse:</label>
          <input type="text" name="address" value={settings.address} onChange={handleChange} required />
        </div>
        <div>
          <label>Logo:</label>
          <input type="file" onChange={handleFileChange} />
        </div>
        {settings.logo && (
          <div>
            <img src={`http://localhost:5001/uploads/${settings.logo}`} alt="Logo actuel" width="100" />
          </div>
        )}
        {message && <div style={{ color: message.includes('Erreur') ? 'red' : 'green' }}>{message}</div>} {/* Affichage du message */}

        <button type="submit">Mettre à jour</button>
      </form>
    </div>
  );
};

export default SettingsForm;
