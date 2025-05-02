// src/components/SupervisorPage.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Navbar from './Navbar';

const SupervisorPage = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  // Redirecionar se o usuário não for supervisor
  if (!currentUser || currentUser.idCargo !== 3) {
    navigate('/login');
    return null;
  }

  const reportTypes = [
    {
      id: 'inadimplencia',
      name: 'Inadimplência',
      description: 'Relatório de clientes com pagamentos em atraso',
      icon: '💰',
      color: 'bg-red-50 border-red-200',
      textColor: 'text-red-800',
      route: '/supervisor/reports/inadimplencia'
    },
    {
      id: 'painel-comissao',
      name: 'Painel Comissão',
      description: 'Visualize as comissões da equipe de vendas',
      icon: '🎯',
      color: 'bg-emerald-50 border-emerald-200',
      textColor: 'text-emerald-800',
      route: '/supervisor/reports/painel-comissao'
    },
    {
      id: 'painel-diario',
      name: 'Painel Diário',
      description: 'Visão geral das atividades e resultados do dia',
      icon: '📅',
      color: 'bg-blue-50 border-blue-200',
      textColor: 'text-blue-800',
      route: '/supervisor/reports/painel-diario'
    },
    {
      id: 'performance-supervisor',
      name: 'Performance Supervisor',
      description: 'Análise de desempenho da supervisão',
      icon: '📊',
      color: 'bg-indigo-50 border-indigo-200',
      textColor: 'text-indigo-800',
      route: '/supervisor/reports/performance-supervisor'
    },
    {
      id: 'performance-vendedor',
      name: 'Performance Vendedor',
      description: 'Acompanhamento individual de cada vendedor',
      icon: '👥',
      color: 'bg-violet-50 border-violet-200',
      textColor: 'text-violet-800',
      route: '/supervisor/reports/performance-vendedor'
    },
    {
      id: 'checkin-checkout-vendedor',
      name: 'Checkin/Checkout Vendedor',
      description: 'Registro de entradas e saídas por vendedor',
      icon: '⏱️',
      color: 'bg-amber-50 border-amber-200',
      textColor: 'text-amber-800',
      route: '/supervisor/reports/checkin-checkout-vendedor'
    },
    {
      id: 'checkin-checkout-gerencial',
      name: 'Checkin/Checkout Gerencial',
      description: 'Visão gerencial dos registros de ponto',
      icon: '📈',
      color: 'bg-cyan-50 border-cyan-200',
      textColor: 'text-cyan-800',
      route: '/supervisor/reports/checkin-checkout-gerencial'
    },
    {
      id: 'checkin-checkout-dia-anterior',
      name: 'Checkin/Checkout Dia Anterior',
      description: 'Registros de ponto do dia anterior',
      icon: '🔍',
      color: 'bg-purple-50 border-purple-200',
      textColor: 'text-purple-800',
      route: '/supervisor/reports/checkin-checkout-dia-anterior'
    },
    {
      id: 'pedidos',
      name: 'Pedidos',
      description: 'Lista completa de pedidos realizados',
      icon: '🛒',
      color: 'bg-green-50 border-green-200',
      textColor: 'text-green-800',
      route: '/supervisor/reports/pedidos'
    },
    {
      id: 'pedidos-nao-faturados',
      name: 'Pedidos Não Faturados',
      description: 'Pedidos pendentes de faturamento',
      icon: '📝',
      color: 'bg-rose-50 border-rose-200',
      textColor: 'text-rose-800',
      route: '/supervisor/reports/pedidos-nao-faturados'
    },
    {
      id: 'faturamento-vendedor-cliente',
      name: 'Faturamento Vendedor/Cliente',
      description: 'Análise de faturamento por vendedor e cliente',
      icon: '📊',
      color: 'bg-teal-50 border-teal-200',
      textColor: 'text-teal-800',
      route: '/supervisor/reports/faturamento-vendedor-cliente'
    }
  ];

  const handleReportClick = (report) => {
    // Agora navegamos diretamente para a rota definida no objeto do relatório
    navigate(report.route);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      
      <main className="py-4 sm:py-6 md:py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="pb-5 border-b border-gray-200 mb-6">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
              Relatórios do Supervisor
            </h1>
            <p className="mt-2 text-sm text-gray-600 max-w-4xl">
              Acesse os diferentes tipos de relatórios para monitorar vendas, performance da equipe, checkins e muito mais.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5 md:gap-6">
            {reportTypes.map((report) => (
              <div 
                key={report.id}
                onClick={() => handleReportClick(report)}
                className={`border ${report.color} rounded-lg p-4 transition duration-200 transform hover:scale-105 hover:shadow-md cursor-pointer h-full flex flex-col`}
              >
                <div className="flex items-start">
                  <div className="flex-shrink-0 text-2xl mr-3">
                    {report.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className={`font-semibold ${report.textColor} text-lg`}>{report.name}</h3>
                    <p className="mt-1 text-sm text-gray-600">{report.description}</p>
                  </div>
                </div>
                <div className="mt-4 pt-2 border-t border-gray-100 text-right">
                  <span className="text-xs font-medium px-2 py-1 rounded-full bg-gray-100 text-gray-800">
                    Acessar
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default SupervisorPage;