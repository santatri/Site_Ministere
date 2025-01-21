import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/archives.css';
import '../styles/ImageActu.css';
import { FaCalendarAlt } from 'react-icons/fa';

const Archives = () => {
  const [actualités, setActualités] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(6);

  const fetchActualités = async () => {
    try {
      const response = await axios.get('http://localhost:5001/api/actu/all');
      setActualités(response.data.data);
    } catch (error) {
      console.error('Erreur lors du chargement des actualités.');
    }
  };

  useEffect(() => {
    fetchActualités();
  }, []);

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = actualités.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(actualités.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="image-actu-container">
      <div className="overla">
        <h1>Actualités</h1>
      </div>

      <div className="archives-containeres">
        {/* Actualités récentes */}
        <h2>Actualités récentes</h2>
        <div className="top-archives">
          {currentItems.slice(0, 2).map((actu) => (
            <div key={actu.id} className="archive-card highlighted">
              <p className="archive-date">
                <FaCalendarAlt /> {new Date(actu.date_insertion).toLocaleDateString('fr-FR')}
              </p>
              <h3 className="archive-title">{actu.titre}</h3>
              {actu.media_image && (
                <img
                  src={`http://localhost:5001/uploads/${actu.media_image}`}
                  alt="Actualité"
                  className="highlighted-image"
                />
              )}
               <p className="archive-description">{actu.description}</p>
            </div>
          ))}
        </div>

        {/* Actualités anciennes */}
        <h2>Actualités anciennes</h2>
        <div className="archives-grid">
          {currentItems.slice(0).map((actu) => (
            <div key={actu.id} className="archive-card">
              <p className="archive-date">
                <FaCalendarAlt /> {new Date(actu.date_insertion).toLocaleDateString('fr-FR')}
              </p>
              <h3 className="archive-title">{actu.titre}</h3>
             
              {actu.media_image && (
                <img
                  src={`http://localhost:5001/uploads/${actu.media_image}`}
                  alt="Actualité"
                  className="small-image"
                />
                
              )}
               <p className="archive-description">{actu.description}</p>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="pagination"> 
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i + 1}
              className={`page-number ${currentPage === i + 1 ? 'active' : ''}`}
              onClick={() => handlePageChange(i + 1)}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Archives;
