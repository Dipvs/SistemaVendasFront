import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


const Navbar = () => {
  const [user, setUser] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { logout } = useAuth(); // Apenas se ainda usar isso

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/auth/me', {
          credentials: 'include', // necessário se o cookie de sessão estiver sendo usado
        });

        if (!response.ok) throw new Error('Erro ao buscar usuário');

        const data = await response.json();
        setUser(data);
      } catch (err) {
        console.error('Erro ao buscar dados do usuário:', err);
        // Você pode redirecionar para login aqui se quiser
        navigate('/login');
      }
    };

    fetchUser();
  }, [navigate]);

  const handleLogout = () => {
    // Pode ser adaptado caso esteja usando API também para logout
    logout();
    navigate('/login');
  };

  const handleOpenTicket = () => {
    navigate('/abrir-chamado');
  };

  const getCargoName = (idCargo) => {
    switch (idCargo) {
      case 1: return 'Administrador';
      case 2: return 'Gerente';
      case 3: return 'Supervisor';
      case 4: return 'Vendedor';
      default: return 'Usuário';
    }
  };

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  return (
    <nav className="bg-indigo-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <h1 className="text-white font-bold">Sistema de Gestão</h1>
          </div>

          {user && (
            <div className="hidden md:flex items-center">
              <div className="text-white mr-4">
                <span className="font-medium">{user.name}</span>
                <span className="ml-2 text-indigo-200">
                  ({getCargoName(user.idCargo)})
                </span>
              </div>
              <button
                type="button"
                onClick={handleOpenTicket}
                className="ml-2 px-3 py-1 text-sm font-medium text-indigo-100 bg-indigo-500 rounded-md hover:bg-indigo-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Abrir Chamado
              </button>
              <button
                type="button"
                onClick={handleLogout}
                className="ml-2 px-3 py-1 text-sm font-medium text-white bg-indigo-700 rounded-md hover:bg-indigo-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Sair
              </button>
            </div>
          )}

          <div className="md:hidden flex items-center">
            <button
              type="button"
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-indigo-200 hover:text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              aria-expanded={isMenuOpen}
            >
              <span className="sr-only">Abrir menu principal</span>
              {isMenuOpen ? (
                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && user && (
        <div className="md:hidden bg-indigo-700">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <div className="px-3 py-2 text-indigo-100">
              <span className="font-medium block">{user.name}</span>
              <span className="text-indigo-200 text-sm">
                ({getCargoName(user.idCargo)})
              </span>
            </div>
            <button
              type="button"
              onClick={handleOpenTicket}
              className="w-full text-left block px-3 py-2 rounded-md text-base font-medium text-indigo-100 hover:text-white hover:bg-indigo-600"
            >
              Abrir Chamado
            </button>
            <button
              type="button"
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
