import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/context/authContext";
const ProtectedRoute = () => {
  const { isAuthenticated, token } = useAuth();

  if (!isAuthenticated || !token) {
    return <Navigate to="/signin" />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
