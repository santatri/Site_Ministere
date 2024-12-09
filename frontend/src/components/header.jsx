import React, { useEffect, useState } from 'react';
import '../styles/Header.css';
import logo from '../assets/MTEFOP.png'; // Importation du logo depuis le dossier assets
import rppImage from '../assets/Rpp.png'; // Importation de l'image rpp.png
import { FaPhone, FaEnvelope, FaCloudSun } from 'react-icons/fa'; // Importation des icônes

const Header = () => {
  const [weather, setWeather] = useState('');

  useEffect(() => {
    // Appel API pour récupérer la météo actuelle de Madagascar
    const fetchWeather = async () => {
      try {
        const response = await fetch('https://api.weatherapi.com/v1/current.json?key=YOUR_API_KEY&q=Madagascar'); // Remplacez YOUR_API_KEY par votre clé API
        const data = await response.json();
        setWeather(data.current.condition.text);
      } catch (error) {
        console.error('Erreur lors de la récupération de la météo:', error);
      }
    };

    fetchWeather();
  }, []);

  return (
    <header className="header">
      {/* Logo à gauche */}
      <div className="header-left">
      <img src={rppImage} alt="RPP" className="header-image-small" />
      
      </div>

      {/* Contenu au centre */}
      <div className="header-center">
      <img src={logo} alt="Logo du ministère" className="header-logo" />
      </div>
      

      {/* Informations de contact à droite avec icones */}
      <div className="header-right">
        <p>Contact rapide :</p>
        <FaPhone className="header-icon" /> +261 0345599717 | 
        <FaEnvelope className="header-icon" /> mtefop@gmail.com 
        
      </div>
    </header>
  );
};

export default Header;
