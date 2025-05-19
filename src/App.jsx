// src/App.jsx
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

import Login from './components/Login';
import AdminPage from './components/AdminPage';
import ManagerPage from './components/ManagerPage';
import SupervisorPage from './components/SupervisorPage';
import SalesPage from './components/SalesPage';
import AbrirChamadoPage from './components/AbrirChamadoPage';

// Relatórios
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

const RedirectBasedOnRole = () => {
  const userData = JSON.parse(localStorage.getItem('userData'));
  if (!userData) return <Navigate to="/login" replace />;

  switch (userData.tipo) {
    case 1: return <Navigate to="/admin" replace />;
    case 2: return <Navigate to="/gerente" replace />;
    case 3: return <Navigate to="/supervisor" replace />;
    case 4: return <Navigate to="/vendedor" replace />;
    default: return <Navigate to="/login" replace />;
  }
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          {/* Login deve vir antes de qualquer redirecionamento */}
          <Route path="/login" element={<Login />} />

          {/* Redireciona baseado no tipo */}
          <Route path="/" element={<RedirectBasedOnRole />} />

          {/* Áreas protegidas por tipo */}
          <Route path="/admin" element={
            <ProtectedRoute requiredType={1}>
              <AdminPage />
            </ProtectedRoute>
          } />

          <Route path="/gerente" element={
            <ProtectedRoute requiredType={2}>
              <ManagerPage />
            </ProtectedRoute>
          } />

          <Route path="/supervisor" element={
            <ProtectedRoute requiredType={3}>
              <SupervisorPage />
            </ProtectedRoute>
          } />

          <Route path="/vendedor" element={
            <ProtectedRoute requiredType={4}>
              <SalesPage />
            </ProtectedRoute>
          } />

          {/* Relatórios (apenas para supervisores) */}
          <Route path="/supervisor/reports/performance-vendedor" element={
            <ProtectedRoute requiredType={3}>
              <PerformanceVendedorPage />
            </ProtectedRoute>
          } />
          <Route path="/supervisor/reports/inadimplencia" element={
            <ProtectedRoute requiredType={3}>
              <InadimplenciaPage />
            </ProtectedRoute>
          } />
          <Route path="/supervisor/reports/painel-comissao" element={
            <ProtectedRoute requiredType={3}>
              <PainelComissaoPage />
            </ProtectedRoute>
          } />
          <Route path="/supervisor/reports/painel-diario" element={
            <ProtectedRoute requiredType={3}>
              <PainelDiarioPage />
            </ProtectedRoute>
          } />
          <Route path="/supervisor/reports/performance-supervisor" element={
            <ProtectedRoute requiredType={3}>
              <PerformanceSupervisorPage />
            </ProtectedRoute>
          } />
          <Route path="/supervisor/reports/checkin-checkout-vendedor" element={
            <ProtectedRoute requiredType={3}>
              <CheckinCheckoutVendedorPage />
            </ProtectedRoute>
          } />
          <Route path="/supervisor/reports/checkin-checkout-gerencial" element={
            <ProtectedRoute requiredType={3}>
              <CheckinCheckoutGerencialPage />
            </ProtectedRoute>
          } />
          <Route path="/supervisor/reports/checkin-checkout-dia-anterior" element={
            <ProtectedRoute requiredType={3}>
              <CheckinCheckoutDiaAnteriorPage />
            </ProtectedRoute>
          } />
          <Route path="/supervisor/reports/pedidos" element={
            <ProtectedRoute requiredType={3}>
              <PedidosPage />
            </ProtectedRoute>
          } />
          <Route path="/supervisor/reports/pedidos-nao-faturados" element={
            <ProtectedRoute requiredType={3}>
              <PedidosNaoFaturadosPage />
            </ProtectedRoute>
          } />
          <Route path="/supervisor/reports/faturamento-vendedor-cliente" element={
            <ProtectedRoute requiredType={3}>
              <FaturamentoVendedorClientePage />
            </ProtectedRoute>
          } />

          {/* Página pública */}
          <Route path="/abrir-chamado" element={<AbrirChamadoPage />} />

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
