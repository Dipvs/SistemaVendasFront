import React from 'react';
import Navbar from '../Navbar';

const PedidosNaoFaturadosPage = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <main className="py-4 sm:py-6 md:py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="pb-5 border-b border-gray-200 mb-6">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
              Pedidos Não Faturados
            </h1>
            <p className="mt-2 text-sm text-gray-600 max-w-4xl">
              Pedidos pendentes de faturamento.
            </p>
          </div>
          
          <div className="bg-white overflow-hidden shadow-sm rounded-lg">
            <div className="p-6">
              {/* Conteúdo específico do relatório de pedidos não faturados */}
              <p className="text-gray-600">Lista de pedidos não faturados será exibida aqui.</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PedidosNaoFaturadosPage;