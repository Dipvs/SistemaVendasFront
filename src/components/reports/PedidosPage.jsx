import React from 'react';
import Navbar from '../Navbar';

const PedidosPage = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <main className="py-4 sm:py-6 md:py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="pb-5 border-b border-gray-200 mb-6">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
              Relatório de Pedidos
            </h1>
            <p className="mt-2 text-sm text-gray-600 max-w-4xl">
              Lista completa de pedidos realizados.
            </p>
          </div>
          
          <div className="bg-white overflow-hidden shadow-sm rounded-lg">
            <div className="p-6">
              {/* Conteúdo específico do relatório de pedidos */}
              <p className="text-gray-600">Lista de pedidos será exibida aqui.</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PedidosPage;