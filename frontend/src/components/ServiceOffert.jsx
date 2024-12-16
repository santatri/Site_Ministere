import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

const ServiceOffert = () => {
    const [services, setServices] = useState([]);
    const [sgList, setSGList] = useState([]);
    const [dgList, setDGList] = useState([]);
    const [dList, setDList] = useState([]);
    const [sList, setSList] = useState([]);
    const [nom_service, setNomService] = useState('');
    const [dossier_prepare, setDossierPrepare] = useState('');
    const [delai, setDelai] = useState('');
    const [associationType, setAssociationType] = useState('');
    const [associationId, setAssociationId] = useState('');
    const [editId, setEditId] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');
    const [newDossierItem, setNewDossierItem] = useState('');
    const [dossierList, setDossierList] = useState([]);

    // Référence au formulaire
    const formRef = useRef(null);

    // Récupérer les services
    const fetchServices = async () => {
        try {
            const response = await axios.get('http://localhost:5001/api/serviceOffert/all');
            setServices(response.data.data);
        } catch (error) {
            console.error("Erreur lors de la récupération des services:", error);
        }
    };

    // Récupérer les données SG, DG, D, et S
    const fetchSGDGDS = async () => {
        try {
            const [sgResponse, dgResponse, dResponse, sResponse] = await Promise.all([
                axios.get('http://localhost:5001/api/direction/sg'),
                axios.get('http://localhost:5001/api/direction/dg'),
                axios.get('http://localhost:5001/api/direction/all'),
                axios.get('http://localhost:5001/api/service/all'),
            ]);
            setSGList(sgResponse.data.data);
            setDGList(dgResponse.data.data);
            setDList(dResponse.data.data);
            setSList(sResponse.data.data);
        } catch (error) {
            console.error("Erreur lors de la récupération des données:", error);
        }
    };

    useEffect(() => {
        fetchServices();
        fetchSGDGDS();
    }, []);

    // Créer ou mettre à jour un service
    const createOrUpdateService = async () => {
        if (!nom_service || !associationType || !associationId) {
            setErrorMessage('Veuillez remplir le nom du service et sélectionner une association.');
            return;
        }

        const dossierPrepareStr = dossierList.join(', ');

        try {
            const data = {
                nom_service,
                dossier_prepare: dossierPrepareStr,
                delai,
                id_sg: associationType === 'SG' ? associationId : null,
                id_dg: associationType === 'DG' ? associationId : null,
                id_d: associationType === 'D' ? associationId : null,
                id_s: associationType === 'S' ? associationId : null,
            };

            if (editId) {
                await axios.put(`http://localhost:5001/api/serviceOffert/${editId}`, data);
            } else {
                await axios.post('http://localhost:5001/api/serviceOffert', data);
            }

            fetchServices();
            clearForm();
        } catch (error) {
            console.error("Erreur lors de l'ajout ou la mise à jour du service:", error);
        }
    };

    const clearForm = () => {
        setNomService('');
        setDossierPrepare('');
        setDelai('');
        setAssociationType('');
        setAssociationId('');
        setEditId(null);
        setErrorMessage('');
        setDossierList([]);
        setNewDossierItem('');
    };

    const editService = (service) => {
        setEditId(service.id_service);
        setNomService(service.nom_service);
        setDossierPrepare(service.dossier_prepare || '');
        setDelai(service.delai || '');
        if (service.nom_sg) setAssociationType('SG');
        else if (service.nom_dg) setAssociationType('DG');
        else if (service.nom_d) setAssociationType('D');
        else if (service.nom_s) setAssociationType('S');
        setAssociationId(service.id_sg || service.id_dg || service.id_d || service.id_s);

        const dossierItems = service.dossier_prepare ? service.dossier_prepare.split(', ') : [];
        setDossierList(dossierItems);
        formRef.current.scrollIntoView({ behavior: 'smooth' });
    };

    const deleteService = async (id) => {
        try {
            await axios.delete(`http://localhost:5001/api/serviceOffert/${id}`);
            fetchServices();
        } catch (error) {
            console.error("Erreur lors de la suppression du service:", error);
        }
    };

    const addDossierItem = () => {
        if (newDossierItem) {
            setDossierList((prevList) => [...prevList, newDossierItem]);
            setNewDossierItem('');
        }
    };

    const removeDossierItem = (index) => {
        setDossierList((prevList) => prevList.filter((_, i) => i !== index));
    };

    const getAssociationName = (service) => {
        if (service.nom_sg) return service.nom_sg;
        if (service.nom_dg) return service.nom_dg;
        if (service.nom_d) return service.nom_d;
        if (service.nom_s) return service.nom_s;
        return 'Aucune association';
    };

    return (
        <div>
            <h1>Gestion des Services Offerts</h1>
            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
            <form ref={formRef}>
                <input
                    type="text"
                    value={nom_service}
                    onChange={(e) => setNomService(e.target.value)}
                    placeholder="Nom du service"
                />
                <div>
                    <input
                        type="text"
                        value={newDossierItem}
                        onChange={(e) => setNewDossierItem(e.target.value)}
                        placeholder="Ajouter un élément au dossier"
                    />
                    <button type="button" onClick={addDossierItem}>Ajouter</button>
                </div>
                <ul>
                    {dossierList.map((item, index) => (
                        <li key={index}>
                            {item} <button type="button" onClick={() => removeDossierItem(index)}>Supprimer</button>
                        </li>
                    ))}
                </ul>
                <input
                    type="text"
                    value={delai}
                    onChange={(e) => setDelai(e.target.value)}
                    placeholder="Délai"
                />
                <select value={associationType} onChange={(e) => setAssociationType(e.target.value)}>
                    <option value="">Associer à</option>
                    <option value="SG">Secrétaire Général</option>
                    <option value="DG">Direction Générale</option>
                    <option value="D">Direction</option>
                    <option value="S">Service</option>
                </select>
                {associationType === 'SG' && (
                    <select value={associationId} onChange={(e) => setAssociationId(e.target.value)}>
                        <option value="">Sélectionner un SG</option>
                        {sgList.map((sg) => (
                            <option key={sg.id_sg} value={sg.id_sg}>{sg.nom_sg}</option>
                        ))}
                    </select>
                )}
                {associationType === 'DG' && (
                    <select value={associationId} onChange={(e) => setAssociationId(e.target.value)}>
                        <option value="">Sélectionner un DG</option>
                        {dgList.map((dg) => (
                            <option key={dg.id_dg} value={dg.id_dg}>{dg.nom_dg}</option>
                        ))}
                    </select>
                )}
                {associationType === 'D' && (
                    <select value={associationId} onChange={(e) => setAssociationId(e.target.value)}>
                        <option value="">Sélectionner une Direction</option>
                        {dList.map((d) => (
                            <option key={d.id_d} value={d.id_d}>{d.nom_d}</option>
                        ))}
                    </select>
                )}
                {associationType === 'S' && (
                    <select value={associationId} onChange={(e) => setAssociationId(e.target.value)}>
                        <option value="">Sélectionner un Service</option>
                        {sList.map((s) => (
                            <option key={s.id_s} value={s.id_s}>{s.nom_s}</option>
                        ))}
                    </select>
                )}
                <button type="button" onClick={createOrUpdateService}>
                    {editId ? 'Mettre à jour' : 'Ajouter'}
                </button>
                <button type="button" onClick={clearForm}>Annuler</button>
            </form>

            <table>
                <thead>
                    <tr>
                        <th>Nom</th>
                        <th>Dossier Préparé</th>
                        <th>Delai</th>
                        <th>Association</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {services
                    .sort((a, b) => a.nom_service.localeCompare(b.nom_service)) // Sort alphabetically
                    .map((service) => (
                        <tr key={service.id_service}>
                            <td>{service.nom_service}</td>
                            <td>{service.dossier_prepare || 'N/A'}</td>
                            <td>{service.delai || 'N/A'}</td>
                            <td>{service.hierarchy}</td>
                            <td>
                                <button onClick={() => editService(service)}>Modifier</button>
                                <button onClick={() => deleteService(service.id_service)}>Supprimer</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ServiceOffert;
