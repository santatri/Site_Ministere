import React from 'react';
import { BrowserRouter, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/authContext';

import Navbar from './components/Navbar';
import Home from './pages/Home';
import Service from './pages/Service';
import About from './pages/About';
import Contact from './pages/Contact';
import LoginPage1 from './pages/LoginPage1';
import CreateAccount1 from './pages/CreateAccount1';
import AdminPage1 from './pages/AdminPage1';
import CommunicationPage from './pages/CommunicationPage';
import StanPage from './pages/StanPage';

// Composant ProtectedRoute pour protéger les pages sensibles
const ProtectedRoute = ({ element }) => {
  const { user } = useAuth(); // Vérifie si l'utilisateur est connecté

  // Si l'utilisateur n'est pas connecté, rediriger vers Home
  if (!user) {
    return <Navigate to="/" replace />;
  }

  // Sinon, afficher la page protégée
  return element;
};

const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppWithNavbar />
      </BrowserRouter>
    </AuthProvider>
  );
};

const AppWithNavbar = () => {
  const location = useLocation();

  // Liste des pages où afficher la Navbar
  const showNavbarPages = ['/', '/home', '/service', '/about', '/contact'];

  return (
    <>
      {/* Afficher la Navbar seulement si la route correspond */}
      {showNavbarPages.includes(location.pathname) && <Navbar />}

      <Routes>
        {/* Pages accessibles à tous */}
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/service" element={<Service />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<LoginPage1 />} />
        <Route path="/register" element={<CreateAccount1 />} />

        {/* Routes protégées */}
        <Route path="/admin" element={<ProtectedRoute element={<AdminPage1 />} />} />
        <Route path="/communication" element={<ProtectedRoute element={<CommunicationPage />} />} />
        <Route path="/stan" element={<ProtectedRoute element={<StanPage />} />} />

        {/* Redirection pour tout lien non défini */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
};

export default App;
