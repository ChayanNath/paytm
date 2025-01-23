import { Outlet } from "react-router-dom";
const Root = () => {
  return (
    <>
      <div
        id="detail"
        className="flex flex-col h-screen w-screen overflow-hidden bg-white border-zinc-200 text-zinc-850 shadow dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-50"
      >
        <Outlet />
      </div>
    </>
  );
};

export default Root;
