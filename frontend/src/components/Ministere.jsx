import React, { useEffect, useState } from 'react';
import './Ministere.css';

// Importation des images
import image1 from '../assets/61.jpg';
import image2 from '../assets/51.jpg';
import image3 from '../assets/52.jpg';
import image4 from '../assets/53.jpg';

const Ministere = () => {
  const [visibleItems, setVisibleItems] = useState([]);

  const cards = [
    {
      image: image1,
      title: 'Direction des Ressources Humaines de l\' Etat (DRHE)',
      description: 'Promouvoir l\'accès à l\'emploi avec des opportunités équitables pour tous.',
    },
    {
      image: image2,
      title: 'Direction de la Formation et du Perfectionnement des Agents de l\'Etat(DFPAE) ',
      description: 'Des programmes de formation adaptés aux besoins du marché.',
    },
    {
      image: image3,
      title: 'Direction de l\'evaluation et de la Promotion de l\'Ethique et de la Déontologie (DEPED)',
      description: 'Garantir des droits et des conditions de travail équitables.',
    },
    {
      image: image4,
      title: 'Direction de la Réforme de la Fonction Publique (DRFP)',
      description: 'Accompagner les startups et les initiatives locales.',
    },
  ];

  useEffect(() => {
    const items = document.querySelectorAll('.carousel-item');

    const observerOptions = {
      root: null,
      threshold: 1, // Déclenche l'animation quand 50% de l'élément est visible
    };

    const scrollEffect = (entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Ajouter la classe visible à l'élément pour déclencher l'animation
          entry.target.classList.add('visible');
        } else {
          // Retirer la classe visible quand l'élément sort de la vue
          entry.target.classList.remove('visible');
        }
      });
    };

    const observer = new IntersectionObserver(scrollEffect, observerOptions);

    items.forEach(item => observer.observe(item));

    return () => {
      observer.disconnect(); // Déconnexion de l'observateur lors du démontage
    };
  }, []);

  return (
    <div className="ministere-container">
      <h1 className="ministere-title">Direction Général de la Fonction Publique</h1>
      <div className="carousel">
        {cards.map((card, index) => (
          <div className="carousel-item" key={index}>
            <img src={card.image} alt={card.title} className="carousel-item-image" />
            <div className="carousel-item-content">
              <h2 className="carousel-item-title">{card.title}</h2>
      
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Ministere;
