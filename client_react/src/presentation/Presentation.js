import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import './Presentation.css';

const Presentation = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const homeContainer = document.querySelector('.home-container');
        const adjustAnimationSpeed = () => {
            const screenWidth = window.innerWidth;
            const screenHeight = window.innerHeight;
            const minDimension = Math.min(screenWidth, screenHeight); // Utilisez la dimension la plus petite
            const baseDimension = 1920; // Dimension de base pour le calcul
            const baseSpeed = 30; // Durée de base pour une dimension de 1920 pixels
            const speed = (baseSpeed * baseDimension) / minDimension; // Ajuste la durée basée sur la dimension la plus petite
            homeContainer.style.animationDuration = `${speed}s`;
        };

        adjustAnimationSpeed();
        window.addEventListener('resize', adjustAnimationSpeed);

        return () => {
            window.removeEventListener('resize', adjustAnimationSpeed);
        };
    }, []);

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
