import React, { useState, useEffect } from "react";
import axios from "axios";

import Header from '../components/header';
import Navbar from '../components/Navbar';
import '../styles/DgfopPage.css';
import Footer from '../components/Footer';


const DgfopPage = () => {
  
    const [dgData, setDgData] = useState([]); // Stockage des données récupérées
    const [loading, setLoading] = useState(false); // Gestion du chargement
  
    // Récupérer les données depuis le backend
    const fetchDGData = async () => {
      setLoading(true);
      try {
        const response = await axios.get("http://localhost:5001/api/dg");
        setDgData(response.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des données :", error);
      } finally {
        setLoading(false);
      }
    };
  
    // Charger les données au montage du composant
    useEffect(() => {
      fetchDGData();
    }, []);
    
  return ( 
    <div className="page-container">
      <Header />
      <Navbar />
      {loading ? (
        <p>Chargement des données...</p>
      ) : ( <div> {dgData.map((dg) => (
            <div className="containeres" key={dg.id}>
              <div className="images-containeres">
                {dg.image_url && (
                  <img
                    src={`http://localhost:5001${dg.image_url}`}
                    alt="DGFOP" className="image-framees"
                  />
                )}
                {/* Cadre de description à droite */}
        	    <div className="cardes">
                      <h2>{dg.first_name}</h2>
                      <h3> {dg.last_name}</h3>
                      <p>{dg.post}</p>
		    </div>
              </div>
	      {/* Section Description */}
	      <div className="text-section">
                  <h1>{dg.dg_name}</h1>
		  <div className="underline"></div>
                       <p> {dg.description_1}</p>
                        <ul>
                        {dg.list_1.map((item, index) => (
                          <li key={index}> <i className="fas fa-check-circle"></i>{item}</li>
                        ))}
                      </ul>
                      {dg.description_2 && (
                        <p>{dg.description_2}</p>
                      )}
                      {dg.list_2.length > 0 && (
                      
                     
                      <ul>
                        {dg.list_2.map((item, index) => (
                          <li key={index}> <i className="fas fa-check-circle"></i>{item}</li>
                        ))}
                      </ul>
                       )}
                      {dg.description_3 && (
                        <p>{dg.description_3}</p>
                      )}
                      {dg.list_3.length > 0 && (
                      
                     
                      <ul>
                        {dg.list_3.map((item, index) => (
                          <li key={index}> <i className="fas fa-check-circle"></i>{item}</li>
                        ))}
                      </ul>
                       )}
                </div>
              </div>
           
          ))}
          </div>
      )}
      <Footer/> </div>
      
  );
};

export default DgfopPage;
