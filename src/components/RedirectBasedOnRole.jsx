// src/components/RedirectBasedOnRole.jsx
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const RedirectBasedOnRole = () => {
  const { currentUser } = useAuth();

  const roleRoutes = {
    1: '/admin',
    2: '/gerente',
    3: '/supervisor',
    4: '/vendedor'
  };

  const defaultRoute = '/login';
  const route = currentUser?.tipo ? roleRoutes[currentUser.tipo] : defaultRoute;

  return <Navigate to={route || defaultRoute} replace />;
};

export default RedirectBasedOnRole;