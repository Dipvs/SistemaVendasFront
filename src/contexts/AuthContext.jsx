// src/contexts/AuthContext.jsx
import { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get('http://localhost:3000/api/auth/me', {
          headers: { Authorization: `Bearer ${token}` },
        });

        setCurrentUser(response.data);
      } catch (error) {
        localStorage.removeItem('token');
        setCurrentUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const login = async (login, senha) => {
  try {
    setLoading(true);
    const response = await axios.post('http://localhost:3000/api/auth/login', {
      login,
      senha
    });

    // Armazena o token
    const { token, user } = response.data;
    localStorage.setItem('token', token);

    // Armazena os dados do usuário diretamente da resposta
    // Não precisamos fazer a chamada adicional para /me aqui
    setCurrentUser(user);
    
    return user; // Retorna o user com tipo para o componente Login
    
  } catch (error) {
    console.error('Erro no login:', error);
    localStorage.removeItem('token');
    setCurrentUser(null);
    throw error;
  } finally {
    setLoading(false);
  }
};

  const logout = () => {
    localStorage.removeItem('token');
    setCurrentUser(null);
    // Chamada opcional para logout no backend
    axios.post('http://localhost:3000/api/auth/logout', {}, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    }).catch(() => {});
  };

  return (
    <AuthContext.Provider value={{ 
      currentUser, 
      login, 
      logout, 
      loading 
    }}>
      {children}
    </AuthContext.Provider>
  );
};