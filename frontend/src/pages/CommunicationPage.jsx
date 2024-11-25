import React from 'react';
import LogoutButton from '../components/LogoutButton';
import '../styles/CommunicationPage.css';


const CommunicationPage = () => {
  return (
    <div>
      <h1>Page de Communication</h1>
      <p>Bienvenue sur la page dédiée à la communication.</p>
      <LogoutButton />
    </div>
  );
};

export default CommunicationPage;
