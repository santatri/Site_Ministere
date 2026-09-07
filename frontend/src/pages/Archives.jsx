import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/archives.css';
import '../styles/ImageActu.css';
import { FaCalendarAlt } from 'react-icons/fa';
import { API_URL } from '../config';
const Archives = () => {
  const [actualités, setActualités] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(6);
  const [search, setSearch] = useState({ mots: '', dateStart: '', dateEnd: '' });

  const fetchActualités = async (filters = {}) => {
    try {
      const response = await axios.get(`${API_URL}/api/actu/all`, {
        params: filters,
      });
      setActualités(response.data.data);
    } catch (error) {
      console.error('Erreur lors du chargement des actualités.');
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchActualités(search);
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
    window.scrollTo(0, 0);
  };

  const renderPageNumbers = () => {
    const visiblePages = 5; // Number of visible pages
    let startPage = Math.max(1, currentPage - Math.floor(visiblePages / 2));
    let endPage = Math.min(totalPages, startPage + visiblePages - 1);

    if (endPage - startPage + 1 < visiblePages) {
      startPage = Math.max(1, endPage - visiblePages + 1);
    }

    const pages = [];
    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <button
          key={i}
          className={`page-number ${currentPage === i ? 'active' : ''}`}
          onClick={() => handlePageChange(i)}
        >
          {i}
        </button>
      );
    }

    return pages;
  };

  return (
    <div className="image-actu-container">
      <div className="overla">
        <h1>Actualités</h1>
      </div>

      <div className="archives-containeres">
        {/* Barre de recherche */}
        <form className="search-bar-container" onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Rechercher des mots-clés..."
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
          <button type="submit">Rechercher</button>
        </form>

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
                  src={`${API_URL}/uploads/${actu.media_image}`}
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
          {currentItems.map((actu) => (
            <div key={actu.id} className="archive-card">
              <p className="archive-date">
                <FaCalendarAlt /> {new Date(actu.date_insertion).toLocaleDateString('fr-FR')}
              </p>
              <h3 className="archive-title">{actu.titre}</h3>
              {actu.media_image && (
                <img
                  src={`${API_URL}/uploads/${actu.media_image}`}
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
          <button
            className="page-number"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Précédent
          </button>
          {renderPageNumbers()}
          <button
            className="page-number"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Suivant
          </button>
        </div>
      </div>
    </div>
  );
};

export default Archives;
