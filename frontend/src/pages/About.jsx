import React from 'react';
import '../styles/About.css';
<<<<<<< HEAD
// import Actualité from '../components/Actualité';
import ImageCarousel from '../components/ImageCarousel';
import  SecretaireGeneral from'../components/SecretaireGeneral';
import  DirectionGenerale from'../components/DirectionGenerale';
import  Direction from'../components/Direction';
import  Service from'../components/Service';
import  ServiceOffert from'../components/ServiceOffert';
=======
>>>>>>> toky


import Propos from './Apropos/Propos';
import '../styles/Propos.css';
import Footer from '../components/Footer';
import '../styles/Footer.css';
import ImagePropos from './Apropos/ImagePropos';
import '../styles/ImagePropos.css';
const About = () => {
    return (
        <div>
<<<<<<< HEAD
            <h1>À Propos de Nous</h1>
            <p>
                Nous sommes une entreprise dédiée à fournir les meilleures solutions pour nos clients. 
                Notre équipe est passionnée par l'innovation et le service à la clientèle.
            </p>
            <ImageCarousel/>
            <SecretaireGeneral/>
            <DirectionGenerale/>
            <Direction/>
            <Service/>
            <ServiceOffert/>
=======
         <ImagePropos/>
         <Propos/>
         <Footer/>
>>>>>>> toky
        </div>
            
    );
};

export default About;
