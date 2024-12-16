import React, { useEffect, useState } from "react";
import { motion } from "framer-motion"; // Import Framer Motion
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/Home.css";
import ImageCarousel from "../components/ImageCarousel";
import "../styles/ImageCarousel.css";
import WelcomePage from "../components/WelcomePage";
import "../styles/WelcomePage.css";
import Table from "../components/Table";
import Ministere from "../components/Ministere"
import "../styles/Ministere.css";
import ServicesSection from "../components/ServicesSection";
import "../styles/ServiceSection.css";
const Home = () => {
  const [actualites, setActualites] = useState([]);
  const [filter, setFilter] = useState("Tout");
  const [message, setMessage] = useState("");
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
    };
    return date.toLocaleDateString("fr-FR", options);
  };

  const fetchActualites = async (searchTerm = "") => {
    try {
      const response = await axios.get("http://localhost:5001/api/actu/all", {
        params: { mots: searchTerm, limit: 6 },
      });
      setActualites(response.data.data);
    } catch (error) {
      setMessage("Erreur lors du chargement des actualités.");
    }
  };

  useEffect(() => {
    fetchActualites();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchActualites(search);
  };

  const filteredArticles =
    filter === "Tout"
      ? actualites
      : actualites.filter((article) => article.category === filter);

  return (
    <div className="layout-container">
      <ImageCarousel />
      <WelcomePage />
      <div className="actualites-container" style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
        <div style={{ width: '70%' }}>
          <h1 className="actualites-title">Actualités</h1>
          {message && <p className="error-message">{message}</p>}
          
          <div className="actualites-grid">
            {filteredArticles.length === 0 ? (
              <p>Aucune actualité disponible.</p>
            ) : (
              filteredArticles.map((article, index) => (
                <motion.div
                  key={index}
                  className="article-card"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  viewport={{ once: false, amount: 0.2 }}
                >
                  <h2 className="article-title">{article.titre}</h2>
                  <p className="article-date">Publié le : {formatDate(article.date_insertion)}</p>
                  <div className="article-media">
                    {article.media_image && (
                      <img
                        src={`http://localhost:5001/uploads/${article.media_image}`}
                        alt="Actualité"
                        className="article-image"
                      />
                    )}
                    {article.media_video && (
                      <video controls className="article-video">
                        <source
                          src={`http://localhost:5001/uploads/${article.media_video}`}
                          type="video/mp4"
                        />
                        Votre navigateur ne supporte pas les vidéos HTML5.
                      </video>
                    )}
                  </div>
                  <p className="article-description">{article.description}</p>
                  <div className="read-more-container">
                    <button
                      className="read-more"
                      onClick={() => navigate("/archives")}
                    >
                      Voir plus
                    </button>
                  </div>
                </motion.div>
              ))
            )}
          </div>
        </div>

        <div style={{ width: '30%' }}>
          <h1 className="annonces-title">Annonces</h1>
          {/* Contenu des annonces */}
          <div className="annonce-card">
            <h2 className="annonce-title">Titre de l'annonce</h2>
            <p className="annonce-description">Description de l'annonce.</p>
          </div>
        </div>
      </div>
     
      <Table />
      
      <ServicesSection/>
      <Ministere/>
    </div>
  );
};

export default Home;
