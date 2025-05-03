// src/components/reports/PerformanceVendedorPage.jsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import Navbar from '../Navbar';

import PerformanceVendedorPagePdf from '../reports/reportPdfs/PerformanceVendedorPagePdf';

const PerformanceVendedorPage = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [performanceData, setPerformanceData] = useState([]);
  const [period, setPeriod] = useState('atual'); // 'atual', 'anterior', 'personalizado'
  const [selectedVendedor, setSelectedVendedor] = useState('todos');
  const [vendedores, setVendedores] = useState([]);

  // Redirecionar se o usuário não for supervisor
  useEffect(() => {
    if (!currentUser || currentUser.idCargo !== 3) {
      navigate('/login');
    } else {
      fetchData();
      fetchVendedores();
    }
  }, [currentUser, navigate]);

  
  const exportToPDF = () => {
    // Chame o método generate com os dados necessários
    PerformanceVendedorPagePdf.generate({
      performanceData, // Usa os dados já existentes no componente
      periodoReferencia: period === 'atual' ? 'Bimestre Atual' : period === 'anterior' ? 'Bimestre Anterior' : 'Período Personalizado',
      vendedorNome: selectedVendedor === 'todos' ? 'Todos os Vendedores' : 
        vendedores.find(v => v.id.toString() === selectedVendedor)?.nome || 'Vendedor Não Identificado',
      formatCurrency, // Usa a função já existente no componente
      formatPercentage, // Usa a função já existente no componente
      totals // Usa os totais já calculados no componente
    });
  };
  

  // Função para buscar dados do backend (simulada)
  const fetchData = () => {
    setLoading(true);
    // Aqui você faria uma chamada à API real
    // Dados simulados para demonstração
    setTimeout(() => {
      const mockData = [
        {
          codDepto: 1,
          departamento: 'Eletrônicos',
          metaFinanceira: 120000,
          realizadoBimestre: 115000,
          metaBimestralPercentual: 95.83,
          realizadoMes1: 65000,
          realizadoMes2: 50000,
          aFaturar: 18000,
          metaMediaPositivacao: 85,
          positivacaoBimestral: 82.5,
          positivacaoMes1: 80,
          positivacaoMes2: 85,
          quantidadeMix: 45,
          vendaMix: 38,
          skuPDV: 24
        },
        {
          codDepto: 2,
          departamento: 'Informática',
          metaFinanceira: 95000,
          realizadoBimestre: 98000,
          metaBimestralPercentual: 103.16,
          realizadoMes1: 48000,
          realizadoMes2: 50000,
          aFaturar: 12000,
          metaMediaPositivacao: 80,
          positivacaoBimestral: 85,
          positivacaoMes1: 83,
          positivacaoMes2: 87,
          quantidadeMix: 38,
          vendaMix: 35,
          skuPDV: 20
        },
        {
          codDepto: 3,
          departamento: 'Móveis',
          metaFinanceira: 150000,
          realizadoBimestre: 138000,
          metaBimestralPercentual: 92,
          realizadoMes1: 72000,
          realizadoMes2: 66000,
          aFaturar: 22000,
          metaMediaPositivacao: 75,
          positivacaoBimestral: 72,
          positivacaoMes1: 70,
          positivacaoMes2: 74,
          quantidadeMix: 60,
          vendaMix: 52,
          skuPDV: 35
        },
        {
          codDepto: 4,
          departamento: 'Eletrodomésticos',
          metaFinanceira: 180000,
          realizadoBimestre: 192000,
          metaBimestralPercentual: 106.67,
          realizadoMes1: 95000,
          realizadoMes2: 97000,
          aFaturar: 25000,
          metaMediaPositivacao: 90,
          positivacaoBimestral: 92,
          positivacaoMes1: 91,
          positivacaoMes2: 93,
          quantidadeMix: 55,
          vendaMix: 53,
          skuPDV: 40
        },
        {
          codDepto: 5,
          departamento: 'Cama e Banho',
          metaFinanceira: 75000,
          realizadoBimestre: 68000,
          metaBimestralPercentual: 90.67,
          realizadoMes1: 34000,
          realizadoMes2: 34000,
          aFaturar: 10000,
          metaMediaPositivacao: 70,
          positivacaoBimestral: 68,
          positivacaoMes1: 67,
          positivacaoMes2: 69,
          quantidadeMix: 30,
          vendaMix: 25,
          skuPDV: 18
        }
      ];
      
      setPerformanceData(mockData);
      setLoading(false);
    }, 1000);
  };

  // Função para buscar lista de vendedores (simulada)
  const fetchVendedores = () => {
    // Aqui você faria uma chamada à API real
    setTimeout(() => {
      setVendedores([
        { id: 1, nome: 'Ana Silva' },
        { id: 2, nome: 'Carlos Oliveira' },
        { id: 3, nome: 'Daniela Santos' },
        { id: 4, nome: 'Fernando Pereira' }
      ]);
    }, 500);
  };

  // Função para calcular totais
  const calculateTotals = () => {
    if (performanceData.length === 0) return null;
    
    return performanceData.reduce((totals, item) => {
      return {
        metaFinanceira: totals.metaFinanceira + item.metaFinanceira,
        realizadoBimestre: totals.realizadoBimestre + item.realizadoBimestre,
        realizadoMes1: totals.realizadoMes1 + item.realizadoMes1,
        realizadoMes2: totals.realizadoMes2 + item.realizadoMes2,
        aFaturar: totals.aFaturar + item.aFaturar,
        quantidadeMix: Math.max(totals.quantidadeMix, item.quantidadeMix),
        vendaMix: Math.max(totals.vendaMix, item.vendaMix),
        skuPDV: Math.max(totals.skuPDV, item.skuPDV)
      };
    }, {
      metaFinanceira: 0,
      realizadoBimestre: 0,
      realizadoMes1: 0,
      realizadoMes2: 0,
      aFaturar: 0,
      quantidadeMix: 0,
      vendaMix: 0,
      skuPDV: 0
    });
  };

  const totals = calculateTotals();

  // Função para formatar valores monetários
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  // Função para formatar percentuais
  const formatPercentage = (value) => {
    return `${value.toFixed(2)}%`;
  };

  // Função para voltar à página de supervisor
  const handleBack = () => {
    navigate('/supervisor');
  };

  // Função para aplicar filtros
  const handleFilterApply = () => {
    fetchData(); // Recarregaria os dados com os filtros aplicados
  };

  // Renderiza uma célula com cor baseada no valor percentual
  const renderPercentageCell = (value, target = 100) => {
    let bgColorClass = 'bg-gray-50';
    let textColorClass = 'text-gray-800';
    
    if (value >= target) {
      bgColorClass = 'bg-green-50';
      textColorClass = 'text-green-800';
    } else if (value >= target * 0.9) {
      bgColorClass = 'bg-yellow-50';
      textColorClass = 'text-yellow-800';
    } else {
      bgColorClass = 'bg-red-50';
      textColorClass = 'text-red-800';
    }
    
    return (
      <td className={`px-3 py-2 text-right ${bgColorClass} ${textColorClass} font-medium`}>
        {formatPercentage(value)}
      </td>
    );
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      
      <main className="py-4 sm:py-6 md:py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6 flex justify-between items-center">
            <div>
              <button
                onClick={handleBack}
                className="flex items-center text-indigo-600 hover:text-indigo-700"
              >
                <svg className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Voltar para Relatórios
              </button>
              <h1 className="mt-2 text-2xl sm:text-3xl font-bold text-gray-900">
                Performance Vendedor
              </h1>
            </div>
            
            <div className="print:hidden">
              <button
                onClick={exportToPDF}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <svg className="h-4 w-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                </svg>
                Exportar Pdf
              </button>
            </div>
          </div>
          
          {/* Filtros */}
          <div className="mb-6 bg-white p-4 sm:p-6 rounded-lg shadow-sm print:hidden">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Filtros</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label htmlFor="period" className="block text-sm font-medium text-gray-700 mb-1">
                  Período
                </label>
                <select
                  id="period"
                  name="period"
                  value={period}
                  onChange={(e) => setPeriod(e.target.value)}
                  className="block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                >
                  <option value="atual">Bimestre Atual</option>
                  <option value="anterior">Bimestre Anterior</option>
                  <option value="personalizado">Período Personalizado</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="vendedor" className="block text-sm font-medium text-gray-700 mb-1">
                  Vendedor
                </label>
                <select
                  id="vendedor"
                  name="vendedor"
                  value={selectedVendedor}
                  onChange={(e) => setSelectedVendedor(e.target.value)}
                  className="block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                >
                  <option value="todos">Todos os Vendedores</option>
                  {vendedores.map(vendedor => (
                    <option key={vendedor.id} value={vendedor.id}>
                      {vendedor.nome}
                    </option>
                  ))}
                </select>
              </div>
              
              <div className="self-end">
                <button
                  onClick={handleFilterApply}
                  className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Aplicar Filtros
                </button>
              </div>
            </div>
          </div>
          
          {/* Tabela de Performance */}
          <div className="bg-white shadow overflow-hidden rounded-lg">
            {loading ? (
              <div className="py-10 px-4 text-center">
                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-indigo-600 mx-auto"></div>
                <p className="mt-2 text-gray-600">Carregando dados...</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Cod.Depto
                      </th>
                      <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Departamento
                      </th>
                      <th scope="col" className="px-3 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Meta Financeira
                      </th>
                      <th scope="col" className="px-3 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Realizado Bimestre
                      </th>
                      <th scope="col" className="px-3 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        % Meta Bimestral
                      </th>
                      <th scope="col" className="px-3 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Realizado Mês 1
                      </th>
                      <th scope="col" className="px-3 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Realizado Mês 2
                      </th>
                      <th scope="col" className="px-3 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        A Faturar
                      </th>
                      <th scope="col" className="px-3 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Meta média Positivação M1 e M2
                      </th>
                      <th scope="col" className="px-3 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        % Positivação Bimestral
                      </th>
                      <th scope="col" className="px-3 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Positivação Mês 1
                      </th>
                      <th scope="col" className="px-3 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Positivação Mês 2
                      </th>
                      <th scope="col" className="px-3 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Quantidade Mix
                      </th>
                      <th scope="col" className="px-3 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Venda Mix
                      </th>
                      <th scope="col" className="px-3 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Sku PDV
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {performanceData.map((item) => (
                      <tr key={item.codDepto}>
                        <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-900">
                          {item.codDepto}
                        </td>
                        <td className="px-3 py-2 whitespace-nowrap text-sm font-medium text-gray-900">
                          {item.departamento}
                        </td>
                        <td className="px-3 py-2 whitespace-nowrap text-sm text-right text-gray-900">
                          {formatCurrency(item.metaFinanceira)}
                        </td>
                        <td className="px-3 py-2 whitespace-nowrap text-sm text-right text-gray-900">
                          {formatCurrency(item.realizadoBimestre)}
                        </td>
                        {renderPercentageCell(item.metaBimestralPercentual)}
                        <td className="px-3 py-2 whitespace-nowrap text-sm text-right text-gray-900">
                          {formatCurrency(item.realizadoMes1)}
                        </td>
                        <td className="px-3 py-2 whitespace-nowrap text-sm text-right text-gray-900">
                          {formatCurrency(item.realizadoMes2)}
                        </td>
                        <td className="px-3 py-2 whitespace-nowrap text-sm text-right text-gray-900">
                          {formatCurrency(item.aFaturar)}
                        </td>
                        <td className="px-3 py-2 whitespace-nowrap text-sm text-right text-gray-900">
                          {formatPercentage(item.metaMediaPositivacao)}
                        </td>
                        {renderPercentageCell(item.positivacaoBimestral, item.metaMediaPositivacao)}
                        <td className="px-3 py-2 whitespace-nowrap text-sm text-right text-gray-900">
                          {formatPercentage(item.positivacaoMes1)}
                        </td>
                        <td className="px-3 py-2 whitespace-nowrap text-sm text-right text-gray-900">
                          {formatPercentage(item.positivacaoMes2)}
                        </td>
                        <td className="px-3 py-2 whitespace-nowrap text-sm text-right text-gray-900">
                          {item.quantidadeMix}
                        </td>
                        <td className="px-3 py-2 whitespace-nowrap text-sm text-right text-gray-900">
                          {item.vendaMix}
                        </td>
                        <td className="px-3 py-2 whitespace-nowrap text-sm text-right text-gray-900">
                          {item.skuPDV}
                        </td>
                      </tr>
                    ))}
                    
                    {/* Linha de totais */}
                    {totals && (
                      <tr className="bg-gray-50 font-medium">
                        <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-900">
                          -
                        </td>
                        <td className="px-3 py-2 whitespace-nowrap text-sm font-bold text-gray-900">
                          TOTAL
                        </td>
                        <td className="px-3 py-2 whitespace-nowrap text-sm text-right font-bold text-gray-900">
                          {formatCurrency(totals.metaFinanceira)}
                        </td>
                        <td className="px-3 py-2 whitespace-nowrap text-sm text-right font-bold text-gray-900">
                          {formatCurrency(totals.realizadoBimestre)}
                        </td>
                        {renderPercentageCell((totals.realizadoBimestre / totals.metaFinanceira) * 100)}
                        <td className="px-3 py-2 whitespace-nowrap text-sm text-right font-bold text-gray-900">
                          {formatCurrency(totals.realizadoMes1)}
                        </td>
                        <td className="px-3 py-2 whitespace-nowrap text-sm text-right font-bold text-gray-900">
                          {formatCurrency(totals.realizadoMes2)}
                        </td>
                        <td className="px-3 py-2 whitespace-nowrap text-sm text-right font-bold text-gray-900">
                          {formatCurrency(totals.aFaturar)}
                        </td>
                        <td className="px-3 py-2 whitespace-nowrap text-sm text-right font-bold text-gray-900">
                          -
                        </td>
                        <td className="px-3 py-2 whitespace-nowrap text-sm text-right font-bold text-gray-900">
                          -
                        </td>
                        <td className="px-3 py-2 whitespace-nowrap text-sm text-right font-bold text-gray-900">
                          -
                        </td>
                        <td className="px-3 py-2 whitespace-nowrap text-sm text-right font-bold text-gray-900">
                          -
                        </td>
                        <td className="px-3 py-2 whitespace-nowrap text-sm text-right font-bold text-gray-900">
                          {totals.quantidadeMix}
                        </td>
                        <td className="px-3 py-2 whitespace-nowrap text-sm text-right font-bold text-gray-900">
                          {totals.vendaMix}
                        </td>
                        <td className="px-3 py-2 whitespace-nowrap text-sm text-right font-bold text-gray-900">
                          {totals.skuPDV}
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </div>
          
          {/* Legenda */}
          <div className="mt-4 bg-white p-4 rounded-lg shadow-sm print:hidden">
            <h3 className="text-sm font-medium text-gray-900 mb-2">Legenda</h3>
            <div className="flex flex-wrap gap-3">
              <div className="flex items-center">
                <div className="w-4 h-4 bg-green-50 border border-green-200 mr-1"></div>
                <span className="text-xs text-gray-600">Meta atingida</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 bg-yellow-50 border border-yellow-200 mr-1"></div>
                <span className="text-xs text-gray-600">Meta parcial (90%+)</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 bg-red-50 border border-red-200 mr-1"></div>
                <span className="text-xs text-gray-600">Abaixo da meta</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PerformanceVendedorPage;