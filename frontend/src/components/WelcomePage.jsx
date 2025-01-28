import React, { useEffect, useRef, useState } from 'react';
import '../styles/WelcomePage.css';
import axios from 'axios';

const WelcomePage = () => {
  const [dgData, setDgData] = useState([]); // Stockage des données récupérées
  const [loading, setLoading] = useState(true); // Gestion du chargement

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

  const imageBoxRef = useRef(null);

  useEffect(() => {
    const imageBox = imageBoxRef.current;

    if (!imageBox) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            imageBox.classList.add('animate');
          } else {
            imageBox.classList.remove('animate');
          }
        });
      },

      { threshold: 0 } // Détecte lorsque 50% de l'élément est visible

    );

    observer.observe(imageBox);

    return () => {
      observer.disconnect();
    };
  }, []);

  if (loading) {
    return <div>Chargement en cours...</div>;
  }

  if (!dgData || dgData.length === 0) {
    return <div>Aucune donnée disponible</div>;
  }

  return (
    <div className="welcome-page">

      {dgData.map((dg) => (
        <div className="pages" key={dg.id}>
          <div className="image-box" ref={imageBoxRef}>
            <h1 className="badge">Directeur Général</h1>
            <img
              src={`http://localhost:5001${dg.image_url}`} // Utilisation de l'URL de l'image depuis l'API
              alt="Logo Madagascar"
              className="logo" // Utilisez la même classe que dans la deuxième version
            />
          </div>

          <div className="text-pages">
            <h1>
              Bienvenue sur la plateforme innovante <samp>{dg.dg_name}</samp>
            </h1>
            <p>
              La Présidence s’est engagée à créer une administration de proximité,
              à l’écoute de la population et de ses besoins, et à améliorer la
              qualité de vie des citoyens et de faciliter le travail des
              entreprises.
            </p>
            <h2 className='nom'>Monsieur <samp>{dg.first_name}</samp> <samp>{dg.last_name}</samp></h2>
            <p>
              <i>
                <samp>{dg.post}</samp>, Administrateur civil
              </i>
            </p>
          </div>

        </div>
      ))}
    </div>
  );
};

export default WelcomePage;