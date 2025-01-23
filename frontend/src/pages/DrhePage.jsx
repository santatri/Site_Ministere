import React from 'react';

import Header from '../components/header';
import Navbar from '../components/Navbar';
import drheImage from '../assets/madame.jpg'; // Remplacez par le chemin correct vers l'image
import '../styles/DrhePage.css';
import Footer from '../components/Footer';

const DrhePage = () => {
  return (
    <div className="page-container-drhe">
      <Header />
      <Navbar />

      <div className="container-drhe">

        {/* Section Image et Détails */}
        <div className="images-container-drhe">
          {/* Image à gauche */}
          <img src={drheImage} alt="DRHE" className="image-frame-drhe" />

          {/* Cadre de description à droite */}
          <div className="card-drhe">
            <h2>Jean Claude</h2>
            <h3>ANDRIAMANANA</h3>
            <p>Directeur des Ressources Humaines de l'État</p>
          </div>
        </div>

        {/* Section Description */}
        <div className="text-section-drhe">
          <h1>Direction des Ressources Humaines de l'État (DRHE)</h1>
          <div className="underline-drhe"></div>

          <p>
            La Direction des Ressources Humaines de l'État (DRHE) est un organe stratégique du Ministère du Travail, de l'Emploi et de la Fonction Publique. Elle est chargée de la gestion et du développement des ressources humaines au sein de l'administration publique.
          </p>

          <p>
            Sa mission principale est d'assurer une gestion efficace, équitable et transparente des ressources humaines, tout en veillant au respect des principes d'éthique et de déontologie.
          </p>

          <p>
            Les missions de la DRHE incluent :
          </p>
          <ul>
            <li>
              <i className="fas fa-star"></i> Élaborer des politiques et des stratégies de gestion des ressources humaines.
            </li>
            <li>
              <i className="fas fa-star"></i> Superviser les recrutements et les nominations dans la fonction publique.
            </li>
            <li>
              <i className="fas fa-star"></i> Mettre en œuvre des plans de formation pour le développement des compétences des agents publics.
            </li>
            <li>
              <i className="fas fa-star"></i> Garantir la gestion équitable des carrières et des promotions.
            </li>
            <li>
              <i className="fas fa-star"></i> Assurer le suivi et l'évaluation des performances des agents publics.
            </li>
          </ul>

          <p>
            Grâce à ses actions, la DRHE contribue à renforcer l'efficacité et la performance des institutions publiques, tout en créant un environnement de travail favorable pour les agents de l'État.
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default DrhePage;
