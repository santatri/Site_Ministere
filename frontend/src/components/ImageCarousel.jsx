import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { BsChevronCompactLeft, BsChevronCompactRight } from 'react-icons/bs'; // Icônes modernes
import '../styles/ImageCarousel.css';
import image1 from '../assets/black5.jpg';
import image2 from '../assets/110.jpg';
import image3 from '../assets/44.jpg';

const slides = [
  {
    image: image1,
    title: 'Plateforme innovante pour le ministère',
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
    buttonText: 'Voir le site web',
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
        <BsChevronCompactLeft size={30} />
      </button>

      {/* Contenu animé */}
      <motion.div
        key={currentIndex}
        className="carousel-slide"
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 100 }}
        transition={{ duration: 1 }}
      >
        {/* Image de fond */}
        <div
          className="carousel-image"
          style={{ backgroundImage: `url(${image})` }}
        ></div>

        {/* Texte */}
        <div className="text-container">
          <motion.h1
            className="slide-title"
            initial={{ x: -200, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 1 }}
          >
            {title}
          </motion.h1>
          <motion.p
            className="slide-subtitle"
            initial={{ x: -200, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
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
        <BsChevronCompactRight size={30} />
      </button>
    </div>
  );
};

export default ImageCarousel;
