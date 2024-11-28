import React, { useState, useEffect } from 'react';
// import axios from 'axios';
import { useAuth } from '../context/authContext';
import '../styles/StanPage.css';
import LogoutButton from '../components/LogoutButton';
 

const StanPage = () => {
  const { user } = useAuth();
  const [image, setImage] = useState('');

  useEffect(() => {
    if (user && user.image) {
      setImage(user.image);
    }
  }, [user]);

  return (
    <div className="stan-page">
      <h1>Bienvenue {user?.prenom} {user?.nom}</h1>
      {image && <img src={`http://localhost:5001/uploads/${image}`} alt="User" />}
      <p>Votre matricule : {user?.matricule}</p>

      <LogoutButton />
    </div>
  );
};

export default StanPage;
