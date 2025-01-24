import React from 'react';

import Header from '../components/header';
import Navbar from '../components/Navbar';
import dfpaeImage from '../assets/DFPAE.JPG'; // Remplacez par le chemin correct vers l'image
import '../styles/DfpaePage.css';
import Footer from '../components/Footer';
import ImagePropos from './Apropos/ImagePropos';

const DfpaePage = () => {
  return ( 
    <div className="page-container-drpae">
      <Header />
      <Navbar />
     
      <div className="container-drpae">

        {/* Section Image et Détails */}
        <div className="images-container-drpae">
          {/* Image à gauche */}
          <img src={dfpaeImage} alt="DFPAE" className="image-frame-drpae" />

          {/* Cadre de description à droite */}
          <div className="card-drpae">
            <h2>Jean Claude</h2>
            <h3>ANDRIAMANANA</h3>
            <p>Directeur de l'Évaluation et de la Promotion de l'Éthique et de la Déontologie</p>
          </div>
        </div>

        {/* Section Description */}
        <div className="text-section-drpae">
          <h1>Direction de l'Évaluation et de la Promotion de l'Éthique et de la Déontologie (DFPAE)</h1>
          <div className="underline-drpae"></div>

          <p>
            La Direction de l'Évaluation et de la Promotion de l'Éthique et de la Déontologie (DFPAE) est un organe central au sein du Ministère du Travail, de l'Emploi et de la Fonction Publique. 
            Sa vocation première est de promouvoir une culture éthique et déontologique dans l'administration publique afin d'assurer une gouvernance transparente, intègre et orientée vers le service des citoyens.
          </p>

          <p>
            La DFPAE se distingue par son rôle d'évaluation continue des pratiques administratives et des réformes en matière d'éthique. Elle s'attache à identifier les défis liés à l'intégrité, au professionnalisme et à la transparence dans la fonction publique, tout en proposant des solutions concrètes pour y remédier.
          </p>

          <p>
            Parmi ses objectifs, la DFPAE vise à renforcer la sensibilisation des agents publics aux valeurs éthiques, à développer des mécanismes de suivi et d'évaluation des pratiques déontologiques, et à instaurer des normes élevées en matière de conduite administrative. 
            Elle œuvre également à l'élaboration de politiques innovantes pour prévenir et lutter contre les comportements non conformes aux principes éthiques.
          </p>

          <p>
            Grâce à sa collaboration étroite avec les autres directions du ministère et ses partenaires internationaux, la DFPAE contribue à la modernisation de l'administration publique en mettant en avant l'importance de l'éthique et de la déontologie comme piliers fondamentaux de la bonne gouvernance.
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default DfpaePage;
