import React from 'react';
import { NavLink } from 'react-router-dom';
import '../styles/Navbar.css';


const Navbar = () => {
    const navStyle = {
        padding: '10px 15px',
        textDecoration: 'none',
        fontSize: '18px',
        color: '#333',
    };

    const activeStyle = {
        fontWeight: 'bold',
        color: '#007bff',
    };

    return (
        <nav style={{ background: '#f8f9fa', padding: '10px' }}>
            <NavLink to="/" style={navStyle} activeStyle={activeStyle}>
                Accueil
            </NavLink>
            <NavLink to="/service" style={navStyle} activeStyle={activeStyle}>
                Services
            </NavLink>
            <NavLink to="/about" style={navStyle} activeStyle={activeStyle}>
                À propos
            </NavLink>
            <NavLink to="/contact" style={navStyle} activeStyle={activeStyle}>
                Contact
            </NavLink>
        </nav>
    );
};

export default Navbar;
