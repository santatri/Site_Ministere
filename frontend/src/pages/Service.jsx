import React from 'react';
import '../styles/Service.css';
import Donne  from'../components/donne';


const Service = () => {
  return (
    <div className="service-container">
      <h1 className="service-heading">Nos Services</h1>
      <div>
            <Donne/>
           </div>
      <footer className="service-footer">
        <p>© 2024 Nos Services - Tous droits réservés</p>
      </footer>


    </div>
  );
};

export default Service;
