import React, { useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../../context/AuthProvider';
import { useAuthService } from '../../auth/AuthAPI';
import './NavBar.css'; // Assurez-vous que le chemin est correct

const Navbar = () => {
  const { isAuthenticated, isAdmin } = useContext(AuthContext);
  const navigate = useNavigate();
  const { logout } = useAuthService();
  const location = useLocation();
  const currentPath = location.pathname;

  const imgSrc = `${process.env.PUBLIC_URL}/Supermarche_2.png`;

  const handleLogout = () => {
    logout();
    navigate('/login');
  };
  const handleLogin = () => {
    navigate('/login');
  };
  const handleRegister = () => {
    navigate('/register');
  };
  const handleHome = () => {
    navigate('/');
  };
  const handleCategories = () => {
    navigate('/categorie');
  };
  const handleCart = () => {
    navigate('/panier');
  };
  const handleUsers = () => {
    navigate('/utilisateur');
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand" onClick={handleHome}>
        <img src={imgSrc} alt="Logo Supermarché" />Supermarché
      </div>
      <div className="nav-items">
        {!isAuthenticated ? (
          <>
            {currentPath === '/login' ? (
              <button onClick={handleRegister}>Inscription</button>
            ) : currentPath === '/register' ? (
              <button onClick={handleLogin}>Connexion</button>
            ) : (
              <>
                <button onClick={handleLogin}>Connexion</button>
                <button onClick={handleRegister}>Inscription</button>
              </>
            )}
          </>
        ) : (
          <>
            <button onClick={handleCategories}>Catégories</button>
            {!isAdmin ? (
              <>
                <button onClick={handleCart}>Panier</button>
              </>
            ) : (
              <>
                <button onClick={handleUsers}>Utilisateurs</button>
              </>
            )}
            <button onClick={handleLogout}>Déconnexion</button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
