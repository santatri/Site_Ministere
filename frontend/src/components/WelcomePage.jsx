import React, { useEffect, useRef } from 'react';
import '../styles/WelcomePage.css';
import LogoMadagascar from '../assets/DG1.jpg'; // Chemin vers votre image

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
      { threshold: 0 } // Détecte dès que l'élément est visible
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
          <div className="badge">Directeur Générale</div>
          <img
            src={LogoMadagascar}
            alt="Logo Madagascar"
            className="logo"
          />
        </div>

        <div className="text-pages">
          <h1>
            Bienvenue sur la plateforme innovante de la Direction Générale de la Fonction Publique
          </h1>
          <p>
            Cette plateforme a été conçue pour moderniser les services publics et simplifier les
            interactions entre l’administration et les citoyens. Elle vise à améliorer la qualité
            des services offerts et à renforcer la transparence au sein de la fonction publique.
          </p>
          <h2>Monsieur RAMAROSON Heridja Patrick</h2>
          <p>
            <i>
              Directeur Général de la Fonction Publique, Administrateur Civil
            </i>
          </p>
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;
