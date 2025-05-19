// src/components/Login.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Login = () => {
  const [credentials, setCredentials] = useState({ login: '', senha: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    const filteredValue =
      name === 'login'
        ? value.replace(/[^a-zA-Z0-9]/g, '').toUpperCase()  // letras e números maiúsculos
        : value.replace(/\D/g, ''); // só números para senha

    setCredentials((prev) => ({ ...prev, [name]: filteredValue }));
  };

  // src/components/Login.jsx
const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    setError('');
    setLoading(true);

    const user = await login(credentials.login, credentials.senha);
    
    // Mapeamento de tipos para rotas
    const roleRoutes = {
      1: '/admin',
      2: '/gerente',
      3: '/supervisor',
      4: '/vendedor'
    };

    // Verifica se o tipo existe no mapeamento
    if (typeof user.tipo === 'undefined' || !roleRoutes[user.tipo]) {
      throw new Error('Seu perfil não tem uma rota definida no sistema');
    }

    // Redireciona para a rota correspondente
    navigate(roleRoutes[user.tipo], { replace: true });
    
  } catch (err) {
    setError(
      err.response?.data?.message ||
      err.message ||
      'Erro durante o login. Por favor, tente novamente.'
    );
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900">Painel de Vendas</h1>
          <p className="mt-2 text-gray-600">Entre com suas credenciais</p>
        </div>

        {error && (
          <div className="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg">
            {error}
          </div>
        )}

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="login" className="block text-sm font-medium text-gray-700">
              Usuário
            </label>
            <input
              id="login"
              name="login"
              type="text"
              required
              className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Seu usuário (Apenas letras e números)"
              value={credentials.login}
              onChange={handleChange}
              autoComplete="username"
            />
          </div>

          <div>
            <label htmlFor="senha" className="block text-sm font-medium text-gray-700">
              Senha
            </label>
            <input
              id="senha"
              name="senha"
              type="password"
              required
              className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Sua senha (Apenas números)"
              value={credentials.senha}
              onChange={handleChange}
              autoComplete="current-password"
            />
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              {loading ? 'Processando...' : 'Entrar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
