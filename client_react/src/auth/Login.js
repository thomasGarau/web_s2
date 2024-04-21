import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {useAuthService} from '../auth/AuthAPI';
import './login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { login } = useAuthService();

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
            <label>email</label>
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
