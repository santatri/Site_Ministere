import React, { useState } from 'react';
import axios from 'axios';

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
      const response = await axios.post('http://localhost:5001/api/contacts', formData);

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
      <h1 className='formes'>Laissez-nous un message et vos coordonnées pour échanger ensemble</h1>
      <form onSubmit={handleSubmit}>
        
        {/* Champ Nom Complet (Prénom et Nom) */}
        <div className="forme-groupe">
          <div className="halfe-widthe">
            <label className="labele" htmlFor="firstName">Prénom</label>
            <input
              type="text"
              name="firstName"
              id="firstName"
              value={formData.firstName}
              onChange={handleChange}
              placeholder="Prénom"
              className="input-field"
             
            />
          </div>
          
          <div className="halfe-widthe">
            <label className="labele" htmlFor="lastName">Nom</label>
            <input
              type="text"
              name="lastName"
              id="lastName"
              value={formData.lastName}
              onChange={handleChange}
              placeholder="Nom"
              className="input-field"
              
            />
          </div>
        </div>

        {/* Champ Email et Confirmer Email */}
        <div className="forme-groupe">
          <div className="halfe-widthe">
            <label className="labele" htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              className="input-field"
             
            />
          </div>
          
          <div className="halfe-widthe">
            <label className="labele" htmlFor="confirmEmail">Confirmer Email</label>
            <input
              type="email"
              name="confirmEmail"
              id="confirmEmail"
              value={formData.confirmEmail}
              onChange={handleChange}
              placeholder="Confirmer Email"
              className="input-field"
              
            />
          </div>
        </div>
        <p  className='formes'>Juste pour les Anonymes <hr /></p>
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
