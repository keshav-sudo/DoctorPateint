// src/context/context.js
import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  axios.defaults.withCredentials = true;

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/user/me');
        setUser(response.data.data);
      } catch (error) {
        console.log("No user found");
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  const login = async (Credentials) => {
    const response = await axios.post("http://localhost:5000/api/auth/login", Credentials);
    const meResponse = await axios.get(' http://localhost:5000/api/user/me/dash');
    console.log(meResponse);
    setUser(meResponse.data.data);
    return response;
  };

  const logout = async () => {
    await axios.post('http://localhost:5000/api/auth/logout');
    setUser(null);
  };

  const value = { user, login, logout, loading };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};