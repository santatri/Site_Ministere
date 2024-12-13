import React, { useEffect, useRef } from 'react';
import '../styles/WelcomePage.css';
import LogoMadagascar from '../assets/dgfop.png'; // Chemin vers votre image

const WelcomePage = () => {
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
      { threshold:0 } // Détecte lorsque 50% de l'élément est visible
    );

    observer.observe(imageBox);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div className="welcome-page">
      <div className="pages">
        <div className="image-box" ref={imageBoxRef}>
          <div className="badge">LOGO</div>
          <img
            src={LogoMadagascar}
            alt="Logo Madagascar"
            className="logo"
          />
        </div>

        <div className="text-pages">
          <h1>
            Bienvenue sur le plateforme innovante Direction Génerale de la Fonction Publique
          </h1>
          <p>
            La Présidence s’est engagée à créer une administration de proximité,
            à l’écoute de la population et de ses besoins, et à améliorer la
            qualité de vie des citoyens et de faciliter le travail des
            entreprises.
          </p>
          <h2>Monsieur FANOHIZA Claude</h2>
          <p>
            <i>
              Secrétaire Général de la Présidence de la République de
              Madagascar
            </i>
          </p>
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;
