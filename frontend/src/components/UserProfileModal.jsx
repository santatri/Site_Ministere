import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import '../styles/UserProfileModal.css';

const UserProfileModal = ({ user, closeModal, onUpdateUser }) => {
  const [formData, setFormData] = useState({
    nom: user.nom || '',
    prenom: user.prenom || '',
    image: user.image || '',
  });
  const [previewImage, setPreviewImage] = useState(user.image ? `http://localhost:5001/uploads/${user.image}` : '');

  useEffect(() => {
    setFormData({
      nom: user.nom || '',
      prenom: user.prenom || '',
      image: user.image || '',
    });
  }, [user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreviewImage(URL.createObjectURL(file));
      setFormData({ ...formData, image: file });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('nom', formData.nom);
    data.append('prenom', formData.prenom);
    if (formData.image instanceof File) data.append('image', formData.image);

    try {
      const response = await axios.put(`http://localhost:5001/api/users1/update/${user.id}`, data, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      onUpdateUser(response.data.updatedUser);
      closeModal();
    } catch (error) {
      console.error("Erreur lors de la mise à jour :", error.response?.data || error.message);
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Modifier le Profil</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="image">Changer d'image</label>
            <input type="file" id="image" name="image" onChange={handleImageChange} />
            {previewImage && <img src={previewImage} alt="Avatar Preview" className="avatar-frame" />}
          </div>
          <div className="form-group">
            <label htmlFor="nom">Nom</label>
            <input type="text" id="nom" name="nom" value={formData.nom} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label htmlFor="prenom">Prénom</label>
            <input type="text" id="prenom" name="prenom" value={formData.prenom} onChange={handleChange} />
          </div>
          <button type="button" onClick={closeModal} className="cancel-btn">Annuler</button>
          <button type="submit">Enregistrer</button>
        </form>
      </div>
    </div>
  );
};

UserProfileModal.propTypes = {
  user: PropTypes.object.isRequired,
  closeModal: PropTypes.func.isRequired,
  onUpdateUser: PropTypes.func.isRequired,
};

export default UserProfileModal;
