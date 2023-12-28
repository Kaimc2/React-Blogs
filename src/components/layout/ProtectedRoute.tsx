import { useContext } from "react";
import AuthContext from "../../context/AuthContext";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoutes = () => {
  const { token, user } = useContext(AuthContext);

  return token ? (
    user.isVerified ? (
      <Outlet />
    ) : (
      <Navigate to="/verify-email" />
    )
  ) : (
    <Navigate to="/login" />
  );
};

export default ProtectedRoutes;
