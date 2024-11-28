import React from 'react';
import { NavLink } from 'react-router-dom';
import '../styles/Navbar.css';

const Navbar = () => {
    return (
        <nav className='navigtion-bar' >
            <div className='navigation-links'>
            <NavLink
                to="/home"
                style={{ color: 'white', textDecoration: 'none', marginRight: '20px' }}
                activeStyle={{ fontWeight: 'bold', color: '#FFD700' }}
            >
                Accueil
            </NavLink>
            <a
                href="/"
                style={{ color: 'white', textDecoration: 'none', marginRight: '20px' }}
                activeStyle={{ fontWeight: 'bold', color: '#FFD700' }}
            >
                Bibliotheque numérique
            </a>
            <NavLink
                to="/service"
                style={{ color: 'white', textDecoration: 'none', marginRight: '20px' }}
                activeStyle={{ fontWeight: 'bold', color: '#FFD700' }}
            >
                Standard de Service
            </NavLink>
            <NavLink
                to="/archives"
                style={{ color: 'white', textDecoration: 'none', marginRight: '20px' }}
                activeStyle={{ fontWeight: 'bold', color: '#FFD700' }}
            >
                Archives
            </NavLink>
            <NavLink
                to="/about"
                style={{ color: 'white', textDecoration: 'none', marginRight: '20px' }}
                activeStyle={{ fontWeight: 'bold', color: '#FFD700' }}
            >
                A propos
            </NavLink>
            <NavLink
                to="/contact"
                style={{ color: 'white', textDecoration: 'none' }}
                activeStyle={{ fontWeight: 'bold', color: '#FFD700' }}
            >
                Contact
            </NavLink>

            </div>
           
        </nav>
    );
};

export default Navbar;
