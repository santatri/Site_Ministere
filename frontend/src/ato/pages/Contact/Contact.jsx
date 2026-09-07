import React from "react";


const Contact = () => {
  return (
    <div className="contact-section">
      <div className="contact-item">
        <span className="material-icons contact-icon">location_on</span>
        <h3>Adresse</h3>
        <p>67Ha, Bâtiment D1</p>
        <p>Antananarivo Madagascar 101</p>
      </div>

      <div className="contact-item">
        <span className="material-icons contact-icon">phone</span>
        <h3>Support</h3>
        <p>+261 34 55 997 17</p>
      </div>

      <div className="contact-item">
        <span className="material-icons contact-icon">email</span>
        <h3>Envoyez-nous un mail</h3>
        <p>contact@DGFOP.gov.mg</p>
      </div>
    </div>
  );
};

export default Contact;
