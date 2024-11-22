import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

const PrivateRoute = ({ children, requiredRole }) => {
  const { user } = useContext(AuthContext);

  if (!user) {
    // User is not authenticated
    return <Navigate to="/login" />;
    
  }

  if (requiredRole && user.role !== requiredRole) {
    // User does not have required role
    return <Navigate to="/" />;
  }

  return children;
};

export default PrivateRoute;
