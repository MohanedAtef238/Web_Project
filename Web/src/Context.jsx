import { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [token, setToken] = useState(() => {
    const storedToken = localStorage.getItem('jwt');
    if (storedToken) {
      try {
        const parts = storedToken.split('.');
        if (parts.length !== 3) {
          localStorage.removeItem('jwt');
          return null;
        }
        return storedToken;
      } catch (err) {
        localStorage.removeItem('jwt');
        return null;
      }
    }
    return null;
  });
  
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (token) {
      try {
        const decoded = jwtDecode(token);
        if (decoded.exp * 1000 < Date.now()) {
          console.log('Session expired, logging out...');
          logout();
        } else {
          // Ensure all required properties are present
          setUser({
            id: decoded.id || null,
            username: decoded.username || null,
            isAdmin: decoded.isAdmin || false,
            ...decoded
          });
        }
      } catch (err) {
        console.error("Invalid token:", err);
        logout();
      }
    } else {
      // Reset user when token is null
      setUser(null);
    }
  }, [token]);

  const login = (newToken) => {
    if (!newToken) {
      console.error("No token provided");
      return;
    }
    
    try {
      const decoded = jwtDecode(newToken);
      // Validate that required fields are present
      if (!decoded.id || !decoded.username) {
        throw new Error("Token missing required fields");
      }
      localStorage.setItem('jwt', newToken);
      setToken(newToken);
      setUser({
        id: decoded.id,
        username: decoded.username,
        isAdmin: decoded.isAdmin || false,
        ...decoded
      });
    } catch (err) {
      console.error("Invalid token format:", err);
      logout();
    }
  };

  const logout = () => {
    localStorage.removeItem('jwt');
    setToken(null);
    setUser(null);
    navigate('/');
  };

  return (
    <AuthContext.Provider value={{ token, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);