import React, { useEffect, useState } from 'react';
import axios from 'axios';
import LogoutButton from '../components/LogoutButton';
import '../styles/AdminPage1.css';
import Actualité from '../components/Actualité';
import { FaUsers, FaNewspaper, FaStar, FaEdit, FaTrash, FaCheck, FaInfoCircle, FaConciergeBell, FaChartBar ,FaEnvelope  , FaArrowDown , FaSlideshare, FaAngleDown, FaLongArrowAltDown } from 'react-icons/fa';
import AdminNavbar from '../components/AdminNavbar';
import ALaUne from '../components/ALaUne';
import logo from '../assets/dgfop.png'; // Remplacez par le chemin réel de votre logo
import DGFormAndDisplay from '../components/DGFormAndDisplay';
import VisitorCounter from '../components/VisitorCounter';

import  SecretaireGeneral from'../components/SecretaireGeneral';
import  DirectionGenerale from'../components/DirectionGenerale';
import  Direction from'../components/Direction';
import  Service from'../components/Service';
import  ServiceOffert from'../components/ServiceOffert';

import DForm from '../components/DForm';
import Message from './Contact/Message';


// import { useAuth } from '../context/authContext';
;

const AdminPage1 = () => {
  
  
  const [users, setUsers] = useState([]);
  const [activeSection, setActiveSection] = useState('utilisateurs');
  const [message, setMessage] = useState('');
  const [editingUser, setEditingUser] = useState(null);
  const [editForm, setEditForm] = useState({
    nom: '',
    prenom: '',
    matricule: '',
    role: '',
  });
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:5001/api/users1/list');
        setUsers(response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des utilisateurs:', error);
      }
    };
    fetchUsers();
  }, []);

  const filteredUsers = users.filter((user) =>
    user.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.prenom.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.matricule.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.role.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
// validation un utilisateur
  const handleValidate = async (id) => {
    try {
      await axios.put(`http://localhost:5001/api/users1/validate/${id}`);
      setMessage('Utilisateur validé avec succès');
      setUsers(users.map((user) => (user.id === id ? { ...user, validated: true } : user)));
    } catch (error) {
      console.error('Erreur lors de la validation:', error);
      setMessage('Erreur lors de la validation');
    }
  };

  const handleinValidate = async (id) => {
    try {
      await axios.put(`http://localhost:5001/api/users1/invalidate/${id}`);
      setMessage('Utilisateur invalidé avec succès');
      setUsers(users.map((user) => (user.id === id ? { ...user, validated: true } : user)));
    } catch (error) {
      console.error('Erreur lors de la invalidation:', error);
      setMessage('Erreur lors de la invalidation');
    }
  };
// Supprimer les utilisateurs
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5001/api/users1/${id}`);
      setMessage('Utilisateur supprimé avec succès');
      setUsers(users.filter((user) => user.id !== id));
    } catch (error) {
      console.error('Erreur lors de la suppression:', error);
      setMessage('Erreur lors de la suppression');
    }
  };
 // Active la mode edition
  const handleEdit = (user) => {
    setEditingUser(user.id);
    setEditForm({
      nom: user.nom,
      prenom: user.prenom,
      matricule: user.matricule,
      role: user.role,
    });
  };
// Gestion des champs formulaire
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };
// Enrregistrer les modifications
  const handleSaveEdit = async (id) => {
    try {
      await axios.put(`http://localhost:5001/api/users1/update/${id}`, editForm);
      setMessage('Utilisateur modifié avec succès');
      setUsers(users.map((user) =>
        user.id === id ? { ...user, ...editForm } : user
      ));
      setEditingUser(null);
    } catch (error) {
      console.error('Erreur lors de la modification:', error);
      setMessage('Erreur lors de la modification');
    }
  };

  //Annuler la modification

  const handleCancelEdit = () => {
    setEditingUser(null);
  };

  return (
    
    <div className="dashboard">
      
      {/* Colonne gauche */}
      <div className="sidebar">
      <div className="logo-containeres">
        <img src={logo} alt="DGFOP Logo" className="log" />
    </div>
        <div className="menu">
          <button
            className={`menu-item ${activeSection === 'utilisateurs' ? 'active' : ''}`}
            onClick={() => setActiveSection('utilisateurs')}
          >
            <FaUsers /> Utilisateurs
          </button>
          <button
            className={`menu-item ${activeSection === 'actualites' ? 'active' : ''}`}
            onClick={() => setActiveSection('actualites')}
          >
            <FaNewspaper /> Actualités
          </button>
          <button
            className={`menu-item ${activeSection === 'a-la-une' ? 'active' : ''}`}
            onClick={() => setActiveSection('a-la-une')}
          >
            < FaStar /> À la une
          </button>
        
          {/* Nouveau bouton "À propos" */}
          <button
            className={`menu-item ${activeSection === 'a-propos' ? 'active' : ''}`}
            onClick={() => setActiveSection('a-propos')}
          >
            <FaInfoCircle /> À propos
          </button>
          {/* Nouveau bouton "Services" */}
          <button
            className={`menu-item ${activeSection === 'services' ? 'active' : ''}`}
            onClick={() => setActiveSection('services')}
          >
            <FaConciergeBell /> Services
          </button>
          <button
            className={`menu-item ${activeSection === 'indicateurs' ? 'active' : ''}`}
            onClick={() => setActiveSection('indicateurs')}
          >
            <FaChartBar /> Indicateurs
          </button>
          <button
            className={`menu-item ${activeSection === 'slide' ? 'active' : ''}`}
            onClick={() => setActiveSection('slides')}
          >
            <FaSlideshare /> Slides
          </button>
          <button
            className={`menu-item ${activeSection === 'Message' ? 'active' : ''}`}
            onClick={() => setActiveSection('Message')}
          >
            <FaEnvelope /> Message
          </button>
          <button
            className={`menu-item ${activeSection === 'footer' ? 'active' : ''}`}
            onClick={() => setActiveSection('footer')}
          >
            <FaArrowDown /> Footer
          </button>
        </div>
        <LogoutButton />
      </div>

      {/* Colonne droite */}
      <div className="content">
        {/* En-tête */}
        <AdminNavbar/>

        {/* Sections conditionnelles */}
        {activeSection === 'utilisateurs' && (
          <div className="users-section">
            <div className="section-header">
              <h2>Gestion des Utilisateurs</h2>
              <div className="search-container">
                <input
                  type="text"
                  placeholder="Rechercher..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="search-input"
                />
                <button className="search-button">Rechercher</button>
              </div>
            </div>
            {message && <p className="messagess">{message}</p>}
            <h3>Utilisateurs non validés</h3>
            {filteredUsers.some((user) => !user.validated) ? (
              <table>
                <thead>
                  <tr>
                    <th>Nom</th>
                    <th>Prénom</th>
                    <th>Matricule</th>
                    <th>Rôle</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map(
                    (user) =>
                      !user.validated && (
                        <tr key={user.id}>
                          <td>{user.nom}</td>
                          <td>{user.prenom}</td>
                          <td>{user.matricule}</td>
                          <td>{user.role}</td>
                          <td>
                            <button
                              onClick={() => handleValidate(user.id)}
                              className="btn btn-validate"
                            >
                              <FaCheck /> 
                            </button>
                            <button
                              onClick={() => handleDelete(user.id)}
                              className="btn btn-delete"
                            >
                              <FaTrash /> 
                            </button>
                          </td>
                        </tr>
                      )
                  )}
                </tbody>
              </table>
            ) : (
              <p className='messages'>Aucun utilisateur en attente de validation</p>
            )}

            <h3>Tous les utilisateurs</h3>
            <table>
  <thead>
    <tr>
      <th>Nom</th>
      <th>Prénom</th>
      <th>Matricule</th>
      <th>Rôle</th>
      <th>Validation</th>
      <th>bloqué</th>
      <th>Action</th>
    </tr>
  </thead>
  <tbody>
    {filteredUsers.map((user) => (
      <tr key={user.id}>
        {editingUser === user.id ? (
          <>
            <td>
              <input
                type="text"
                name="nom"
                value={editForm.nom}
                onChange={handleInputChange}
              />
            </td>
            <td>
              <input
                type="text"
                name="prenom"
                value={editForm.prenom}
                onChange={handleInputChange}
              />
            </td>
            <td>
              <input
                type="text"
                name="matricule"
                value={editForm.matricule}
                onChange={handleInputChange}
              />
            </td>
            <td>
              <input
                type="text"
                name="role"
                value={editForm.role}
                onChange={handleInputChange}
              />
            </td>
            <td colSpan="2">
              <button onClick={() => handleSaveEdit(user.id)} className="btn btn-save">
                Enregistrer
              </button>
              <button onClick={handleCancelEdit} className="btn btn-cancel">
                Annuler
              </button>
            </td>
          </>
        ) : (
          <>
            <td>{user.nom}</td>
            <td>{user.prenom}</td>
            <td>{user.matricule}</td>
            <td>{user.role}</td>
            <td>{user.validated ? 'Validé' : 'Non validé'}</td>
            <td>
              {user.validated ? (
                <button
                  onClick={() => handleinValidate(user.id)}
                  className="btn btn-validate"
                >
                  bloqué
                </button>
              ) : null}
            </td>
            <td>
              <button onClick={() => handleEdit(user)} className="btn btn-edit">
                <FaEdit />
              </button>
              <button
                onClick={() => handleDelete(user.id)}
                className="btn btn-delete"
              >
                <FaTrash />
              </button>
            </td>
          </>
        )}
      </tr>
    ))}
  </tbody>
</table>
          </div>
        )}
        {activeSection === 'actualites' && <Actualité />}
        {activeSection === 'a-la-une' && <ALaUne />}
        {activeSection === 'services' && [<SecretaireGeneral/> ,<DirectionGenerale/> ,<Direction/> , <Service/> , <ServiceOffert/>]}
        
        {activeSection === 'a-propos' &&  [<DGFormAndDisplay />, <DForm/>]}
        {activeSection === 'indicateurs' &&<VisitorCounter/>}
        {activeSection === 'Message' &&<Message/>}


      </div>
    </div>
  );
};

export default AdminPage1;
