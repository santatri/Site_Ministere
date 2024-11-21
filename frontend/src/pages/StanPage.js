import React from 'react';
import LogoutButton from '../components/LogoutButton';
import '../styles/StanPage.css';


const StanPage = () => {
  return (
    <div>
      <h1>Page de Stan</h1>
      <p>Bienvenue sur la page dédiée à Stan.</p>
      <LogoutButton />
    </div>
  );
};

export default StanPage;
