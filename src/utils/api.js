// src/utils/api.js
// Simula uma API para login e obtenção de dados do usuário

// Usuários de teste com diferentes cargos
const users = [
    { id: 1, email: 'admin@exemplo.com', password: 'senha123', name: 'Admin', idCargo: 1 },
    { id: 2, email: 'gerente@exemplo.com', password: 'senha123', name: 'Gerente', idCargo: 2 },
    { id: 3, email: 'supervisor@exemplo.com', password: 'senha123', name: 'Supervisor', idCargo: 3 },
    { id: 4, email: 'vendedor@exemplo.com', password: 'senha123', name: 'Vendedor', idCargo: 4 },
  ];
  
  // Função que simula um atraso de rede
  const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));
  
  // Função de login simulada
  export const loginUser = async (email, password) => {
    // Simula um atraso de rede
    await delay(500);
    
    // Encontra o usuário pelo email
    const user = users.find(u => u.email === email);
    
    // Verifica se o usuário existe e se a senha está correta
    if (user && user.password === password) {
      // Retorna os dados do usuário (exceto a senha)
      const { password, ...userData } = user;
      return userData;
    } else {
      // Lança um erro se as credenciais forem inválidas
      throw new Error('Email ou senha inválidos');
    }
  };
  
  // Função para obter dados do usuário (simulada)
  export const getUserData = async (userId) => {
    await delay(300);
    
    const user = users.find(u => u.id === userId);
    if (user) {
      const { password, ...userData } = user;
      return userData;
    }
    
    throw new Error('Usuário não encontrado');
  };