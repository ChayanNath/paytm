import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/context/authContext";

const PublicRoute = () => {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Navigate to="/dashboard" />;
  }

  return (
    <div className="flex flex-col justify-center items-center h-screen w-screen">
      <Outlet />
    </div>
  );
};

export default PublicRoute;
