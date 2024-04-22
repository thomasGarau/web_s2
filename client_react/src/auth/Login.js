import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthService } from '../auth/AuthAPI';
import './login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { login } = useAuthService();

  useEffect(() => {
    const loginContainer = document.querySelector('.login-container');
    const adjustAnimationSpeed = () => {
      const screenWidth = window.innerWidth;
      const screenHeight = window.innerHeight;
      const minDimension = Math.min(screenWidth, screenHeight); // Use the smallest dimension
      const baseDimension = 1920; // Base dimension, consider adjusting based on your background image
      const baseSpeed = 30; // Base duration for a dimension of 1920 pixels
      const speed = (baseSpeed * baseDimension) / minDimension; // Adjust duration based on the smallest dimension
      loginContainer.style.animationDuration = `${speed}s`;
    };

    adjustAnimationSpeed();
    window.addEventListener('resize', adjustAnimationSpeed);

    return () => {
      window.removeEventListener('resize', adjustAnimationSpeed);
    };
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    login(email, password).then(() => {
      navigate('/categorie');
    });
  };

  return (
    <div className="login-container">
      <div className="login-form-container">
        <h2>Connexion</h2>
        <form onSubmit={handleLogin} className="login-form">
          <div className="input-group">
            <label>Email</label>
            <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className="input-group">
            <label>Mot de passe</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <button type="submit" className="login-button">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
