import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/Footer.css";

const Footer = () => {
  const [logos, setLogos] = useState({ logo: "", logoDG: "" });
  const currentYear = new Date().getFullYear();

  useEffect(() => {
    const fetchLogos = async () => {
      try {
        const response = await axios.get("http://localhost:5001/api/set");
        setLogos({
          logo: response.data.logo,
          logoDG: response.data.logoDG,
        });
      } catch (error) {
        console.error("Erreur lors du chargement des logos :", error);
      }
    };

    fetchLogos();
  }, []);

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section logos">
        {logos.logoDG && (
            <img
              src={`http://localhost:5001/uploads/${logos.logoDG}`}
              alt="Logo 2"
              className="footer-logo"
            />
          )}
          {logos.logo && (
            <img
              src={`http://localhost:5001/uploads/${logos.logo}`}
              alt="Logo 1"
              className="footer-logo"
            />
          )}
          
        </div>
        <div className="footer-section">
          <h3>Contact</h3>
          <p>67Ha, Bâtiment D1</p>
          <p>Antananarivo, Madagascar</p>
          <p>dgofp@.gov.mg</p>
        </div>
        <div className="footer-section">
          <h3>Liens utiles</h3>
          <ul>
            <li><a href="https://www.presidence.gov.mg">Présidence de la République de Madagascar</a></li>
            <li><a href="http://mtefpls.gov.mg/author/mtefpls/">Ministère du Travail de l'Emploi et de la Fonction Publique</a></li>
            <li><a href="https://www.primature.gov.mg">Primature de Madagascar</a></li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© Direction Générale de la Fonction Publique - Madagascar, {currentYear} | Développé par Toky et Santatra</p>
      </div>
    </footer>
  );
};

export default Footer;
