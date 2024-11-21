import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreateAccount = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        role: 'Stand', // Rôle par défaut
    });
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    // Gérer les changements dans le formulaire
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Gérer l'envoi du formulaire
    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage(''); // Réinitialiser le message avant l'envoi

        try {
            const response = await axios.post('http://localhost:5001/api/create-account', formData);
            if (response.status === 201) {
                setMessage('Compte créé avec succès!');
                setFormData({ name: '', email: '', password: '', role: 'Stand' });
            }
        } catch (error) {
            if (error.response) {
                // Erreur renvoyée par le backend
                setMessage(error.response.data || 'Erreur lors de la création du compte.');
            } else {
                // Erreur de connexion au serveur
                setMessage('Erreur de connexion au serveur.');
            }
        }
    };

    // Redirection vers la page de connexion
    const handleLogin = () => {
        navigate('/login');
    };

    return (
        <div>
            <h2>Créer un compte</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>
                        Nom:
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </label>
                </div>
                <div>
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
                </div>
                <div>
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
                </div>
                <div>
                    <button type="submit">Créer un compte</button>
                </div>
            </form>
            {message && <p>{message}</p>}
            <p>Vous avez déjà un compte? <button onClick={handleLogin}>Se connecter</button></p>
        </div>
    );
};

export default CreateAccount;
