// pages/CommunicationPage.jsx
import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/authContext';
import LogoutButton from '../components/LogoutButton';
import Actualité from '../components/Actualité';
import { API_URL } from '../config';

// Reuse StanPage styles for consistent layout
import '../styles/StanPage.css';

const CommunicationPage = () => {
  const { user } = useAuth();
  const [image, setImage] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (user && user.image) setImage(user.image);
  }, [user]);

  return (
    <div className="layout-left">
      <aside className={`sidebar ${isMenuOpen ? 'open' : ''}`}>
        <div className="logo-containeres">
          <h2 style={{ fontSize: 20, marginTop: 12 }}>Communication</h2>
          <div className="logo-user">
            {image && <img className="avatar logo-avatar" src={`${API_URL}/uploads/${image}`} alt="User" />}
            <div className="user-meta logo-meta">
              <div className="name">{user?.prenom} {user?.nom}</div>
              <div className="matricule">{user?.matricule}</div>
            </div>
          </div>
        </div>

        <nav className="menu">
          <button className={`menu-item active`} onClick={() => setIsMenuOpen(false)}>Actualité</button>
        </nav>

        <div className="sidebar-footer">
          <div className="logout-container">
            <LogoutButton />
          </div>
        </div>
      </aside>

      {isMenuOpen && <div className="backdrop" onClick={() => setIsMenuOpen(false)} />}

      <main className="main-area">
        <header className="main-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <button className="toggle-btn" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Toggle menu">☰</button>
            <h1>Communication</h1>
          </div>
        </header>

        <section className="main-content">
          <Actualité />
        </section>
      </main>
    </div>
  );
};

export default CommunicationPage;
