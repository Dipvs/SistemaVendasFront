// src/components/ProtectedRoute.jsx
import { useAuth } from '../contexts/AuthContext';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = ({ allowedRoles, children }) => {
  const { currentUser, loading } = useAuth();

  if (loading) return <div className="flex justify-center items-center h-screen">Carregando...</div>;
  
  if (!currentUser) return <Navigate to="/login" replace />;
  
  // Verifica se o tipo do usuário está entre os permitidos
  if (!allowedRoles.includes(currentUser.tipo)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children ? children : <Outlet />;
};

export default ProtectedRoute;