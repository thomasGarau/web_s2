import React from "react";
import {useNavigate} from "react-router-dom";
import './Presentation.css';

const Presentation = () => {
    const navigate = useNavigate();

    function handleLogin() {
        navigate("/login");
    }

    function handleRegister() {
        navigate("/register");
    }
    return (
        <div className="home-container">
            <div className="home-content">
                <h1>Bienvenue sur le Supermarché CRUDité</h1>
                <p>Ceci est votre page d'accueil. Connectez-vous ou inscrivez-vous pour démarrer.</p>
                <div>
                    <button onClick={handleLogin} className="link">Login</button> |
                    <button onClick={handleRegister} className="link">Register</button>
                </div>
            </div>
        </div>
    );
};

export default Presentation;
