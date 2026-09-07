import React, { useState, useEffect } from "react";
import axios from "axios";

import Header from '../components/header';
import Navbar from '../components/Navbar';
import '../styles/DgfopPage.css';
import Footer from '../components/Footer';
import { API_URL } from "../config";

const  DepedPage = () => {
  
    const [dData, setdData] = useState([]); // Stockage des données récupérées
    const [loading, setLoading] = useState(false); // Gestion du chargement
  
    // Récupérer les données depuis le backend
    const fetchdData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${API_URL}/api/d/DEPED`);
        setdData(response.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des données :", error);
      } finally {
        setLoading(false);
      }
    };
  
    // Charger les données au montage du composant
    useEffect(() => {
      fetchdData();
    }, []);
    
  return ( 
    <div className="page-container">
      {/* <Header />
      <Navbar /> */}
      {loading ? (
        <p>Chargement des données...</p>
      ) : ( <div> {dData.map((d) => (
            <div className="containeres" key={d.id}>
              <div className="images-containeres">
                {d.image_url && (
                  <img
                    src={`${API_URL}${d.image_url}`}
                    alt="dFOP" className="image-framees"
                  />
                )}
                {/* Cadre de description à droite */}
        	    <div className="cardes">
                      <h2>{d.first_name}</h2>
                      <h3> {d.last_name}</h3>
                      <p>{d.post}</p>
		    </div>
              </div>
	      {/* Section Description */}
	      <div className="text-section">
                  <h1>{d.d_name}</h1>
		  <div className="underline"></div>
                       <p> {d.description_1}</p>
                        <ul>
                        {d.list_1.map((item, index) => (
                          <li key={index}> <i className="fas fa-check"></i>{item}</li>
                        ))}
                      </ul>
                      {d.description_2 && (
                        <p>{d.description_2}</p>
                      )}
                      {d.list_2.length > 0 && (
                      
                     
                      <ul>
                        {d.list_2.map((item, index) => (
                          <li key={index}> <i className="fas fa-check-circle"></i>{item}</li>
                        ))}
                      </ul>
                       )}
                      {d.description_3 && (
                        <p>{d.description_3}</p>
                      )}
                      {d.list_3.length > 0 && (
                      
                     
                      <ul>
                        {d.list_3.map((item, index) => (
                          <li key={index}> <i className="fas fa-check"></i>{item}</li>
                        ))}
                      </ul>
                       )}
                </div>
              </div>
           
          ))}
          </div>
      )}
      {/* <Footer/>  */}
      </div>
      
  );
};

export default DepedPage;
