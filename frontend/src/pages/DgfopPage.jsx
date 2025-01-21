import React from 'react';

import Header from '../components/header';
import Navbar from '../components/Navbar';
import dgfopImage from '../assets/madame.jpg'; // Remplacez par le chemin correct vers l'image
import '../styles/DgfopPage.css';
import Footer from '../components/Footer';

const DgfopPage = () => {
  return ( 
    <div className="page-container">
      <Header />
      <Navbar />
    <div className="containeres">
      
      {/* Section Image et Détails */}
      <div className="images-containeres">
        {/* Image à gauche */}
        <img src={dgfopImage} alt="DGFOP" className="image-framees" />
        
        {/* Cadre de description à droite */}
        <div className="cardes">
          <h2>Ny Antsa Alisandy Itokiana</h2>
          <h3>RASOLOFONIAINA</h3>
          <p>Directeur d’Appui aux Investissements Touristiques</p>
        </div>
      </div>

      {/* Section Description */}
      <div className="text-section">
      <h1>Direction Générale de la Formation et de l’Orientation Professionnelle (DGFOP)</h1>
        <div className="underline"></div>
        
          <p>
            La Direction Générale de la Formation et de l’Orientation Professionnelle (DGFOP) joue un rôle crucial 
            dans la gestion de la formation professionnelle et de l'orientation. Elle vise à assurer une adéquation optimale 
            entre les compétences des individus et les exigences du marché du travail.
          </p>
          <p>
            La DGFOP accompagne les apprenants, les formateurs, et les institutions dans un effort coordonné pour répondre 
            aux défis économiques et sociaux. Ses missions incluent la mise en œuvre de politiques éducatives adaptées 
            et le suivi des évolutions du marché.
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

export default DgfopPage;
