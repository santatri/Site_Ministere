import React, { useContext, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation, Navigate, useNavigate } from 'react-router-dom';
import { AuthContext, AuthProvider} from './context/authContext';

import Header from './components/header';
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
import Archives from './pages/Archives';
import Footer from './components/Footer'; // Importation du Footer

// Composant ProtectedRoute pour protéger les pages sensibles
const ProtectedRoute = ({ element }) => {
  const { user, setUser } = useContext(AuthContext) // Vérifie si l'utilisateur est connecté
 const navigate = useNavigate()
  useEffect(() =>{
    console.log('appell');
    
      setUser(JSON.parse(localStorage.getItem('user')))
    }, [])
    

    if (user?.role==null) {
      return navigate('/')
    }
    
  

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

  // Liste des pages où afficher la Navbar et le Footer
  const showNavbarPages = ['/', '/home', '/service', '/archives', '/about', '/contact'];

  return (
    <>
      {/* Afficher la Navbar seulement si la route correspond */}
      {showNavbarPages.includes(location.pathname) && <Header />}
      {showNavbarPages.includes(location.pathname) && <Navbar />}
     
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/service" element={<Service />} />
        <Route path="/archives" element={<Archives />} />
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

      {/* Afficher le Footer seulement sur les pages définies */}
      {showNavbarPages.includes(location.pathname) && <Footer />}
    </>
  );
};

export default App;
