import { useContext, type ReactNode, } from 'react';
import { GlobalContext } from '../../Context/GlobalContext';
import { Navigate } from 'react-router-dom';

interface PrivateRouteProps {
  children: ReactNode;
}

function PrivateRoute({ children }: PrivateRouteProps) {
  const { user } = useContext(GlobalContext);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default PrivateRoute;
