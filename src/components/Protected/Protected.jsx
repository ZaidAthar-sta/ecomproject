import { Navigate } from 'react-router-dom';
import { useContext } from 'react';
import shopContext from '../../../context/shopContext';
import { Outlet } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useContext(shopContext);

  if (loading) return <div>Loading...</div>;
  // return isAuthenticated ? children : <Navigate to="/login" />;

  if (!isAuthenticated) return <Navigate to="/login" />;
  // if (!isAuthenticated) {
  //   return <Navigate to="/login" replace />;
  // }

  return (
    <>
      {children}
      <Outlet />
    </>
  );
};

export default ProtectedRoute;
