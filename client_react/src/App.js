import { React, useEffect, useContext } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import history from './config/history';
import Navbar from './component/navBar/NavBar';
import Presentation from './presentation/Presentation';
import Login from './auth/Login';
import Register from './auth/Register';
import Categori from './categori/Categori';
import Produit from './produit/Produit';
import Panier from './panier/Panier';
import BackOffice from './backOffice/BackOffice';
import PublicRoute from './component/route/PublicRoute';
import PrivateRouteContext from './component/route/PrivateRouteContext';
import { AuthContext } from './context/AuthProvider';

function App() {

  const { logoutContext } = useContext(AuthContext);

  useEffect(() => {
    const handleLogout = () => {
      logoutContext();
    };

    window.addEventListener('logoutRequired', handleLogout);

    return () => {
      window.removeEventListener('logoutRequired', handleLogout);
    };
  }, [logoutContext]);

  return (
    <Router history={history}>
      <div>
        <Navbar />
          <Routes>
            {/* public routes redirigé vers homePage si utilisateur deja co*/}
            <Route path="/login" element={<PublicRoute element={() => <Login />} />} />
            <Route path="/register" element={<PublicRoute element={() => <Register />} />} />
            <Route path="/presentation" element={<PublicRoute element={() => <Presentation />} />} />
            
            {/* private routes  redirigé vers Login si utilisateur pas co*/}
            <Route path="/categorie" element={<PrivateRouteContext element={Categori} />} />
            <Route path="/produit" element={<PrivateRouteContext element={Produit} />} />
            <Route path="/panier" element={<PrivateRouteContext element={Panier} />} />
            <Route path="/utilisateur" element={<PrivateRouteContext element={BackOffice} />} />
            <Route path="/" element={<Presentation />} />
          </Routes>
      </div>
    </Router>
  );
}

export default App;