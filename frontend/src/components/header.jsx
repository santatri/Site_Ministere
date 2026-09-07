import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/Header.css';
import { API_URL } from '../config';
const Header = () => {
    const [settings, setSettings] = useState({ email: '', address: '', logo: '' });

    useEffect(() => {
        const fetchSettings = async () => {
            try {
                const response = await axios.get(`${API_URL}/api/set`);
                setSettings(response.data);
            } catch (err) {
                console.error('Erreur lors de la récupération des paramètres :', err);
            }
        };

        fetchSettings();
    }, []);

    return (
        <div className="header-bar">
            {/* Section gauche */}
            <div className="header-left">
                <div className="header-item">
                    <i className="fas fa-map-marker-alt icon"></i>
                    <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(settings.address)}`}
                       target="_blank"
                       rel="noopener noreferrer"
                       className="location-link">
                        {settings.address}
                    </a>
                </div>
            </div>

            {/* Section centrale pour le logo */}
            <div className="header-logo">
                <img src={`${API_URL}/uploads/${settings.logo}`} alt="logo" />
            </div>

            {/* Section droite */}
            <div className="header-right">
                <div className="header-item">
                    <i className="fas fa-envelope icon"></i>
                    <a href={`mailto:${settings.email}`} className="email-link">{settings.email}</a>
                </div>
            </div>
        </div>
    );
};

export default Header;
