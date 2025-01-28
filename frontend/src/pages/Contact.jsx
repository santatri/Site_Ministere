import React from 'react';


import '../styles/Contact.css';
import ImageContact from '../pages/Contact/ImageContact';
import CadreContact from '../pages/Contact/CadreContact';
import Contact from '../pages/Contact/Contact';
import '../styles/ImageContact.css';
import '../styles/ImageContact.css';
import '../styles/CadreContact.css';
import  Ministere from'../components/Ministere'

const Service = () => {
    return (
        <div>
            <div className='containere'>
         <ImageContact/>
         <Ministere/>
         <Contact/>
         <CadreContact/>
            
    </div>
           
                   
</div>
    );
};

export default Service;
