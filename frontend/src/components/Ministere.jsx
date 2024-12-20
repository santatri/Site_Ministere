import React, { useEffect } from 'react';
import './Ministere.css';

// Importation des images
import image1 from '../assets/25.jpg';
import image2 from '../assets/22.jpg';
import image3 from '../assets/23.jpg';
import image4 from '../assets/24.jpg';
import image5 from '../assets/41.jpg';
import image6 from '../assets/40.jpg';

const Ministere = () => {
  const cards = [
    {
      image: image1,
      title: 'Direction des Ressources Humaines de l\' Etat (DRHE)',
      description: 'Promouvoir l\'accès à l\'emploi avec des opportunités équitables pour tous.',
    },
    {
      image: image2,
      title: 'Direction de la Formation et du Perfectionnement des Agents (DEPED)',
      description: 'Des programmes de formation adaptés aux besoins du marché.',
    },
    {
      image: image3,
      title: 'Direction de l\'evaluation et de la Promotion de l\'Ethique et de la Déontologie (DFPAE)',
      description: 'Garantir des droits et des conditions de travail équitables.',
    },
    {
      image: image4,
      title: 'Direction de la Réforme de la Fonction Publique (DRFP)',
      description: 'Accompagner les startups et les initiatives locales.',
    },
   
  ];

  useEffect(() => {
    const carouselWrapper = document.querySelector('.carousel-wrapper');
    const items = document.querySelectorAll('.carousel-item');

    const observerOptions = {
      root: null,
      threshold: 0,  // Triger la transition lorsque l'élément est à 50% visible
    };

    const scrollEffect = (entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Application de la transition lors de l'intersection
          carouselWrapper.style.transition = 'transform 0s ease';
        } else {
          // Désactivation de la transition lorsqu'il sort de la vue
          carouselWrapper.style.transition = 'transform 0s ease';
        }
      });
    };

    const observer = new IntersectionObserver(scrollEffect, observerOptions);

    items.forEach(item => observer.observe(item));
  }, []);

  return (
    <div className="ministere-container">
      <h1 className="ministere-title">DGFOP</h1>
      <div className="carousel">
        <div className="carousel-wrapper">
          {cards.map((card, index) => (
            <div className="carousel-item" key={index}>
              <img src={card.image} alt={card.title} className="carousel-item-image" />
              <div className="carousel-item-content">
                <h2 className="carousel-item-title">{card.title}</h2>
                <p className="carousel-item-description">{card.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Ministere;
