// src/App.jsx
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Login from './components/Login';
import AdminPage from './components/AdminPage';
import ManagerPage from './components/ManagerPage';
import SupervisorPage from './components/SupervisorPage';
import SalesPage from './components/SalesPage';
import AbrirChamadoPage from './components/AbrirChamadoPage';

// Importando todos os componentes de relatórios
import PerformanceVendedorPage from './components/reports/PerformanceVendedorPage';
import InadimplenciaPage from './components/reports/InadimplenciaPage';
import PainelComissaoPage from './components/reports/PainelComissaoPage';
import PainelDiarioPage from './components/reports/PainelDiarioPage';
import PerformanceSupervisorPage from './components/reports/PerformanceSupervisorPage';
import CheckinCheckoutVendedorPage from './components/reports/CheckinCheckoutVendedorPage';
import CheckinCheckoutGerencialPage from './components/reports/CheckinCheckoutGerencialPage';
import CheckinCheckoutDiaAnteriorPage from './components/reports/CheckinCheckoutDiaAnteriorPage';
import PedidosPage from './components/reports/PedidosPage';
import PedidosNaoFaturadosPage from './components/reports/PedidosNaoFaturadosPage';
import FaturamentoVendedorClientePage from './components/reports/FaturamentoVendedorClientePage';

import './index.css';

// Componente para proteger rotas
const ProtectedRoute = ({ children }) => {
  const { currentUser, loading } = useAuth();
  
  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Carregando...</div>;
  }
  
  if (!currentUser) {
    return <Navigate to="/login" />;
  }
  
  return children;
};

// Componente para proteger rotas específicas para supervisor
const SupervisorRoute = ({ children }) => {
  const { currentUser, loading } = useAuth();
  
  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Carregando...</div>;
  }
  
  if (!currentUser) {
    return <Navigate to="/login" />;
  }
  
  if (currentUser.idCargo !== 3) {
    return <Navigate to="/" />;
  }
  
  return children;
};

// Componente para redirecionar baseado no cargo do usuário
const RedirectBasedOnRole = () => {
  const { currentUser } = useAuth();
  
  if (!currentUser) {
    return <Navigate to="/login" />;
  }
  
  switch (currentUser.idCargo) {
    case 1:
      return <Navigate to="/admin" />;
    case 2:
      return <Navigate to="/gerente" />;
    case 3:
      return <Navigate to="/supervisor" />;
    case 4:
      return <Navigate to="/vendedor" />;
    default:
      return <Navigate to="/login" />;
  }
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          
          <Route path="/admin" element={
            <ProtectedRoute>
              <AdminPage />
            </ProtectedRoute>
          } />
          
          <Route path="/gerente" element={
            <ProtectedRoute>
              <ManagerPage />
            </ProtectedRoute>
          } />
          
          <Route path="/supervisor" element={
            <ProtectedRoute>
              <SupervisorPage />
            </ProtectedRoute>
          } />
          
          <Route path="/vendedor" element={
            <ProtectedRoute>
              <SalesPage />
            </ProtectedRoute>
          } />
          
          {/* Rotas para os relatórios do supervisor */}
          <Route path="/supervisor/reports/inadimplencia" element={
            <SupervisorRoute>
              <InadimplenciaPage />
            </SupervisorRoute>
          } />
          
          <Route path="/supervisor/reports/painel-comissao" element={
            <SupervisorRoute>
              <PainelComissaoPage />
            </SupervisorRoute>
          } />
          
          <Route path="/supervisor/reports/painel-diario" element={
            <SupervisorRoute>
              <PainelDiarioPage />
            </SupervisorRoute>
          } />
          
          <Route path="/supervisor/reports/performance-supervisor" element={
            <SupervisorRoute>
              <PerformanceSupervisorPage />
            </SupervisorRoute>
          } />
          
          <Route path="/supervisor/reports/performance-vendedor" element={
            <SupervisorRoute>
              <PerformanceVendedorPage />
            </SupervisorRoute>
          } />
          
          <Route path="/supervisor/reports/checkin-checkout-vendedor" element={
            <SupervisorRoute>
              <CheckinCheckoutVendedorPage />
            </SupervisorRoute>
          } />
          
          <Route path="/supervisor/reports/checkin-checkout-gerencial" element={
            <SupervisorRoute>
              <CheckinCheckoutGerencialPage />
            </SupervisorRoute>
          } />
          
          <Route path="/supervisor/reports/checkin-checkout-dia-anterior" element={
            <SupervisorRoute>
              <CheckinCheckoutDiaAnteriorPage />
            </SupervisorRoute>
          } />
          
          <Route path="/supervisor/reports/pedidos" element={
            <SupervisorRoute>
              <PedidosPage />
            </SupervisorRoute>
          } />
          
          <Route path="/supervisor/reports/pedidos-nao-faturados" element={
            <SupervisorRoute>
              <PedidosNaoFaturadosPage />
            </SupervisorRoute>
          } />
          
          <Route path="/supervisor/reports/faturamento-vendedor-cliente" element={
            <SupervisorRoute>
              <FaturamentoVendedorClientePage />
            </SupervisorRoute>
          } />
          
          {/* Rota para abertura de chamados */}
          <Route path="/abrir-chamado" element={
            <ProtectedRoute>
              <AbrirChamadoPage />
            </ProtectedRoute>
          } />
          
          <Route path="/" element={<RedirectBasedOnRole />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;