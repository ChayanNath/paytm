import { Outlet } from "react-router-dom";
const Root = () => {
  return (
    <>
      <div id="detail" className="h-screen w-screen overflow-hidden">
        <Outlet />
      </div>
    </>
  );
};

export default Root;
