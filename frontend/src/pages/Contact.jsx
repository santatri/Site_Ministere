import React from 'react';


import '../styles/Contact.css';
import ImageContact from '../pages/Contact/ImageContact';
import CadreContact from '../pages/Contact/CadreContact';
import Contact from '../pages/Contact/Contact';
import '../styles/ImageContact.css';
import '../styles/ImageContact.css';
import '../styles/CadreContact.css';
import  SettingsForm from'../components/SettingsForm';


const Service = () => {
    return (
        <div>
            <div className='containere'>
         <ImageContact/>
   
         <SettingsForm/>
         <Contact/>
         <CadreContact/>
            
    </div>
           
                   
</div>
    );
};

export default Service;
