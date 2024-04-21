import Cookies from 'js-cookie';
import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(Cookies.get('isAuthenticated') === 'true');
  const [isAdmin, setIsAdmin] = useState(Cookies.get('role') === 'admin');

  useEffect(() => {
    Cookies.set('isAuthenticated', isAuthenticated, { secure: true, sameSite: 'strict' });
    Cookies.set('role', isAdmin ? 'admin' : 'user', { secure: true, sameSite: 'strict' });
  }, [isAuthenticated, isAdmin]);

  const loginContext = (role) => {
    setIsAuthenticated(true);
    setIsAdmin(role === 'admin');
  };

  const logoutContext = () => {
    setIsAuthenticated(false);
    setIsAdmin(false);
    Cookies.remove('userToken');
    Cookies.remove('isAuthenticated');
    Cookies.remove('role');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, isAdmin, loginContext, logoutContext }}>
      {children}
    </AuthContext.Provider>
  );
};
