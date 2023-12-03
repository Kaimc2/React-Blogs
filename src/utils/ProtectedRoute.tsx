import { useContext } from "react";
import AuthContext from "../Context/AuthContext";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoutes = () => {
  const { token } = useContext(AuthContext);

  return token ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoutes;
