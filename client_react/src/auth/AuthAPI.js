import axios from 'axios';
import Cookies from 'js-cookie';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthProvider';

const API_URL = 'http://localhost:3001/user';

export const useAuthService = () => {
  const { loginContext, logoutContext } = useContext(AuthContext);

  const login = async (email, password) => {
    try {
      const response = await axios.post(`${API_URL}/login`, { email, password });
      if (response.data.token) {
        Cookies.set('userToken', response.data.token);
        Cookies.set('role', response.data.role);
        loginContext(response.data.role);
      }
      return response.data;
    } catch (error) {
      console.error("Une erreur est survenue lors de la tentative de connexion : ", error);
    }
  };
  const register = async (email, password, name, firstname) => {
    try {
      console.log('register', email, password, name, firstname)
      const response = await axios.post(`${API_URL}/register`, {
        email,
        password,
        name,
        firstname,
      });
      if (response.data.token) {
        Cookies.set('userToken', response.data.token);
        Cookies.set('role', response.data.role);
        loginContext(response.data.role);
      }
      return response.data;
    } catch (error) {
      console.error("Une erreur est survenue lors de l'inscription : ", error);
    }
  };

  const logout = () => {
    Cookies.remove('userToken');
    logoutContext();
  };

  const verifyToken = async () => {
    const token = Cookies.get('userToken');
    try {
      const response = await axios.get(`${API_URL}/verify-token`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (response.data.status === 'success') {
        return true;
      }
      throw new Error('Token invalide');
    } catch (error) {
      console.error("Une erreur est survenue lors de la vérification du token : ", error);
    }
  };

  return { login, register, logout, verifyToken };
};
