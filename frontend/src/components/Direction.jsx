import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

const Direction = () => {
    const [directions, setDirections] = useState([]);
    const [sgList, setSGList] = useState([]);  // Liste des SG
    const [dgList, setDGList] = useState([]);  // Liste des DG
    const [nom_d, setNomD] = useState('');
    const [porte_d, setPorteD] = useState('');
    const [id_sg, setIdSG] = useState('');
    const [id_dg, setIdDG] = useState('');
    const [type, setType] = useState('');  // 'sg' pour SG, 'dg' pour DG
    const [editId, setEditId] = useState(null);

    // Référence au formulaire
    const formRef = useRef(null);

    // Récupérer toutes les directions
    const fetchDirections = async () => {
        try {
            const response = await axios.get('http://localhost:5001/api/direction/all');
            // Trier les directions par porte en ordre croissant
            const sortedDirections = response.data.data.sort((a, b) => {
                return a.porte_d - b.porte_d; // Tri numérique
            });
            setDirections(sortedDirections);
        } catch (error) {
            console.error("Erreur lors de la récupération des directions:", error);
        }
    };

    // Récupérer les SG et DG
    const fetchSGAndDG = async () => {
        try {
            const [sgResponse, dgResponse] = await Promise.all([
                axios.get('http://localhost:5001/api/direction/sg'),
                axios.get('http://localhost:5001/api/direction/dg')
            ]);
            setSGList(sgResponse.data.data);
            setDGList(dgResponse.data.data);
        } catch (error) {
            console.error("Erreur lors de la récupération des SG et DG:", error);
        }
    };

    useEffect(() => {
        fetchDirections();
        fetchSGAndDG();
    }, []);

    // Créer une direction
    const createDirection = async () => {
        try {
            // Si le type est 'sg', on ajoute un SG, sinon un DG
            if (type === 'sg') {
                await axios.post('http://localhost:5001/api/direction', { nom_d, porte_d: formatPorte(porte_d), id_sg, id_dg: null });
            } else if (type === 'dg') {
                await axios.post('http://localhost:5001/api/direction', { nom_d, porte_d: formatPorte(porte_d), id_sg: null, id_dg });
            }
            fetchDirections();  // Recharger la liste des directions après ajout
            clearForm();
        } catch (error) {
            console.error("Erreur lors de l'ajout de la direction:", error);
        }
    };

    // Mettre à jour une direction
    const updateDirection = async () => {
        try {
            await axios.put(`http://localhost:5001/api/direction/${editId}`, { nom_d, porte_d: formatPorte(porte_d), id_sg, id_dg });
            fetchDirections();
            clearForm();
        } catch (error) {
            console.error("Erreur lors de la mise à jour de la direction:", error);
        }
    };

    // Supprimer une direction
    const deleteDirection = async (id) => {
        try {
            await axios.delete(`http://localhost:5001/api/direction/${id}`);
            fetchDirections();
        } catch (error) {
            console.error("Erreur lors de la suppression de la direction:", error);
        }
    };

    // Préparer le formulaire pour l'édition
    const editDirection = (direction) => {
        setEditId(direction.id_d);
        setNomD(direction.nom_d);
        setPorteD(direction.porte_d);
        setIdSG(direction.id_sg);
        setIdDG(direction.id_dg);
        setType(direction.id_sg ? 'sg' : 'dg');

        // Faire défiler la page jusqu'au formulaire
        formRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    // Vider le formulaire
    const clearForm = () => {
        setNomD('');
        setPorteD('');
        setIdSG('');
        setIdDG('');
        setType('');
        setEditId(null);
    };

    // Fonction pour formater la porte avec des zéros devant
    const formatPorte = (porte) => {
        return porte.padStart(3, '0'); // Ajouter des zéros devant si nécessaire
    };

    return (
        <div>
            <h1>Gestion des Directions</h1>
            
            <form ref={formRef}>
                <input
                    type="text"
                    value={nom_d}
                    onChange={(e) => setNomD(e.target.value)}
                    placeholder="Nom de la direction"
                />
                <input
                    type="text"
                    value={porte_d}
                    onChange={(e) => setPorteD(e.target.value)}
                    placeholder="Porte de la direction"
                />

                <div>
                    <label>
                        <input
                            type="radio"
                            value="sg"
                            checked={type === 'sg'}
                            onChange={() => setType('sg')}
                        />
                        Appartenir au Secrétaire Général
                    </label>
                    <label>
                        <input
                            type="radio"
                            value="dg"
                            checked={type === 'dg'}
                            onChange={() => setType('dg')}
                        />
                        Appartenir a une Direction Générale
                    </label>
                </div>

                {type === 'sg' && (
                    <select
                        value={id_sg}
                        onChange={(e) => setIdSG(e.target.value)}
                    >
                        <option value="">Sélectionner Secrétaire Général</option>
                        {sgList.map((sg) => (
                            <option key={sg.id_sg} value={sg.id_sg}>{sg.nom_sg}</option>
                        ))}
                    </select>
                )}

                {type === 'dg' && (
                    <select
                        value={id_dg}
                        onChange={(e) => setIdDG(e.target.value)}
                    >
                        <option value="">Sélectionner une Direction Générale</option>
                        {dgList.map((dg) => (
                            <option key={dg.id_dg} value={dg.id_dg}>{dg.nom_dg}</option>
                        ))}
                    </select>
                )}

                <button type="button" onClick={editId ? updateDirection : createDirection}>
                    {editId ? 'Mettre à jour' : 'Ajouter'}
                </button>
                <button type="button" onClick={clearForm}>Annuler</button>
            </form>

            <h2>Liste des Directions</h2>
           
            <table>
                <thead>
                    <tr>
                        <th>Nom</th>
                        <th>Porte</th>
                        <th>Hiérarchie</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {directions.map((direction) => (
                        <tr key={direction.id_d}>
                            <td>{direction.nom_d}</td>
                            <td>{direction.porte_d}</td>
                            <td>{direction.hierarchy || 'N/A'}</td> {/* Affichage de la hiérarchie */}
                            <td>
                                <button onClick={() => editDirection(direction)}>Éditer</button>
                                <button onClick={() => deleteDirection(direction.id_d)}>Supprimer</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Direction;
