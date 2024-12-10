import React from 'react';
import '../styles/About.css';
// import Actualité from '../components/Actualité';
import ImageCarousel from '../components/ImageCarousel';
import  SecretaireGeneral from'../components/SecretaireGeneral';
import  DirectionGenerale from'../components/DirectionGenerale';
import  Direction from'../components/Direction';
import  Service from'../components/Service';
import  ServiceOffert from'../components/ServiceOffert';


const About = () => {
    return (
        <div>
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
        </div>
            
    );
};

export default About;
