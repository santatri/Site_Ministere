import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AdminPage = () => {
    const [formData, setFormData] = useState({ nom_direction: '' });
    const [message, setMessage] = useState('');
    const [directions, setDirections] = useState([]);
    const [editId, setEditId] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetchDirections();
    }, []);

    // Fetch all directions
    const fetchDirections = async () => {
        try {
            const response = await axios.get('http://localhost:5001/api/directions');
            setDirections(response.data);
        } catch (error) {
            console.error('Erreur lors de la récupération des directions:', error);
        }
    };

    // Handle form changes
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Create or update direction
    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');

        try {
            if (editId) {
                // Update direction
                await axios.put(`http://localhost:5001/api/update-direction/${editId}`, formData);
                setMessage('Direction mise à jour avec succès!');
                setEditId(null);
            } else {
                // Create direction
                await axios.post('http://localhost:5001/api/create-direction', formData);
                setMessage('Direction créée avec succès!');
            }

            setFormData({ nom_direction: '' });
            fetchDirections(); // Refresh the list
        } catch (error) {
            setMessage(error.response?.data || 'Erreur lors de l\'opération');
        }
    };

    // Edit direction
    const handleEdit = (direction) => {
        setEditId(direction.id);
        setFormData({ nom_direction: direction.nom_direction });
    };

    // Delete direction
    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:5001/api/delete-direction/${id}`);
            setMessage('Direction supprimée avec succès!');
            fetchDirections(); // Refresh the list
        } catch (error) {
            setMessage(error.response?.data || 'Erreur lors de la suppression');
        }
    };

    return (
        <div>
            <h1>Page d'administration</h1>
            <button onClick={() => navigate('/')}>Déconnexion</button>

            <h2>Créer ou Modifier une Direction</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Nom:
                    <input
                        type="text"
                        name="nom_direction"
                        value={formData.nom_direction}
                        onChange={handleChange}
                        required
                    />
                </label>
                <button type="submit">{editId ? 'Mettre à jour' : 'Créer'}</button>
            </form>
            {message && <p>{message}</p>}

            <h2>Liste des Directions</h2>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nom</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {directions.map((direction) => (
                        <tr key={direction.id}>
                            <td>{direction.id}</td>
                            <td>{direction.nom_direction}</td>
                            <td>
                                <button onClick={() => handleEdit(direction)}>Modifier</button>
                                <button onClick={() => handleDelete(direction.id)}>Supprimer</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AdminPage;
