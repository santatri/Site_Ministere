import React, { useEffect, useState } from 'react';
import axios from 'axios';
import LogoutButton from '../components/LogoutButton';
import '../styles/AdminPage1.css';

const AdminPage1 = () => {
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState('');

  // Charger les utilisateurs non validés
  useEffect(() => {
    const fetchUnvalidatedUsers = async () => {
      try {
        const response = await axios.get('http://localhost:5001/api/users1/unvalidated');
        setUsers(response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des utilisateurs:', error);
      }  
    };

    fetchUnvalidatedUsers();
  }, []);

//   const fetchUsers = async () => {
//     try {
//         const response = await axios.get('http://localhost:5001/api/users1');
//         setUsers(response.data);
//     } catch (error) {
//         console.error('Erreur lors de la récupération des des users:', error);
//     }
// };

  // Valider un utilisateur
  const handleValidate = async (id) => {
    try {
      await axios.put(`http://localhost:5001/api/users1/validate/${id}`);
      setMessage('Utilisateur validé avec succès');
      // Supprimer l'utilisateur validé de la liste
      setUsers(users.filter((user) => user.id !== id));
    } catch (error) {
      console.error('Erreur lors de la validation:', error);
      setMessage('Erreur lors de la validation');
    }
  };

  return (
    <div>
      <h1>Page d'Admin</h1>
      <div>
      <h2>Validation des utilisateurs</h2>
      {message && <p>{message}</p>}
      {users.length > 0 ? (
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
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.nom}</td>
                <td>{user.prenom}</td>
                <td>{user.matricule}</td>
                <td>{user.role}</td>
                <td>
                  {user.image ? (
                    <img src={`http://localhost:5001/uploads/${user.image}`} alt="Profil" style={{ width: '50px', height: '50px' }} />
                  ) : (
                    'Aucune image'
                  )}
                </td>
                <td>
                  <button onClick={() => handleValidate(user.id)}>Valider</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>Aucun utilisateur en attente de validation</p>
      )}
      
      
      </div>


      <div>
      <h2>Liste des utilisateurs</h2>
      
      
        <table>
          <thead>
            <tr>
              <th>Nom</th>
              <th>Prénom</th>
              <th>Matricule</th>
              <th>Rôle</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.nom}</td>
                <td>{user.prenom}</td>
                <td>{user.matricule}</td>
                <td>{user.role}</td>
                <td>{user.created_at}</td>
                
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <LogoutButton />
    </div>
    
  );
};

export default AdminPage1;
