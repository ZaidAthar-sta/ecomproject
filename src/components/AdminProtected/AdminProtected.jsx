import { Navigate } from "react-router-dom";
import { useContext } from "react";
import shopContext from "../../../context/shopContext";

const AdminProtected = ({ children }) => {
     const { isAuthenticated, isAdmin } = useContext(shopContext);

     if (!isAuthenticated || !isAdmin) {
          return <Navigate to="/login" replace />;
     }

     return children;
};

export default AdminProtected;
