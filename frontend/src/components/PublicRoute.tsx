import { Navigate, Outlet } from "react-router-dom";

const PublicRoute = () => {
  const token = localStorage.getItem("token");

  if (token) {
    return <Navigate to="/dashboard" />;
  }

  return (
    <div className="flex flex-col justify-center items-center h-screen w-screen">
      <Outlet />
    </div>
  );
};

export default PublicRoute;
