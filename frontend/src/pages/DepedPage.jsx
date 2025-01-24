import React from 'react';

import Header from '../components/header';
import Navbar from '../components/Navbar';
import depedImage from '../assets/madame.jpg'; // Remplacez par le chemin correct vers l'image
import '../styles/DepedPage.css';
import Footer from '../components/Footer';


const DepedPage = () => {
  return ( 
    <div className="page-container-deped">
      <Header />
      <Navbar />
     
      <div className="container-deped">

        {/* Section Image et Détails */}
        <div className="images-container-deped">
          {/* Image à gauche */}
          <img src={depedImage} alt="DEPED" className="image-frame-deped" />

          {/* Cadre de description à droite */}
          <div className="card-deped">
            <h2>Jean Claude</h2>
            <h3>ANDRIAMANANA</h3>
            <p>Directeur de l'Evaluation et de la Promotion de l'Ethique et de la Déontologie</p>
          </div>
        </div>

        {/* Section Description */}
        <div className="text-section-deped">
          <h1>Direction de l'Evaluation et de la Promotion de l'Ethique et de la Déontologie (DEPED)</h1>
          <div className="underline-deped"></div>

          <p>
            La Direction de l'Evaluation et de la Promotion de l'Ethique et de la Déontologie (DEPED) joue un rôle crucial au sein du Ministère du Travail, de l'Emploi et de la Fonction Publique. Elle se consacre à la promotion des valeurs éthiques et déontologiques dans la fonction publique.
          </p>

          <p>
            Sa mission principale est de renforcer l'intégrité, la transparence et la responsabilité dans l'administration publique à travers des mécanismes d'évaluation et des initiatives de sensibilisation.
          </p>

          <p>
            Les missions de la DEPED incluent :
          </p>
          <ul>
            <li>
              <i className="fas fa-star"></i> Élaborer et mettre en œuvre des politiques d'éthique et de déontologie.
            </li>
            <li>
              <i className="fas fa-star"></i> Former et sensibiliser les agents publics aux valeurs éthiques.
            </li>
            <li>
              <i className="fas fa-star"></i> Évaluer les pratiques administratives pour garantir le respect des normes déontologiques.
            </li>
            <li>
              <i className="fas fa-star"></i> Mettre en place des mécanismes de prévention et de lutte contre la corruption.
            </li>
            <li>
              <i className="fas fa-star"></i> Promouvoir une culture de responsabilité et de transparence dans la gestion publique.
            </li>
          </ul>

          <p>
            En travaillant en synergie avec d'autres directions, la DEPED aspire à instaurer une administration exemplaire qui inspire confiance et respect auprès des citoyens.
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default DepedPage;
