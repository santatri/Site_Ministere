import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaLock } from 'react-icons/fa';
import { useAuth } from '../context/authContext';

const AccessDenied = () => {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div style={styles.container}>
      <div style={styles.card} role="alert" aria-live="polite">
        <div style={styles.iconWrap}>
          <FaLock style={styles.icon} />
        </div>
        <h1 style={styles.title}>Accès refusé</h1>
        <p style={styles.message}>Vous n'avez pas les permissions nécessaires pour accéder à cette page.</p>

        <div style={styles.actions}>
          <Link to="/" style={{ ...styles.button, ...styles.primary }}>Accueil</Link>

          {isAuthenticated() ? (
            <button onClick={handleLogout} style={{ ...styles.button, ...styles.ghost }}>Se déconnecter</button>
          ) : (
            <Link to="/login" style={{ ...styles.button, ...styles.ghost }}>Se connecter</Link>
          )}
        </div>

        <small style={styles.hint}>Si vous pensez qu'il s'agit d'une erreur, contactez l'administrateur.</small>
      </div>
    </div>
  );
};

const styles = {
  container: {
    minHeight: '70vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '24px',
    background: 'linear-gradient(180deg, #f8fafc 0%, #ffffff 100%)'
  },
  card: {
    width: '100%',
    maxWidth: 720,
    padding: '32px',
    borderRadius: 12,
    boxShadow: '0 10px 30px rgba(2,6,23,0.08)',
    textAlign: 'center',
    background: '#fff'
  },
  iconWrap: {
    width: 88,
    height: 88,
    borderRadius: 44,
    background: 'linear-gradient(135deg,#ff7a7a,#ffb199)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 auto 16px'
  },
  icon: {
    color: '#fff',
    width: 36,
    height: 36
  },
  title: {
    margin: '8px 0 4px',
    fontSize: 22,
    color: '#0f172a'
  },
  message: {
    margin: '0 0 20px',
    color: '#475569'
  },
  actions: {
    display: 'flex',
    gap: 12,
    justifyContent: 'center',
    marginBottom: 12,
    flexWrap: 'wrap'
  },
  button: {
    padding: '10px 18px',
    borderRadius: 8,
    border: 'none',
    cursor: 'pointer',
    textDecoration: 'none',
    fontWeight: 600,
    display: 'inline-block'
  },
  primary: {
    background: '#0ea5a4',
    color: '#fff'
  },
  ghost: {
    background: 'transparent',
    color: '#0f172a',
    border: '1px solid #e2e8f0'
  },
  hint: {
    display: 'block',
    marginTop: 8,
    color: '#94a3b8'
  }
};

export default AccessDenied;

