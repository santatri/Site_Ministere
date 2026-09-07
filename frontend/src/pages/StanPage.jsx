import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/authContext';
import '../styles/StanPage.css';
import LogoutButton from '../components/LogoutButton';
import SecretaireGeneral from '../components/SecretaireGeneral';
import DirectionGenerale from '../components/DirectionGenerale';
import Direction from '../components/Direction';
import Service from '../components/Service';
import ServiceOffert from '../components/ServiceOffert';
import { API_URL } from '../config';

const StanPage = () => {
  const { user } = useAuth();
  const [image, setImage] = useState('');
  const [active, setActive] = useState('SecretaireGeneral');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (user && user.image) setImage(user.image);
  }, [user]);

  const renderActive = () => {
    switch (active) {
      case 'SecretaireGeneral':
        return <SecretaireGeneral />;
      case 'DirectionGenerale':
        return <DirectionGenerale />;
      case 'Direction':
        return <Direction />;
      case 'Service':
        return <Service />;
      case 'ServiceOffert':
        return <ServiceOffert />;
      default:
        return null;
    }
  };

  const handleSelect = (key) => {
    setActive(key);
    // close the menu (drawer) after selecting
    setIsMenuOpen(false);
  };

  return (
    <div className="layout-left">
      {/* sidebar - visible on desktop, drawer on mobile */}
      <aside className={`sidebar ${isMenuOpen ? 'open' : ''}`}>
        <div className="logo-containeres">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
            <div className="logo-user">
              {image ? (
                <img className="logo-avatar" src={`${API_URL}/uploads/${image}`} alt="User" />
              ) : (
                <div className="log" />
              )}
              <div className="logo-meta">
                <h2 style={{ fontSize: 18, margin: 0 }}>Ministère</h2>
                <div className="name" style={{ fontSize: 13 }}>{user?.prenom} {user?.nom}</div>
              </div>
            </div>
            <button className="close-sidebar" onClick={() => setIsMenuOpen(false)} aria-label="Close menu">×</button>
          </div>
        </div>

        <nav className="menu">
          <button className={`menu-item ${active === 'SecretaireGeneral' ? 'active' : ''}`} onClick={() => handleSelect('SecretaireGeneral')}>Secrétaire Général</button>
          <button className={`menu-item ${active === 'DirectionGenerale' ? 'active' : ''}`} onClick={() => handleSelect('DirectionGenerale')}>Direction Générale</button>
          <button className={`menu-item ${active === 'Direction' ? 'active' : ''}`} onClick={() => handleSelect('Direction')}>Direction</button>
          <button className={`menu-item ${active === 'Service' ? 'active' : ''}`} onClick={() => handleSelect('Service')}>Service</button>
          <button className={`menu-item ${active === 'ServiceOffert' ? 'active' : ''}`} onClick={() => handleSelect('ServiceOffert')}>Services Offerts</button>
        </nav>

        <div className="sidebar-footer">
          <div className="user-small">
            {image && <img className="avatar" src={`${API_URL}/uploads/${image}`} alt="User" />}
            <div className="user-meta">
              <div className="name">{user?.prenom} {user?.nom}</div>
              <div className="matricule">{user?.matricule}</div>
            </div>
          </div>

          <div className="logout-container">
            <LogoutButton />
          </div>
        </div>
      </aside>

      {/* backdrop for mobile when menu is open */}
      {isMenuOpen && <div className="backdrop" onClick={() => setIsMenuOpen(false)} />}

      <main className="main-area">
        <header className="main-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <button className="toggle-btn" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Toggle menu">☰</button>
            <h1>{active === 'SecretaireGeneral' ? 'Secrétaire Général' : active}</h1>
          </div>
        </header>

        <section className="main-content">
          {renderActive()}
        </section>
      </main>
    </div>
  );
};

export default StanPage;
