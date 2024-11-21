import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AdminPage = () => {
    const [formData, setFormData] = useState({ nom_direction: '' });
    const [message, setMessage] = useState('');
    const [directions, setDirections] = useState([]);
    const [editing, setEditing] = useState(null);
    const navigate = useNavigate();

    // Récupérer les directions au démarrage
    useEffect(() => {
        const fetchDirections = async () => {
            try {
                const response = await axios.get('http://localhost:5001/api/get-directions');
                setDirections(response.data);
            } catch (error) {
                setMessage('Erreur de récupération des directions');
            }
        };
        fetchDirections();
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        try {
            let response;
            if (editing) {
                // Mettre à jour la direction
                response = await axios.put(`http://localhost:5001/api/update-direction/${editing.id_direction}`, formData);
            } else {
                // Créer une nouvelle direction
                response = await axios.post('http://localhost:5001/api/create-direction', formData);
            }

            if (response.status === 200 || response.status === 201) {
                setMessage('Direction sauvegardée avec succès!');
                setFormData({ nom_direction: '' });
                setEditing(null); // Réinitialiser l'édition

                // Recharger la liste des directions
                const updatedDirections = await axios.get('http://localhost:5001/api/get-directions');
                setDirections(updatedDirections.data);
            }
        } catch (error) {
            setMessage(error.response?.data || 'Erreur lors de la sauvegarde.');
        }
    };

    const handleEdit = (direction) => {
        setFormData({ nom_direction: direction.nom_direction });
        setEditing(direction); // Définir l'objet à modifier
    };

    const handleDelete = async (id) => {
        try {
            const response = await axios.delete(`http://localhost:5001/api/delete-direction/${id}`);
            if (response.status === 200) {
                setMessage('Direction supprimée avec succès!');
                const updatedDirections = await axios.get('http://localhost:5001/api/get-directions');
                setDirections(updatedDirections.data);
            }
        } catch (error) {
            setMessage('Erreur lors de la suppression.');
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('user');
        navigate('/');  // Redirection vers la page d'accueil
    };

    return (
        <div>
            <h1>Bienvenue sur la page d'administration</h1>
            <p>Vous êtes connecté en tant qu'administrateur.</p>
            <button onClick={handleLogout}>Déconnexion</button>

            <h2>{editing ? 'Modifier la Direction' : 'Créer une Direction'}</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>
                        Nom de la Direction:
                        <input
                            type="text"
                            name="nom_direction"
                            value={formData.nom_direction || ''}
                            onChange={handleChange}
                            required
                        />
                    </label>
                </div>
                <div>
                    <button type="submit">{editing ? 'Mettre à jour' : 'Créer'}</button>
                </div>
            </form>

            {message && <p>{message}</p>}

            <h2>Liste des Directions</h2>
            <table>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Nom</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {directions.map((direction) => (
                        <tr key={direction.id_direction}>
                            <td>{direction.id_direction}</td>
                            <td>{direction.nom_direction}</td>
                            <td>
                                <button onClick={() => handleEdit(direction)}>Modifier</button>
                                <button onClick={() => handleDelete(direction.id_direction)}>Supprimer</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AdminPage;
