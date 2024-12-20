import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom'; // Utilisez useNavigate à la place de useHistory
import '../styles/archives.css';

import '../styles/ImageActu.css';

const Archives = () => {
  const [actualités, setActualités] = useState([]);
  const [message, setMessage] = useState('');
  const [search, setSearch] = useState({ mots: '', dateStart: '', dateEnd: '' });
  const [anciennesActualites, setAnciennesActualites] = useState([]);
  const [activeActu, setActiveActu] = useState(null); // L'ID de l'actualité cliquée
  const [currentActu, setCurrentActu] = useState(null); // Contenu actuel en fonction de la sélection
  const [detailsView, setDetailsView] = useState(false); // Pour déterminer si le contenu actuel est affiché en vue de détails

  const navigate = useNavigate(); // Hook for navigation

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' };
    return date.toLocaleDateString('fr-FR', options);
  };

  const fetchActualités = async (filters = {}) => {
    try {
      const response = await axios.get('http://localhost:5001/api/actu/all', { params: filters });
      setActualités(response.data.data);
    } catch (error) {
      setMessage('Erreur lors du chargement des actualités.');
    }
  };

  const fetchAnciennesActualites = async () => {
    try {
      const response = await axios.get('http://localhost:5001/api/actu/old');
      setAnciennesActualites(response.data.data);
    } catch (error) {
      setMessage('Erreur lors du chargement des actualités anciennes.');
    }
  };

  useEffect(() => {
    fetchActualités();
    fetchAnciennesActualites();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchActualités(search);
  };

  const isToday = (dateString) => {
    const date = new Date(dateString);
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  const handleTitleClick = (actu) => {
    navigate(`/actualite/${actu.id}`);
    console.log(`Navigation vers l'actualité avec l'ID : ${actu.id}`);

  };

  // Animation des sections avec Framer Motion
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 1.5 } }
  };

  const listVariants = {
    hidden: { x: '-20vw' },
    visible: { x: 0, transition: { type: 'spring', stiffness: 200 } }
  };

  return (
    <motion.div className="archives-container" variants={containerVariants} initial="hidden" animate="visible">
      <div className="image-actu-container">
        <div className="overla">
          <h1>Actualités</h1>
        </div>
      </div>

      <form className="search-form" onSubmit={handleSearch}>
        <div className="searches-fieldses">
          <input
            type="text"
            placeholder="Rechercher par mots-clés"
            value={search.mots}
            onChange={(e) => setSearch({ ...search, mots: e.target.value })}
          />
          <input
            type="date"
            value={search.dateStart}
            onChange={(e) => setSearch({ ...search, dateStart: e.target.value })}
          />
          <input
            type="date"
            value={search.dateEnd}
            onChange={(e) => setSearch({ ...search, dateEnd: e.target.value })}
          />
        </div>
      </form>

      <h2 className='chap'>Actualités Récents</h2>
      <motion.div className="actualités-container" variants={listVariants}>
        {actualités
          .filter((actu) => isToday(actu.date_insertion)) // Filtrer par date aujourd'hui
          .slice(0, 3) // Limiter à 3 éléments
          .map((actu) => (
            <motion.div
              key={actu.id}
              className={`actualité-card ${activeActu === actu.id ? 'active' : ''}`}
              whileHover={{ scale: 1.05 }} // Effet d'agrandissement lors du survol
              onClick={() => handleTitleClick(actu)} // Fonction appelée lors du clic
            >
              <div className="actualité-card-inner">
                {actu.media_image && (
                  <img
                    src={`http://localhost:5001/uploads/${actu.media_image}`}
                    alt="Actualité"
                    className="actualité-image"
                  />
                )}
                <div className="actualité-details">
                  <p className="date-publication">{formatDate(actu.date_insertion)}</p>
                  <h2 className="actualité-title">{actu.titre}</h2>
                </div>
              </div>
            </motion.div>
          ))}
        {actualités.filter((actu) => isToday(actu.date_insertion)).length === 0 && (
          <p>Aucune actualité pour aujourd'hui.</p>
        )}
      </motion.div>

      <h2 className='chap'>Actualités anciens</h2>
      <motion.div className="actualités-container" variants={listVariants}>
        {anciennesActualites.length === 0 ? (
          <p>Aucune actualité ancienne disponible.</p>
        ) : (
          anciennesActualites.map((actu) => (
            <motion.div
              key={actu.id}
              className="actualité-card"
              whileHover={{ scale: 1.05 }} // Effet d'agrandissement lors du survol
            >
              <h2 className="actualité-title">{actu.titre}</h2>
              <p className="date-publication">{formatDate(actu.date_insertion)}</p>
              <div className="card-content">
                {actu.media_image && (
                  <img
                    src={`http://localhost:5001/uploads/${actu.media_image}`}
                    alt="Actualité"
                    className="actualité-image"
                  />
                )}
                {actu.media_video && (
                  <video controls className="actualité-video">
                    <source
                      src={`http://localhost:5001/uploads/${actu.media_video}`}
                      type="video/mp4"
                    />
                    Votre navigateur ne supporte pas les vidéos HTML5.
                  </video>
                )}
                <div className="details">
                  <p className="actualité-description">{actu.description}</p>
                </div>
              </div>
            </motion.div>
          ))
        )}
      </motion.div>
    </motion.div>
  );
}

export default Archives;
