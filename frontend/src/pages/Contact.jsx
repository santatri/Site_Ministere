import React from 'react';


import '../styles/Contact.css';
import ImageContact from '../pages/Contact/ImageContact';
import CadreContact from '../pages/Contact/CadreContact';
import Contact from '../pages/Contact/Contact';
import VisitorCounter from '../components/VisitorCounter';
import '../styles/ImageContact.css';
import '../styles/ImageContact.css';
import '../styles/CadreContact.css';

const Service = () => {
    return (
        <div>
            <div className='containere'>
        <VisitorCounter/>
         <ImageContact/>
        
         <Contact/>
         <CadreContact/>
            
    </div>
           
                   
</div>
    );
};

export default Service;
