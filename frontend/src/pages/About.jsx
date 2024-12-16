import React from 'react';
import '../styles/About.css';


import Propos from './Apropos/Propos';
import '../styles/Propos.css';
import Footer from '../components/Footer';
import '../styles/Footer.css';
import ImagePropos from './Apropos/ImagePropos';
import '../styles/ImagePropos.css';
const About = () => {
    return (
        <div>
         <ImagePropos/>
         <Propos/>
         <Footer/>
        </div>
    );
};

export default About;
