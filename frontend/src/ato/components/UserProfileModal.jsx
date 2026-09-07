import React, { useState } from 'react';
import PropTypes from 'prop-types';
import '../styles/UserProfileModal.css';

const UserProfileModal = ({ user, closeModal }) => {
  const [formData, setFormData] = useState({
    nom: user.nom || '',
    prenom: user.prenom || '',
    image: user.image || '' // Assume it's a URL or file path
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Assuming a function uploadImage exists to handle image uploading
      uploadImage(file).then(imageUrl => {
        setFormData({
          ...formData,
          image: imageUrl
        });
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the updated user data to your API or context
    console.log('Updated user data:', formData);
    closeModal();
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Modifier le Profil</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="image">Changer d'image</label>
            <input type="file" id="image" name="image" onChange={handleImageChange} />
            {formData.image && <img src={`http://localhost:5001/uploads/${formData.image}`} alt="Avatar Preview" className="avatar-frame" />}
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

const uploadImage = async (file) => {
  // Logic to handle image upload and return the image URL
  // For example, you might use FormData to send the file to a backend endpoint
  // For now, just a placeholder
  return `path-to-uploaded-image/${file.name}`; // Adjust according to your API's response
};

UserProfileModal.propTypes = {
  user: PropTypes.object.isRequired,
  closeModal: PropTypes.func.isRequired
};

export default UserProfileModal;
