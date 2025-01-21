import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { BsChevronCompactLeft, BsChevronCompactRight } from 'react-icons/bs'; // Modern icons
import '../styles/ImageCarousel.css';
import image1 from '../assets/q.jpg';
import image2 from '../assets/100.jpg';
import image3 from '../assets/44.jpg';

const slides = [
  {
    image: image1,
    title: 'Plateforme innovante pour la Direction Génerale de la Fonction Publique',
    subtitle: 'Basés sur les normes et meilleures pratiques internationales',
    buttonText: 'Voir',
  },
  {
    image: image2,
    title: 'Vision pour la transformation numérique',
    subtitle: 'Rejoignez-nous',
    buttonText: 'Détails',
  },
  {
    image: image3,
    title: 'Guide pour toutes les directions et services offerts',
    subtitle: 'Directives pour les démarches et procédures',
    buttonText: 'Voir le service',
  },
];

const ImageCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Change image automatically every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      goToNext();
    }, 5000); // 5 seconds
    return () => clearInterval(interval); // Cleanup on unmount
  }, [currentIndex]);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? slides.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === slides.length - 1 ? 0 : prevIndex + 1
    );
  };

  const { image, title, subtitle, buttonText } = slides[currentIndex];

  return (
    <div className="carousel-container">
      {/* Nouveau bouton précédent avec icône moderne */}
      <button onClick={goToPrevious} className="carousel-button prev">
        <BsChevronCompactLeft size={15} />
      </button>

      {/* Contenu animé */}
      <motion.div
        key={currentIndex}
        className="carousel-slide"
        initial={{ opacity: 0, x: -0 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 100 }}
        transition={{ duration: 2 }}
      >
        {/* Image de fond avec dégradé linéaire */}
        <div
          className="carousel-image"
          style={{
            backgroundImage: `linear-gradient(to bottom, rgb(00, 0, 200,.98) , rgb(10, 10,20,0.1),rgba(00,10,900, 0.55)), url(${image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: '0.99',
          }}
        >
          
        </div>

        {/* Texte */}
        <div className="text-container">
          <motion.h1
            className="slide-title"
            initial={{ opacity: 0, x: -200 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
          >
            {title}
          </motion.h1>
          <motion.p
            className="slide-subtitle"
            initial={{ opacity: 0, x: -200 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
          >
            {subtitle}
          </motion.p>
          <motion.button
            className="slide-button"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            transition={{ duration: 0.3 }}
          >
            {buttonText}
          </motion.button>
        </div>
      </motion.div>

      {/* Nouveau bouton suivant avec icône moderne */}
      <button onClick={goToNext} className="carousel-button next">
        <BsChevronCompactRight size={15} />
      </button>
    </div>
  );
};

export default ImageCarousel;
