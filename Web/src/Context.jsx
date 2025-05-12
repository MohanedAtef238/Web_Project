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
        console.log("context: the set expiry is ", decoded.exp * 1000)
        console.log('context: and the token is ', token, " or ", decoded)
        if (decoded.exp * 1000 < Date.now()) {
            console.log('context: session expired, logging out...')
          logout();
        } else {
          setUser(decoded);
        }
      } catch (err) {
        console.log("invalid token: ", err)
        logout();
      }
    }
  }, [token]);

  const login = (newToken) => {
    if (!newToken) {
      console.error("No token provided");
      return;
    }
    
    try {
      const decoded = jwtDecode(newToken);
      localStorage.setItem('jwt', newToken);
      setToken(newToken);
      setUser(decoded);
    } catch (err) {
      console.error("Invalid token format:", err);
      logout();
    }
  };

  const logout = () => {
    console.log("logging out in context.jsx")
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