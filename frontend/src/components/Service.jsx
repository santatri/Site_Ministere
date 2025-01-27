import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import '../styles/Service.css';

const Service = () => {
    const [services, setServices] = useState([]);
    const [SGList, setSGList] = useState([]);  // Liste des SG
    const [DGList, setDGList] = useState([]);  // Liste des DG
    const [directions, setDList] = useState([]); // Liste des directions pour la combobox
    const [nom_s, setNomS] = useState('');
    const [porte_s, setPorteS] = useState('');
    const [id_d, setIdD] = useState('');
    const [editId, setEditId] = useState(null);
    const [showForm, setShowForm] = useState(true); // Nouvel état pour afficher le formulaire ou la liste

    // Référence pour faire défiler vers le formulaire
    const formRef = useRef(null);

    // Récupérer toutes les services
    const fetchServices = async () => {
        try {
            const response = await axios.get('http://localhost:5001/api/service/all');
            // Trier les services par porte_s de manière croissante
            const sortedServices = response.data.data.sort((a, b) => {
                if (a.porte_s < b.porte_s) return -1;
                if (a.porte_s > b.porte_s) return 1;
                return 0;
            });
            setServices(sortedServices);
        } catch (error) {
            console.error("Erreur lors de la récupération des services:", error);
        }
    };

    const fetchSGAndDGAndD = async () => {
        try {
            const [DResponse, sgResponse, dgResponse] = await Promise.all([
                axios.get('http://localhost:5001/api/direction/all'),
                axios.get('http://localhost:5001/api/direction/sg'),
                axios.get('http://localhost:5001/api/direction/dg')
            ]);
            setDList(DResponse.data.data);
            setSGList(sgResponse.data.data);
            setDGList(dgResponse.data.data);
        } catch (error) {
            console.error("Erreur lors de la récupération des D, SG et DG:", error);
        }
    };

    useEffect(() => {
        fetchServices();
        fetchSGAndDGAndD();
    }, []);

    // Ajouter ou mettre à jour un service
    const handleSubmit = async () => {
        try {
            // Formater la porte avec des zéros devant si nécessaire
            const formattedPorte = porte_s.padStart(3, '0'); // Ajoute des zéros jusqu'à ce que la longueur soit 3

            if (editId) {
                await axios.put(`http://localhost:5001/api/service/${editId}`, { nom_s, porte_s: formattedPorte, id_d });
            } else {
                await axios.post('http://localhost:5001/api/service', { nom_s, porte_s: formattedPorte, id_d });
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

        // Faire défiler vers le formulaire si formRef existe
        setShowForm(true);  // Afficher le formulaire d'édition
        if (formRef.current) {
            formRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };

    // Vider le formulaire
    const clearForm = () => {
        setNomS('');
        setPorteS('');
        setIdD('');
        setEditId(null);
    };

    // Fonction pour afficher l'indentation des directions selon la hiérarchie
    const getDirectionHierarchy = (direction, level = 0) => {
        const indentation = ' '.repeat(level * 2);  // Espace pour l'indentation
        return `${indentation}${direction.nom_d}`;
    };

    return (
        <div className="servi-container">
            <h1>Gestion des Services et des secrétaires</h1>

            {/* Boutons pour afficher le formulaire ou la liste */}
            <div className="toggle-buttons">
                <button className="toggle-button" onClick={() => { setShowForm(true); clearForm(); }} >Ajout Gestion des Services et des secrétaires</button>
                <button className="toggle-button" onClick={() => { setShowForm(false); }} >Liste Gestion des Services et des secrétaires</button>
            </div>

            {/* Affichage conditionnel basé sur l'état showForm */}
            {showForm ? (
                <div className="service-form" ref={formRef}>
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
                                {getDirectionHierarchy(direction)}
                            </option>
                        ))}
                    </select>
                    <button type="button" onClick={handleSubmit}>
                        {editId ? 'Mettre à jour' : 'Ajouter'}
                    </button>
                    <button type="button" onClick={clearForm}>Annuler</button>
                </div>
            ) : (
                <div className="service-list">
                    <h2>Liste des Services</h2>
                    <table className="table">
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
                                    <td>{service.hierarchy}</td>
                                    <td>
                                        <button onClick={() => editService(service)} className='direction-btn-edit-new'>Éditer</button>
                                        <button onClick={() => deleteService(service.id_s)}className="direction-btn-delete-new">Supprimer</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default Service;
