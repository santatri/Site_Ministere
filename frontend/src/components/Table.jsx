import React, { useState, useEffect } from "react";
import { FaBuilding, FaServicestack } from "react-icons/fa";
import axios from "axios";
import "../styles/Table.css";
import { API_URL } from "../config";
const Table = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [counter, setCounter] = useState(0);
  const [serviceCount, setServiceCount] = useState(0);
  const [directionCount, setDirectionCount] = useState(0);

  const [data, setData] = useState([]);

  // Récupérer le nombre de services depuis l'API
  const fetchServiceCount = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/serviceOffert/count`);
      console.log("Service count from API:", response.data.total); // Vérifiez la valeur reçue
      setServiceCount(response.data.total);
    } catch (error) {
      console.error("Erreur lors de la récupération du nombre de services :", error);
    }
  };
  const fetchDirectionCount = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/direction/count`);
      console.log("Direction count from API:", response.data.total); // Vérifiez la valeur reçue
      setDirectionCount(response.data.total);
    } catch (error) {
      console.error("Erreur lors de la récupération du nombre de direction :", error);
    }
  };

  useEffect(() => {
   
    fetchDirectionCount()
    fetchServiceCount();
  }, []);

  // Re-créer le tableau data lorsque serviceCount change
  useEffect(() => {
    if (serviceCount !== null &&  directionCount !== null ) { // S'assurer que serviceCount est bien défini
      const newData = [
        {
          icon: <FaBuilding size={50} color="white" />,
          title: "Directions",
          description:
            "Le nombre total de directions actives dans la Direction Générale. Ces directions supervisent les différentes branches de l'organisation pour assurer un fonctionnement efficace.",
          maxCount: directionCount || 0,
        },
        {
          icon: <FaServicestack size={50} color="white" />,
          title: "Services fournis",
          description:
            "Le nombre total de services disponibles pour répondre aux besoins des clients et partenaires. Ces services englobent la gestion des projets, les consultations et le support technique.",
          maxCount: serviceCount || 0, // Ajout de || 0 pour éviter les erreurs
        },
      ];
      setData(newData);
    }
  }, [serviceCount, directionCount]);
  
  // Logique pour alterner entre les données
  useEffect(() => {
    if (counter === data[currentIndex]?.maxCount) {
      const changeInterval = setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % data.length);
        setCounter(0);
      }, 2000);

      return () => clearTimeout(changeInterval);
    }
  }, [counter, currentIndex, data]);

  // Logique pour incrémenter le compteur
  useEffect(() => {
    if (counter < data[currentIndex]?.maxCount) {
      const incrementInterval = setInterval(() => {
        setCounter((prevCounter) => prevCounter + 1);
      }, 2000 / data[currentIndex].maxCount);

      return () => clearInterval(incrementInterval);
    }
  }, [counter, data, currentIndex]);

  return (
    <div className="table-containere">
      <h1 className="table-title">Indicateurs et performances</h1>
      <p className="table-subtitle">*Édition de décembre 2024</p>
      <div className="table-content">
        <div className="left-column">
          <div className="icone">{data[currentIndex]?.icon}</div>
          <h2>
            +{counter} <span className="name">{data[currentIndex]?.title}</span>
          </h2>
        </div>
        <div className="rights-columns">
          <h3 className="description-title">{data[currentIndex]?.title}</h3>
          <p>{data[currentIndex]?.description}</p>
        </div>
      </div>
    </div>
  );
};

export default Table;