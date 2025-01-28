import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { BsChevronCompactLeft, BsChevronCompactRight } from 'react-icons/bs'; // Modern icons
import { useNavigate } from 'react-router-dom'; // Import pour la navigation
import '../styles/ImageCarousel.css';
import image1 from '../assets/i.jpg';
import image3 from '../assets/44.jpg';

// Données pour les slides
const slides = [
  {
    image: image1,
    title: 'Plateforme innovante pour la Direction Générale de la Fonction Publique',
    subtitle: 'Basés sur les normes et meilleures pratiques internationales',
    buttonText: 'Voir',
    link: '/', // Page d'accueil ou lien par défaut
  },
  {
    image: image3,
    title: 'Guide pour toutes les directions et services offerts',
    subtitle: 'Directives pour les démarches et procédures',
    buttonText: 'Voir le service',
    link: '/donne', // Navigation vers la page Donne
  },
];

const ImageCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate(); // Hook pour naviguer entre les pages

  // Changement automatique d'image toutes les 5 secondes
  useEffect(() => {
    const interval = setInterval(() => {
      goToNext();
    }, 5000); // 5 secondes
    return () => clearInterval(interval); // Nettoyage lors du démontage
  }, [currentIndex]);

  // Fonction pour aller à l'image précédente
  const goToPrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? slides.length - 1 : prevIndex - 1
    );
  };

  // Fonction pour aller à l'image suivante
  const goToNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === slides.length - 1 ? 0 : prevIndex + 1
    );
  };

  // Extraction des données pour l'image actuelle
  const { image, title, subtitle, buttonText, link } = slides[currentIndex];

  return (
    <div className="carousel-container">
      {/* Bouton précédent */}
      <button onClick={goToPrevious} className="carousel-button prev">
        <BsChevronCompactLeft size={15} />
      </button>

      {/* Slide actuel avec animation */}
      <motion.div
        key={currentIndex}
        className="carousel-slide"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 50 }}
        transition={{ duration: 0.8 }}
      >
        {/* Image de fond avec dégradé */}
        <div
          className="carousel-image"
          style={{
            backgroundImage: `linear-gradient(to bottom, rgba(5, 30, 60, 0.889), rgba(90, 10, 10, 0.2), rgba(5, 40, 80, 0.89)), url(${image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        ></div>

        {/* Contenu textuel */}
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
            onClick={() => navigate(link)} // Navigation vers la page cible
          >
            {buttonText}
          </motion.button>
        </div>
      </motion.div>

      {/* Bouton suivant */}
      <button onClick={goToNext} className="carousel-button next">
        <BsChevronCompactRight size={15} />
      </button>
    </div>
  );
};

export default ImageCarousel;
