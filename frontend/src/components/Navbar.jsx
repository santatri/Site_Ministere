import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav style={{ backgroundColor: '#333', padding: '10px' }}>
            <NavLink
                to="/home"
                style={{ color: 'white', textDecoration: 'none', marginRight: '20px' }}
                activeStyle={{ fontWeight: 'bold', color: '#FFD700' }}
            >
                Home
            </NavLink>
            <NavLink
                to="/service"
                style={{ color: 'white', textDecoration: 'none', marginRight: '20px' }}
                activeStyle={{ fontWeight: 'bold', color: '#FFD700' }}
            >
                Service
            </NavLink>
            <NavLink
                to="/about"
                style={{ color: 'white', textDecoration: 'none', marginRight: '20px' }}
                activeStyle={{ fontWeight: 'bold', color: '#FFD700' }}
            >
                About
            </NavLink>
            <NavLink
                to="/contact"
                style={{ color: 'white', textDecoration: 'none' }}
                activeStyle={{ fontWeight: 'bold', color: '#FFD700' }}
            >
                Contact
            </NavLink>
        </nav>
    );
};

export default Navbar;
