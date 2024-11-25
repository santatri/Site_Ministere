import React, { useEffect, useState } from 'react';
import axios from 'axios';
import LogoutButton from '../components/LogoutButton';
import '../styles/AdminPage1.css';
import Actualité from '../components/Actualité';

const AdminPage1 = () => {
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState('');
  const [editingUser, setEditingUser] = useState(null);
  const [editForm, setEditForm] = useState({
    nom: '',
    prenom: '',
    matricule: '',
    role: '',
  });

  // Récupération des utilisateurs
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

  // Valider un utilisateur
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

  // Supprimer un utilisateur
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

  // Activer le mode édition
  const handleEdit = (user) => {
    setEditingUser(user.id);
    setEditForm({
      nom: user.nom,
      prenom: user.prenom,
      matricule: user.matricule,
      role: user.role,
    });
  };

  // Gestion des champs du formulaire
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  // Enregistrer les modifications
  const handleSaveEdit = async (id) => {
    try {
      await axios.put(`http://localhost:5001/api/users1/${id}`, editForm);
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

  // Annuler la modification
  const handleCancelEdit = () => {
    setEditingUser(null);
  };

  return (
    <div className="container">
      <h1>Page d'Admin</h1>

      <div className="validation-section">
        <h2>Utilisateurs non validés</h2>
        {message && <p className="message">{message}</p>}
        {users.some((user) => !user.validated) ? (
          <table>
            <thead>
              <tr>
                <th>Nom</th>
                <th>Prénom</th>
                <th>Matricule</th>
                <th>Rôle</th>
                <th>Image</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map(
                (user) =>
                  !user.validated && (
                    <tr key={user.id}>
                      <td>{user.nom}</td>
                      <td>{user.prenom}</td>
                      <td>{user.matricule}</td>
                      <td>{user.role}</td>
                      <td>
                        {user.image ? (
                          <img
                            src={`http://localhost:5001/uploads/${user.image}`}
                            alt="Profil"
                            style={{ width: '50px', height: '50px' }}
                          />
                        ) : (
                          'Aucune image'
                        )}
                      </td>
                      <td>
                        <button onClick={() => handleValidate(user.id)}>Valider</button>
                        <button
                          onClick={() => handleDelete(user.id)}
                          style={{
                            marginLeft: '10px',
                            backgroundColor: 'red',
                            color: 'white',
                          }}
                        >
                          Supprimer
                        </button>
                      </td>
                    </tr>
                  )
              )}
            </tbody>
          </table>
        ) : (
          <p>Aucun utilisateur en attente de validation</p>
        )}
      </div>

      <div className="all-users-section">
        <h2>Tous les utilisateurs</h2>
        <table>
          <thead>
            <tr>
              <th>Nom</th>
              <th>Prénom</th>
              <th>Matricule</th>
              <th>Rôle</th>
              <th>Validation</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
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
                      <button onClick={() => handleEdit(user)} className="btn btn-edit">
                        Modifier
                      </button>
                      <button
                        onClick={() => handleDelete(user.id)}
                        className="btn btn-delete"
                      >
                        Supprimer
                      </button>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div>
        <Actualité />
      </div>

      <footer>
        <p>© 2024 Admin Panel - Tous droits réservés</p>
      </footer>

      <LogoutButton />
    </div>
  );
};

export default AdminPage1;
