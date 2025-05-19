// src/components/AdminPage.jsx
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Navbar from './Navbar';

const AdminPage = () => {



  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      
      <main className="py-10">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <div className="bg-white shadow rounded-lg p-6">
              <h1 className="text-2xl font-bold text-gray-900 mb-6">
                Painel do Administrador
              </h1>
              
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                <div className="bg-blue-50 p-4 rounded-lg shadow">
                  <h2 className="text-lg font-medium text-blue-800">Gerenciar Usuários</h2>
                  <p className="mt-2 text-sm text-blue-600">
                    Adicione, edite ou remova contas de usuários do sistema.
                  </p>
                </div>
                
                <div className="bg-purple-50 p-4 rounded-lg shadow">
                  <h2 className="text-lg font-medium text-purple-800">Configurações do Sistema</h2>
                  <p className="mt-2 text-sm text-purple-600">
                    Controle as configurações globais e permissões.
                  </p>
                </div>
                
                <div className="bg-green-50 p-4 rounded-lg shadow">
                  <h2 className="text-lg font-medium text-green-800">Relatórios Gerais</h2>
                  <p className="mt-2 text-sm text-green-600">
                    Visualize estatísticas e relatórios completos.
                  </p>
                </div>
                
                <div className="bg-yellow-50 p-4 rounded-lg shadow">
                  <h2 className="text-lg font-medium text-yellow-800">Auditoria</h2>
                  <p className="mt-2 text-sm text-yellow-600">
                    Acompanhe todas as atividades realizadas no sistema.
                  </p>
                </div>
                
                <div className="bg-red-50 p-4 rounded-lg shadow">
                  <h2 className="text-lg font-medium text-red-800">Segurança</h2>
                  <p className="mt-2 text-sm text-red-600">
                    Gerencie políticas de segurança e acesso.
                  </p>
                </div>
                
                <div className="bg-indigo-50 p-4 rounded-lg shadow">
                  <h2 className="text-lg font-medium text-indigo-800">Backup</h2>
                  <p className="mt-2 text-sm text-indigo-600">
                    Faça backup e restaure dados do sistema.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminPage;