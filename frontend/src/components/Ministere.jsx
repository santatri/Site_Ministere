import React, { useEffect } from 'react';
import './Ministere.css';

// Importation des images
import image1 from '../assets/image1.jpg';
import image2 from '../assets/image2.jpg';
import image3 from '../assets/image3.jpg';
import image4 from '../assets/image4.jpg';
import image5 from '../assets/image5.jpg';
import image6 from '../assets/image6.jpg';

const Ministere = () => {
  const cards = [
    {
      image: image1,
      title: 'Favoriser l\'Emploi pour Tous',
      description: 'Promouvoir l\'accès à l\'emploi avec des opportunités équitables pour tous.',
    },
    {
      image: image2,
      title: 'Formation pour l\'Avenir',
      description: 'Des programmes de formation adaptés aux besoins du marché.',
    },
    {
      image: image3,
      title: 'Protection et Droit des Travailleurs',
      description: 'Garantir des droits et des conditions de travail équitables.',
    },
    {
      image: image4,
      title: 'Soutenir les Entrepreneurs',
      description: 'Accompagner les startups et les initiatives locales.',
    },
    {
      image: image5,
      title: 'Égalité des Chances',
      description: 'Lutter contre les discriminations sur le marché du travail.',
    },
    {
      image: image6,
      title: 'Travail Durable',
      description: 'Encourager les emplois respectueux de l\'environnement.',
    },
  ];

  useEffect(() => {
    const carouselWrapper = document.querySelector('.carousel-wrapper');
    const items = document.querySelectorAll('.carousel-item');

    const observerOptions = {
      root: null,
      threshold: 0.5,  // Triger la transition lorsque l'élément est à 50% visible
    };

    const scrollEffect = (entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Application de la transition lors de l'intersection
          carouselWrapper.style.transition = 'transform 0.5s ease';
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
