import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthService } from '../auth/AuthAPI';
import { validateEmail, validatePassword } from '../services/regex';
import './register.css';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState({});
  const navigate = useNavigate();
  const { register } = useAuthService();

  useEffect(() => {
    const registerContainer = document.querySelector('.register-container');
    const adjustAnimationSpeed = () => {
      const screenWidth = window.innerWidth;
      const screenHeight = window.innerHeight;
      const minDimension = Math.min(screenWidth, screenHeight); // Use the smallest dimension
      const baseDimension = 1920; // Base dimension for the calculation
      const baseSpeed = 30; // Base duration for a dimension of 1920 pixels
      const speed = (baseSpeed * baseDimension) / minDimension; // Adjust duration based on the smallest dimension
      registerContainer.style.animationDuration = `${speed}s`;
    };

    adjustAnimationSpeed();
    window.addEventListener('resize', adjustAnimationSpeed);

    return () => {
      window.removeEventListener('resize', adjustAnimationSpeed);
    };
  }, []);

  const handleRegister = (e) => {
    e.preventDefault();
    let isValid = true;
    let errors = {};

    if (!validateEmail(email)) {
      errors.email = 'Format d\'email invalide';
      setEmail('');
      isValid = false;
    }

    if (!validatePassword(password)) {
      errors.password = 'Le mot de passe doit contenir au moins 12 caractères, dont une majuscule, une minuscule, un chiffre et un caractère spécial';
      setPassword('');
      setConfirmPassword('');
      isValid = false;
    }

    if (password !== confirmPassword) {
      errors.confirmPassword = 'Les mots de passe ne correspondent pas';
      setConfirmPassword('');
      isValid = false;
    }

    setError(errors);

    if (isValid) {
      register(email, password, firstName, name).then(() => {
        navigate('/categorie');
      });
    }
  };

  return (
    <div className="register-container">
      <div className="register-form-container">
        <h2>Inscription</h2>
        <form onSubmit={handleRegister} className="register-form">
          <div className="input-group">
            <label>Prénom</label>
            <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
            {error.firstName && <div className="error-message">{error.firstName}</div>}
          </div>
          <div className="input-group">
            <label>Nom</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
            {error.name && <div className="error-message">{error.name}</div>}
          </div>
          <div className="input-group">
            <label>Email</label>
            <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
            {error.email && <div className="error-message">{error.email}</div>}
          </div>
          <div className="input-group">
            <label>Mot de passe</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            {error.password && <div className="error-message">{error.password}</div>}
          </div>
          <div className="input-group">
            <label>Confirmer le mot de passe</label>
            <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
            {error.confirmPassword && <div className="error-message">{error.confirmPassword}</div>}
          </div>
          <button type="submit" className="register-button">Register</button>
        </form>
      </div>
    </div>
  );
};

export default Register;
