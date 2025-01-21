import React from 'react';
import depedImage from '../assets/madame.jpg'; // Remplacez par l'image appropriée
import Header from '../components/header';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import '../styles/DepedPage.css';

const DepedPage = () => {
  return ( 
    <div className="page-container">
      <Header />
      <Navbar />
    <div className="containeres">
      
      {/* Section Image et Détails */}
      <div className="images-containeres">
        {/* Image à gauche */}
        <img src={depedImage} alt="DGFOP" className="image-framees" />
        
        {/* Cadre de description à droite */}
        <div className="cardesiz">
          <h2>Ny Antsa Alisandy Itokiana</h2>
          <h3>RASOLOFONIAINA</h3>
          <p>Directeur d’Appui aux Investissements Touristiques</p>
        </div>
      </div>

      {/* Section Description */}
      <div className="texte-sectiones">
      <h1>Direction Générale de la Formation et de l’Orientation Professionnelle (DGFOP)</h1>
        <div className="underlinees"></div>
        
          <p>
            La Direction Générale de la Formation et de l’Orientation Professionnelle (DGFOP) joue un rôle crucial 
            dans la gestion de la formation professionnelle et de l'orientation. Elle vise à assurer une adéquation optimale 
            entre les compétences des individus et les exigences du marché du travail.
          </p>
         
          <p>
            À travers ses multiples initiatives, la DGFOP incarne le lien entre le développement des talents et 
            l'essor économique du pays, garantissant que chaque individu trouve sa place dans un monde en constante évolution.
          </p>
          <p>
          La Direction Générale de la Formation et de l’Orientation Professionnelle (DGFOP) comporte :
          </p>
        <ul>
          <li>
            <i className="fas fa-check-circle"></i>
            LE SERVICE DES AGRÉMENTS TOURISTIQUES (SAT)
          </li>
          <li>
            <i className="fas fa-check-circle"></i>
            LE SERVICE DE LA PROMOTION DES INVESTISSEMENTS TOURISTIQUES (SPIT)
          </li>
        </ul>
      </div>
      </div>
      <Footer/> </div>
      
  );
};

export default DepedPage;
