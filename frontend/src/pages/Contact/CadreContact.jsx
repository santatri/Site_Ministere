import React, { useState } from 'react';


const CadreContact = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    confirmEmail: '',
    subject: '',
    message: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData); // Logique pour envoyer les données du formulaire
  };

  return (
    <div className="forme-containere">
      <h1>Laissez-nous un message et vos coordonnées pour échanger ensemble</h1>
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
              required
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
              required
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
              required
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
              required
            />
          </div>
        </div>

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

        {/* Bouton Envoyer */}
        <div className="forme-group"e>
          <button type="submit" className="submite-buttone">Envoyer</button>
        </div>
      </form>
    </div>
  );
};

export default CadreContact;
