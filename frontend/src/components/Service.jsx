import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Service = () => {
    const [services, setServices] = useState([]);
    const [directions, setDirections] = useState([]); // Liste des directions pour la combobox
    const [nom_s, setNomS] = useState('');
    const [porte_s, setPorteS] = useState('');
    const [id_d, setIdD] = useState('');
    const [editId, setEditId] = useState(null);

    // Récupérer toutes les services
    const fetchServices = async () => {
        try {
            const response = await axios.get('http://localhost:5001/api/service/all');
            setServices(response.data.data);
        } catch (error) {
            console.error("Erreur lors de la récupération des services:", error);
        }
    };

    // Récupérer toutes les directions
    const fetchDirections = async () => {
        try {
            const response = await axios.get('http://localhost:5001/api/direction/all');
            setDirections(response.data.data);
        } catch (error) {
            console.error("Erreur lors de la récupération des directions:", error);
        }
    };

    useEffect(() => {
        fetchServices();
        fetchDirections();
    }, []);

    // Ajouter ou mettre à jour un service
    const handleSubmit = async () => {
        try {
            if (editId) {
                await axios.put(`http://localhost:5001/api/service/${editId}`, { nom_s, porte_s, id_d });
            } else {
                await axios.post('http://localhost:5001/api/service', { nom_s, porte_s, id_d });
            }
            fetchServices();
            clearForm();
        } catch (error) {
            console.error("Erreur lors de la gestion du service:", error);
        }
    };

    // Supprimer un service
    const deleteService = async (id) => {
        try {
            await axios.delete(`http://localhost:5001/api/service/${id}`);
            fetchServices();
        } catch (error) {
            console.error("Erreur lors de la suppression du service:", error);
        }
    };

    // Préparer le formulaire pour l'édition
    const editService = (service) => {
        setEditId(service.id_s);
        setNomS(service.nom_s);
        setPorteS(service.porte_s);
        setIdD(service.id_d);
    };

    // Vider le formulaire
    const clearForm = () => {
        setNomS('');
        setPorteS('');
        setIdD('');
        setEditId(null);
    };

    return (
        <div>
            <h1>Gestion des Services</h1>

            <form>
                <input
                    type="text"
                    value={nom_s}
                    onChange={(e) => setNomS(e.target.value)}
                    placeholder="Nom du service"
                />
                <input
                    type="text"
                    value={porte_s}
                    onChange={(e) => setPorteS(e.target.value)}
                    placeholder="Porte du service"
                />
                <select value={id_d} onChange={(e) => setIdD(e.target.value)}>
                    <option value="">Sélectionner une direction</option>
                    {directions.map((direction) => (
                        <option key={direction.id_d} value={direction.id_d}>
                            {direction.nom_d}
                        </option>
                    ))}
                </select>
                <button type="button" onClick={handleSubmit}>
                    {editId ? 'Mettre à jour' : 'Ajouter'}
                </button>
                <button type="button" onClick={clearForm}>Annuler</button>
            </form>

            <h2>Liste des Services</h2>
            <table>
                <thead>
                    <tr>
                        <th>Nom</th>
                        <th>Porte</th>
                        <th>Direction</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {services.map((service) => (
                        <tr key={service.id_s}>
                            <td>{service.nom_s}</td>
                            <td>{service.porte_s}</td>
                            <td>{service.nom_d || 'N/A'}</td>
                            <td>
                                <button onClick={() => editService(service)}>Éditer</button>
                                <button onClick={() => deleteService(service.id_s)}>Supprimer</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Service;
