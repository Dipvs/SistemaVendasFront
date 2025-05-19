// src/components/SalesPage.jsx
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Navbar from './Navbar';

const SalesPage = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();


  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      
      <main className="py-10">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <div className="bg-white shadow rounded-lg p-6">
              <h1 className="text-2xl font-bold text-gray-900 mb-6">
                Painel do Vendedor
              </h1>
              
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                <div className="bg-blue-50 p-4 rounded-lg shadow">
                  <h2 className="text-lg font-medium text-blue-800">Registrar Nova Venda</h2>
                  <p className="mt-2 text-sm text-blue-600">
                    Cadastre uma nova venda realizada.
                  </p>
                </div>
                
                <div className="bg-green-50 p-4 rounded-lg shadow">
                  <h2 className="text-lg font-medium text-green-800">Minhas Vendas</h2>
                  <p className="mt-2 text-sm text-green-600">
                    Visualize seu histórico de vendas e comissões.
                  </p>
                </div>
                
                <div className="bg-yellow-50 p-4 rounded-lg shadow">
                  <h2 className="text-lg font-medium text-yellow-800">Catálogo de Produtos</h2>
                  <p className="mt-2 text-sm text-yellow-600">
                    Consulte informações sobre os produtos disponíveis.
                  </p>
                </div>
              </div>
              
              <div className="mt-8">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Seu Desempenho</h2>
                <div className="bg-white border rounded-lg overflow-hidden">
                  <div className="p-4">
                    <div className="flex items-center">
                      <div className="flex-1">
                        <div className="text-sm font-medium text-gray-500">Vendas no mês</div>
                        <div className="text-2xl font-semibold text-gray-900">R$ 32.750,00</div>
                      </div>
                      <div className="flex-1">
                        <div className="text-sm font-medium text-gray-500">Meta mensal</div>
                        <div className="text-2xl font-semibold text-gray-900">R$ 50.000,00</div>
                      </div>
                      <div className="flex-1">
                        <div className="text-sm font-medium text-gray-500">Progresso</div>
                        <div className="text-2xl font-semibold text-green-600">65%</div>
                      </div>
                    </div>
                    
                    <div className="mt-4 w-full bg-gray-200 rounded-full h-2.5">
                      <div className="bg-green-600 h-2.5 rounded-full" style={{ width: '65%' }}></div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-8">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Próximos Clientes</h2>
                <div className="bg-white border rounded-lg overflow-hidden">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Cliente
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Contato
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Interesse
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">Empresa ABC Ltda</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">contato@abc.com</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">Sistema ERP</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                            Aguardando Proposta
                          </span>
                        </td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">Mercado XYZ</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">gerente@xyz.com</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">App Mobile</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                            Em Negociação
                          </span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SalesPage;