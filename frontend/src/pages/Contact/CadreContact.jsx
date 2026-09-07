import React, { useState } from 'react';
import axios from 'axios';
import { API_URL } from '../../config';
const CadreContact = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    confirmEmail: '',
    subject: '',
    message: '',
  });

  const [statusMessage, setStatusMessage] = useState('');
  const [error, setError] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation de base
    if (!formData.subject || !formData.message) {
      setError(true);
      setStatusMessage('L\'objet et le message sont requis.');
      return;
    }

    if (formData.email && formData.email !== formData.confirmEmail) {
      setError(true);
      setStatusMessage('Les emails ne correspondent pas.');
      return;
    }

    try {
      const response = await axios.post(`${API_URL}/api/contacts`, formData);

      if (response.status === 201) {
        setError(false);
        setStatusMessage('Votre message a été envoyé avec succès.');
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          confirmEmail: '',
          subject: '',
          message: '',
        });

        // Recharger les messages après l'envoi
        window.dispatchEvent(new Event('messageAdded'));  // Déclenchement de l'événement global
      }
    } catch (error) {
      setError(true);
      setStatusMessage('Une erreur est survenue lors de l’envoi du message.');
      console.error('Erreur:', error);
    }
  };


  return (
    <div className="forme-containere">
      <h1 className='formes'>Faites-nous part de votre doléance.</h1>
      <form onSubmit={handleSubmit}>
        
        {/* Champ Objet */}
        <div className="forme-groupe">
          <label className="labele" htmlFor="subject">Objet</label>
          <input
            type="text"
            name="subject"
            id="subject"
            value={formData.subject}
            onChange={handleChange}
            placeholder="Objet"
            className="input-field"
            required
          />
        </div>

        {/* Champ Message */}
        <div className="forme-groupe">
          <label className="labele" htmlFor="message">Message</label>
          <textarea
            name="message"
            id="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Votre message"
            className="input-field"
            required
          ></textarea>
        </div>
        {/* message */}
        {statusMessage && (
          <p style={{ color: error ? 'red' : 'green' }}>
            {statusMessage}
          </p>
        )}
        {/* Bouton Envoyer */}
        <div className="forme-group"e>
          <button type="submit" className="submite-buttone">Envoyer</button>
        </div>
      </form>

    </div>
  );
};

export default CadreContact;
