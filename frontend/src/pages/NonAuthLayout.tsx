import { Outlet } from "react-router-dom";

const NonAuthLayout = () => {
  return (
    <div className="flex flex-col justify-center items-center h-screen w-screen">
      <Outlet />
    </div>
  );
};

export default NonAuthLayout;
