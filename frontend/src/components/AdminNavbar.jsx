import React, { useState } from 'react';
import { FaSun, FaMoon, FaUserEdit } from 'react-icons/fa';
import { useAuth } from '../context/authContext';
import '../styles/AdminNavbar.css'; // Fichier CSS associé

import UserProfileModal from './UserProfileModal'; // Import the modal component

const Avatar = ({ src }) => {
  return src ? (
    <img src={`http://localhost:5001/uploads/${src}`} alt="Avatar" className="avatar-frame" />
  ) : null;
};

const AdminNavbar = ({ toggleTheme, isDarkMode }) => {
  const { user, updateUserProfile } = useAuth(); // Assuming this function exists in your auth context
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleUpdateUserProfile = async (updatedData) => {
    // Assuming a function in your context to handle user profile update
    await updateUserProfile(updatedData);
    closeModal();
  };

  return (
    <div className="admin-navbar">
      <div className="navbar-content">
        {/* Partie gauche */}
        <div className="navbar-left">
          <p className="navbar-title">Direction Génerale de la Fonction Publique</p>
        </div>

        {/* Partie droite */}
        <div className="navbar-right">
          <div className="user-info" onClick={openModal}>
            <div className="avatar-container">
              <Avatar src={user?.image} />
            </div>
            <p className="user-name">
              {user?.prenom} {user?.nom || 'Admin'}
            </p>
          </div>
        </div>
      </div>

      {/* Modal for profile modification */}
      {isModalOpen && (
        <UserProfileModal user={user} closeModal={closeModal} onUpdate={handleUpdateUserProfile} />
      )}
    </div>
  );
};

export default AdminNavbar;
