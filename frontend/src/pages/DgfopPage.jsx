import React from 'react';

import Header from '../components/header';
import Navbar from '../components/Navbar';
import dgfopImage from '../assets/DG1.jpg'; // Remplacez par le chemin correct vers l'image
import '../styles/DgfopPage.css';
import Footer from '../components/Footer';

const DgfopPage = () => {
  return ( 
    <div className="page-container">
      <Header />
      <Navbar />
    <div className="containeres">
      
      {/* Section Image et Détails */}
      <div className="images-containeres">
        {/* Image à gauche */}
        <img src={dgfopImage} alt="DGFOP" className="image-framees" />
        
        {/* Cadre de description à droite */}
        <div className="cardes">
          <h2>Heridja Patrick</h2>
          <h3>RAMAROSON</h3>
          <p>Directeur Général de la Fonction Publique</p>
        </div>
      </div>

      {/* Section Description */}
      <div className="text-section">
      <h1>Direction Générale de la Fonction Publique (DGFOP)</h1>
        <div className="underline"></div>
        
          <p>
           La DGFOP est un entité au sein du Ministère du Travail, de l'Emploi et de la Fonction Publique.
          </p>
          <p>
           Elle est chargée principalement de :.
          </p>
          <ul>
          <li>
            <i className="fas fa-check-circle"></i>
           Faire connaitre et veiller au respect de la réglementation en  matière de fonction publique de l'Etat
          </li>
          <li>
            <i className="fas fa-check-circle"></i>
            Appliquer la politique générale de l'Etat en matière de fonction publique
          </li>
        </ul>
        
          <p>
          La DGFOP se comporte de 4 directions :
          </p>
        <ul>
          <li>
            <i className="fas fa-check-circle"></i>
            La Direction des Ressources Humaines de l'Etat(DRHE)
          </li>
          <li>
            <i className="fas fa-check-circle"></i>
             La Direction de l'Evaluation et de la Promotion de l'Ethique et de la Déontologie(DEPED)
          </li>
          <li>
            <i className="fas fa-check-circle"></i>
             La Direction de la Formation et du Perfectionnement des Agents de l'Etat(DFPAE)
          </li> <li>
            <i className="fas fa-check-circle"></i>
             La Direction de la Réforme de la Fonction Publique (DRFP)
          </li>
        </ul>
      </div>
      </div>
      <Footer/> </div>
      
  );
};

export default DgfopPage;
