import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/authContext';
import RoleBasedRoute from './components/RoleBasedRoute';
import AccessDenied from './pages/AccessDenied';

import Header from './components/header';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Service from './pages/Service';
// About page import removed (not used in routes)
import Contact from './pages/Contact';
import LoginPage1 from './pages/LoginPage1';
import CreateAccount1 from './pages/CreateAccount1';
import AdminPage1 from './pages/AdminPage1';
import DepedPage from './pages/DepedPage';
import DfpaePage from './pages/DfpaePage';
import DrhePage from './pages/DrhePage';
import DgfopPage from './pages/DgfopPage';
import ImageCarousel from './components/ImageCarousel';
import CommunicationPage from './pages/CommunicationPage';
import Donne from './components/donne';
import DrfpPage from './pages/DrfpPage';
import Visites from './pages/visites';
import '../src/i18n';

import StanPage from './pages/StanPage';
import Archives from './pages/Archives';
import DetailsActu from './pages/DetailsActu'; // Cette composante affiche le contenu détaillé de l'actualité
import Footer from './components/Footer'; // Importation du Footer

// NOTE: Role-based protection is provided by `RoleBasedRoute` (./components/RoleBasedRoute.jsx)

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

  // Liste des pages où afficher la Navbar et le Footer
  const showNavbarPages = ['/', '/home', '/service', '/archives','/donne', '/about','/about/dgfop','/about/deped','/about/drhe','/about/dfpae','/about/drfp', '/contact'];
  
  useEffect(() => {
    window.scrollTo(0, 0); // Défile vers le haut à chaque changement de route
  }, [location.pathname]);

  return (
    <>
      {/* Afficher la Navbar seulement si la route correspond */}
      {showNavbarPages.includes(location.pathname) && <Header />}
      {showNavbarPages.includes(location.pathname) && <Navbar />}
      {showNavbarPages.includes(location.pathname) && <Visites />}


     
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/service" element={<Service />} />
   
  
        <Route path="/" element={<ImageCarousel />} />
        <Route path="/donne" element={<Donne />} />
  
        <Route path="/archives" element={<Archives />} />
  <Route path="/details/:id" element={<DetailsActu />} />
    
  

  
        <Route path="/about/dgfop" element={<DgfopPage />} />
        <Route path="/about/deped" element={<DepedPage />} />
        <Route path="/about/drhe" element={<DrhePage />} />
        <Route path="/about/dfpae" element={<DfpaePage />} />
        <Route path="/about/drfp" element={<DrfpPage />} />
      
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<LoginPage1 />} />
        <Route path="/register" element={<CreateAccount1 />} />

  {/* Routes protégées par rôle */}
  <Route path="/admin" element={<RoleBasedRoute element={<AdminPage1 />} allowedRoles="admin" />} />
  <Route path="/communication" element={<RoleBasedRoute element={<CommunicationPage />} allowedRoles="communication" />} />
  <Route path="/stan" element={<RoleBasedRoute element={<StanPage />} allowedRoles="stan" />} />

  {/* Page d'accès refusé */}
  <Route path="/access-denied" element={<AccessDenied />} />

        {/* Redirection pour tout lien non défini */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      {/* Afficher le Footer seulement sur les pages définies */}
      {showNavbarPages.includes(location.pathname) && <Footer />}
    </>
  );
};

export default App;
