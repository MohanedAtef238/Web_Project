import { createContext, useContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => {
    const storedToken = localStorage.getItem('jwt');
    return storedToken || null;
  });

  const [user, setUser] = useState(() => {
    const storedToken = localStorage.getItem('jwt');
    if (storedToken) {
      try {
        return jwtDecode(storedToken);
      } catch (error) {
        console.error('Error decoding token:', error);
        localStorage.removeItem('jwt');
        return null;
      }
    }
    return null;
  });

  const login = (newToken) => {
    if (!newToken) {
      console.error('No token provided');
      return;
    }

    try {
      const decoded = jwtDecode(newToken);
      localStorage.setItem('jwt', newToken);
      setToken(newToken);
      setUser(decoded);
    } catch (error) {
      console.error('Error during login:', error);
      localStorage.removeItem('jwt');
      setToken(null);
      setUser(null);
    }
  };

  const logout = () => {
    localStorage.removeItem('jwt');
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ token, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};