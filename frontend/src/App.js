
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar'; // Importer la barre de navigation
import Home from './pages/Home';
import Service from './pages/Service';
import About from './pages/About';
import Contact from './pages/Contact';
import LoginPage1 from './pages/LoginPage1';
import CreateAccount1 from './pages/CreateAccount1';
import AdminPage1 from './pages/AdminPage1';
import CommunicationPage from './pages/CommunicationPage';
import StanPage from './pages/StanPage';






const App = () => {
    return (
        <Router>
            <Navbar /> {/* Ajouter la barre de navigation */}
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/service" element={<Service />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/login" element={<LoginPage1 />} />
                <Route path="/register" element={<CreateAccount1 />} />
                <Route path="/admin" element={<AdminPage1 />} />
                <Route path="/communication" element={<CommunicationPage />} />
                <Route path="/stan" element={<StanPage />} />
                
            </Routes>
        </Router>
    );
};

export default App;
