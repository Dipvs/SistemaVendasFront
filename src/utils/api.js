// src/utils/api.js
const API_BASE_URL = 'http://localhost:3000/api';

export const loginUser = async (login, senha) => {  // Mudei para 'login' e 'senha' para combinar com seu backend
  try {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ login, senha }),  // Corrigido para usar 'login' e 'senha'
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Credenciais inválidas');
    }

    return data;
    
  } catch (error) {
    console.error('Erro no login:', error);
    throw error;
  }
};

export const verifyAuth = async () => {
  const token = localStorage.getItem('authToken');
  
  if (!token) return null;

  try {
    const response = await fetch(`${API_BASE_URL}/auth/me`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      localStorage.removeItem('authToken');
      localStorage.removeItem('userData');
      return null;
    }

    return await response.json();
  } catch (error) {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userData');
    return null;
  }
};