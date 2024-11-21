import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const LoginPage = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        // Vérifiez si l'utilisateur est déjà connecté
        if (localStorage.getItem('user')) {
            navigate('/');  // Si l'utilisateur est déjà connecté, redirigez-le vers la page d'accueil
        }
    }, [navigate]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5001/api/login', formData);
            console.log(response.data);  // Afficher les données de la réponse
    
            if (response.status === 200) {
                setMessage('Connexion réussie!');
    
                const role = response.data.role;
    
                if (role === 'admin') {
                    // Enregistrez les informations de l'utilisateur dans localStorage
                    localStorage.setItem('user', JSON.stringify(response.data));
    
                    // Redirigez vers la page admin
                    navigate('/admin');  // Assurez-vous que la route /admin existe dans votre React Router
                } else if (role === 'user') {
                    // Redirigez vers la page d'accueil pour un utilisateur normal
                    navigate('/');
                }
            }
        } catch (error) {
            setMessage('Email ou mot de passe incorrect');
        }
    };
    
    
    

    return (
        <div>
            <h2>Se connecter</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Email:
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </label>
                <label>
                    Mot de passe:
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                </label>
                <button type="submit">Se connecter</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default LoginPage;
