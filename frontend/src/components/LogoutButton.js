import { useNavigate } from 'react-router-dom';

const LogoutButton = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        // Supprimez les données utilisateur (par exemple, le token)
        localStorage.removeItem('authToken'); // Exemple avec localStorage
        localStorage.removeItem('userRole');

        // Redirigez l'utilisateur vers la page de connexion
        navigate('/login');
    };

    return (
        <button
            onClick={handleLogout}
            style={{
                padding: '10px 20px',
                fontSize: '16px',
                backgroundColor: '#f44336',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
            }}
        >
            Déconnexion
        </button>
    );
};

export default LogoutButton;
