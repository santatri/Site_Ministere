import React from 'react';

import Header from '../components/header';
import Navbar from '../components/Navbar';
import drfpImage from '../assets/madame.jpg'; // Remplacez par le chemin correct vers l'image
import '../styles/DrfpPage.css';
import Footer from '../components/Footer';

const DrfpPage = () => {
  return (
    <div className="page-container-drfp">
      <Header />
      <Navbar />

      <div className="container-drfp">

        {/* Section Image et Détails */}
        <div className="images-container-drfp">
          {/* Image à gauche */}
          <img src={drfpImage} alt="DRFP" className="image-frame-drfp" />

          {/* Cadre de description à droite */}
          <div className="card-drfp">
            <h2>Jean Claude</h2>
            <h3>ANDRIAMANANA</h3>
            <p>Directeur de la Réforme de la Fonction Publique</p>
          </div>
        </div>

        {/* Section Description */}
        <div className="text-section-drfp">
          <h1>Direction de la Réforme de la Fonction Publique (DRFP)</h1>
          <div className="underline-drfp"></div>

          <p>
            La Direction de la Réforme de la Fonction Publique (DRFP) joue un rôle central dans la modernisation et l'optimisation de la fonction publique. Sa mission principale est d'assurer une gestion efficace, équitable et transparente des ressources humaines dans l'administration publique.
          </p>

          <p>Les missions de la DRFP incluent :</p>
          <ul>
            <li>
              <i className="fas fa-star"></i> Élaborer et mettre en œuvre des politiques et stratégies de réforme administrative.
            </li>
            <li>
              <i className="fas fa-star"></i> Promouvoir l'efficacité et la performance dans la gestion des ressources humaines de l'État.
            </li>
            <li>
              <i className="fas fa-star"></i> Réviser les cadres juridiques et réglementaires pour les adapter aux besoins actuels.
            </li>
            <li>
              <i className="fas fa-star"></i> Accompagner les administrations dans l'implémentation des réformes structurelles.
            </li>
            <li>
              <i className="fas fa-star"></i> Sensibiliser et former les agents publics aux nouvelles réformes.
            </li>
          </ul>

          <p>
            En collaborant avec d'autres directions et partenaires, la DRFP s'efforce de garantir une administration publique compétente, innovante et centrée sur les citoyens.
          </p>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default DrfpPage;
