import React from 'react';

import MinistereImage from '../../assets/dgfop.png'; // Assurez-vous que le chemin correspond

const Propos = () => {
  return (
    <section className="propos-section">
      <div className="propos-container">
        {/* Image à gauche */}
        <div className="propos-image">
          <img src={MinistereImage} alt="Ministère du Travail" />
        </div>

        {/* Texte à droite */}
        <div className="propos-text">
          <h2>Notre Mission</h2>
          <p>
            Direction Génerale de la Fonction Publique
          </p>
          <p>
            Sa mission principale est de garantir des conditions de travail équitables et de promouvoir l'employabilité, tout en veillant à la gestion efficace des ressources humaines au sein de la fonction publique. Nous œuvrons pour le développement d'une société inclusive où chacun peut accéder à un emploi décent et durable.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Propos;
