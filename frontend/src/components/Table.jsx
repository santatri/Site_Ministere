import React, { useState, useEffect } from "react";
import { FaBuilding, FaServicestack } from "react-icons/fa";
import "../styles/Table.css";

const Table = () => {
  const [currentIndex, setCurrentIndex] = useState(0); // Alterner entre les données
  const [counter, setCounter] = useState(0); // Compteur incrémental

  // Données à alterner
  const data = [
    {
      icon: <FaBuilding size={50} color="white" />, // Icône pour Directions
      title: "Directions",
      description:
        "Le nombre total de directions actives dans la Direction Générale. Ces directions supervisent les différentes branches de l'organisation pour assurer un fonctionnement efficace.",
      maxCount: 63, // Nombre total
    },
    {
      icon: <FaServicestack size={50} color="white" />, // Icône pour Services
      title: "Services fournis",
      description:
        "Le nombre total de services disponibles pour répondre aux besoins des clients et partenaires. Ces services englobent la gestion des projets, les consultations et le support technique.",
      maxCount: 28, // Nombre total
    },
  ];

  useEffect(() => {
    // Alterner entre les données après que l'incrémentation soit terminée
    if (counter === data[currentIndex].maxCount) {
      const changeInterval = setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % data.length); // Passer au suivant
        setCounter(0); // Réinitialiser le compteur
      }, 2000); // Temps d'attente avant de changer

      return () => clearTimeout(changeInterval);
    }
  }, [counter, currentIndex, data]);

  useEffect(() => {
    // Lancer l'incrémentation
    if (counter < data[currentIndex].maxCount) {
      const incrementInterval = setInterval(() => {
        setCounter((prevCounter) => prevCounter + 1);
      }, 2000 / data[currentIndex].maxCount); // Vitesse ajustée au nombre maximum

      return () => clearInterval(incrementInterval);
    }
  }, [counter, data, currentIndex]);

  return (
    <div className="table-containere">
      <h1 className="table-title">Indicateurs et performances</h1>
      <p className="table-subtitle">*Édition de décembre 2024</p>
      <div className="table-content">
        {/* Colonne gauche */}
        <div className="left-column">
          <div className="icone">{data[currentIndex].icon}</div>
          <h2>
            +{counter} <span className="name">{data[currentIndex].title}</span>
          </h2>
        </div>

        {/* Colonne droite */}
        <div className="rights-columns">
          <h3 className="description-title">{data[currentIndex].title}</h3>
          <p>{data[currentIndex].description}</p>
        </div>
      </div>
    </div>
  );
};

export default Table;
