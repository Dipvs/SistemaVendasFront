// src/components/ManagerPage.jsx
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Navbar from './Navbar';

const ManagerPage = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  // Redirecionar se o usuário não for gerente
  if (!currentUser || currentUser.idCargo !== 2) {
    navigate('/login');
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      
      <main className="py-10">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <div className="bg-white shadow rounded-lg p-6">
              <h1 className="text-2xl font-bold text-gray-900 mb-6">
                Painel do Gerente
              </h1>
              
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                <div className="bg-green-50 p-4 rounded-lg shadow">
                  <h2 className="text-lg font-medium text-green-800">Relatórios de Vendas</h2>
                  <p className="mt-2 text-sm text-green-600">
                    Visualize e analise o desempenho de vendas da equipe.
                  </p>
                </div>
                
                <div className="bg-blue-50 p-4 rounded-lg shadow">
                  <h2 className="text-lg font-medium text-blue-800">Gerenciar Equipe</h2>
                  <p className="mt-2 text-sm text-blue-600">
                    Organize e acompanhe o desempenho dos supervisores e vendedores.
                  </p>
                </div>
                
                <div className="bg-purple-50 p-4 rounded-lg shadow">
                  <h2 className="text-lg font-medium text-purple-800">Metas e Objetivos</h2>
                  <p className="mt-2 text-sm text-purple-600">
                    Defina e acompanhe metas comerciais para a equipe.
                  </p>
                </div>
                
                <div className="bg-yellow-50 p-4 rounded-lg shadow">
                  <h2 className="text-lg font-medium text-yellow-800">Clientes Estratégicos</h2>
                  <p className="mt-2 text-sm text-yellow-600">
                    Gerencie relacionamentos com clientes importantes.
                  </p>
                </div>
              </div>
              
              <div className="mt-8">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Desempenho da Equipe</h2>
                <div className="bg-white border rounded-lg overflow-hidden">
                  <div className="bg-gray-50 px-4 py-3 border-b">
                    <h3 className="text-sm font-medium text-gray-500">
                      Resumo mensal
                    </h3>
                  </div>
                  <div className="p-4">
                    <div className="h-64 bg-gray-100 rounded flex items-center justify-center">
                      <p className="text-gray-400">Gráfico de desempenho da equipe</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ManagerPage;