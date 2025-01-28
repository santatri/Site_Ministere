import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import '../styles/ServiceOffert.css';

const ServiceOffert = () => {
    const [services, setServices] = useState([]);
    const [filteredServices, setFilteredServices] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
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
    const [activeFrame, setActiveFrame] = useState('liste'); // Etat pour gérer le cadre actif

    const formRef = useRef(null);

    const fetchServices = async () => {
        try {
            const response = await axios.get('http://localhost:5001/api/serviceOffert/all');
            const sortedServices = response.data.data.sort((a, b) =>
                a.nom_service.localeCompare(b.nom_service, 'fr', { sensitivity: 'base' })
            );
            setServices(sortedServices);
            setFilteredServices(sortedServices);
        } catch (error) {
            console.error("Erreur lors de la récupération des services:", error);
        }
    };

    useEffect(() => {
        fetchSGDGDS();
    }, []);
    
    const fetchSGDGDS = async () => {
        try {
            const [sgResponse, dgResponse, dResponse, sResponse] = await Promise.all([
                axios.get('http://localhost:5001/api/direction/sg'),
                axios.get('http://localhost:5001/api/direction/dg'),
                axios.get('http://localhost:5001/api/direction/all'),
                axios.get('http://localhost:5001/api/service/all'),
            ]);
    
            console.log("SG Data:", sgResponse.data.data);
            console.log("DG Data:", dgResponse.data.data);
            console.log("D Data:", dResponse.data.data);
            console.log("S Data:", sResponse.data.data);
    
            setSGList(sgResponse.data.data || []);
            setDGList(dgResponse.data.data || []);
            setDList(dResponse.data.data || []);
            setSList(sResponse.data.data || []);
        } catch (error) {
            console.error("Erreur lors de la récupération des données:", error);
        }
    };
    

    useEffect(() => {
        fetchServices();
        fetchSGDGDS();
    }, []);

    const handleSearch = (e) => {
        const term = e.target.value.toLowerCase();
        setSearchTerm(term);
        const filtered = services.filter((service) =>
            service.nom_service.toLowerCase().includes(term)
        );
        setFilteredServices(filtered);
    };

    const createOrUpdateService = async () => {
        if (!nom_service || !associationType || !associationId) {
            setErrorMessage('Veuillez remplir le nom du service et sélectionner une association.');
            return;
        }

        try {
            const data = {
                nom_service,
                dossier_prepare,
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
        
        // Mettre à jour l'état de activeFrame pour afficher le formulaire d'ajout
        setActiveFrame('ajout');
    
        // Forcer le défilement vers le formulaire même si formRef.current est null
        if (formRef.current) {
            formRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };
    
    

    const deleteService = async (id) => {
        try {
            await axios.delete(`http://localhost:5001/api/serviceOffert/${id}`);
            fetchServices();
        } catch (error) {
            console.error("Erreur lors de la suppression du service:", error);
        }
    };

    const getAssociationName = (service) => {
        if (service.nom_sg) return service.nom_sg;
        if (service.nom_dg) return service.nom_dg;
        if (service.nom_d) return service.nom_d;
        if (service.nom_s) return service.nom_s;
        return 'Aucune association';
    };

    return (
        <div className="ServiceOffert">
            <h1 className="ServiceOffert__title">Gestion des Services Offerts</h1>
            {errorMessage && <p className="ServiceOffert__error">{errorMessage}</p>}

            <div className="ServiceOffert__buttons">
                <button
                    className="ServiceOffert__button"
                    onClick={() => setActiveFrame('ajout')}
                >
                    Ajouter un service
                </button>
                <button
                    className="ServiceOffert__button"
                    onClick={() => setActiveFrame('liste')}
                >
                    Liste des services
                </button>
            </div>

            {/* Formulaire d'ajout */}
            {activeFrame === 'ajout' && (
                <form className="ServiceOffert__form" ref={formRef}>
                    <input
                        className="ServiceOffert__input"
                        type="text"
                        value={nom_service}
                        onChange={(e) => setNomService(e.target.value)}
                        placeholder="Nom du service"
                    />
                    <textarea
                        className="ServiceOffert__textarea"
                        value={dossier_prepare}
                        onChange={(e) => setDossierPrepare(e.target.value)}
                        placeholder="Liste des éléments du dossier (séparés par des virgules)"
                        rows="4"
                    />
                    <input
                        className="ServiceOffert__input"
                        type="text"
                        value={delai}
                        onChange={(e) => setDelai(e.target.value)}
                        placeholder="Délai"
                    />
                    <select
                        className="ServiceOffert__select"
                        value={associationType}
                        onChange={(e) => setAssociationType(e.target.value)}
                    >
                        <option value="">Associer à</option>
                        <option value="SG">SG ou Ministre</option>
                        <option value="DG">Direction Générale</option>
                        <option value="D">Direction</option>
                        <option value="S">Service</option>
                    </select>
                    {associationType === 'SG' && (
                        <select
                            className="ServiceOffert__select"
                            value={associationId}
                            onChange={(e) => setAssociationId(e.target.value)}
                        >
                            <option value="">Sélectionner SG ou Ministre</option>
                            {sgList.map((sg) => (
                                <option key={sg.id_sg} value={sg.id_sg}>{sg.nom_sg}</option>
                            ))}
                        </select>
                    )}
                    {associationType === 'DG' && (
                        <select
                            className="ServiceOffert__select"
                            value={associationId}
                            onChange={(e) => setAssociationId(e.target.value)}
                        >
                            <option value="">Sélectionner un DG</option>
                            {dgList.map((dg) => (
                                <option key={dg.id_dg} value={dg.id_dg}>{dg.nom_dg}</option>
                            ))}
                        </select>
                    )}
                    {associationType === 'D' && (
                        <select
                            className="ServiceOffert__select"
                            value={associationId}
                            onChange={(e) => setAssociationId(e.target.value)}
                        >
                            <option value="">Sélectionner une Direction</option>
                            {dList.map((d) => (
                                <option key={d.id_d} value={d.id_d}>{d.nom_d}</option>
                            ))}
                        </select>
                    )}
                    {associationType === 'S' && (
                        <select
                            className="ServiceOffert__select"
                            value={associationId}
                            onChange={(e) => setAssociationId(e.target.value)}
                        >
                            <option value="">Sélectionner un Service</option>
                            {sList.map((s) => (
                                <option key={s.id_s} value={s.id_s}>{s.nom_s}</option>
                            ))}
                        </select>
                    )}
                    <button type="button" onClick={createOrUpdateService}>
                        {editId ? 'Mettre à jour le service' : 'Ajouter le service'}
                    </button>
                    <button type="button" onClick={clearForm}>Annuler</button>
                </form>
            )}

            {/* Liste des services */}
            {activeFrame === 'liste' && (
                <div className="ServiceOffert__list">
                    <h1>Liste des services offerts</h1>
                    <input
                        className="ServiceOffert__search"
                        type="text"
                        value={searchTerm}
                        onChange={handleSearch}
                        placeholder="Rechercher un service"
                    />
                    {filteredServices.length > 0 ? (
                        <table className="ServiceOffert__table">
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
                            {filteredServices.map((service) => (
                        <tr key={service.id_service}>
                            <td>{service.nom_service}</td>
                            <td>{service.dossier_prepare || 'N/A'}</td>
                            <td>{service.delai || 'N/A'}</td>
                            <td>{service.hierarchy }</td>
                            <td>
                                            <button className='ServiceOffert__button--edit' onClick={() => editService(service)}>Modifier</button>
                                            <button className='ServiceOffert__button--delete' onClick={() => deleteService(service.id_service)}>Supprimer</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <p>Aucun service trouvé.</p>
                    )}
                </div>
            )}
        </div>
    );
};

export default ServiceOffert; 