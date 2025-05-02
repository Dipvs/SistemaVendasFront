// src/components/Navbar.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Navbar = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleOpenTicket = () => {
    // Aqui você pode implementar a navegação para a página de abertura de chamados
    // ou abrir um modal, dependendo da sua preferência
    navigate('/abrir-chamado');
  };

  // Função para obter o nome do cargo baseado no idCargo
  const getCargoName = (idCargo) => {
    switch (idCargo) {
      case 1: return 'Administrador';
      case 2: return 'Gerente';
      case 3: return 'Supervisor';
      case 4: return 'Vendedor';
      default: return 'Usuário';
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-indigo-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo e nome do sistema */}
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <h1 className="text-white font-bold">Sistema de Gestão</h1>
            </div>
          </div>
          
          {/* Menu para desktop */}
          {currentUser && (
            <div className="hidden md:flex items-center">
              <div className="text-white mr-4">
                <span className="font-medium">{currentUser.name}</span>
                <span className="ml-2 text-indigo-200">
                  ({getCargoName(currentUser.idCargo)})
                </span>
              </div>
              <button
                onClick={handleOpenTicket}
                className="ml-2 px-3 py-1 text-sm font-medium text-indigo-100 bg-indigo-500 rounded-md hover:bg-indigo-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Abrir Chamado
              </button>
              <button
                onClick={handleLogout}
                className="ml-2 px-3 py-1 text-sm font-medium text-white bg-indigo-700 rounded-md hover:bg-indigo-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Sair
              </button>
            </div>
          )}
          
          {/* Botão hamburguer para mobile */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-indigo-200 hover:text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              aria-expanded="false"
            >
              <span className="sr-only">Abrir menu principal</span>
              {/* Ícone do menu hambúrguer (três barras) */}
              {!isMenuOpen ? (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              ) : (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Menu móvel, visível apenas quando está aberto */}
      {isMenuOpen && currentUser && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-indigo-700">
            <div className="px-3 py-2 text-indigo-100">
              <span className="font-medium block">{currentUser.name}</span>
              <span className="text-indigo-200 text-sm">
                ({getCargoName(currentUser.idCargo)})
              </span>
            </div>
            <button
              onClick={handleOpenTicket}
              className="w-full text-left block px-3 py-2 rounded-md text-base font-medium text-indigo-100 hover:text-white hover:bg-indigo-600"
            >
              Abrir Chamado
            </button>
            <button
              onClick={handleLogout}
              className="w-full text-left block px-3 py-2 rounded-md text-base font-medium text-indigo-100 hover:text-white hover:bg-indigo-600"
            >
              Sair
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;