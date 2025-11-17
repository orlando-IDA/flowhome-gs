import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = () => {
  const { user, isLoading } = useAuth();
  if (isLoading) {
    return <div>Carregando...</div>; 
  }
  if (user) {
    return <Outlet />;
  }
  return <Navigate to="/login" replace />;
};

export default ProtectedRoute;