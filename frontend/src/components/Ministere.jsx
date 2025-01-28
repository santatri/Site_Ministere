import React, { useEffect, useState } from 'react';
import axios from "axios";
import "./Ministere.css";

const Ministere = () => {
  const [dData, setdData] = useState([]); // Stocker les données récupérées
  const [loading, setLoading] = useState(false); // Indicateur de chargement

  // Fonction pour récupérer les données
  const fetchdData = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:5001/api/d"); // URL de l'API
      setdData(response.data); // Stocker les données dans dData
    } catch (error) {
      console.error("Erreur lors de la récupération des données :", error);
    } finally {
      setLoading(false);
    }
  };

  // Charger les données lors du montage du composant
  useEffect(() => {
    fetchdData();
  }, []);

  return (
    <div className="ministere-container">
      <h1 className="ministere-title">Direction Général de la Fonction Publique</h1>
      
      {loading ? (
        <p>Chargement des données...</p> // Indicateur de chargement
      ) : (
        <div className="grid-container">
          {dData.map((d, index) => ( // Parcourir les données dynamiques
            <div className="grid-item" key={d.id || index}>
              {d.logo_url && (
                <img
                  src={`http://localhost:5001${d.logo_url }`}
                  alt="Image de la Direction"
                  className="dform-item-image"
                />
              )}
              <h2>{d.d_name}</h2>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Ministere;