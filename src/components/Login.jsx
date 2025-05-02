// src/components/Login.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email || !password) {
      setError('Por favor, preencha todos os campos');
      return;
    }
    
    try {
      setError('');
      setLoading(true);
      
      const userData = await login(email, password);
      
      // Redirecionar com base no IDCARGO
      switch (userData.idCargo) {
        case 1:
          navigate('/admin');
          break;
        case 2:
          navigate('/gerente');
          break;
        case 3:
          navigate('/supervisor');
          break;
        case 4:
          navigate('/vendedor');
          break;
        default:
          navigate('/');
      }
    } catch (error) {
      setError('Falha no login. Verifique suas credenciais.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900">Sistemas de login</h1>
          <p className="mt-2 text-gray-600">Entre com suas credenciais</p>
        </div>
        
        {error && (
          <div className="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg" role="alert">
            {error}
          </div>
        )}
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="seu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Senha
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
          
          {/* <div className="text-sm text-center">
            <p className="text-gray-600">
              Contas de teste:
            </p>
            <ul className="mt-2 space-y-1 text-gray-500">
              <li>admin@exemplo.com / senha123 (Administrador)</li>
              <li>gerente@exemplo.com / senha123 (Gerente)</li>
              <li>supervisor@exemplo.com / senha123 (Supervisor)</li>
              <li>vendedor@exemplo.com / senha123 (Vendedor)</li>
            </ul>
          </div> */}
        </form>
      </div>
    </div>
  );
};

export default Login;